type LogLevel = 'info' | 'warn' | 'error' | 'debug'

interface LogMessage {
  level: LogLevel
  message: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: Record<string, any>
  timestamp: string
}

class Logger {
  private formatMessage(level: LogLevel, message: string, data?: Record<string, unknown>): LogMessage {
    return {
      level,
      message,
      data,
      timestamp: new Date().toISOString()
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  info(message: string, data?: Record<string, any>): void {
    console.log(this.formatMessage('info', message, data))
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  warn(message: string, data?: Record<string, any>): void {
    console.warn(this.formatMessage('warn', message, data))
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error(message: string, data?: Record<string, any>): void {
    console.error(this.formatMessage('error', message, data))
  }
}

export const logger = new Logger() 