export type FormStatus = 'ACTIVE' | 'DRAFT';
export type FieldType = 'TEXT' | 'NUMBER' | 'DATE' | 'SELECT' | 'COLOR';

export interface FormField {
  id: string;
  type: FieldType;
  label: string;
  order: number;
  options?: string[]; // For SELECT
  min?: number; // For NUMBER
  max?: number; // For NUMBER
  required?: boolean;
}

export interface FormTemplate {
  id: string;
  title: string;
  description: string;
  order: number;
  status: FormStatus;
  fields: FormField[];
  createdAt?: string;
  updatedAt?: string;
  creator?: {username: string};
}
