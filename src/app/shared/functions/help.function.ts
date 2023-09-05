export function getHelp(answer: string) {
  const random = Math.random();
  if (random <= 0.8) {
    return answer;
  } else {
    const randomIndex = Math.floor(Math.random() * 3);
    const incorrectAnswers = ['a', 'b', 'c', 'd'];
    incorrectAnswers.splice(incorrectAnswers.indexOf(answer), 1);
    return incorrectAnswers[randomIndex];
  }
}
