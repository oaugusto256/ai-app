import { useState } from 'react'
import './App.css'
import { generateCaption } from './models/api'

function App() {
  const [imageUrl, setImageUrl] = useState('')
  const [caption, setCaption] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleGenerate() {
    if (!imageUrl) return
    setLoading(true)
    setCaption('')
    try {
      const result = await generateCaption(imageUrl)
      setCaption(result)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <h1>Caption Generator</h1>
      <div className="controls">
        <input
          type="text"
          placeholder="Paste image URL..."
          className="caption-input"
          value={imageUrl}
          onChange={(e) => { setImageUrl(e.target.value); setCaption('') }}
        />
        <button
          className="generate-btn"
          onClick={handleGenerate}
          disabled={!imageUrl || loading}
        >
          {loading ? 'Generating...' : 'Generate'}
        </button>
      </div>
      {imageUrl && (
        <div className="caption-output">
          <img src={imageUrl} alt="source" className="source-image" />
          <p className="caption-label">{caption || 'Caption will appear here...'}</p>
        </div>
      )}
    </div>
  )
}

export default App
