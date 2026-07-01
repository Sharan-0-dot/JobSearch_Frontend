import { apiRequest } from './client'

export const uploadResume = (userId, file) => {
  const formData = new FormData()
  formData.append('userId', userId)
  formData.append('file', file)
  return apiRequest('/resume/upload', { method: 'POST', body: formData, isMultipart: true })
}

export const analyzeResume = (jobId, userId) =>
  apiRequest(`/resume/analyze/${jobId}`, { method: 'POST', params: { userId } })

export const getResumeAnalysis = async (jobId, userId) => {
  try {
    return await apiRequest(`/resume/analysis/${jobId}`, { params: { userId } })
  } catch (err) {
    if (err.status === 404) return null
    throw err
  }
}