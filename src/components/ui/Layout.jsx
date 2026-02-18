import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { Home, BookOpen, Brain, BarChart2, Settings, Mic } from 'lucide-react';
import clsx from 'clsx';
import './Layout.css';

const Layout = () => {
    const navItems = [
        { to: "/", icon: Home, label: "Home" },
        { to: "/read", icon: BookOpen, label: "Read" },
        { to: "/ai-teacher", icon: Brain, label: "Teacher" },
        { to: "/voice", icon: Mic, label: "Voice" },
        { to: "/progress", icon: BarChart2, label: "Progress" },
        // Settings is usually top-right or separate, but I'll add it here for MVP speed if needed, 
        // or keep it just in the Home page as a link. 
        // The design doc says "Quick Navigation Section" on Home has Settings. 
        // Let's keep the main 4-5 on the bottom.
    ];

    return (
        <div className="app-container">
            <main className="content">
                <Outlet />
            </main>

            <nav className="bottom-nav">
                {navItems.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) => clsx("nav-item", isActive && "active")}
                    >
                        <item.icon size={24} />
                        <span className="nav-label">{item.label}</span>
                    </NavLink>
                ))}
            </nav>
        </div>
    );
};

export default Layout;
