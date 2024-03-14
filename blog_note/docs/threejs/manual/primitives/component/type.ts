
export interface FormUnitType {
  label: string;
  defaultValue: number | boolean | string;
  min?: number;
  max?: number;
  type?: 'text' | 'number' | 'boolean' | undefined,
  step?: number,
  marks?: {
    [key: string]: any;
  };
};

