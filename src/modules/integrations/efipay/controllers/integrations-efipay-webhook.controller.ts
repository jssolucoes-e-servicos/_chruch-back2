import { Controller, Get } from "@nestjs/common";
import { IntegrationsEfiPayWebhookService } from "src/modules/integrations/efipay/services/integrations-efipay-webhook.service";

@Controller("webhooks/efipay")
export class IntegrationsEfiPayWebhookController {
  constructor(private readonly _service: IntegrationsEfiPayWebhookService) {}

  @Get()
  getHello(): string {
    return "ok";
  }
}
