import React, { useState } from 'react';
import { User, Bell, Volume2, Globe, Moon, Lock, Info, ChevronRight, LogOut, Key, RefreshCcw, Shield } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import './Settings.css';

const Settings = () => {
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(false);
    const [translation, setTranslation] = useState('English');
    const [apiKey, setApiKey] = useState(localStorage.getItem('openrouter_api_key') || '');
    const [showKeyInput, setShowKeyInput] = useState(false);

    const handleSaveKey = () => {
        localStorage.setItem('openrouter_api_key', apiKey);
        setShowKeyInput(false);
        alert('API Key saved!');
    };

    const handleReset = () => {
        if (confirm("Are you sure you want to reset all progress? This cannot be undone.")) {
            // Logic to clear local storage would go here
            localStorage.clear();
            alert("App has been reset.");
            window.location.reload();
        }
    };

    const handleLanguageToggle = () => {
        setTranslation(prev => prev === 'English' ? 'Arabic' : 'English');
    };

    const SettingItem = ({ icon: Icon, title, value, type = 'arrow', onToggle, onClick }) => (
        <div className="setting-item" onClick={onClick}>
            <div className="setting-info">
                <div className="setting-icon"><Icon size={20} /></div>
                <span>{title}</span>
            </div>
            <div className="setting-action">
                {type === 'toggle' ? (
                    <button
                        className={`toggle-switch ${value ? 'active' : ''}`}
                        onClick={(e) => { e.stopPropagation(); onToggle(); }}
                    >
                        <div className="toggle-thumb"></div>
                    </button>
                ) : (
                    <div className="setting-value">
                        {value && <span className="value-text">{value}</span>}
                        <ChevronRight size={16} className="text-secondary" />
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="settings-page">
            <header className="page-header">
                <h1>Settings</h1>
                <p className="brand-subtitle">The Moden</p>
            </header>

            <div className="settings-content">
                {/* Profile Card */}
                <Card className="profile-card">
                    <div className="profile-header">
                        <div className="profile-avatar">U</div>
                        <div className="profile-details">
                            <h3>User Name</h3>
                            <p>user@example.com</p>
                        </div>
                        <Button className="edit-btn">Edit</Button>
                    </div>
                </Card>

                {/* General Settings */}
                <div className="settings-section">
                    <h3>General</h3>
                    <Card className="settings-group">
                        <SettingItem
                            icon={Globe}
                            title="App Language"
                            value={translation}
                            onClick={handleLanguageToggle}
                        />
                        <SettingItem
                            icon={Moon}
                            title="Dark Mode"
                            type="toggle"
                            value={darkMode}
                            onToggle={() => setDarkMode(!darkMode)}
                        />
                        <SettingItem
                            icon={Bell}
                            title="Notifications"
                            type="toggle"
                            value={notifications}
                            onToggle={() => setNotifications(!notifications)}
                        />
                    </Card>
                </div>

                {/* AI Configuration */}
                <div className="settings-section">
                    <h3>AI Teacher Configuration</h3>
                    <Card className="settings-group">
                        <div className="setting-item" onClick={() => setShowKeyInput(!showKeyInput)}>
                            <div className="setting-info">
                                <div className="setting-icon"><Key size={20} /></div>
                                <span>API Key</span>
                            </div>
                            <div className="setting-action">
                                <span className="value-text">{apiKey ? '••••••••' : 'Not Set'}</span>
                                <ChevronRight size={16} className="text-secondary" />
                            </div>
                        </div>
                        {showKeyInput && (
                            <div className="api-key-input-container">
                                <input
                                    type="text"
                                    placeholder="Enter your API Key"
                                    value={apiKey}
                                    onChange={(e) => setApiKey(e.target.value)}
                                    className="settings-input"
                                />
                                <Button size="sm" onClick={handleSaveKey}>Save</Button>
                            </div>
                        )}
                    </Card>
                </div>

                {/* Account & Privacy */}
                <div className="settings-section">
                    <h3>Privacy & Support</h3>
                    <Card className="settings-group">
                        <SettingItem icon={Lock} title="Privacy Policy" />
                        <SettingItem icon={Shield} title="Data Management" />
                        <SettingItem icon={Info} title="Help & Support" />
                    </Card>
                </div>

                {/* Danger Zone */}
                <div className="settings-section">
                    <h3>Danger Zone</h3>
                    <Card className="settings-group danger-group">
                        <div className="setting-item danger" onClick={handleReset}>
                            <div className="setting-info">
                                <div className="setting-icon danger-icon"><RefreshCcw size={20} /></div>
                                <span>Reset App Progress</span>
                            </div>
                            <ChevronRight size={16} className="text-danger" />
                        </div>
                    </Card>
                </div>

                <Button variant="ghost" className="logout-btn">
                    <LogOut size={20} /> Log Out
                </Button>

                <p className="version-text">The Moden v1.0.0</p>
            </div>
        </div>
    );
};

export default Settings;
