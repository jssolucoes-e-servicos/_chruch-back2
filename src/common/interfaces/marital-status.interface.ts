import { MaritalStatusEnum } from 'src/common/enums';

export interface IMaritalStatus {
  [key: string]: (typeof MaritalStatusEnum)[keyof typeof MaritalStatusEnum];
}