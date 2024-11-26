import { BrowserRouter as Router } from 'react-router-dom'
import Dashboard from './sections/Dashboard'
// import './App.css'

function App() {
  return (
    <Router>
      <div>
        {/* <Header /> */}
        <Dashboard />
      </div>
    </Router>
  )
}

export default App
