import { Environment } from 'vitest'
import { randomUUID } from 'node:crypto'
import { execSync } from 'node:child_process'

import { env } from '@/env'
import { prisma } from '@/lib/prisma'

function generateDatabaseURL(schema: string) {
  if (!env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable.')
  }

  const url = new URL(env.DATABASE_URL)

  url.searchParams.set('schema', schema)

  return url.toString()
}

export default <Environment>{
  name: 'prisma',
  // Código que executa antes dos testes
  async setup() {
    const schema = randomUUID()
    const databaseURL = generateDatabaseURL(schema)

    env.DATABASE_URL = databaseURL

    console.log(env.DATABASE_URL)

    execSync('npx prisma migrate deploy')

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        )
        await prisma.$disconnect()
      },
    }
  },
}
