import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage/>} />

          {/* <Route path="/" element={<Navigate to="/google" replace />} />
          <Route path="/google" element={<Home />} />
          <Route path="/youtube" element={<Youtube />} />
          <Route path="/docs" element={<Docs />} />
          <Route path="/shorts" element={<Shorts />} />
          <Route path="/gmail" element={<Gmail />} />
          <Route path="/drive" element={<Drive />} />
          <Route path="/about" element={<About />} />
          <Route path="/classroom" element={<Classroom />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
