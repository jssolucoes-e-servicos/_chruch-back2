import { ApplicationsEnum } from "src/common/enums";

export interface IApplication {
  [key: string]: (typeof ApplicationsEnum)[keyof typeof ApplicationsEnum];
}
