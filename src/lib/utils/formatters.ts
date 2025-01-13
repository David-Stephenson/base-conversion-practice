export function formatPlaceValue(base: string, position: number): string {
  const baseNum = base === 'binary' ? '2' : base === 'hexadecimal' ? '16' : '10';
  return `${baseNum}<sup>${position}</sup>`;
} 