import { useState, useEffect } from 'react'

export function useApi(apiFn, deps = []) {
  const [state, setState] = useState({ data: null, loading: true, error: null })

  useEffect(() => {
    let active = true
    setState((s) => ({ ...s, loading: true, error: null }))
    apiFn()
      .then((data) => active && setState({ data, loading: false, error: null }))
      .catch((error) => active && setState({ data: null, loading: false, error }))
    return () => { active = false }
  }, deps)

  return state
}