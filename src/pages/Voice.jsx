import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Mic, SkipBack, SkipForward, Download, Share2, Volume2 } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import './Voice.css';

const Voice = () => {
    const [activeTab, setActiveTab] = useState('recitations');
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [speed, setSpeed] = useState(1);
    const audioRef = useRef(new Audio('https://download.quranicaudio.com/quran/mishaari_raashid_al_3alaasy/002.mp3'));

    useEffect(() => {
        const audio = audioRef.current;

        // Playback Speed
        audio.playbackRate = speed;

        const updateTime = () => setCurrentTime(audio.currentTime);
        const updateDuration = () => setDuration(audio.duration);

        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('loadedmetadata', updateDuration);
        audio.addEventListener('ended', () => setIsPlaying(false));

        return () => {
            audio.removeEventListener('timeupdate', updateTime);
            audio.removeEventListener('loadedmetadata', updateDuration);
            audio.removeEventListener('ended', () => setIsPlaying(false));
            audio.pause();
        };
    }, []);

    // Update speed when state changes
    useEffect(() => {
        audioRef.current.playbackRate = speed;
    }, [speed]);

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleSeek = (e) => {
        const time = parseFloat(e.target.value);
        audioRef.current.currentTime = time;
        setCurrentTime(time);
    };

    const skip = (seconds) => {
        audioRef.current.currentTime += seconds;
    };

    const formatTime = (time) => {
        if (isNaN(time)) return "00:00";
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className="voice-page">
            <header className="page-header">
                <h1>Voice & Audio</h1>
            </header>

            {/* Tabs */}
            <div className="voice-tabs">
                <button
                    className={`tab-btn ${activeTab === 'recitations' ? 'active' : ''}`}
                    onClick={() => setActiveTab('recitations')}
                >
                    Quran Recitations
                </button>
                <button
                    className={`tab-btn ${activeTab === 'recordings' ? 'active' : ''}`}
                    onClick={() => setActiveTab('recordings')}
                >
                    My Recordings
                </button>
            </div>

            {activeTab === 'recitations' ? (
                <div className="content-area">
                    {/* Player Card */}
                    <Card className="player-card">
                        <div className="waveform-placeholder">
                            {/* Visualizer animation handled by CSS */}
                            {[...Array(20)].map((_, i) => (
                                <div key={i} className={`wave ${isPlaying ? 'animated' : ''}`}></div>
                            ))}
                        </div>

                        <div className="track-info">
                            <h3>Surah Al-Bakara</h3>
                            <p>Mishary Al-Afasy • Full Surah</p>
                        </div>

                        <div className="player-controls">
                            <button className="control-icon" onClick={() => skip(-10)}><SkipBack size={24} /></button>
                            <button
                                className="play-fab"
                                onClick={togglePlay}
                            >
                                {isPlaying ? <Pause size={32} fill="white" /> : <Play size={32} fill="white" className="ml-1" />}
                            </button>
                            <button className="control-icon" onClick={() => skip(10)}><SkipForward size={24} /></button>
                        </div>

                        <input
                            type="range"
                            min="0"
                            max={duration || 100}
                            value={currentTime}
                            onChange={handleSeek}
                            className="seek-slider"
                        />

                        <div className="secondary-controls">
                            <span className="time">{formatTime(currentTime)} / {formatTime(duration)}</span>
                            <button className="speed-btn" onClick={() => setSpeed(speed === 1 ? 1.5 : 1)}>{speed}x</button>
                        </div>
                    </Card>

                    {/* Reciters List (Mock for now, but player plays Mishary) */}
                    <div className="reciters-list">
                        <h3>Available Reciters</h3>
                        {['Mishary Al-Afasy', 'AbdulBasit', 'Al-Sudais'].map((name, i) => (
                            <div key={i} className="reciter-item">
                                <div className="reciter-info">
                                    <div className="reciter-avatar">{name[0]}</div>
                                    <div>
                                        <p className="reciter-name">{name}</p>
                                        <p className="reciter-meta">HQ Audio</p>
                                    </div>
                                </div>
                                <Button variant="ghost" className="download-btn"><Download size={20} /></Button>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="recordings-area">
                    <div className="empty-state">
                        <div className="mic-circle">
                            <Mic size={40} />
                        </div>
                        <p>Tap to record your recitation</p>
                        <Button className="mt-4">Start Recording</Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Voice;
