import { MongoIdValidator, StringValidator } from 'src/common/validators';

export class CellsNetworkCreateDTO {
  @MongoIdValidator({ fieldName: 'churchId', label: 'ID da igreja' })
  churchId: string;

  @StringValidator({ fieldName: 'Nome' })
  name: string;

  @StringValidator({ fieldName: 'Slug', optional: true })
  slug?: string | null;

  @StringValidator({ fieldName: 'Cor da rede em hexadecima', optional: true })
  color?: string;

  @StringValidator({ fieldName: 'URL da Imagem', optional: true })
  image?: string;

  //@StringValidator({ fieldName: 'ID do plano', })
  @MongoIdValidator({ fieldName: 'ID DO Supervisor' })
  supervisorId: string;
}
