import { PartialType } from '@nestjs/swagger';
import { MongoIdValidator, StringValidator } from 'src/common/validators';
import { UserCreateDTO } from 'src/modules/users/dto/users.create.dto';

export class UserRetrieveDTO extends PartialType(UserCreateDTO) {
  @MongoIdValidator({ fieldName: 'id' })
  id: string;

  @StringValidator({ fieldName: 'createdAt' })
  createdAt: Date;

  @StringValidator({ fieldName: 'updatedAt' })
  updatedAt: Date;
}
