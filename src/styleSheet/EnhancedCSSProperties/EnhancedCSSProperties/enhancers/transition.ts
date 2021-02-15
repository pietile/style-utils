interface TransitionOptions {
  property: string;
  duration: string;
  timingFunction?: string;
  delay?: string;
}

function transitionOptionsToString(options: TransitionOptions) {
  const { property, duration, timingFunction, delay } = options;

  return [property, duration, timingFunction, delay].filter(Boolean).join(' ');
}

export function transition(
  value: 'none' | TransitionOptions | TransitionOptions[],
): string {
  if (value === 'none') {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(options => transitionOptionsToString(options)).join(', ');
  }

  return transitionOptionsToString(value);
}
