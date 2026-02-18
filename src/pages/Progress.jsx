import React from 'react';
import { Clock, CheckCircle, Book, Target } from 'lucide-react';
import ProgressRing from '../components/ui/ProgressRing';
import Card from '../components/ui/Card';
import './Progress.css';

const Progress = () => {
    return (
        <div className="progress-page">
            <header className="page-header">
                <h1>Your Learning Progress</h1>
            </header>

            {/* Main Progress Ring */}
            <div className="main-progress-container">
                <div className="pulse-ring">
                    <ProgressRing radius={90} stroke={12} progress={20} />
                </div>
                <div className="progress-label">
                    <h2>Day 6</h2>
                    <p>of 30</p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid">
                <Card className="stat-item">
                    <Clock size={24} className="stat-icon" />
                    <p className="stat-num">12h 45m</p>
                    <p className="stat-desc">Total Time</p>
                </Card>
                <Card className="stat-item">
                    <CheckCircle size={24} className="stat-icon" />
                    <p className="stat-num">15</p>
                    <p className="stat-desc">Sessions</p>
                </Card>
                <Card className="stat-item">
                    <Book size={24} className="stat-icon" />
                    <p className="stat-num">67</p>
                    <p className="stat-desc">Verses</p>
                </Card>
                <Card className="stat-item">
                    <Target size={24} className="stat-icon" />
                    <p className="stat-num">87%</p>
                    <p className="stat-desc">Accuracy</p>
                </Card>
            </div>

            {/* Weekly Chart Mockup */}
            <section className="chart-section">
                <h3>Weekly Activity</h3>
                <div className="bar-chart">
                    {[40, 60, 30, 80, 50, 20, 70].map((h, i) => (
                        <div key={i} className="bar-group">
                            <div className="bar" style={{ height: `${h}%` }}></div>
                            <span className="bar-label">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Consistency Streak */}
            <section className="streak-section">
                <div className="fire-icon">🔥</div>
                <div>
                    <h3>6 Day Streak</h3>
                    <p>You're on fire! Keep it up.</p>
                </div>
            </section>
        </div>
    );
};

export default Progress;
