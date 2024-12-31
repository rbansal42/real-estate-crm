import { PrismaClient } from "@prisma/client"
import { logger } from "./logger"

declare global {
  var prisma: PrismaClient | undefined
}

export const db = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") {
  logger.info("Setting up development database client")
  globalThis.prisma = db
} 