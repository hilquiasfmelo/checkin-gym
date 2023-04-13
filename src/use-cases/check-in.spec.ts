import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { describe, expect, it, beforeEach } from 'vitest'
import { CheckinCaseUseCase } from './check-in'

let inMemoryCheckInsRepository: InMemoryCheckInsRepository
let sut: CheckinCaseUseCase

describe('CheckIn Use Case', async () => {
  beforeEach(() => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
    sut = new CheckinCaseUseCase(inMemoryCheckInsRepository)
  })

  it('should be able create to new check in', async () => {
    const { checkIn } = await sut.run({
      userId: 'user-id',
      gymId: 'gym-id',
    })

    expect(checkIn.user_id).toEqual(expect.any(String))
    expect(checkIn.gym_id).toEqual(expect.any(String))
  })
})
