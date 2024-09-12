import { IRecoveryCodes } from 'src/common/interfaces';
import { StringValidator } from 'src/common/validators';

export class ITwoFactorAuthentication {
  @StringValidator({ fieldName: 'ascii', label: 'ASCII', optional: true })
  ascii?: string | null;

  @StringValidator({ fieldName: 'hex', label: 'HEX', optional: true })
  hex?: string | null;

  @StringValidator({ fieldName: 'base32', label: 'BASE32', optional: true })
  base32?: string | null;

  @StringValidator({
    fieldName: 'otpauth_url',
    label: 'OTP Auth url',
    optional: true,
  })
  otpauth_url?: string | null;

  @StringValidator({
    fieldName: 'recoveryCodes',
    label: 'Códigos de recuperação',
  })
  recoveryCodes: IRecoveryCodes;

  @StringValidator({ fieldName: 'activedIn', label: 'Ativado em' })
  activedIn: Date | null;
}
