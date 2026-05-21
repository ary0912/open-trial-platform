import Papa from 'papaparse';

/* =========================================================
   TYPES
   ========================================================= */

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

/* =========================================================
   LOCAL STORAGE KEYS
   ========================================================= */

const STORAGE_KEYS = {
  STUDIES: 'otp_studies',
  PARTICIPANTS: 'otp_participants_', // Prefix for study-specific participants
};

/* =========================================================
   INITIAL DATA
   ========================================================= */

const DEFAULT_STUDIES: Study[] = [
  {
    id: 1,
    title: "Global Customer Journey Workspace",
    description: "Tracking product adoption, engagement, and retention across enterprise segments.",
    principal_investigator: "Avery Li"
  },
  {
    id: 2,
    title: "Operational Performance Benchmark",
    description: "Analyzing efficiency signals and dataset trends for executive decision-making.",
    principal_investigator: "Jordan Patel"
  }
];

/* =========================================================
   CORE LOGIC
   ========================================================= */

export const getLocalStudies = (): Study[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_KEYS.STUDIES);
  if (!stored) {
    localStorage.setItem(STORAGE_KEYS.STUDIES, JSON.stringify(DEFAULT_STUDIES));
    return DEFAULT_STUDIES;
  }
  return JSON.parse(stored);
};

export const saveLocalStudy = (study: Omit<Study, 'id'>): Study => {
  const studies = getLocalStudies();
  const newStudy = { ...study, id: Date.now() };
  studies.push(newStudy);
  localStorage.setItem(STORAGE_KEYS.STUDIES, JSON.stringify(studies));
  return newStudy;
};

export const getLocalParticipants = (studyId: number): Participant[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(`${STORAGE_KEYS.PARTICIPANTS}${studyId}`);
  return stored ? JSON.parse(stored) : [];
};

export const saveLocalParticipants = (studyId: number, participants: Participant[]) => {
  localStorage.setItem(`${STORAGE_KEYS.PARTICIPANTS}${studyId}`, JSON.stringify(participants));
};

export const processCSV = (file: File): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results: Papa.ParseResult<any>) => resolve(results.data),
      error: (error: Error) => reject(error),
    });
  });
};

export const calculateAnalytics = (participants: Participant[]): AnalyticsData => {
  const total = participants.length;
  const numeric: Record<string, { sum: number; min: number; max: number; count: number }> = {};
  const categorical: Record<string, Record<string, number>> = {};
  const enrollmentMap: Record<string, number> = {};

  participants.forEach((p) => {
    Object.entries(p).forEach(([key, value]) => {
      if (key === 'id') return;

      // Numeric check
      if (typeof value === 'number') {
        if (!numeric[key]) numeric[key] = { sum: 0, min: value, max: value, count: 0 };
        numeric[key].sum += value;
        numeric[key].min = Math.min(numeric[key].min, value);
        numeric[key].max = Math.max(numeric[key].max, value);
        numeric[key].count++;
      } 
      // Categorical check (string values)
      else if (typeof value === 'string') {
        if (!categorical[key]) categorical[key] = {};
        categorical[key][value] = (categorical[key][value] || 0) + 1;
        
        // Specific check for visit_date or similar to track enrollment
        if (key.toLowerCase().includes('date')) {
            const date = new Date(value);
            if (!isNaN(date.getTime())) {
                const month = date.toLocaleString('default', { month: 'short', year: 'numeric' });
                enrollmentMap[month] = (enrollmentMap[month] || 0) + 1;
            }
        }
      }
    });
  });

  const numericMetrics: Record<string, any> = {};
  Object.entries(numeric).forEach(([key, stats]) => {
    numericMetrics[key] = {
      avg: stats.sum / stats.count,
      min: stats.min,
      max: stats.max,
      count: stats.count
    };
  });

  const enrollment_trend = Object.entries(enrollmentMap).map(([month, count]) => ({
    month,
    participants: count
  })).sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime());

  return {
    total_participants: total,
    numeric_metrics: numericMetrics,
    categorical_metrics: categorical,
    enrollment_trend
  };
};
