import { PartialType } from '@nestjs/swagger';
import { UserCreateDTO } from 'src/modules/users/dto/users.create.dto';

export class UserUpdateDTO extends PartialType(UserCreateDTO) {}
