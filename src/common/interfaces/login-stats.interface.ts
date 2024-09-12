import { LoginStatsEnum } from 'src/common/enums';

export interface ILoginStats {
  [key: string]: (typeof LoginStatsEnum)[keyof typeof LoginStatsEnum];
}