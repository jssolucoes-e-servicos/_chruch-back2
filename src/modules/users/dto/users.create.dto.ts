import { GenresEnum, LoginStatsEnum, MaritalStatusEnum } from 'src/common/enums';
import { ITwoFactorAuthentication } from 'src/common/interfaces';
import { BooleanValidator, EmailValidator, MongoIdValidator, StringValidator } from 'src/common/validators';

export class UserCreateDTO {
  @StringValidator({ fieldName: 'name', label: 'Nome', minLength: 10 })
  name: string;

  @StringValidator({ fieldName: 'genre', label: 'Genero', optional: true })
  genre?: GenresEnum;

  @StringValidator({
    fieldName: 'maritalStatus',
    label: 'Estado Civil',
    optional: true,
  })
  maritalStatus?: MaritalStatusEnum;

  @StringValidator({
    fieldName: 'birth',
    label: 'Data de nacimento',
    optional: true,
  })
  birth?: Date | string | null;

  @StringValidator({ fieldName: 'photo', label: 'Foto', optional: true })
  photo?: string | null;

  @EmailValidator({ fieldName: 'email', label: 'Email', optional: true })
  email?: string | null;

  @StringValidator({ fieldName: 'username', label: 'Login', optional: true })
  username?: string | null;

  @StringValidator({ fieldName: 'password', label: 'Senha', optional: true })
  password?: string | null;

  @StringValidator({
    fieldName: 'loginAttempts',
    label: 'Tentativas de login',
    optional: true,
  })
  loginAttempts?: number;

  @StringValidator({
    fieldName: 'loginStats',
    label: 'Status do login',
    optional: true,
  })
  loginStats?: LoginStatsEnum;

  @BooleanValidator({
    fieldName: 'inRecovery',
    label: 'Em recuperção de senha',
    optional: true,
  })
  inRecovery?: boolean | null;

  @BooleanValidator({ fieldName: 'genre', label: 'Genero', optional: true })
  twoFactorAuthenticationActive?: boolean | null;

  @BooleanValidator({ fieldName: 'member', label: 'É membro', optional: true })
  member?: boolean;

  @StringValidator({
    fieldName: 'memberId',
    label: 'Membro ID',
    optional: true,
  })
  memberId?: string | null;

  @StringValidator({
    fieldName: 'signedAt',
    label: 'Arrolado em',
    optional: true,
  })
  singnedAt?: Date | string | null;

  @StringValidator({
    fieldName: 'signedBy',
    label: 'Arrolado por',
    optional: true,
  })
  singnedBy?: string | null;

  @BooleanValidator({
    fieldName: 'dizimist',
    label: 'Dizimista',
    optional: true,
  })
  dizimist?: boolean | null;

  @BooleanValidator({
    fieldName: 'permitChurch',
    label: 'permitChurch',
    optional: true,
  })
  permitChurch?: boolean | null;

  /*   @BooleanValidator({
    fieldName: 'permitEAD',
    label: 'permitEAD',
    optional: true,
  })
  permitEAD?: boolean; */

  @BooleanValidator({
    fieldName: 'permitPortal',
    label: 'permitPortal',
    optional: true,
  })
  permitPortal?: boolean | null;

  /*   @BooleanValidator({
    fieldName: 'permitEAD_CMS',
    label: 'permitEAD_CMS',
    optional: true,
  })
  permitEAD_CMS?: boolean; */

  @StringValidator({
    fieldName: 'twoFactorAuthentication',
    label: 'Autenticação de 2 fatores',
    optional: true,
  })
  twoFactorAuthentication?: ITwoFactorAuthentication | object;

  @StringValidator({
    fieldName: 'resetPasswordToken',
    label: 'resetPasswordToken',
    optional: true,
  })
  resetPasswordToken?: string | null;
  @StringValidator({
    fieldName: 'resetPasswordExpiresAt',
    label: 'resetPasswordExpiresAt',
    optional: true,
  })
  resetPasswordExpiresAt?: Date | string | null;

  @MongoIdValidator({
    fieldName: 'churchId',
    label: 'ID da Igreja',
  })
  churchId: string;
}
