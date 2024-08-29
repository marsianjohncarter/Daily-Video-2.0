import React, { useRef, useState, useEffect } from 'react';

const Player = ({ videoUrl }) => {
    const videoRef = useRef(null);
    const progressBarRef = useRef(null);
    const controlsRef = useRef(null);
    const timeoutRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [currentTime, setCurrentTime] = useState(':00');
    const [duration, setDuration] = useState(':00');
    const [volume, setVolume] = useState(1);
    const [prevVolume, setPrevVolume] = useState(1);

    const togglePlayPause = () => {
        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    const handleTimeUpdate = () => {
        const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
        progressBarRef.current.value = progress;
        setCurrentTime(formatTime(videoRef.current.currentTime));
    };

    const handleProgressBarChange = () => {
        const newTime = (progressBarRef.current.value / 100) * videoRef.current.duration;
        videoRef.current.currentTime = newTime;
    };

    const handleVolumeToggle = () => {
        if (videoRef.current.muted) {
            videoRef.current.muted = false;
            setIsMuted(false);
            setVolume(prevVolume);
        } else {
            setPrevVolume(volume);
            videoRef.current.muted = true;
            setIsMuted(true);
            setVolume(0);
        }
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        videoRef.current.volume = newVolume;
        setVolume(newVolume);
        if (newVolume === 0) {
            setIsMuted(true);
        } else {
            setIsMuted(false);
        }
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            videoRef.current.parentElement.requestFullscreen();
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    };

    const formatTime = (time) => {
        const hours = Math.floor(time / 3600).toString().padStart(2, '0');
        const minutes = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
        const seconds = Math.floor(time % 60).toString().padStart(2, '0');
        if (hours === '00') {
            if (minutes === '00') {
                return `:${seconds}`;
            }
            return `${minutes}:${seconds}`;
        }
        return `${hours}:${minutes}:${seconds}`;
    };

    const handleLoadedMetadata = () => {
        setDuration(formatTime(videoRef.current.duration));
    };

    const showControlsHandler = () => {
        setShowControls(true);
        resetTimeout();
    };

    const hideControlsHandler = () => {
        setShowControls(false);
    };

    const resetTimeout = () => {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
            if (!controlsRef.current.contains(document.activeElement)) {
                hideControlsHandler();
            }
        }, 2000);
    };

    useEffect(() => {
        const handleMouseMoveVideo = () => {
            showControlsHandler();
            resetTimeout();
        };

        const handleMouseLeaveVideo = () => {
            resetTimeout();
        };

        videoRef.current.addEventListener('mousemove', handleMouseMoveVideo);
        videoRef.current.addEventListener('mouseleave', handleMouseLeaveVideo);
        videoRef.current.addEventListener('click', togglePlayPause);
        videoRef.current.addEventListener('dblclick', toggleFullscreen);
        videoRef.current.addEventListener('ended', () => setIsPlaying(false), false);

        return () => {
            videoRef.current.removeEventListener('mousemove', handleMouseMoveVideo);
            videoRef.current.removeEventListener('mouseleave', handleMouseLeaveVideo);
        };
    }, []);

    return (
        <div className="relative -z-0 max-w-xl mx-auto bg-black rounded-lg overflow-hidden m-5">
            <video
                ref={videoRef}
                src={videoUrl}
                className="w-full aspect-video rounded-lg"
                onTimeUpdate={handleTimeUpdate} 
                onLoadedMetadata={handleLoadedMetadata}
                controlsList="nodownload"
            ></video>
            <div
                ref={controlsRef}
                className={`absolute bottom-0 left-0 right-4 w-full flex items-center p-2 bg-opacity-60 bg-black transition-opacity duration-300 ${
                    showControls ? 'opacity-100' : 'opacity-0'
                }`} 
            >
                <button
                    onClick={togglePlayPause}
                    className="w-1/12 h-8 bg-no-repeat bg-center bg-contain mr-4 flex justify-center items-center"
                    style={{
                        backgroundImage: isPlaying ? `url('pause-icon.png')` : `url('play-icon.png')`,
                    }}
                >{isPlaying ? '⏸️' : '▶️'}</button>
                <span className="text-white mr-4 text-xs">
                    {currentTime}/{duration}
                </span>
                <input
                    ref={progressBarRef}
                    type="range"
                    className="flex-1 h-1 w-1/2 bg-white rounded-full mr-4"
                    min="0"
                    max="100"
                    defaultValue="0"
                    onChange={handleProgressBarChange}
                />
  
                <input
                    type="range"
                    className="h-1 w-24 bg-white rounded-full mr-2"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                />
                <span className="text-white text-xs mr-2">{Math.round(volume * 100)}%</span>
                <button
                    onClick={toggleFullscreen}
                    className="w-1/12 h-8 bg-no-repeat bg-center bg-contain flex items-center justify-center"
                    style={{ backgroundImage: `url('fullscreen-icon.png')` }}
                >⛶</button>
            </div>
        </div>
    );
};

export default Player;
