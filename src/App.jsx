import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import { ToastProvider } from './hooks/useToast'
import IdentityGate from './components/identity/IdentityGate'
import AppShell from './components/layout/AppShell'
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
        <IdentityGate>
          <BrowserRouter>
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
          </BrowserRouter>
        </IdentityGate>
        <ToastContainer />
      </ToastProvider>
    </UserProvider>
  )
}

export default App