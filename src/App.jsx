import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import { ToastProvider } from './hooks/useToast'
import IdentityGate from './components/identity/IdentityGate'
import AppShell from './components/layout/AppShell'
import LandingPage from './components/shared/LandingPage'
import ChatPage from './components/agent/ChatPage'
import JobsListPage from './components/jobs/JobsListPage'
import JobDetailPage from './components/jobs/JobDetailPage'
import ProfilePage from './components/profile/ProfilePage'
import ResumeUploadPage from './components/uploads/ResumeUploadPage'
import NotFoundPage from './pages/NotFoundPage'
import ToastContainer from './components/shared/Toast'

function App() {
  return (
    <UserProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />

            <Route
              path="/app/*"
              element={
                <IdentityGate>
                  <Routes>
                    <Route element={<AppShell />}>
                      <Route index element={<ChatPage />} />
                      <Route path="jobs" element={<JobsListPage />} />
                      <Route path="jobs/:id" element={<JobDetailPage />} />
                      <Route path="profile" element={<ProfilePage />} />
                      <Route path="resume" element={<ResumeUploadPage />} />
                      <Route path="*" element={<NotFoundPage />} />
                    </Route>
                  </Routes>
                </IdentityGate>
              }
            />

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer />
      </ToastProvider>
    </UserProvider>
  )
}

export default App