import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/interfaces/check-ins-repository'

interface CheckinCaseRequest {
  userId: string
  gymId: string
}

interface CheckinCaseResponse {
  checkIn: CheckIn
}

export class CheckinCaseUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async run({
    userId,
    gymId,
  }: CheckinCaseRequest): Promise<CheckinCaseResponse> {
    const checkIn = await this.checkInsRepository.create({
      user_id: userId,
      gym_id: gymId,
    })

    return {
      checkIn,
    }
  }
}
