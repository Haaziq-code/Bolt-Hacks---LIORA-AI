import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Edit, 
  Trash2, 
  MessageCircle, 
  User, 
  Heart, 
  Calendar, 
  Star,
  Settings,
  Download,
  Upload,
  Search,
  Filter,
  MoreVertical,
  Play,
  Pause,
  Volume2,
  Video,
  Crown,
  Sparkles,
  Clock,
  TrendingUp
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import toast from 'react-hot-toast';

interface AIFriendCharacter {
  id: string;
  name: string;
  age: string;
  gender: string;
  personality: {
    traits: string[];
    energy: number;
    empathy: number;
    humor: number;
    wisdom: number;
  };
  voice: {
    tone: string;
    pitch: number;
    speed: number;
  };
  appearance: any;
  relationship: {
    level: number;
    memories: string[];
    milestones: string[];
    lastInteraction: string;
    checkInFrequency: string;
  };
  preferences: {
    moodSync: boolean;
    proactiveCheckIns: boolean;
    communicationStyle: string;
  };
  createdAt: string;
  updatedAt: string;
  stats?: {
    totalConversations: number;
    totalTime: number;
    favoriteTopics: string[];
    lastActive: string;
  };
}

const AIFriendManager: React.FC = () => {
  const { user } = useApp();
  const [friends, setFriends] = useState<AIFriendCharacter[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedFriend, setSelectedFriend] = useState<AIFriendCharacter | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load AI friends
  useEffect(() => {
    loadFriends();
  }, []);

  const loadFriends = () => {
    try {
      const savedFriends = localStorage.getItem('ai_friends');
      if (savedFriends) {
        const parsed = JSON.parse(savedFriends);
        // Add stats to each friend
        const friendsWithStats = parsed.map((friend: AIFriendCharacter) => ({
          ...friend,
          stats: generateStats(friend)
        }));
        setFriends(friendsWithStats);
      }
    } catch (error) {
      console.error('Failed to load AI friends:', error);
      toast.error('Failed to load AI friends');
    } finally {
      setIsLoading(false);
    }
  };

  // Generate stats for a friend
  const generateStats = (friend: AIFriendCharacter) => {
    const chatHistory = localStorage.getItem(`chat_history_${friend.id}`);
    const messages = chatHistory ? JSON.parse(chatHistory) : [];
    
    return {
      totalConversations: Math.floor(messages.length / 2), // Rough estimate
      totalTime: messages.length * 2, // Rough estimate in minutes
      favoriteTopics: ['friendship', 'life', 'goals'], // Would be extracted from conversations
      lastActive: friend.relationship.lastInteraction || friend.updatedAt
    };
  };

  // Filter friends
  const filteredFriends = friends.filter(friend => {
    const matchesSearch = friend.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         friend.personality.traits.some(trait => trait.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'active' && friend.stats && new Date(friend.stats.lastActive) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) ||
                         (selectedFilter === 'favorites' && friend.relationship.level > 70) ||
                         (selectedFilter === friend.age) ||
                         (selectedFilter === friend.gender);
    
    return matchesSearch && matchesFilter;
  });

  // Delete friend
  const deleteFriend = (friendId: string) => {
    try {
      const updatedFriends = friends.filter(f => f.id !== friendId);
      setFriends(updatedFriends);
      localStorage.setItem('ai_friends', JSON.stringify(updatedFriends));
      
      // Remove chat history
      localStorage.removeItem(`chat_history_${friendId}`);
      
      // Remove from current if it was selected
      const currentFriend = localStorage.getItem('current_ai_friend');
      if (currentFriend) {
        const parsed = JSON.parse(currentFriend);
        if (parsed.id === friendId) {
          localStorage.removeItem('current_ai_friend');
        }
      }
      
      toast.success('AI friend deleted successfully');
      setShowDeleteModal(false);
      setSelectedFriend(null);
    } catch (error) {
      console.error('Failed to delete friend:', error);
      toast.error('Failed to delete AI friend');
    }
  };

  // Set as current friend
  const setCurrentFriend = (friend: AIFriendCharacter) => {
    localStorage.setItem('current_ai_friend', JSON.stringify(friend));
    toast.success(`${friend.name} is now your active AI friend!`);
    
    // Redirect to chat
    setTimeout(() => {
      window.location.href = '/ai-friend-chat';
    }, 1000);
  };

  // Export friend
  const exportFriend = (friend: AIFriendCharacter) => {
    const dataStr = JSON.stringify(friend, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `${friend.name.toLowerCase().replace(/\s+/g, '-')}-ai-friend.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    
    toast.success(`${friend.name} exported successfully!`);
  };

  // Import friend
  const importFriend = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedFriend = JSON.parse(e.target?.result as string);
        
        // Generate new ID to avoid conflicts
        const newFriend = {
          ...importedFriend,
          id: `friend_${Date.now()}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          relationship: {
            ...importedFriend.relationship,
            level: 0,
            memories: [],
            milestones: [],
            lastInteraction: ''
          }
        };

        const updatedFriends = [...friends, newFriend];
        setFriends(updatedFriends);
        localStorage.setItem('ai_friends', JSON.stringify(updatedFriends));
        
        toast.success(`${newFriend.name} imported successfully!`);
      } catch (error) {
        console.error('Failed to import friend:', error);
        toast.error('Failed to import AI friend. Please check the file format.');
      }
    };
    reader.readAsText(file);
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return `${Math.floor(diffInHours / 168)}w ago`;
  };

  // Get avatar URL based on gender
  const getAvatarForFriend = (friend: AIFriendCharacter) => {
    // Beautiful, realistic avatars
    const avatars = {
      female: [
        'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
        'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
        'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
        'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
        'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1'
      ],
      male: [
        'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
        'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
        'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
        'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
        'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1'
      ],
      'non-binary': [
        'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
        'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
        'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1'
      ]
    };
    
    // Use friend's ID as a seed for consistent avatar selection
    const seed = parseInt(friend.id.replace(/\D/g, '')) || 0;
    const genderAvatars = avatars[friend.gender as keyof typeof avatars] || avatars.female;
    const index = seed % genderAvatars.length;
    return genderAvatars[index];
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl border border-white/30 dark:border-gray-700/30 shadow-2xl flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading your AI friends...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-3xl border border-white/30 dark:border-gray-700/30 shadow-2xl p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div>
            <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2 font-heading">
              AI Friends
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-xl">
              Manage your AI companions and relationships
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Import */}
            <label className="flex items-center space-x-2 px-4 py-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 rounded-2xl hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all cursor-pointer">
              <Upload className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              <span className="font-medium text-gray-700 dark:text-gray-300">Import</span>
              <input
                type="file"
                accept=".json"
                onChange={importFriend}
                className="hidden"
              />
            </label>

            {/* Create New */}
            <motion.button
              onClick={() => window.location.href = '/ai-friend-designer'}
              className="flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-2xl hover:from-primary-600 hover:to-accent-600 transition-all shadow-xl font-bold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus className="w-5 h-5" />
              <span>Create New Friend</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search AI friends..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-6 py-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 text-gray-900 dark:text-white shadow-lg"
            />
          </div>
          
          <div className="flex items-center space-x-3">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-6 py-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-white/30 dark:border-gray-700/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 text-gray-900 dark:text-white shadow-lg"
            >
              <option value="all">All Friends</option>
              <option value="active">Recently Active</option>
              <option value="favorites">Favorites (70%+ relationship)</option>
              <option value="female">Female Friends</option>
              <option value="male">Male Friends</option>
              <option value="non-binary">Non-binary Friends</option>
              <option value="teen">Teen Friends</option>
              <option value="young-adult">Young Adult Friends</option>
              <option value="adult">Adult Friends</option>
              <option value="elder">Elder Friends</option>
            </select>
          </div>
        </motion.div>

        {/* Friends Grid */}
        {filteredFriends.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredFriends.map((friend, index) => (
              <motion.div
                key={friend.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <motion.div 
                  className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-3xl border border-white/30 dark:border-gray-700/30 shadow-xl hover:shadow-2xl transition-all p-6 relative overflow-hidden"
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-accent-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4 relative z-10">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center shadow-lg overflow-hidden">
                        <img 
                          src={getAvatarForFriend(friend)} 
                          alt={friend.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                          {friend.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                          {friend.age.replace('-', ' ')} • {friend.gender}
                        </p>
                      </div>
                    </div>
                    
                    {/* Actions Menu */}
                    <div className="relative">
                      <motion.button
                        className="p-2 hover:bg-white/60 dark:hover:bg-gray-700/60 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setSelectedFriend(selectedFriend?.id === friend.id ? null : friend)}
                      >
                        <MoreVertical className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                      </motion.button>
                      
                      {/* Dropdown Menu */}
                      <AnimatePresence>
                        {selectedFriend?.id === friend.id && (
                          <motion.div
                            className="absolute right-0 top-full mt-2 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 rounded-2xl shadow-2xl p-2 min-w-48 z-50"
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                          >
                            <button
                              onClick={() => setCurrentFriend(friend)}
                              className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/60 dark:hover:bg-gray-700/60 transition-all flex items-center space-x-3"
                            >
                              <MessageCircle className="w-4 h-4 text-green-500" />
                              <span>Chat Now</span>
                            </button>
                            <button
                              onClick={() => exportFriend(friend)}
                              className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/60 dark:hover:bg-gray-700/60 transition-all flex items-center space-x-3"
                            >
                              <Download className="w-4 h-4 text-blue-500" />
                              <span>Export</span>
                            </button>
                            <button
                              onClick={() => {
                                setSelectedFriend(friend);
                                setShowDeleteModal(true);
                              }}
                              className="w-full text-left px-4 py-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-all flex items-center space-x-3 text-red-600 dark:text-red-400"
                            >
                              <Trash2 className="w-4 h-4" />
                              <span>Delete</span>
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Personality Traits */}
                  <div className="mb-4 relative z-10">
                    <div className="flex flex-wrap gap-2">
                      {friend.personality.traits.slice(0, 3).map((trait) => (
                        <span 
                          key={trait}
                          className="px-3 py-1 bg-gradient-to-r from-primary-500/20 to-accent-500/20 text-primary-700 dark:text-primary-300 rounded-full text-xs font-medium capitalize"
                        >
                          {trait}
                        </span>
                      ))}
                      {friend.personality.traits.length > 3 && (
                        <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-xs font-medium">
                          +{friend.personality.traits.length - 3}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Relationship Level */}
                  <div className="mb-4 relative z-10">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Relationship</span>
                      <span className="text-sm font-bold text-primary-500">{friend.relationship.level}%</span>
                    </div>
                    <div className="w-full bg-white/30 dark:bg-gray-700/30 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-pink-500 to-rose-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${friend.relationship.level}%` }}
                      />
                    </div>
                  </div>

                  {/* Stats */}
                  {friend.stats && (
                    <div className="grid grid-cols-2 gap-4 mb-4 relative z-10">
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                          {friend.stats.totalConversations}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Conversations</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900 dark:text-white">
                          {Math.floor(friend.stats.totalTime / 60)}h
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Total Time</div>
                      </div>
                    </div>
                  )}

                  {/* Last Active */}
                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 relative z-10">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>Last active</span>
                    </div>
                    <span className="font-medium">
                      {friend.stats ? formatTimeAgo(friend.stats.lastActive) : 'Never'}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 mt-4 relative z-10">
                    <motion.button
                      onClick={() => setCurrentFriend(friend)}
                      className="flex-1 flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl hover:from-primary-600 hover:to-accent-600 transition-all font-medium"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Chat</span>
                    </motion.button>
                    
                    <motion.button
                      className="p-3 bg-white/60 dark:bg-gray-700/60 rounded-xl hover:bg-white/80 dark:hover:bg-gray-700/80 transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Video className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    </motion.button>
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
            <div className="w-24 h-24 bg-gradient-to-r from-primary-500 to-accent-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
              <User className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 font-heading">
              {searchTerm || selectedFilter !== 'all' ? 'No friends found' : 'No AI friends yet'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-xl mb-8 max-w-md mx-auto">
              {searchTerm || selectedFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'Create your first AI friend to start building meaningful relationships'
              }
            </p>
            {(!searchTerm && selectedFilter === 'all') && (
              <motion.button
                onClick={() => window.location.href = '/ai-friend-designer'}
                className="px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-2xl hover:from-primary-600 hover:to-accent-600 transition-all shadow-xl font-bold text-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Create Your First AI Friend
              </motion.button>
            )}
          </motion.div>
        )}

        {/* Delete Confirmation Modal */}
        <AnimatePresence>
          {showDeleteModal && selectedFriend && (
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDeleteModal(false)}
            >
              <motion.div
                className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-3xl max-w-md w-full p-8 shadow-2xl border border-white/30 dark:border-gray-700/30"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Trash2 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Delete {selectedFriend.name}?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-8">
                    This will permanently delete your AI friend and all conversation history. This action cannot be undone.
                  </p>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setShowDeleteModal(false)}
                      className="flex-1 px-6 py-3 bg-white/60 dark:bg-gray-700/60 text-gray-700 dark:text-gray-300 rounded-2xl hover:bg-white/80 dark:hover:bg-gray-700/80 transition-all font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => deleteFriend(selectedFriend.id)}
                      className="flex-1 px-6 py-3 bg-red-500 text-white rounded-2xl hover:bg-red-600 transition-all font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AIFriendManager;