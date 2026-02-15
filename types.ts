
export enum DocCategory {
  APPLICATION = 'Арыз',
  CONTRACT = 'Келишим',
  POWER_OF_ATTORNEY = 'Ишеним кат',
  EMPLOYMENT = 'Иш кагаздары'
}

export type Language = 'ky' | 'ru' | 'en' | 'tr';

export interface DocumentTemplate {
  id: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
  category: DocCategory;
  icon: string;
}

export interface GenerationState {
  loading: boolean;
  result: string | null;
  error: string | null;
}
