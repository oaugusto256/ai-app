import { useState } from 'react'
import './App.css'
import { generateCaption, translateCaption, generateAudio } from './models/api'

function App() {
  const [imageUrl, setImageUrl] = useState('')
  const [caption, setCaption] = useState('')
  const [translatedCaption, setTranslatedCaption] = useState('')
  const [audioUrl, setAudioUrl] = useState('')
  const [loadingCaption, setLoadingCaption] = useState(false)
  const [loadingTranslation, setLoadingTranslation] = useState(false)
  const [loadingAudio, setLoadingAudio] = useState(false)

  const loading = loadingCaption || loadingTranslation || loadingAudio

  async function handleGenerate() {
    if (!imageUrl) return
    setCaption('')
    setTranslatedCaption('')
    setAudioUrl('')

    try {
      setLoadingCaption(true)
      const result = await generateCaption(imageUrl)
      setCaption(result)
      setLoadingCaption(false)

      setLoadingTranslation(true)
      const translated = await translateCaption(result)
      setTranslatedCaption(translated)
      setLoadingTranslation(false)

      setLoadingAudio(true)
      const audio = await generateAudio(translated)
      setAudioUrl(audio)
      setLoadingAudio(false)
    } catch (err) {
      console.error(err)
      setLoadingCaption(false)
      setLoadingTranslation(false)
      setLoadingAudio(false)
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

          {loadingCaption
            ? <div className="skeleton skeleton-text" />
            : <p className="caption-label">{caption || 'Caption will appear here...'}</p>
          }

          {loadingTranslation
            ? <div className="skeleton skeleton-text skeleton-text--short" />
            : translatedCaption && <p className="caption-label caption-translated">{translatedCaption}</p>
          }

          {loadingAudio
            ? <div className="skeleton skeleton-audio" />
            : audioUrl && <audio className="audio-player" src={audioUrl} controls />
          }
        </div>
      )}
    </div>
  )
}

export default App
