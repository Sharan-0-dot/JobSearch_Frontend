const BASE_URL = import.meta.env.VITE_API_BASE_URL

export async function apiRequest(path, { method = 'GET', body, isMultipart = false, params } = {}) {
  const url = new URL(BASE_URL + path)
  if (params) {
    Object.entries(params).forEach(([k, v]) => v != null && url.searchParams.set(k, v))
  }

  const options = { method, headers: {} }

  if (body && !isMultipart) {
    options.headers['Content-Type'] = 'application/json'
    options.body = JSON.stringify(body)
  } else if (body && isMultipart) {
    options.body = body
  }

  const res = await fetch(url, options)

  if (!res.ok) {
    let errorBody
    try {
      errorBody = await res.json()
    } catch {
      errorBody = { error: 'Request failed', message: res.statusText }
    }
    throw { status: res.status, ...errorBody }
  }

  if (res.status === 204) return null

  const text = await res.text()
  return text ? JSON.parse(text) : null
}