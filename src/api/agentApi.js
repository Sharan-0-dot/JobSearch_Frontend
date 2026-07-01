import { apiRequest } from './client'

export const sendQuery = (userId, query) =>
  apiRequest('/agent/query', { method: 'POST', body: { userId, query } })

export const clearMemory = (userId) =>
  apiRequest(`/agent/memory/${userId}`, { method: 'DELETE' })

export const getTraces = (userId, page = 0, size = 20) =>
  apiRequest(`/agent/trace/${userId}`, { params: { page, size } })