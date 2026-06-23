import { useState, useCallback } from 'react'
import { useApi } from '../../hooks/useApi'
import { getJobs, searchJobsByKeyword, searchJobsByLocation, searchJobsByCompany, searchJobsByType } from '../../api/jobsApi'
import JobCard from './JobCard'
import JobFilterBar from './JobFilterBar'
import Pagination from '../shared/Pagination'
import EmptyState from '../shared/EmptyState'
import ErrorState from '../shared/ErrorState'
import Spinner from '../shared/Spinner'

const filterFns = {
  keyword: searchJobsByKeyword,
  location: searchJobsByLocation,
  company: searchJobsByCompany,
  type: searchJobsByType,
}

export default function JobsListPage() {
  const [page, setPage] = useState(0)
  const [filtered, setFiltered] = useState(null)
  const [filterLoading, setFilterLoading] = useState(false)
  const [filterError, setFilterError] = useState(null)
  const [lastFilter, setLastFilter] = useState(null)

  const { data, loading, error, refetch } = useApi(() => getJobs(page, 20), [page])

  const handleFilter = useCallback(async (type, value) => {
    setLastFilter({ type, value })
    setFilterLoading(true)
    setFilterError(null)
    try {
      const results = await filterFns[type](value)
      setFiltered(results)
    } catch (err) {
      setFilterError(err)
      setFiltered([])
    } finally {
      setFilterLoading(false)
    }
  }, [])

  const retryFilter = useCallback(() => {
    if (lastFilter) handleFilter(lastFilter.type, lastFilter.value)
  }, [lastFilter, handleFilter])

  const handleClearFilter = useCallback(() => {
    setFiltered(null)
    setFilterError(null)
  }, [])

  const showingFiltered = filtered !== null
  const jobs = showingFiltered ? filtered : data?.content
  const isLoading = showingFiltered ? filterLoading : loading
  const currentError = showingFiltered ? filterError : error

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <JobFilterBar onFilter={handleFilter} onClear={handleClearFilter} />

      {!isLoading && currentError && (
        <ErrorState error={currentError} onRetry={showingFiltered ? retryFilter : refetch} />
      )}

      {isLoading && (
        <div className="flex justify-center py-16">
          <Spinner size={24} className="text-ink-muted" />
        </div>
      )}

      {!isLoading && currentError && (
        <ErrorState error={currentError} onRetry={showingFiltered ? undefined : refetch} />
      )}

      {!isLoading && !currentError && jobs?.length === 0 && (
        <EmptyState
          title="No jobs found"
          description={showingFiltered ? 'Try a different filter or clear it to browse all jobs.' : 'Check back soon, or try the agent chat to fetch fresh listings.'}
        />
      )}

      {!isLoading && !currentError && jobs?.length > 0 && (
        <div className="flex flex-col gap-3">
          {jobs.map((job) => <JobCard key={job.id} job={job} />)}
        </div>
      )}

      {!showingFiltered && !isLoading && !currentError && (
        <Pagination page={data} onPageChange={setPage} />
      )}
    </div>
  )
}