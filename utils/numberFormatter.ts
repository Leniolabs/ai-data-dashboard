const limit = [1000, 1000000, 1000000000, 1000000000000];
const unit = ["K", "M", "B", "T"];

export function formatNumber(value: number) {
  for (let i = limit.length - 1; i >= 0; i--) {
    const scaled = value / limit[i];
    if (scaled > 1) return `${scaled.toFixed(1)}${unit[i]}`;
  }
  return value.toFixed(1);
}
