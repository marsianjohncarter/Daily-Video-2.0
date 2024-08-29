import React, { useRef, useState, useEffect } from 'react';

const Player = ({ videoUrl }) => {
    const videoRef = useRef(null);
    const progressBarRef = useRef(null);
    const controlsRef = useRef(null);
    const timeoutRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [currentTime, setCurrentTime] = useState('00:00');
    const [duration, setDuration] = useState('00:00');

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
        videoRef.current.muted = !videoRef.current.muted;
        setIsMuted(videoRef.current.muted);
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

        return hours > 0 ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
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
        timeoutRef.current = setTimeout(hideControlsHandler, 1000);
    };

    useEffect(() => {
        const handleMouseMove = () => {
            showControlsHandler();
        };

        videoRef.current.addEventListener('mousemove', handleMouseMove);
        controlsRef.current.addEventListener('mousemove', handleMouseMove);

        return () => {
            videoRef.current.removeEventListener('mousemove', handleMouseMove);
            controlsRef.current.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    useEffect(() => {
        const handleMouseLeave = () => {
            resetTimeout();
        };

        videoRef.current.addEventListener('mouseleave', hideControlsHandler);
        controlsRef.current.addEventListener('mouseleave', hideControlsHandler);

        return () => {
            videoRef.current.removeEventListener('mouseleave', hideControlsHandler);
            controlsRef.current.removeEventListener('mouseleave', hideControlsHandler);
        };
    }, []);

    return (
        <div className="relative max-w-xl mx-auto bg-black rounded-lg overflow-hidden">
            <video
                ref={videoRef}
                src={videoUrl}
                className="w-full h-auto rounded-lg"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                controlsList="nodownload"
            ></video>
            <div
                ref={controlsRef}
                className={`absolute bottom-0 left-0 w-full flex items-center p-4 bg-opacity-60 bg-black transition-opacity duration-300 ${
                    showControls ? 'opacity-100' : 'opacity-0'
                }`}
            >
                <button
                    onClick={togglePlayPause}
                    className="w-8 h-8 bg-no-repeat bg-center bg-contain mr-4"
                    style={{
                        backgroundImage: isPlaying ? `url('pause-icon.png')` : `url('play-icon.png')`,
                    }}
                ></button>
                <span className="text-white text-sm mr-4">
                    {currentTime}/{duration}
                </span>
                <input
                    ref={progressBarRef}
                    type="range"
                    className="flex-1 h-1 bg-white rounded-full mr-4"
                    min="0"
                    max="100"
                    defaultValue="0"
                    onChange={handleProgressBarChange}
                />
                <button
                    onClick={handleVolumeToggle}
                    className="w-8 h-8 bg-no-repeat bg-center bg-contain mr-4"
                    style={{
                        backgroundImage: isMuted ? `url('muted-icon.png')` : `url('volume-icon.png')`,
                    }}
                ></button>
                <button
                    onClick={toggleFullscreen}
                    className="w-8 h-8 bg-no-repeat bg-center bg-contain"
                    style={{ backgroundImage: `url('fullscreen-icon.png')` }}
                ></button>
            </div>
        </div>
    );
};

export default Player;
