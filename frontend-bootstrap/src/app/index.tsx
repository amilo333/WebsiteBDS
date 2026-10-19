import { Navigate, Route, Routes } from 'react-router'
import { ProjectDetailPage } from '../pages/project-detail'

function App() {
  return (
    <Routes>
      <Route path="/du-an/vinhomes-ocean-park-3" element={<ProjectDetailPage />} />
      <Route path="*" element={<Navigate replace to="/du-an/vinhomes-ocean-park-3" />} />
    </Routes>
  )
}

export default App
