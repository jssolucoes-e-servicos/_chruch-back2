import { OnlineMidiaSoursesEnum } from 'src/common/enums';

export interface IOnlineSourses {
  [key: string]: (typeof OnlineMidiaSoursesEnum)[keyof typeof OnlineMidiaSoursesEnum];
}
