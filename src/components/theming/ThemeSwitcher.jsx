'use client';

import { useState, useEffect } from 'react';

const themes = [
  { name: 'Default', value: 'default', description: 'Dark green fitness theme' },
  { name: 'Corporate Blue', value: 'client1', description: 'Professional blue & orange' },
  { name: 'Light Modern', value: 'client2', description: 'Clean light theme' },
  { name: 'Ocean Sunset', value: 'ocean-sunset', description: 'Vibrant blues & oranges' },
  { name: 'Nordic Minimal', value: 'nordic-minimal', description: 'Minimalist light theme' },
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
    document.documentElement.classList.remove(
      'theme-default', 
      'theme-client1', 
      'theme-client2', 
      'theme-ocean-sunset', 
      'theme-nordic-minimal'
    );
    
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
    <div className="fixed bottom-4 right-4 z-tooltip bg-surface border border-border rounded-lg shadow-lg max-w-xs">
      <div className="p-4">
        <h3 className="text-sm font-semibold text mb-3">Theme Switcher</h3>
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {themes.map((theme) => (
            <button
              key={theme.value}
              onClick={() => handleThemeChange(theme.value)}
              className={`w-full px-3 py-2.5 text-sm rounded-md text-left transition-all duration-normal ${
                currentTheme === theme.value
                  ? 'bg-primary text-inverse shadow-md'
                  : 'bg-surface-hover text-secondary hover:bg-surface-elevated hover:shadow-sm'
              }`}
            >
              <div className="font-medium">{theme.name}</div>
              <div className="text-xs text-muted mt-1">{theme.description}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}