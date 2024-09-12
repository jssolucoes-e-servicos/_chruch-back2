import { MeetMethodEnum } from 'src/common/enums';

export interface IMeetMethod {
  [key: string]: (typeof MeetMethodEnum)[keyof typeof MeetMethodEnum];
}