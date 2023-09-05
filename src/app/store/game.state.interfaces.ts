import { ISettings } from "../interfaces/settings.interfaces";

export interface IGameState {
  questions: any[],
  numberOfActualQuestion: number,
  settings: ISettings,
}
