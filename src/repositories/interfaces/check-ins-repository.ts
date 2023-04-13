import { Prisma, CheckIn } from '@prisma/client'

export interface CheckInsRepository {
  // findByEmail(email: string): Promise<CheckIn | null>
  // findById(id: string): Promise<CheckIn | null>
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
}
