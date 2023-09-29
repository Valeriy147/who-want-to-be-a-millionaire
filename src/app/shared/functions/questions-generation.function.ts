import { IQuestion } from "../../interfaces/question.interface";
import { QUESTIONS } from "../constances/questions.constance";

export function getRandomQuestions(numQuestions: number) {
  const allQuestions: IQuestion[] = QUESTIONS;

  for (let i = allQuestions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allQuestions[i], allQuestions[j]] = [allQuestions[j], allQuestions[i]];
  }

  return allQuestions.slice(0, numQuestions);
}
