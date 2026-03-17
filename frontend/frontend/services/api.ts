/* =========================================================
   API CONFIGURATION
   Central base URL for backend communication
========================================================= */

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8001"

/* =========================================================
   GENERIC API REQUEST HELPER
   - Handles fetch
   - Adds headers
   - Centralized error handling
========================================================= */

async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {

  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      "Content-Type": "application/json"
    },
    ...options
  })

  if (!res.ok) {
    const errorText = await res.text()
    console.error("API ERROR:", res.status, errorText)

    throw new Error(`API failed: ${res.status}`)
  }

  return res.json()
}

/* =========================================================
   TYPES: STUDY
========================================================= */

export interface Study {
  id: number
  title: string
  description: string
  principal_investigator: string
}

export interface CreateStudyPayload {
  title: string
  description: string
  principal_investigator: string
}

/* =========================================================
   TYPES: PARTICIPANT
========================================================= */

export interface Participant {
  id: number
  external_id?: string
  visit_date?: string
  gender?: string

  // ✅ THIS FIXES EVERYTHING
  [key: string]: string | number | null | undefined
}

/* =========================================================
   TYPES: ANALYTICS
========================================================= */

export interface MetricSummary {
  metric_name: string
  average: number
  count: number
}

export interface GenderData {
  male: number
  female: number
}

export interface EnrollmentPoint {
  month: string
  participants: number
}

export interface NumericMetric {
  avg: number
  min: number
  max: number
  count: number
}
export interface AnalyticsData {
  total_participants: number
  numeric_metrics: Record<string, {
    avg: number
    min: number
    max: number
    count: number
  }>
  categorical_metrics: Record<string, Record<string, number>>
  enrollment_trend: {
    month: string
    participants: number
  }[]
}

/* =========================================================
   STUDY APIs
========================================================= */

/**
 * Fetch all studies
 */
export function getStudies(): Promise<Study[]> {
  return apiRequest("/studies")
}

/**
 * Create a new study
 */
export function createStudy(
  data: CreateStudyPayload
): Promise<Study> {

  return apiRequest("/studies", {
    method: "POST",
    body: JSON.stringify(data)
  })
}

/* =========================================================
   ANALYTICS APIs
========================================================= */

/**
 * Fetch analytics for a specific study
 * Backend route: /analytics/study/{studyId}
 */
export function getAnalytics(
  studyId: number
): Promise<AnalyticsData> {

  return apiRequest(`/analytics/study/${studyId}`)
}

/* =========================================================
   PARTICIPANT APIs
========================================================= */

/**
 * Fetch participants for a study
 * Backend route: /participants/study/{studyId}
 */
export async function getParticipants(studyId: number) {
  const res = await fetch(`${API_BASE}/participants/study/${studyId}/detailed`)
  return res.json()
}

/* =========================================================
   DATASET UPLOAD
========================================================= */

/**
 * Upload CSV dataset for a study
 */
export async function uploadDataset(
  studyId: number,
  file: File
) {

  const formData = new FormData()
  formData.append("file", file)

  const res = await fetch(
    `${API_BASE}/upload/${studyId}`,
    {
      method: "POST",
      body: formData
    }
  )

  if (!res.ok) {
    const errorText = await res.text()
    console.error("UPLOAD ERROR:", res.status, errorText)

    throw new Error("Upload failed")
  }

  return res.json()
}