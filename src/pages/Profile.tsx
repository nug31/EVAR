import React, { useState } from 'react';
import { 
  User, 
  Settings, 
  Heart, 
  Clock, 
  Car, 
  Battery,
  MapPin,
  Trophy,
  Camera,
  Bell,
  Shield
} from 'lucide-react';

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const userStats = [
    { label: 'AR Sessions', value: '142', icon: Camera, color: 'text-cyan-400' },
    { label: 'Models Viewed', value: '28', icon: Car, color: 'text-emerald-400' },
    { label: 'Favorites', value: '12', icon: Heart, color: 'text-pink-400' },
    { label: 'Hours Saved', value: '36', icon: Clock, color: 'text-purple-400' },
  ];

  const recentActivity = [
    { action: 'Viewed Tesla Model S in AR', time: '2 hours ago', icon: Camera },
    { action: 'Found charging station nearby', time: '5 hours ago', icon: MapPin },
    { action: 'Completed battery maintenance guide', time: '1 day ago', icon: Battery },
    { action: 'Compared BMW i4 vs Audi e-tron', time: '2 days ago', icon: Car },
  ];

  const favoriteModels = [
    { brand: 'Tesla', model: 'Model S', saved: '3 days ago' },
    { brand: 'Mercedes', model: 'EQS', saved: '1 week ago' },
    { brand: 'BMW', model: 'i4 M50', saved: '2 weeks ago' },
  ];

  const achievements = [
    { name: 'AR Explorer', description: '100+ AR sessions completed', unlocked: true },
    { name: 'Maintenance Pro', description: 'Completed 10 maintenance guides', unlocked: true },
    { name: 'Model Expert', description: 'Viewed 25+ different EV models', unlocked: true },
    { name: 'Early Adopter', description: 'Used beta AR features', unlocked: false },
  ];

  const tabs = [
    { id: 'overview', name: 'Overview', icon: User },
    { id: 'activity', name: 'Activity', icon: Clock },
    { id: 'favorites', name: 'Favorites', icon: Heart },
    { id: 'achievements', name: 'Achievements', icon: Trophy },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Profile Header */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8 mb-8">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-emerald-500 rounded-full flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">John Tesla</h1>
                <p className="text-slate-300 mb-4">EV Enthusiast • AR Pioneer</p>
                <div className="flex items-center space-x-4">
                  <div className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-sm font-medium">
                    Pro User
                  </div>
                  <div className="text-slate-400 text-sm">
                    Member since March 2024
                  </div>
                </div>
              </div>
            </div>
            <button className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-2 rounded-lg transition-colors">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {userStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-700/50 rounded-xl mb-4">
                  <IconComponent className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-slate-400 text-sm">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Tab Navigation */}
          <div className="lg:col-span-3">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                          : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                      }`}
                    >
                      <IconComponent className="w-5 h-5 mr-3" />
                      {tab.name}
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="lg:col-span-9">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8">
              {activeTab === 'overview' && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">Account Overview</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
                      <div className="space-y-3">
                        {recentActivity.slice(0, 3).map((activity, index) => {
                          const IconComponent = activity.icon;
                          return (
                            <div key={index} className="flex items-center space-x-4 p-4 bg-slate-700/30 rounded-lg">
                              <div className="w-10 h-10 bg-slate-600 rounded-full flex items-center justify-center">
                                <IconComponent className="w-5 h-5 text-slate-300" />
                              </div>
                              <div className="flex-1">
                                <p className="text-white">{activity.action}</p>
                                <p className="text-slate-400 text-sm">{activity.time}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'activity' && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">Activity History</h2>
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => {
                      const IconComponent = activity.icon;
                      return (
                        <div key={index} className="flex items-center space-x-4 p-4 bg-slate-700/30 rounded-lg">
                          <div className="w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center">
                            <IconComponent className="w-6 h-6 text-slate-300" />
                          </div>
                          <div className="flex-1">
                            <p className="text-white font-medium">{activity.action}</p>
                            <p className="text-slate-400 text-sm">{activity.time}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === 'favorites' && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">Favorite Models</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {favoriteModels.map((model, index) => (
                      <div key={index} className="p-6 bg-slate-700/30 rounded-lg border border-slate-600/30">
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-pink-500/20 to-rose-500/20 rounded-xl flex items-center justify-center">
                            <Car className="w-6 h-6 text-pink-400" />
                          </div>
                          <Heart className="w-5 h-5 text-pink-400 fill-current" />
                        </div>
                        <h3 className="text-xl font-bold text-white">{model.brand}</h3>
                        <p className="text-slate-300 mb-2">{model.model}</p>
                        <p className="text-slate-400 text-sm">Saved {model.saved}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'achievements' && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">Achievements</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {achievements.map((achievement, index) => (
                      <div key={index} className={`p-6 rounded-lg border ${
                        achievement.unlocked 
                          ? 'bg-yellow-500/10 border-yellow-500/30' 
                          : 'bg-slate-700/30 border-slate-600/30'
                      }`}>
                        <div className="flex items-start justify-between mb-4">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            achievement.unlocked 
                              ? 'bg-yellow-500/20' 
                              : 'bg-slate-600/50'
                          }`}>
                            <Trophy className={`w-6 h-6 ${
                              achievement.unlocked ? 'text-yellow-400' : 'text-slate-400'
                            }`} />
                          </div>
                          {achievement.unlocked && (
                            <div className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full text-xs font-medium">
                              Unlocked
                            </div>
                          )}
                        </div>
                        <h3 className={`text-lg font-bold mb-2 ${
                          achievement.unlocked ? 'text-white' : 'text-slate-400'
                        }`}>
                          {achievement.name}
                        </h3>
                        <p className="text-slate-400 text-sm">{achievement.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-2xl font-bold text-white mb-6">Settings</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <Bell className="w-5 h-5 mr-2 text-blue-400" />
                        Notifications
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                          <div>
                            <p className="text-white">New AR Features</p>
                            <p className="text-slate-400 text-sm">Get notified about new AR capabilities</p>
                          </div>
                          <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded" />
                        </div>
                        <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                          <div>
                            <p className="text-white">Maintenance Reminders</p>
                            <p className="text-slate-400 text-sm">Remind me about vehicle maintenance</p>
                          </div>
                          <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                        <Shield className="w-5 h-5 mr-2 text-green-400" />
                        Privacy
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                          <div>
                            <p className="text-white">Location Services</p>
                            <p className="text-slate-400 text-sm">Allow location access for charging stations</p>
                          </div>
                          <input type="checkbox" defaultChecked className="w-4 h-4 text-green-600 bg-slate-700 border-slate-600 rounded" />
                        </div>
                        <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                          <div>
                            <p className="text-white">Usage Analytics</p>
                            <p className="text-slate-400 text-sm">Help improve the app by sharing usage data</p>
                          </div>
                          <input type="checkbox" className="w-4 h-4 text-green-600 bg-slate-700 border-slate-600 rounded" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;