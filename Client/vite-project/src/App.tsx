import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './sections/Dashboard'
import Home from './sections/Home'
import MemberList from './components/MemberList'
// import Users from './sections/Users'
// import Settings from './sections/Settings'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />}>
          <Route path="/Home" element={<Home />} />
          <Route path="/Users" element={<MemberList />} />
          {/* <Route path="/Settings" element={<Settings />} /> */}
        </Route>
      </Routes>
    </Router>
  )
}

export default App
