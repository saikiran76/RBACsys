import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import Dashboard from './sections/Dashboard'
import Home from './sections/Home'
import MemberList from './components/MemberList'
import ErrorFallback from './components/ErrorFallback'
import Login from './pages/Login'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import { ThemeProvider } from './context/ThemeContext';
import { SidebarProvider } from './context/SidebarContext';

function App() {
  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.reload()}
    >
      <AuthProvider>
        <ThemeProvider>
          <SidebarProvider>
            <Router>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Navigate to="/home" replace />} />
                
                <Route path="/" element={<ProtectedRoute element={<Dashboard />} />}>
                  <Route path="/home" element={<Home />} />
                  <Route path="/users" element={<MemberList />} />
                </Route>
              </Routes>
            </Router>
          </SidebarProvider>
        </ThemeProvider>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App
