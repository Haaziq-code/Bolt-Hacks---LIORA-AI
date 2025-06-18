import React, { useState, useEffect } from 'react';
import { Search, MessageSquare, Calendar, Filter, Trash2, Download, Play, Brain, Clock, User, Bot, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatSession } from '../../types';
import { loadSessions, deleteSession, getMessages, clearMessages } from '../../services/supabase';
import { useChat } from '../../hooks/useChat';
import { useApp } from '../../context/AppContext';
import LoadingSpinner from '../ui/LoadingSpinner';
import toast from 'react-hot-toast';

interface MemoryMessage {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  session_id: string;
}

const Memory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [memoryMessages, setMemoryMessages] = useState<MemoryMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'sessions' | 'memory'>('memory');
  const { loadSession } = useChat('general');
  const { setCurrentMode } = useApp();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [sessionsData, messagesData] = await Promise.all([
        loadSessions(),
        getMessages()
      ]);
      setSessions(sessionsData);
      setMemoryMessages(messagesData);
    } catch (error) {
      console.error('Failed to load data:', error);
      toast.error('Failed to load data');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredSessions = sessions.filter(session => {
    const matchesSearch = session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.messages.some(msg => msg.content.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = selectedFilter === 'all' || session.mode === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const filteredMessages = memoryMessages.filter(message => {
    return message.content.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const getModeColor = (mode: string) => {
    switch (mode) {
      case 'coach':
        return 'from-orange-500 to-red-500';
      case 'therapist':
        return 'from-green-500 to-emerald-500';
      case 'tutor':
        return 'from-indigo-500 to-purple-500';
      default:
        return 'from-primary-500 to-accent-500';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getSessionDuration = (session: ChatSession) => {
    const start = new Date(session.createdAt);
    const end = new Date(session.updatedAt);
    const minutes = Math.round((end.getTime() - start.getTime()) / 60000);
    return `${minutes}m`;
  };

  const handleLoadSession = (session: ChatSession) => {
    setCurrentMode(session.mode);
    loadSession(session);
    toast.success(`Loaded session: ${session.title}`);
  };

  const handleDeleteSession = async (sessionId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    
    if (confirm('Are you sure you want to delete this session?')) {
      try {
        await deleteSession(sessionId);
        setSessions(prev => prev.filter(s => s.id !== sessionId));
        toast.success('Session deleted');
      } catch (error) {
        console.error('Failed to delete session:', error);
        toast.error('Failed to delete session');
      }
    }
  };

  const handleClearMemory = async () => {
    if (confirm('Are you sure you want to clear all conversation memory? This action cannot be undone.')) {
      try {
        await clearMessages();
        setMemoryMessages([]);
        toast.success('Conversation memory cleared');
      } catch (error) {
        console.error('Failed to clear memory:', error);
        toast.error('Failed to clear memory');
      }
    }
  };

  const handleExportSessions = () => {
    const dataStr = JSON.stringify(filteredSessions, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `liora-ai-sessions-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast.success('Sessions exported successfully');
  };

  const handleExportMemory = () => {
    const dataStr = JSON.stringify(filteredMessages, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `liora-ai-memory-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast.success('Memory exported successfully');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl border border-white/30 dark:border-gray-700/30 shadow-2xl">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-6 text-gray-600 dark:text-gray-400 text-xl">Loading your data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl border border-white/30 dark:border-gray-700/30 shadow-2xl">
      {/* Enhanced Header */}
      <motion.div 
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div>
          <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2 font-heading">Memory & Sessions</h1>
          <p className="text-gray-600 dark:text-gray-400 text-xl">
            Review your conversation history and past sessions with LioraAI
          </p>
        </div>
        <div className="flex space-x-4">
          <motion.button 
            onClick={activeTab === 'memory' ? handleExportMemory : handleExportSessions}
            className="flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-2xl hover:from-primary-600 hover:to-accent-600 transition-all shadow-xl font-semibold"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="w-5 h-5" />
            <span>Export</span>
          </motion.button>
          {activeTab === 'memory' && (
            <motion.button 
              onClick={handleClearMemory}
              className="flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-2xl hover:from-red-600 hover:to-pink-600 transition-all shadow-xl font-semibold"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Trash2 className="w-5 h-5" />
              <span>Clear Memory</span>
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Enhanced Tab Navigation */}
      <motion.div 
        className="flex space-x-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-2 shadow-lg border border-white/30 dark:border-gray-700/30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <button
          onClick={() => setActiveTab('memory')}
          className={`flex-1 flex items-center justify-center space-x-3 px-6 py-4 rounded-xl font-semibold transition-all ${
            activeTab === 'memory'
              ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-xl'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-gray-800/60'
          }`}
        >
          <Brain className="w-5 h-5" />
          <span>Conversation Memory</span>
          <span className="bg-white/20 text-xs px-3 py-1 rounded-full font-bold">
            {memoryMessages.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('sessions')}
          className={`flex-1 flex items-center justify-center space-x-3 px-6 py-4 rounded-xl font-semibold transition-all ${
            activeTab === 'sessions'
              ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-xl'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-gray-800/60'
          }`}
        >
          <MessageSquare className="w-5 h-5" />
          <span>Past Sessions</span>
          <span className="bg-white/20 text-xs px-3 py-1 rounded-full font-bold">
            {sessions.length}
          </span>
        </button>
      </motion.div>

      {/* Enhanced Search and Filter */}
      <motion.div 
        className="flex flex-col sm:flex-row gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder={activeTab === 'memory' ? "Search conversation memory..." : "Search sessions..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-6 py-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 text-gray-900 dark:text-white shadow-lg text-lg"
          />
        </div>
        {activeTab === 'sessions' && (
          <div className="flex items-center space-x-3">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-6 py-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 text-gray-900 dark:text-white shadow-lg"
            >
              <option value="all">All Modes</option>
              <option value="coach">AI Coach</option>
              <option value="therapist">AI Therapist</option>
              <option value="tutor">AI Tutor</option>
            </select>
          </div>
        )}
      </motion.div>

      {/* Enhanced Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'memory' ? (
          <motion.div
            key="memory"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5 }}
          >
            {filteredMessages.length > 0 ? (
              <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl p-8 border border-white/30 dark:border-gray-700/30 shadow-xl">
                <div className="space-y-6 max-h-96 overflow-y-auto">
                  {filteredMessages.map((message, index) => (
                    <motion.div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-6`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      <div className={`max-w-xs md:max-w-md lg:max-w-lg ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                        <div className={`flex items-start space-x-4 ${message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                          {/* Enhanced Avatar */}
                          <div className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center shadow-xl ${
                            message.sender === 'user' 
                              ? 'bg-gradient-to-br from-primary-500 to-accent-500' 
                              : 'bg-gradient-to-br from-green-500 to-emerald-500'
                          }`}>
                            {message.sender === 'user' ? (
                              <User className="w-6 h-6 text-white" />
                            ) : (
                              <Bot className="w-6 h-6 text-white" />
                            )}
                          </div>

                          {/* Enhanced Message Content */}
                          <div className={`flex-1 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                            <div className={`inline-block px-6 py-4 rounded-3xl shadow-lg backdrop-blur-sm border ${
                              message.sender === 'user'
                                ? 'bg-gradient-to-br from-primary-500 to-accent-500 text-white border-white/20'
                                : 'bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white border-white/30 dark:border-gray-700/30'
                            }`}>
                              <p className="text-sm leading-relaxed whitespace-pre-wrap font-medium">{message.content}</p>
                            </div>
                            
                            {/* Enhanced Timestamp */}
                            <div className={`flex items-center space-x-2 mt-2 text-xs text-gray-500 dark:text-gray-400 ${
                              message.sender === 'user' ? 'justify-end' : 'justify-start'
                            }`}>
                              <div className="flex items-center space-x-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full px-3 py-1 border border-white/30 dark:border-gray-700/30">
                                <Clock className="w-3 h-3" />
                                <span>{formatTime(message.timestamp)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              <motion.div 
                className="text-center py-20"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                  <Brain className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 font-heading">
                  No conversation memory found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  {searchTerm 
                    ? 'Try adjusting your search criteria'
                    : 'Start a conversation with LioraAI to build your memory'
                  }
                </p>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="sessions"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            {filteredSessions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredSessions.map((session, index) => (
                  <motion.div
                    key={session.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <motion.div 
                      onClick={() => handleLoadSession(session)}
                      className="p-8 cursor-pointer group bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl border border-white/30 dark:border-gray-700/30 shadow-xl hover:shadow-2xl transition-all"
                      whileHover={{ y: -10, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center space-x-4">
                          <div className={`w-14 h-14 bg-gradient-to-br ${getModeColor(session.mode)} rounded-2xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform`}>
                            <MessageSquare className="w-7 h-7 text-white" />
                          </div>
                          <div>
                            <h3 className="font-bold text-gray-900 dark:text-white line-clamp-1 font-heading">
                              {session.title}
                            </h3>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className={`text-xs px-3 py-1 rounded-full capitalize font-semibold bg-gradient-to-r ${getModeColor(session.mode)} text-white`}>
                                {session.mode}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <motion.button 
                            onClick={(e) => handleLoadSession(session)}
                            className="p-2 hover:bg-white/60 dark:hover:bg-gray-700/60 rounded-xl opacity-0 group-hover:opacity-100 transition-all"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Play className="w-5 h-5 text-primary-500" />
                          </motion.button>
                          <motion.button 
                            onClick={(e) => handleDeleteSession(session.id, e)}
                            className="p-2 hover:bg-white/60 dark:hover:bg-gray-700/60 rounded-xl opacity-0 group-hover:opacity-100 transition-all"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Trash2 className="w-5 h-5 text-red-500" />
                          </motion.button>
                        </div>
                      </div>

                      <div className="space-y-3 mb-6">
                        <p className="text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed">
                          {session.messages[0]?.content || 'No messages yet'}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(session.createdAt)}</span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="font-semibold">{session.messages.length} messages</span>
                          <span className="font-semibold">{getSessionDuration(session)}</span>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div 
                className="text-center py-20"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-accent-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                  <MessageSquare className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 font-heading">
                  No sessions found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  {searchTerm || selectedFilter !== 'all' 
                    ? 'Try adjusting your search or filter criteria'
                    : 'Start a conversation with LioraAI to see your sessions here'
                  }
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Memory;