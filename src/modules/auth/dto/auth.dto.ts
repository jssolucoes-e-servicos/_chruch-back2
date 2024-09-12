import { ApiProperty } from '@nestjs/swagger';
import { StringValidator } from 'src/common/validators';

export class AuthDTO {
  @ApiProperty({ default: 'jackson' })
  @StringValidator({ fieldName: 'username', label: 'Nome de usuário' })
  username: string;

  @ApiProperty({ default: '522576' })
  @StringValidator({ fieldName: 'password', label: 'Senha', minLength: 6 })
  password: string;

  @ApiProperty({ default: 'ead' })
  @StringValidator({ fieldName: 'app', label: 'Plataforma ID', minLength: 3 })
  app: string;
}
