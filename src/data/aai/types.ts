export type Locale = 'en' | 'mr' | 'gu' | 'hi';

export interface TimelineEvent {
  id: string;
  type: 'milestone' | 'song' | 'video' | 'text';
  date: string;
  title: string;
  note?: string;
  photo?: string;
  photoAlt?: string;
  audio?: string;
  video?: string;
  youtube?: string;
}

export interface AaiContent {
  meta: {
    title: string;
    description: string;
  };
  intro: {
    heading: string;
    subheading: string;
  };
  timeline: TimelineEvent[];
  ui: {
    playAll: string;
    clickToExpand: string;
    loading: string;
    playing: string;
    paused: string;
    languageLabel: string;
  };
}
