import { useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { createApi } from "unsplash-js"
import Game from "./components/Game"
import Home from "./components/Home"

const unsplashApi = createApi({
  accessKey: process.env.REACT_APP_UNSPLASH_API_KEY,
})

function App() {
  useEffect(() => {
    document.title = "NY or TO"
  }, [])
  return (
    <Router>
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/game" element={<Game api={unsplashApi} />} />
      </Routes>
    </Router>
  )
}

export default App
