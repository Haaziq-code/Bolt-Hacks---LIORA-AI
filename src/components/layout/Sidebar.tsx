import React from 'react';
import { 
  Home, 
  Brain, 
  Heart, 
  GraduationCap, 
  MessageSquare, 
  Settings, 
  Info,
  Zap 
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AIMode } from '../../types';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentPage, onPageChange }) => {
  const { user, currentMode, setCurrentMode } = useApp();

  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'memory', label: 'Memory', icon: MessageSquare },
    { id: 'coach', label: 'AI Coach', icon: Zap, mode: 'coach' as AIMode },
    { id: 'therapist', label: 'AI Therapist', icon: Heart, mode: 'therapist' as AIMode },
    { id: 'tutor', label: 'AI Tutor', icon: GraduationCap, mode: 'tutor' as AIMode },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'about', label: 'About', icon: Info },
  ];

  const handleItemClick = (item: typeof menuItems[0]) => {
    onPageChange(item.id);
    if (item.mode) {
      setCurrentMode(item.mode);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 h-full flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">OmniAI</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Life Co-pilot</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/25'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary-600 dark:hover:text-primary-400'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
              {item.mode && currentMode === item.mode && (
                <div className="w-2 h-2 bg-accent-500 rounded-full ml-auto"></div>
              )}
            </button>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          <img
            src={user?.avatar || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1'}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex-1">
            <p className="font-medium text-gray-900 dark:text-white">{user?.name}</p>
            <div className="flex items-center space-x-2">
              <span className={`text-xs px-2 py-1 rounded-full ${
                user?.isPro 
                  ? 'bg-accent-100 text-accent-800 dark:bg-accent-900 dark:text-accent-200' 
                  : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
              }`}>
                {user?.isPro ? 'Pro' : 'Free'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;