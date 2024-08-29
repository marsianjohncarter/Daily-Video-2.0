import { useRoutes, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import Home from './pages/home';
import Add from "./pages/add";
import VideoPlayer from "./pages/video-player";
import AppBar from "./components/appbar/appbar";
import Footer from "./components/footer/footer";
import Player from "./components/player/player";
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <AppBar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add" element={<Add />} />
      <Route path="/video/:id" element={<Player />}></Route>
    </Routes>
    
    <Player videoUrl="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm" />
    <Footer />
    </>
  )
}

export default App
