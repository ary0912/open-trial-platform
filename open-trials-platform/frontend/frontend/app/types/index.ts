export interface Study {
  id: number;
  title: string;
  description: string;
  principal_investigator: string;
}

export interface Participant {
  id: number;
  [key: string]: string | number | null | undefined;
}

export interface AnalyticsData {
  total_participants: number;
  numeric_metrics: Record<string, {
    avg: number;
    min: number;
    max: number;
    count: number;
  }>;
  categorical_metrics: Record<string, Record<string, number>>;
  enrollment_trend: {
    month: string;
    participants: number;
  }[];
}

export interface CreateStudyPayload {
  title: string;
  description: string;
  principal_investigator: string;
}