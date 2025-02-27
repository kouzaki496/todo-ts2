/**
 * 日付の比較ユーティリティ
 */
export const compareDates = (dateStr: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const targetDate = new Date(dateStr);
  targetDate.setHours(0, 0, 0, 0);

  return {
    isOverdue: targetDate < today,
    isDueToday: targetDate.getTime() === today.getTime()
  };
};