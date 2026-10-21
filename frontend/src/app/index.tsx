import { Navigate, Route, Routes } from 'react-router'
import { ProtectedRoute } from '../modules/auth'
import { ChangePasswordPage } from '../pages/change-password'
import { LoginPage } from '../pages/login'
import { ProjectDetailPage } from '../pages/project-detail'

function App() {
  return (
    <Routes>
      <Route path="/du-an/vinhomes-ocean-park-3" element={<ProjectDetailPage />} />
      <Route path="/dang-nhap" element={<LoginPage />} />
      <Route
        path="/doi-mat-khau"
        element={(
          <ProtectedRoute>
            <ChangePasswordPage />
          </ProtectedRoute>
        )}
      />
      <Route path="*" element={<Navigate replace to="/du-an/vinhomes-ocean-park-3" />} />
    </Routes>
  )
}

export default App
