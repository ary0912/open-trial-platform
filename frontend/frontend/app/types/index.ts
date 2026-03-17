export interface AnalyticsData {
  total_participants: number
  male: number
  female: number
  avg_blood_pressure: number
}

export interface EnrollmentData {
  month: string
  participants: number
}

export interface Participant {
  id: number
  gender: string
  blood_pressure: number
  visit_date: string
}

export interface Study {
  id: number
  title: string
  description: string
  principal_investigator: string
}