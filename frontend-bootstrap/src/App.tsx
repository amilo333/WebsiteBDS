import { Navigate, Route, Routes } from 'react-router-dom'
import { ProjectDetailPage } from './pages/ProjectDetailPage'

function App() {
  return (
    <Routes>
      <Route path="/du-an/vinhomes-ocean-park-3" element={<ProjectDetailPage />} />
      <Route path="*" element={<Navigate replace to="/du-an/vinhomes-ocean-park-3" />} />
    </Routes>
  )
}

export default App
