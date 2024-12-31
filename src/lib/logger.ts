const isDevelopment = process.env.NODE_ENV === 'development'

type LogLevel = 'info' | 'warn' | 'error'

interface LogOptions {
  level: LogLevel
  message: string
  data?: any
}

function log({ level, message, data }: LogOptions) {
  if (!isDevelopment) return

  const timestamp = new Date().toISOString()
  const logData = data ? { ...data, timestamp } : { timestamp }

  switch (level) {
    case 'info':
      console.log(`[INFO] ${message}`, logData)
      break
    case 'warn':
      console.warn(`[WARN] ${message}`, logData)
      break
    case 'error':
      console.error(`[ERROR] ${message}`, logData)
      break
  }
}

export const logger = {
  info: (message: string, data?: any) => log({ level: 'info', message, data }),
  warn: (message: string, data?: any) => log({ level: 'warn', message, data }),
  error: (message: string, data?: any) => log({ level: 'error', message, data }),
} 