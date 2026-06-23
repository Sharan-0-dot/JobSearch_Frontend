import { apiRequest } from './client'

export const createOrUpdateProfile = (profileFields) =>
  apiRequest('/api/profile', { method: 'POST', body: profileFields })

export const getProfile = (userId) =>
  apiRequest(`/api/profile/${userId}`)