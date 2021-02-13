import { area } from './area';
import { boxShadow } from './boxShadow';
import { border } from './border';

export const enhancers = {
  border,
  boxShadow,
  margin: area,
  padding: area,
};

export type Enhancers = typeof enhancers;
