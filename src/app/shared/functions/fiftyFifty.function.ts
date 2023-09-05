export function getFiftyFifty(answer: any): any {
  const answers = ['a', 'b', 'c', 'd'];
  const indexToRemove = answers.indexOf(answer);
  if (indexToRemove !== -1) {
    answers.splice(indexToRemove, 1);
  }
  const randomIndex = Math.floor(Math.random() * 3);
  answers.splice(randomIndex, 1);
  return answers;
}
