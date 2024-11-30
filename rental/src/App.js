import Home from './Components/Home';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Admin from './pages/Admin';
import TenantDashboard from './pages/TenantDashboard'
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/admin" element={<Admin/>} />
          <Route path="/tenant" element={<TenantDashboard/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
