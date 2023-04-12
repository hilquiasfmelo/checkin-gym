import { describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'

import { InMemoryRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Autheticate Use Case', async () => {
  it('should be able authenticate user', async () => {
    const inMemoryRepository = new InMemoryRepository()
    const sut = new AuthenticateUseCase(inMemoryRepository)

    await inMemoryRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('12345678', 6),
    })

    const { user } = await sut.run({
      email: 'johndoe@example.com',
      password: '12345678',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able authenticate with wrong email', async () => {
    const inMemoryRepository = new InMemoryRepository()
    const sut = new AuthenticateUseCase(inMemoryRepository)

    expect(async () => {
      await sut.run({
        email: 'johndoe@example.com',
        password: '12345678',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able authenticate with wrong password', async () => {
    const inMemoryRepository = new InMemoryRepository()
    const sut = new AuthenticateUseCase(inMemoryRepository)

    await inMemoryRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password_hash: await hash('12345678', 6),
    })

    expect(async () => {
      await sut.run({
        email: 'johndoe@example.com',
        password: '123123',
      })
    }).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
