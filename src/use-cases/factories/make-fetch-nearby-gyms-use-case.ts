import { PrismaGymsRepository } from '@/repositories/prisma/prisma-gyms-repository'
import { FetchNearbyUseCase } from '../fetch-nearby-gyms'

export function makeFetchNearbyGymsUseCase() {
  const gymsInsRepository = new PrismaGymsRepository()
  const useCase = new FetchNearbyUseCase(gymsInsRepository)

  return useCase
}
