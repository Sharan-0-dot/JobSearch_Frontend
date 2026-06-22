import { createContext, useContext, useState, useCallback } from 'react'

const STORAGE_KEY = 'jsa_user_id'

const UserContext = createContext(null)

export function UserProvider({ children }) {
  const [userId, setUserId] = useState(() => {
    return localStorage.getItem(STORAGE_KEY) || null
  })

  const setUser = useCallback((id) => {
    localStorage.setItem(STORAGE_KEY, id)
    setUserId(id)
  }, [])

  const clearUser = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setUserId(null)
  }, [])

  return (
    <UserContext.Provider value={{ userId, setUser, clearUser }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const ctx = useContext(UserContext)
  if (!ctx) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return ctx
}