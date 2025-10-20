/**
 * Format large numbers with appropriate suffixes
 * Examples:
 * - 2909000 -> $2.9M
 * - 450000 -> $450K
 * - 1234 -> 1,234
 */
export function formatLargeNumber(value: number, prefix: string = '', includeDecimals: boolean = true): string {
  const absValue = Math.abs(value);
  
  if (absValue >= 1000000) {
    const millions = value / 1000000;
    const formatted = includeDecimals ? millions.toFixed(1) : Math.round(millions).toString();
    return `${prefix}${formatted}M`;
  }
  
  if (absValue >= 1000) {
    const thousands = value / 1000;
    const formatted = includeDecimals ? thousands.toFixed(1) : Math.round(thousands).toString();
    return `${prefix}${formatted}K`;
  }
  
  return `${prefix}${Math.round(value).toLocaleString()}`;
}
