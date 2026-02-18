import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, BookOpen, Brain, BarChart2, Settings, Calendar, ChevronRight, Target } from 'lucide-react';
import { format } from 'date-fns';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import ProgressRing from '../components/ui/ProgressRing';
import Badge from '../components/ui/Badge';
import './Home.css';

const Home = () => {
    const navigate = useNavigate();
    const currentDate = new Date();

    // Mock Data
    const progress = 40;
    const daysLeft = 24;
    const versesMemorized = 45;
    const todayTask = {
        title: "Verses 1-10",
        status: "Not Started",
        time: "20 mins"
    };

    return (
        <div className="home-container">
            {/* Header */}
            <header className="home-header">
                <div className="user-info">
                    <div className="avatar">U</div>
                    <div>
                        <p className="greeting">Assalamu Alaikum User</p>
                        <p className="date">{format(currentDate, 'EEEE, d MMMM')}</p>
                    </div>
                </div>
                <button className="icon-btn">
                    <Bell size={24} />
                    <span className="notification-dot"></span>
                </button>
            </header>

            {/* Quick Stats */}
            <section className="stats-section">
                <Card className="stat-card">
                    <h3 className="stat-value">{daysLeft}</h3>
                    <p className="stat-label">Days Left</p>
                    <div className="stat-bar"><div style={{ width: `${(6 / 30) * 100}%` }}></div></div>
                </Card>
                <Card className="stat-card">
                    <div className="ring-wrapper">
                        <ProgressRing radius={35} stroke={6} progress={progress} />
                    </div>
                    <p className="stat-label mt-2">Progress</p>
                </Card>
                <Card className="stat-card highlight-border">
                    <h3 className="stat-value">{versesMemorized}</h3>
                    <p className="stat-label">Verses</p>
                </Card>
            </section>

            {/* Today's Task */}
            <section className="task-section">
                <div className="section-header">
                    <h2>Today's Task</h2>
                    <Badge variant="warning">In Progress</Badge>
                </div>
                <Card className="task-card">
                    <div className="task-info">
                        <div>
                            <h3>{todayTask.title}</h3>
                            <p className="task-meta">{todayTask.time} • Surah Al-Bakara</p>
                        </div>
                        <Calendar size={20} className="text-secondary" />
                    </div>
                    <Button className="mt-4" onClick={() => navigate('/read')}>
                        Start Learning
                    </Button>
                </Card>
            </section>

            {/* Upcoming Schedule (Mini) */}
            <section className="schedule-section">
                <div className="section-header">
                    <h2>Schedule</h2>
                    <Button variant="ghost" className="view-all-btn">View All</Button>
                </div>
                <div className="mini-calendar">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className={`calendar-day ${i === 0 ? 'active' : ''}`}>
                            <span className="day-name">{format(new Date(Date.now() + i * 86400000), 'EEE')}</span>
                            <span className="day-num">{format(new Date(Date.now() + i * 86400000), 'd')}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Quick Nav */}
            <section className="quick-nav-grid">
                <Button variant="secondary" className="nav-tile" onClick={() => navigate('/read')}>
                    <BookOpen size={24} />
                    <span>Read</span>
                </Button>
                <Button variant="secondary" className="nav-tile" onClick={() => navigate('/ai-teacher')}>
                    <Brain size={24} />
                    <span>AI Teacher</span>
                </Button>
                <Button variant="secondary" className="nav-tile" onClick={() => navigate('/progress')}>
                    <BarChart2 size={24} />
                    <span>Progress</span>
                </Button>
                <Button variant="secondary" className="nav-tile" onClick={() => navigate('/test')}>
                    <Target size={24} />
                    <span>Test/Quiz</span>
                </Button>
                <Button variant="secondary" className="nav-tile" onClick={() => navigate('/settings')}>
                    <Settings size={24} />
                    <span>Settings</span>
                </Button>
            </section>

            {/* Motivation */}
            <section className="motivation-section">
                <p className="quote">"Indeed, with hardship [will be] ease."</p>
                <p className="source">- Surah Ash-Sharh 94:6</p>
            </section>
        </div>
    );
};

export default Home;
