import { apiRequest } from './client'

export const getJobs = (page = 0, size = 20) =>
  apiRequest('/jobs', { params: { page, size } })

export const getJobById = (id) =>
  apiRequest(`/jobs/${id}`)

export const searchJobsByKeyword = (keyword) =>
  apiRequest('/jobs/search', { params: { keyword } })

export const searchJobsByLocation = (location) =>
  apiRequest('/jobs/location', { params: { location } })

export const searchJobsByCompany = (name) =>
  apiRequest('/jobs/company', { params: { name } })

export const searchJobsByType = (employmentType) =>
  apiRequest('/jobs/type', { params: { employmentType } })