import { Logger } from "@nestjs/common";

export class LoggerService {
  async setLog(origin: string, message: string) {
    const logger = new Logger(origin);
    logger.log(message);
  }

  async setWarn(origin: string, message: string) {
    const logger = new Logger(origin);
    logger.warn(message);
  }

  async setError(origin: string, message: string) {
    const logger = new Logger(origin);
    logger.error(message);
  }
}
