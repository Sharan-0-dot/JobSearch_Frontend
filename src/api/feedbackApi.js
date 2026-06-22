import { apiRequest } from './client'

export const submitFeedback = (feedback) =>
  apiRequest('/api/feedback', { method: 'POST', body: feedback })

export const getFeedback = (userId) =>
  apiRequest(`/api/feedback/${userId}`)

export const getLikedFeedback = (userId) =>
  apiRequest(`/api/feedback/${userId}/liked`)

export const getAppliedFeedback = (userId) =>
  apiRequest(`/api/feedback/${userId}/applied`)