import { apiRequest } from './client'

export const createOrUpdateProfile = (profileFields) =>
  apiRequest('/profile', { method: 'POST', body: profileFields })

export const getProfile = (userId) =>
  apiRequest(`/profile/${userId}`)