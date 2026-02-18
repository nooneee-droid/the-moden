import React from 'react';
import './ProgressRing.css';

const ProgressRing = ({ radius = 60, stroke = 8, progress = 0, color = 'var(--accent-primary)' }) => {
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
        <div className="progress-ring-container" style={{ width: radius * 2, height: radius * 2 }}>
            <svg
                height={radius * 2}
                width={radius * 2}
                className="progress-ring"
            >
                <circle
                    stroke="var(--border-color)"
                    strokeWidth={stroke}
                    fill="transparent"
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
                <circle
                    stroke={color}
                    strokeWidth={stroke}
                    strokeDasharray={circumference + ' ' + circumference}
                    style={{ strokeDashoffset }}
                    strokeLinecap="round"
                    fill="transparent"
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                />
            </svg>
            <div className="progress-text">
                <span className="progress-value">{progress}%</span>
            </div>
        </div>
    );
};

export default ProgressRing;
