import { apiRequest } from './client'

export const getJobs = (page = 0, size = 20) =>
  apiRequest('/api/jobs', { params: { page, size } })

export const getJobById = (id) =>
  apiRequest(`/api/jobs/${id}`)

export const searchJobsByKeyword = (keyword) =>
  apiRequest('/api/jobs/search', { params: { keyword } })

export const searchJobsByLocation = (location) =>
  apiRequest('/api/jobs/location', { params: { location } })

export const searchJobsByCompany = (name) =>
  apiRequest('/api/jobs/company', { params: { name } })

export const searchJobsByType = (employmentType) =>
  apiRequest('/api/jobs/type', { params: { employmentType } })