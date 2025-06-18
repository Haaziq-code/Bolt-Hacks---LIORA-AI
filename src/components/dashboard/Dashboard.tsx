import React from 'react';
import { 
  TrendingUp, 
  MessageSquare, 
  Clock, 
  Target, 
  Brain, 
  Heart,
  Zap,
  Calendar,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { DashboardStats } from '../../types';
import StatsCard from './StatsCard';
import ActivityChart from './ActivityChart';
import MoodTracker from './MoodTracker';

const Dashboard: React.FC = () => {
  const { user } = useApp();

  const stats: DashboardStats = {
    sessionsThisWeek: 12,
    totalSessions: 89,
    topInteraction: 'Goal Setting',
    moodScore: 7.8,
    averageSessionLength: 23,
    streakDays: 5,
  };

  const recentSessions = [
    { id: '1', mode: 'coach', title: 'Career Development', date: '2024-01-15', duration: 25 },
    { id: '2', mode: 'therapist', title: 'Stress Management', date: '2024-01-14', duration: 30 },
    { id: '3', mode: 'tutor', title: 'Python Basics', date: '2024-01-13', duration: 45 },
    { id: '4', mode: 'coach', title: 'Fitness Goals', date: '2024-01-12', duration: 20 },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div 
        className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-6 text-white shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold mb-2">Welcome back, {user?.name}!</h1>
            <p className="text-blue-100 text-sm">
              You've completed {stats.sessionsThisWeek} sessions this week. Keep up the great work!
            </p>
          </div>
          <motion.div 
            className="hidden md:block"
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/30">
              <Target className="w-5 h-5" />
              <span className="font-bold">{stats.streakDays} day streak</span>
              <Sparkles className="w-4 h-4" />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Stats Grid - Smaller */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <StatsCard
            title="Sessions"
            value={stats.sessionsThisWeek}
            icon={MessageSquare}
            color="primary"
            trend="+23%"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <StatsCard
            title="Mood Score"
            value={stats.moodScore}
            icon={Heart}
            color="success"
            trend="+8%"
          />
        </motion.div>
      </div>

      {/* Charts - Smaller */}
      <div className="space-y-4">
        <motion.div 
          className="bg-white/10 dark:bg-slate-900/10 backdrop-blur-xl border border-white/20 dark:border-slate-700/20 rounded-2xl p-4 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            <span>Weekly Activity</span>
          </h3>
          <div className="h-48">
            <ActivityChart />
          </div>
        </motion.div>
        
        <motion.div 
          className="bg-white/10 dark:bg-slate-900/10 backdrop-blur-xl border border-white/20 dark:border-slate-700/20 rounded-2xl p-4 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center space-x-2">
            <Heart className="w-5 h-5 text-green-500" />
            <span>Mood Tracking</span>
          </h3>
          <div className="h-48">
            <MoodTracker />
          </div>
        </motion.div>
      </div>

      {/* Recent Sessions - Compact */}
      <motion.div 
        className="bg-white/10 dark:bg-slate-900/10 backdrop-blur-xl border border-white/20 dark:border-slate-700/20 rounded-2xl p-4 shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
      >
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center space-x-2">
          <MessageSquare className="w-5 h-5 text-purple-500" />
          <span>Recent Sessions</span>
        </h3>
        <div className="space-y-3">
          {recentSessions.slice(0, 3).map((session, index) => {
            const getModeIcon = (mode: string) => {
              switch (mode) {
                case 'coach': return Zap;
                case 'therapist': return Heart;
                case 'tutor': return Brain;
                default: return MessageSquare;
              }
            };
            
            const getModeColor = (mode: string) => {
              switch (mode) {
                case 'coach': return 'from-orange-500 to-red-500';
                case 'therapist': return 'from-green-500 to-emerald-500';
                case 'tutor': return 'from-indigo-500 to-purple-500';
                default: return 'from-blue-500 to-cyan-500';
              }
            };

            const Icon = getModeIcon(session.mode);
            
            return (
              <motion.div 
                key={session.id} 
                className="flex items-center justify-between p-3 rounded-xl bg-white/10 dark:bg-slate-800/10 backdrop-blur-sm border border-white/20 dark:border-slate-700/20 hover:bg-white/20 dark:hover:bg-slate-800/20 transition-all cursor-pointer group"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${getModeColor(session.mode)} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white text-sm">{session.title}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 capitalize">
                      {session.mode} • {session.duration}m
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400">
                  <Calendar className="w-3 h-3" />
                  <span>{new Date(session.date).toLocaleDateString()}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;