import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import {
  Flame,
  Trophy,
  Zap,
  Target,
  Clock,
  ChevronRight,
  Play,
  Brain,
  BarChart3,
  MessageSquare,
  BookOpen,
  Star,
  TrendingUp,
  Award,
  Rocket,
  Home,
} from 'lucide-react';
import { NIXMascot } from '../components/NIXMascot';
import { useUser } from '../context/UserContext';

interface Mission {
  id: string;
  title: string;
  type: 'daily' | 'route' | 'evolution';
  progress: number;
  total: number;
  xp: number;
  completed: boolean;
}

interface Course {
  id: string;
  title: string;
  category: string;
  progress: number;
  lessons: number;
  duration: string;
  level: string;
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useUser();

  const missions: Mission[] = [
    { id: '1', title: 'Complete 3 lessons', type: 'daily', progress: 2, total: 3, xp: 150, completed: false },
    { id: '2', title: 'Practice fundamentals', type: 'daily', progress: 1, total: 1, xp: 100, completed: true },
    { id: '3', title: 'Achieve Rank Bronze', type: 'evolution', progress: 4, total: 5, xp: 500, completed: false },
    { id: '4', title: 'Finish Python Basics', type: 'route', progress: 85, total: 100, xp: 300, completed: false },
  ];

  const currentCourses: Course[] = [
    {
      id: 'python-fundamentals',
      title: 'Python Fundamentals',
      category: 'Programming',
      progress: 65,
      lessons: 24,
      duration: '12 hours',
      level: 'Foundation',
    },
    {
      id: 'data-analysis',
      title: 'Data Analysis Essentials',
      category: 'Data Science',
      progress: 30,
      lessons: 18,
      duration: '10 hours',
      level: 'Intermediate',
    },
  ];

  const stats = [
    { label: 'Current Rank', value: user?.altitude || 1, icon: TrendingUp, suffix: ' Level' },
    { label: 'Achievements', value: user?.flights || 0, icon: Award, suffix: '' },
    { label: 'Total Progress', value: user?.xp || 0, icon: Zap, suffix: ' XP' },
    { label: 'Completed', value: user?.completedLessons?.length || 0, icon: BookOpen, suffix: ' lessons' },
  ];

  const calculateLevelProgress = () => {
    const currentXP = user?.xp || 0;
    const xpInCurrentLevel = currentXP % 1000;
    return (xpInCurrentLevel / 1000) * 100;
  };

  return (
    <div className="min-h-screen bg-nexo-bg">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 bottom-0 w-20 bg-nexo-bg-secondary border-r border-nexo-border flex flex-col items-center py-6">
        <motion.div className="mb-8" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <NIXMascot size="sm" />
        </motion.div>

        <nav className="flex-1 flex flex-col gap-4">
          {[
            { icon: Home, label: 'Dashboard', path: '/dashboard', active: true },
            { icon: BookOpen, label: 'Courses', path: '/course/python-fundamentals', active: false },
            { icon: MessageSquare, label: 'Mentor', path: '/chat', active: false },
            { icon: Trophy, label: 'Achievements', path: '#', active: false },
          ].map((item, index) => (
            <motion.div key={item.label} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }}>
              <Link
                to={item.path}
                className={`relative w-12 h-12 rounded-lg flex items-center justify-center transition-all group ${
                  item.active ? 'bg-nexo-gold/10 text-nexo-gold' : 'text-nexo-text-muted hover:text-nexo-text hover:bg-nexo-bg-card'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.active && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-nexo-gold rounded-r-full" />
                )}
                <div className="absolute left-full ml-3 px-3 py-1.5 bg-nexo-bg-card rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg z-50">
                  <span className="text-sm">{item.label}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-20 p-6 md:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <motion.h1
              className="serif-heading text-3xl mb-1"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Welcome, <span className="text-nexo-gold">Scholar</span>
            </motion.h1>
            <p className="text-sm text-nexo-text-secondary">
              Your journey to excellence continues
            </p>
          </div>

          <div className="flex items-center gap-3">
            <motion.div
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-nexo-gold/10 border border-nexo-gold/20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Flame className="w-4 h-4 text-nexo-gold" />
              <span className="text-sm font-medium text-nexo-gold">{user?.streak || 1} day streak</span>
            </motion.div>

            <motion.div
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-nexo-bg-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Zap className="w-4 h-4 text-nexo-primary" />
              <span className="text-sm font-medium">{user?.xp || 0} XP</span>
            </motion.div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => {
            const StatIcon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                className="card"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="flex items-start justify-between mb-2">
                  <StatIcon className="w-5 h-5 text-nexo-gold" />
                </div>
                <div className="text-2xl font-semibold serif-heading mb-0.5">
                  {stat.value}<span className="text-base font-sans text-nexo-text-muted">{stat.suffix}</span>
                </div>
                <p className="text-xs text-nexo-text-muted">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Rank Progress */}
        <motion.div
          className="card mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-5">
            <div className="flex-shrink-0">
              <div className="relative w-16 h-16 rounded-full bg-nexo-bg-tertiary border-2 border-nexo-gold/30 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-nexo-gold" />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-nexo-gold flex items-center justify-center">
                  <span className="text-xs font-bold text-nexo-bg">{user?.altitude || 1}</span>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="serif-heading text-lg">Rank Level {user?.altitude || 1}</h3>
                  <p className="text-xs text-nexo-text-muted">
                    {1000 - ((user?.xp || 0) % 1000)} XP to next rank
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-nexo-gold">
                    {Math.floor(calculateLevelProgress())}%
                  </p>
                </div>
              </div>
              <div className="h-2 bg-nexo-bg-tertiary rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-nexo-gold rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${calculateLevelProgress()}%` }}
                  transition={{ duration: 0.8 }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Daily Missions */}
            <motion.div
              className="card"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-nexo-gold/10 flex items-center justify-center">
                    <Target className="w-4 h-4 text-nexo-gold" />
                  </div>
                  <h2 className="serif-heading text-lg">Daily Pursuits</h2>
                </div>
                <span className="text-xs text-nexo-text-muted">
                  {missions.filter(m => m.completed).length}/{missions.length}
                </span>
              </div>

              <div className="space-y-2.5">
                {missions.map((mission, index) => (
                  <motion.div
                    key={mission.id}
                    className={`p-3 rounded-lg flex items-center gap-3 ${
                      mission.completed
                        ? 'bg-nexo-success/5 border border-nexo-success/20'
                        : 'bg-nexo-bg-tertiary'
                    }`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      mission.completed
                        ? 'bg-nexo-success/20 text-nexo-success'
                        : mission.type === 'daily'
                        ? 'bg-nexo-gold/10 text-nexo-gold'
                        : 'bg-nexo-primary/10 text-nexo-primary'
                    }`}>
                      {mission.completed ? (
                        <Star className="w-4 h-4" />
                      ) : mission.type === 'daily' ? (
                        <Flame className="w-4 h-4" />
                      ) : (
                        <Rocket className="w-4 h-4" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-sm font-medium ${mission.completed ? 'text-nexo-text-muted' : ''}`}>
                          {mission.title}
                        </span>
                        <span className="text-xs text-nexo-gold">+{mission.xp} XP</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1 bg-nexo-border rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-nexo-gold rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${(mission.progress / mission.total) * 100}%` }}
                            transition={{ duration: 0.4 }}
                          />
                        </div>
                        <span className="text-[10px] text-nexo-text-muted w-8">
                          {mission.total > 10 ? `${mission.progress}%` : `${mission.progress}/${mission.total}`}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Current Courses */}
            <motion.div
              className="card"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-nexo-primary/10 flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-nexo-primary" />
                  </div>
                  <h2 className="serif-heading text-lg">Active Studies</h2>
                </div>
                <button className="text-xs text-nexo-gold hover:text-nexo-gold-light transition-colors">
                  View All
                </button>
              </div>

              <div className="space-y-2.5">
                {currentCourses.map((course, index) => (
                  <motion.button
                    key={course.id}
                    onClick={() => navigate(`/course/${course.id}`)}
                    className="w-full p-3 rounded-lg bg-nexo-bg-tertiary hover:bg-nexo-bg-card transition-all flex items-center gap-4 group"
                    whileHover={{ x: 2 }}
                  >
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs px-2 py-0.5 rounded bg-nexo-secondary/30 text-nexo-text-secondary">
                          {course.category}
                        </span>
                        <span className="text-[10px] text-nexo-text-muted">{course.level}</span>
                      </div>
                      <h3 className="text-sm font-medium mb-1.5">{course.title}</h3>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1 bg-nexo-border rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-nexo-gold rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${course.progress}%` }}
                          />
                        </div>
                        <span className="text-[10px] text-nexo-text-muted">{course.progress}%</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-nexo-text-muted group-hover:text-nexo-gold transition-colors" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* NIX Assistant */}
            <motion.div
              className="card"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <NIXMascot size="sm" />
                <div>
                  <h3 className="font-medium text-sm">NIX</h3>
                  <p className="text-[10px] text-nexo-text-muted">Your Mentor</p>
                </div>
              </div>
              <p className="text-xs text-nexo-text-secondary mb-4">
                Ready to guide your intellectual journey and answer questions.
              </p>
              <motion.button
                onClick={() => navigate('/chat')}
                className="w-full btn-secondary text-sm py-2.5 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <MessageSquare className="w-4 h-4" />
                Consult NIX
              </motion.button>
            </motion.div>

            {/* Study Recommendation */}
            <motion.div
              className="card"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-4 h-4 text-nexo-gold" />
                <h3 className="font-medium text-sm">Recommended Study</h3>
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-nexo-bg-tertiary">
                  <div className="flex items-start gap-3">
                    <Brain className="w-5 h-5 text-nexo-gold mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium mb-1">Mathematical Logic</h4>
                      <p className="text-[10px] text-nexo-text-muted mb-2">
                        Strengthen your analytical foundation
                      </p>
                      <span className="text-[10px] text-nexo-gold">+500 XP available</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-nexo-text-muted pt-2 border-t border-nexo-border">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    ~4 hours
                  </span>
                  <span>12 lessons</span>
                </div>
              </div>

              <motion.button
                onClick={() => navigate('/course/math-logic')}
                className="w-full btn-primary text-sm mt-4 py-2.5 flex items-center justify-center gap-2"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <Play className="w-4 h-4" />
                Begin Study
              </motion.button>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              className="card"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <h3 className="font-medium text-sm mb-3">Quick Actions</h3>
              <div className="space-y-2">
                {[
                  { icon: Brain, label: 'Practice concepts' },
                  { icon: Trophy, label: 'View achievements' },
                  { icon: Target, label: 'Set goals' },
                ].map((action) => {
                  const ActionIcon = action.icon;
                  return (
                    <motion.button
                      key={action.label}
                      onClick={() => navigate('/chat')}
                      className="w-full p-2.5 rounded-lg bg-nexo-bg-tertiary hover:bg-nexo-bg-card transition-all flex items-center gap-3"
                      whileHover={{ x: 2 }}
                    >
                      <ActionIcon className="w-4 h-4 text-nexo-gold" />
                      <span className="text-xs">{action.label}</span>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
