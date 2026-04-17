import { useState } from 'react'
import './App.css'
import { generateCaption, translateCaption, generateAudio } from './models/api'

function App() {
  const [imageUrl, setImageUrl] = useState('')
  const [caption, setCaption] = useState('')
  const [translatedCaption, setTranslatedCaption] = useState('')
  const [audioUrl, setAudioUrl] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleGenerate() {
    if (!imageUrl) return
    setLoading(true)
    setCaption('')
    setTranslatedCaption('')
    setAudioUrl('')
    try {
      const result = await generateCaption(imageUrl)
      setCaption(result)
      const translated = await translateCaption(result)
      setTranslatedCaption(translated)
      const audio = await generateAudio(translated)
      setAudioUrl(audio)
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
          {translatedCaption && <p className="caption-label caption-translated">{translatedCaption}</p>}
          {audioUrl && <audio className="audio-player" src={audioUrl} controls />}
        </div>
      )}
    </div>
  )
}

export default App
