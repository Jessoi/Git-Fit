import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [launchDetail, setLaunchDetail] = useState(null)

  useEffect( () => { async function testData() {
    const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_HOST}/api/launch-details/`)
    console.log(response)
    if (response.ok) {
      const data = await response.json()
      setLaunchDetail(data.launch_details)
      console.log(data.launch_details)
    }
    else {
      console.log("error")
    }
  }
  testData()
  }, [])



  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
