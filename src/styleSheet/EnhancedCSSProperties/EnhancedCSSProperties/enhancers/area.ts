type AreaValue = number | string | 'auto';

type AreaOptions =
  | { vertical: AreaValue; horizontal: AreaValue }
  | { top: AreaValue; horizontal: AreaValue; bottom: AreaValue }
  | { top: AreaValue; right: AreaValue; bottom: AreaValue; left: AreaValue }
  | [top: AreaValue, right: AreaValue, bottom: AreaValue, left: AreaValue]
  | [top: AreaValue, horizontal: AreaValue, bottom: AreaValue]
  | [vertical: AreaValue, horizontal: AreaValue]
  | AreaValue;

function getAreaFromValue(value: AreaOptions): AreaValue[] {
  if (Array.isArray(value)) {
    return value;
  }

  if (typeof value === 'number' || typeof value === 'string') {
    return [value];
  }

  if ('left' in value) {
    return [value.top, value.right, value.bottom, value.left];
  }

  if ('bottom' in value) {
    return [value.top, value.horizontal, value.bottom];
  }

  return [value.vertical, value.horizontal];
}

export function area(value: AreaOptions): string {
  return getAreaFromValue(value)
    .map((area) => {
      if (typeof area === 'number') {
        return `${area}px`;
      }

      return area;
    })
    .join(' ');
}
