import { apiRequest } from './client'

export const submitFeedback = (feedback) =>
  apiRequest('/feedback', { method: 'POST', body: feedback })

export const getFeedback = (userId) =>
  apiRequest(`/feedback/${userId}`)

export const getLikedFeedback = (userId) =>
  apiRequest(`/feedback/${userId}/liked`)

export const getAppliedFeedback = (userId) =>
  apiRequest(`/feedback/${userId}/applied`)