interface TransitionOptions {
  property: string;
  duration: string;
  timingFunction?: string;
  delay?: string;
}

export function transition(...transitions: TransitionOptions[]): string {
  return transitions
    .map(({ property, duration, timingFunction, delay }) =>
      [property, duration, timingFunction, delay].filter(Boolean).join(' '),
    )
    .join(', ');
}

export function cubicTransition(...cssProperties: string[]): string {
  return transition(
    ...cssProperties.map(property => ({
      property,
      duration: '235ms',
      timingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    })),
  );
}
