import React from 'react';
import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error';
  trend?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon: Icon, color, trend }) => {
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'primary':
        return 'from-blue-500 to-cyan-500';
      case 'secondary':
        return 'from-green-500 to-emerald-500';
      case 'accent':
        return 'from-orange-500 to-red-500';
      case 'success':
        return 'from-emerald-500 to-teal-500';
      case 'warning':
        return 'from-yellow-500 to-orange-500';
      case 'error':
        return 'from-red-500 to-pink-500';
      default:
        return 'from-slate-500 to-gray-500';
    }
  };

  const getTrendColor = (trend: string) => {
    return trend.startsWith('+') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400';
  };

  const getTrendIcon = (trend: string) => {
    return trend.startsWith('+') ? TrendingUp : TrendingDown;
  };

  return (
    <motion.div 
      className="bg-white/10 dark:bg-slate-900/10 backdrop-blur-xl border border-white/20 dark:border-slate-700/20 rounded-3xl p-8 shadow-2xl"
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">{title}</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mb-3">{value}</p>
          {trend && (
            <div className="flex items-center space-x-2">
              {React.createElement(getTrendIcon(trend), { 
                className: `w-4 h-4 ${getTrendColor(trend)}` 
              })}
              <span className={`text-sm font-semibold ${getTrendColor(trend)}`}>
                {trend}
              </span>
            </div>
          )}
        </div>
        <motion.div 
          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${getColorClasses(color)} flex items-center justify-center shadow-xl`}
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.3 }}
        >
          <Icon className="w-8 h-8 text-white" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default StatsCard;