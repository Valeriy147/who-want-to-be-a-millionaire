export interface GameOverDialogData {
  type: 'win' | 'lose';
  sum: number;
  answer?: string;
}

export interface HelpDialogData {
  answer: string;
}
