type BorderOptions = {
  width: number;
  type?: string;
  color: string;
};

export function border(value: 'none' | BorderOptions): string {
  if (value === 'none') {
    return value;
  }

  const { width, type = 'solid', color } = value;

  return `${width}px ${type} ${color}`;
}
