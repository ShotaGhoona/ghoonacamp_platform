/**
 * 指定された日付の週の月曜日の0時0分0秒を取得します
 * @param date - 基準となる日付（デフォルトは現在の日付）
 * @returns 週の月曜日の0時0分0秒
 */
export const getWeekStartDate = (date: Date = new Date()): Date => {
  const monday = new Date(date);
  monday.setDate(date.getDate() - date.getDay() + 1);
  monday.setHours(0, 0, 0, 0);
  return monday;
}; 