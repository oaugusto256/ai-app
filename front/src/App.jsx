import { useState } from 'react'
import './App.css'

function App() {
  const [caption, setCaption] = useState('')

  return (
    <div className="container">
      <h1>Caption Generator</h1>
      <div className="controls">
        <input
          type="text"
          placeholder="Describe your image..."
          className="caption-input"
        />
        <button className="generate-btn">Generate</button>
      </div>
      <div className="caption-output">
        {caption && <p>{caption}</p>}
      </div>
    </div>
  )
}

export default App
