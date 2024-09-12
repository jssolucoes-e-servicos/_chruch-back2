import { Injectable } from "@nestjs/common";
import { LoggerService } from "src/modules/logger/services/logger.service";
import { PrismaService } from "src/modules/prisma/services/prisma.service";

@Injectable()
export class IntegrationsEfiPayWebhookService {
  private efipayInstance: any;
  constructor(
    private readonly _name: string = this.constructor.name,
    private readonly _prisma: PrismaService,
    private readonly _logger: LoggerService,
  ) {}
}
