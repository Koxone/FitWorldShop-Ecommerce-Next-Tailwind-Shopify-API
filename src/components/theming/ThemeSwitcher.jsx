'use client';

import { useState, useEffect } from 'react';

const themes = [
  { name: 'Default', value: 'default' },
  { name: 'Corporate Blue', value: 'client1' },
  { name: 'Light Modern', value: 'client2' },
];

export default function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState('default');

  useEffect(() => {
    // Load saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'default';
    setCurrentTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  const applyTheme = (themeName) => {
    // Remove existing theme classes
    document.documentElement.classList.remove('theme-default', 'theme-client1', 'theme-client2');
    
    // Add new theme class
    document.documentElement.classList.add(`theme-${themeName}`);
    
    // For this demo, we'll dynamically import and apply the CSS
    const existingThemeLink = document.getElementById('theme-css');
    if (existingThemeLink) {
      existingThemeLink.remove();
    }

    if (themeName !== 'default') {
      const link = document.createElement('link');
      link.id = 'theme-css';
      link.rel = 'stylesheet';
      link.href = `/styles/themes/${themeName}.css`;
      document.head.appendChild(link);
    }
  };

  const handleThemeChange = (themeName) => {
    setCurrentTheme(themeName);
    localStorage.setItem('theme', themeName);
    applyTheme(themeName);
  };

  return (
    <div className="fixed bottom-4 right-4 z-tooltip bg-surface border border-border rounded-lg p-4 shadow-lg">
      <h3 className="text-sm font-semibold text mb-3">Theme Switcher</h3>
      <div className="space-y-2">
        {themes.map((theme) => (
          <button
            key={theme.value}
            onClick={() => handleThemeChange(theme.value)}
            className={`w-full px-3 py-2 text-sm rounded-md text-left transition-colors ${
              currentTheme === theme.value
                ? 'bg-primary text-inverse'
                : 'bg-surface-hover text-secondary hover:bg-surface-elevated'
            }`}
          >
            {theme.name}
          </button>
        ))}
      </div>
    </div>
  );
}