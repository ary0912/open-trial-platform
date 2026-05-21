import { 
  getLocalStudies, 
  saveLocalStudy, 
  getLocalParticipants, 
  saveLocalParticipants, 
  processCSV, 
  calculateAnalytics,
  Study,
  Participant,
  AnalyticsData,
  CreateStudyPayload
} from './localBackend';

/* =========================================================
   TYPES RE-EXPORTED FOR COMPATIBILITY
   ========================================================= */

export type { Study, Participant, AnalyticsData, CreateStudyPayload };

/* =========================================================
   STUDY APIs
   ========================================================= */

/**
 * Fetch all studies from local storage
 */
export async function getStudies(): Promise<Study[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return getLocalStudies();
}

/**
 * Create a new study in local storage
 */
export async function createStudy(data: CreateStudyPayload): Promise<Study> {
  await new Promise(resolve => setTimeout(resolve, 500));
  return saveLocalStudy(data);
}

/* =========================================================
   ANALYTICS APIs
   ========================================================= */

/**
 * Fetch analytics for a specific study from local data
 */
export async function getAnalytics(studyId: number): Promise<AnalyticsData> {
  await new Promise(resolve => setTimeout(resolve, 400));
  const participants = getLocalParticipants(studyId);
  return calculateAnalytics(participants);
}

/* =========================================================
   PARTICIPANT APIs
   ========================================================= */

/**
 * Fetch participants for a study from local data
 */
export async function getParticipants(studyId: number): Promise<Participant[]> {
  await new Promise(resolve => setTimeout(resolve, 300));
  return getLocalParticipants(studyId);
}

/* =========================================================
   DATASET UPLOAD
   ========================================================= */

/**
 * "Upload" (parse and save) CSV dataset for a study locally
 */
export async function uploadDataset(studyId: number, file: File): Promise<{ message: string; count: number }> {
  try {
    const data = await processCSV(file);
    
    // Transform data to ensure they have an ID or use index
    const participants: Participant[] = data.map((row, index) => ({
      id: index + 1,
      ...row
    }));

    saveLocalParticipants(studyId, participants);

    return {
      message: "Successfully processed dataset locally",
      count: participants.length
    };
  } catch (error) {
    console.error("Local processing error:", error);
    throw new Error("Failed to process CSV file locally");
  }
}