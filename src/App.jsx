import { useRoutes, Routes, Route } from "react-router-dom";
import { useState } from 'react';
import Home from './pages/home';
import Add from "./pages/add";
import VideoPlayer from "./pages/video-player";
import AppBar from "./components/appbar/appbar";
import Footer from "./components/footer/footer";
import Player from "./components/player/player";
import './App.css'

const videos = [
  {
    username: "user1",
    name: "Video 1",
    url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
    date: "2022-01-01",
  },
  {
    username: "user2",
    name: "Video 2",
    url: "https://www.w3schools.com/tags/movie.mp4",
    date: "2022-01-01",
  },
  {
    username: "user3",
    name: "Video 3",
    url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
    date: "2022-01-01",
  },
  {
    username: "user4",
    name: "Video 4",
    url: "https://www.w3schools.com/tags/movie.mp4",
    date: "2022-01-01",
  },
  {
    username: "user5",
    name: "Video 1",
    url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
    date: "2022-01-01",
  },
  {
    username: "user6",
    name: "Video 2",
    url: "https://www.w3schools.com/tags/movie.mp4",
    date: "2022-01-01",
  },
  {
    username: "user7",
    name: "Video 3",
    url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
    date: "2022-01-01",
  },
  {
    username: "user8",
    name: "Video 4",
    url: "https://www.w3schools.com/tags/movie.mp4",
    date: "2022-01-01",
  },
  {
    username: "user9",
    name: "Video 1",
    url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
    date: "2022-01-01",
  },
  {
    username: "user10",
    name: "Video 2",
    url: "https://www.w3schools.com/tags/movie.mp4",
    date: "2022-01-01",
  },
  {
    username: "user11",
    name: "Video 3",
    url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
    date: "2022-01-01",
  },
  {
    username: "user12",
    name: "Video 4",
    url: "https://www.w3schools.com/tags/movie.mp4",
    date: "2022-01-01",
  },
];



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <AppBar />
    <Routes>
      <Route path="/" element={<Home videos={videos} />} />
      <Route path="/add" element={<Add />} />
      <Route path="/video/:id" element={<VideoPlayer videos={videos} />}></Route>
    </Routes>
    <Footer />
    </>
  )
}

export default App
