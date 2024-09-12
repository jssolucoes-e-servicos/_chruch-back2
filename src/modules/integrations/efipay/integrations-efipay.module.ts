import { Module } from "@nestjs/common";
import { IntegrationsEfiPayWebhookController } from "src/modules/integrations/efipay/controllers/integrations-efipay-webhook.controller";
import { IntegrationsEfiPayService } from "src/modules/integrations/efipay/services/integrations-efipay.service";
import { LoggerService } from "src/modules/logger/services/logger.service";
import { PrismaService } from "src/modules/prisma/services/prisma.service";

@Module({
  controllers: [IntegrationsEfiPayWebhookController],
  providers: [LoggerService, PrismaService, IntegrationsEfiPayService],
  exports: [IntegrationsEfiPayService],
})
export class IntegratiosEfiModule {}
