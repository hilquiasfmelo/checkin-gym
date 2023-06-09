import { describe, expect, it, beforeEach } from 'vitest'
import { compare } from 'bcryptjs'

import { RegisterUseCase } from './register'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', async () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(inMemoryUsersRepository)
  })

  it('should be able register to new user', async () => {
    const { user } = await sut.run({
      name: 'John Dow',
      email: 'johndoe@example.com',
      password: '12345678',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should be able hash user password upon registration', async () => {
    const { user } = await sut.run({
      name: 'John Dow',
      email: 'johndoe@example.com',
      password: '12345678',
    })

    const isPasswordCorrectlyHashed = await compare(
      '12345678',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should be able to register with same email twice', async () => {
    const email = 'johndoe@example.com'

    await sut.run({
      name: 'John Dow',
      email,
      password: '12345678',
    })

    expect(async () => {
      await sut.run({
        name: 'John Dow',
        email,
        password: '12345678',
      })
    }).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
