import Home from './Components/Home';
import {BrowserRouter, Navigate, Router, Routes, Route } from 'react-router-dom'
import Admin from './pages/Admin';
import TenantDashboard from './pages/TenantDashboard'
import ContactPage from './pages/ContactPage'
import ProtectedRoute from './Components/ProtectedRoute';
import Login from "./pages/Login"
import Unauthorized from "./pages/Unauthorized"
import NotFound from "./pages/NotFound"
import { AuthProvider } from './Components/admin/AuthProvider';


function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
      <Routes>
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Admin/>
            </ProtectedRoute>  
          }
        />
        <Route
          path="/tenant"
          element={
            <ProtectedRoute allowedRoles={['tenant']}>
              <TenantDashboard/>
            </ProtectedRoute>  
          }
        />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="unauthorized" element={<Unauthorized />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App;


