export type BaseConfigType = {
  parameters: {
    value: string | number | boolean;
    key: string;
    description?: string;
    options?: string[];
    type?: string;
  }[];
  section: string;
  description?: string;
};

export type ConfigSectionType = {
  section: string;
  parameters: {
    value: string | number | boolean;
    key: string;
    description?: string;
    options?: string[];
    type?: string;
  }[];
};
