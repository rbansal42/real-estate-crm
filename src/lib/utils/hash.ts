import * as argon2 from "argon2"
import { logger } from "@/lib/logger"

export async function hash(password: string): Promise<string> {
  try {
    return await argon2.hash(password, {
      type: argon2.argon2id,
      memoryCost: 65536, // 64MB
      timeCost: 3, // Number of iterations
      parallelism: 4,
      saltLength: 32,
    })
  } catch (error) {
    logger.error("Error hashing password", { error })
    throw new Error("Failed to hash password")
  }
}

export async function verify(hash: string, password: string): Promise<boolean> {
  try {
    return await argon2.verify(hash, password)
  } catch (error) {
    logger.error("Error verifying password", { error })
    throw new Error("Failed to verify password")
  }
} 