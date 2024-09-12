import { Injectable } from "@nestjs/common";
import EfiPay from "sdk-node-apis-efi";
import { configLoaderHelper } from "src/common/helpers/config-loader.helper";
import { LoggerService } from "src/modules/logger/services/logger.service";
import { PrismaService } from "src/modules/prisma/services/prisma.service";

@Injectable()
export class IntegrationsEfiPayService {
  private efipayInstance: any;
  constructor(
    private readonly _name: string = this.constructor.name,
    private readonly _prisma: PrismaService,
    private readonly _logger: LoggerService,
  ) {
    const efiCredentials = configLoaderHelper().efipay.mode === "sandbox" ? configLoaderHelper().efipay.sandbox : configLoaderHelper().efipay.production;
    this.efipayInstance = new EfiPay({
      client_id: efiCredentials.clientId,
      client_secret: efiCredentials.clientSecret,
      sandbox: configLoaderHelper().efipay.mode === "sandbox",
      // Se necessário, passe o caminho do certificado SSL (para PIX)
      certificate: `src/modules/integrations/integrations-efi/certificates/${efiCredentials.certificateName}`,
    });
  }
  // Exemplo de outro método para criar uma cobrança
  async createCharge(data: any) {
    try {
      const charge = await this.efipayInstance.createCharge(data);
      return charge;
    } catch (error) {
      this._logger.setError(this._name, "Erro ao criar cobrança: " + error);
      throw error;
    }
  }

  async getToken(): Promise<string | null> {
    try {
      const token = await this.efipayInstance.getAccessToken();
      this._logger.setLog(this._name, "Token gerado com sucesso");
      return token;
    } catch (error) {
      this._logger.setError(this._name, "Erro ao obter o token: " + error);
      return null;
    }
  }
}
