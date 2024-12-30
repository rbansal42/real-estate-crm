type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogMessage {
  level: LogLevel;
  message: string;
  data?: Record<string, unknown>;
  timestamp: string;
}

class Logger {
  private isDevelopment = process.env.NODE_ENV === 'development';

  private formatMessage(level: LogLevel, message: string, data?: Record<string, unknown>): LogMessage {
    return {
      level,
      message,
      data,
      timestamp: new Date().toISOString(),
    };
  }

  info(message: string, data?: Record<string, unknown>): void {
    if (!this.isDevelopment) return;
    const formattedMessage = this.formatMessage('info', message, data);
    console.log(`[INFO] ${formattedMessage.timestamp}:`, message, data || '');
  }

  warn(message: string, data?: Record<string, unknown>): void {
    if (!this.isDevelopment) return;
    const formattedMessage = this.formatMessage('warn', message, data);
    console.warn(`[WARN] ${formattedMessage.timestamp}:`, message, data || '');
  }

  error(message: string, data?: Record<string, unknown>): void {
    if (!this.isDevelopment) return;
    const formattedMessage = this.formatMessage('error', message, data);
    console.error(`[ERROR] ${formattedMessage.timestamp}:`, message, data || '');
  }

  debug(message: string, data?: Record<string, unknown>): void {
    if (!this.isDevelopment) return;
    const formattedMessage = this.formatMessage('debug', message, data);
    console.debug(`[DEBUG] ${formattedMessage.timestamp}:`, message, data || '');
  }
}

export const logger = new Logger(); 