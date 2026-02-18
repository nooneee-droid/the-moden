import React, { useState, useEffect } from 'react';
import { Settings, ArrowLeft, ArrowRight, PlayCircle, Share2, Bookmark, Info } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import surahData from '../assets/data/surah-bakara.json'; // Importing statically for MVP
import './Read.css';

const Read = () => {
    const [verses, setVerses] = useState([]);
    const [showTranslation, setShowTranslation] = useState(true);
    const [showTransliteration, setShowTransliteration] = useState(false);
    const [fontSize, setFontSize] = useState(24);

    const [playingVerse, setPlayingVerse] = useState(null);
    const audioRef = React.useRef(new Audio());

    useEffect(() => {
        // In a real app, fetch from API or load large JSON async
        setVerses(surahData);
    }, []);

    const playAudio = (verseNumber) => {
        if (playingVerse === verseNumber) {
            audioRef.current.pause();
            setPlayingVerse(null);
        } else {
            const verse = verses.find(v => v.number === verseNumber);
            if (verse && verse.audio) {
                audioRef.current.src = verse.audio;
                audioRef.current.play();
                setPlayingVerse(verseNumber);
                audioRef.current.onended = () => setPlayingVerse(null);
            }
        }
    };

    return (
        <div className="read-container">
            {/* Header */}
            <header className="read-header">
                <div>
                    <h1>Surah Al-Bakara</h1>
                    <p className="subtitle">Verses 1-5 of 286</p>
                </div>
                <div className="header-actions">
                    {/* Mock Translation Toggle */}
                    <Button
                        variant="ghost"
                        className={showTranslation ? 'active-toggle' : ''}
                        onClick={() => setShowTranslation(!showTranslation)}
                    >
                        EN
                    </Button>
                    <Button variant="ghost"><Settings size={20} /></Button>
                </div>
            </header>

            {/* Main Content */}
            <div className="verses-list">
                {verses.map((verse) => (
                    <div key={verse.number} className="verse-container">
                        <div className="verse-actions">
                            <span className="verse-number">{verse.number}</span>
                            <div className="action-icons">
                                <button className="icon-btn" onClick={() => playAudio(verse.number)}>
                                    <PlayCircle size={20} color={playingVerse === verse.number ? 'var(--accent-primary)' : 'currentColor'} />
                                </button>
                                <Bookmark size={20} />
                                <Share2 size={20} />
                            </div>
                        </div>

                        <div className="arabic-text" style={{ fontSize: `${fontSize}px` }}>
                            {verse.arabic}
                        </div>

                        {showTransliteration && (
                            <p className="transliteration">{verse.text}</p>
                        )}

                        {showTranslation && (
                            <p className="translation">{verse.translation}</p>
                        )}

                        <div className="divider"></div>
                    </div>
                ))}
            </div>

            {/* Footer Controls (Sticky) */}
            <div className="read-controls">
                <Button variant="secondary" className="control-btn">
                    <ArrowLeft size={20} /> Prev
                </Button>
                <span className="page-indicator">Page 1</span>
                <Button variant="secondary" className="control-btn">
                    Next <ArrowRight size={20} />
                </Button>
            </div>
        </div>
    );
};

export default Read;
