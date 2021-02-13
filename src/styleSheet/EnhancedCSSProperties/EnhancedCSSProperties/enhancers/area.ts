type AreaOptions =
  | { vertical: number; horizontal: number }
  | { top: number; horizontal: number; bottom: number }
  | { top: number; right: number; bottom: number; left: number };

export function area(value: number | AreaOptions): string {
  if (typeof value === 'number') {
    return `${value}px`;
  }

  if ('left' in value) {
    return `${value.top}px ${value.right}px ${value.bottom}px ${value.left}px`;
  }

  if ('bottom' in value) {
    return `${value.top}px ${value.horizontal}px ${value.bottom}px`;
  }

  return `${value.vertical}px ${value.horizontal}px`;
}
