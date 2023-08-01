import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { CreateGymUseCase } from '../create-gym'

export function makeCreateGymUseCase() {
  const gymsInsRepository = new PrismaGymsRepository()
  const useCase = new CreateGymUseCase(gymsInsRepository)

  return useCase
}
