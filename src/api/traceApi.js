import { apiRequest } from './client'

export const getTraceById = async (traceId) => {
  try {
    return await apiRequest(`/trace/${traceId}`)
  } catch (err) {
    if (err.status === 404) return null
    throw err
  }
}