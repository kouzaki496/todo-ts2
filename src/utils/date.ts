export const MILLISECONDS_IN_A_DAY = 24 * 60 * 60 * 1000;

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
    isDueToday: targetDate.getTime() === today.getTime(),
    isTomorrow: targetDate.getTime() === today.getTime() + MILLISECONDS_IN_A_DAY,
    isYesterday: targetDate.getTime() === today.getTime() - MILLISECONDS_IN_A_DAY,
  };
};

/**
 * 日付文字列の生成ユーティリティ
 */
export const getDateString = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

/**
 * 相対的な日付の取得
 */
export const getRelativeDate = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return getDateString(date);
};

/**
 * テスト用の日付文字列を取得
 */
export const getTestDates = () => {
  const today = new Date();
  return {
    today: getDateString(today),
    yesterday: getDateString(new Date(today.getTime() - MILLISECONDS_IN_A_DAY)),
    tomorrow: getDateString(new Date(today.getTime() + MILLISECONDS_IN_A_DAY)),
    dayBeforeYesterday: getDateString(new Date(today.getTime() - (MILLISECONDS_IN_A_DAY * 2))),
  };
};