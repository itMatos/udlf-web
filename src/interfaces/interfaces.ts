export interface StepProps {
  completed?: boolean;
}

export interface LabelProps {
  optional?: React.ReactNode;
}

export interface CPRRMethodSettings {
  L: number;
  K: number;
  T: number;
}

export interface ContextRRMethodSettings {
  L: number;
  K: number;
  T: number;
  NBYK: number;
  OPTIMIZATIONS: boolean;
}
