export function cubicTransition(...cssProperties: string[]): string {
  return cssProperties
    .map((property) => `${property} 235ms cubic-bezier(0.4, 0, 0.2, 1)`)
    .join(', ');
}
