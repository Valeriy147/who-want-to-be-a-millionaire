import { IPayOptions, ISettings } from "../interfaces/settings.interfaces";

export interface IGameState {
  questions: any[],
  numberOfActualQuestion: number,
  settings: ISettings,
  numbersOfQuestions: number[] | null,
  payData: IPayOptions | null,
}
