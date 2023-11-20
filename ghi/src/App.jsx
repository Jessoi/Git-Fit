import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './HomePage'
import Nav from './Nav'

function App() {
  return (
    <>
      <BrowserRouter>
      <Nav />
        <div>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
