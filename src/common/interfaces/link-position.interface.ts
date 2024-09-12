import { LinkPositionsEnum } from 'src/common/enums';

export interface ILinkPosition {
  [key: string]: (typeof LinkPositionsEnum)[keyof typeof LinkPositionsEnum];
}