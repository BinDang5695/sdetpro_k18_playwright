// log-utils.ts
export class LogUtils {
  // Info level logs
  static info(message: string | object) {
    console.log(`ℹ️ [INFO] ${LogUtils.formatMessage(message)}`);
  }

  // Warn level logs
  static warn(message: string | object) {
    console.warn(`⚠️ [WARN] ${LogUtils.formatMessage(message)}`);
  }

  // Error level logs
  static error(message: string | object, error?: any) {
    if (error) {
      console.error(`❌ [ERROR] ${LogUtils.formatMessage(message)} - ${error}`);
    } else {
      console.error(`❌ [ERROR] ${LogUtils.formatMessage(message)}`);
    }
  }

  // Fatal level logs
  static fatal(message: string | object) {
    console.error(`💀 [FATAL] ${LogUtils.formatMessage(message)}`);
  }

  // Debug level logs
  static debug(message: string | object) {
    console.debug(`🐞 [DEBUG] ${LogUtils.formatMessage(message)}`);
  }

  // Helper: format message
  private static formatMessage(message: string | object): string {
    if (typeof message === 'object') {
      try {
        return JSON.stringify(message, null, 2);
      } catch {
        return String(message);
      }
    }
    return message;
  }
}
