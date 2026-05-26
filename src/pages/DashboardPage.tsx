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
  MessageSquare,
  BookOpen,
  TrendingUp,
  Award,
  Rocket,
  Home,
  Check,
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
    { id: '1', title: 'Completar 3 lições', type: 'daily', progress: 2, total: 3, xp: 150, completed: false },
    { id: '2', title: 'Praticar fundamentos', type: 'daily', progress: 1, total: 1, xp: 100, completed: true },
    { id: '3', title: 'Atingir Nível Bronze', type: 'evolution', progress: 4, total: 5, xp: 500, completed: false },
    { id: '4', title: 'Finalizar Python Básico', type: 'route', progress: 85, total: 100, xp: 300, completed: false },
  ];

  const currentCourses: Course[] = [
    {
      id: 'python-fundamentals',
      title: 'Fundamentos de Python',
      category: 'Programação',
      progress: 65,
      lessons: 24,
      duration: '12 horas',
      level: 'Fundação',
    },
    {
      id: 'data-analysis',
      title: 'Essenciais de Análise de Dados',
      category: 'Ciência de Dados',
      progress: 30,
      lessons: 18,
      duration: '10 horas',
      level: 'Intermediário',
    },
  ];

  const stats = [
    { label: 'Nível Atual', value: user?.altitude || 1, icon: TrendingUp, suffix: '' },
    { label: 'Conquistas', value: user?.flights || 0, icon: Award, suffix: '' },
    { label: 'Progresso Total', value: user?.xp || 0, icon: Zap, suffix: ' XP' },
    { label: 'Concluído', value: user?.completedLessons?.length || 0, icon: BookOpen, suffix: '' },
  ];

  const calculateLevelProgress = () => {
    const currentXP = user?.xp || 0;
    const xpInCurrentLevel = currentXP % 1000;
    return (xpInCurrentLevel / 1000) * 100;
  };

  return (
    <div className="min-h-screen bg-nexo-bg">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 bottom-0 w-20 bg-nexo-cream-dark border-r border-nexo-divider flex flex-col items-center py-6">
        <motion.div className="mb-8" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <NIXMascot size="sm" variant="simple" />
        </motion.div>

        <nav className="flex-1 flex flex-col gap-4">
          {[
            { icon: Home, label: 'Início', path: '/dashboard', active: true },
            { icon: BookOpen, label: 'Cursos', path: '/course/python-fundamentals', active: false },
            { icon: MessageSquare, label: 'Mentor', path: '/chat', active: false },
            { icon: Trophy, label: 'Conquistas', path: '#', active: false },
          ].map((item, index) => (
            <motion.div key={item.label} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.05 }}>
              <Link
                to={item.path}
                className={`relative w-12 h-12 rounded flex items-center justify-center transition-all group ${
                  item.active ? 'bg-nexo-red/10 text-nexo-red' : 'text-nexo-text-secondary hover:text-nexo-text hover:bg-nexo-cream-light'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.active && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-nexo-red" />
                )}
                <div className="absolute left-full ml-2 px-2 py-1 bg-nexo-bg-card rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                  {item.label}
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
            <motion.h1 className="serif-heading text-3xl mb-1 text-nexo-text" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
              Bem-vindo, <span className="text-nexo-red">Estudante</span>
            </motion.h1>
            <p className="text-sm text-nexo-text-secondary">Sua jornada de excelência continua</p>
          </div>

          <div className="flex items-center gap-3">
            <motion.div className="flex items-center gap-2 px-3 py-1.5 rounded bg-nexo-red/10 border border-nexo-red/20" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
              <Flame className="w-4 h-4 text-nexo-red" />
              <span className="text-sm font-medium text-nexo-red">{user?.streak || 1} dias</span>
            </motion.div>

            <motion.div className="flex items-center gap-2 px-3 py-1.5 rounded bg-nexo-cream-dark" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
              <Zap className="w-4 h-4 text-nexo-red" />
              <span className="text-sm font-medium text-nexo-text">{user?.xp || 0} XP</span>
            </motion.div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => {
            const StatIcon = stat.icon;
            return (
              <motion.div key={stat.label} className="card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}>
                <div className="flex items-start justify-between mb-2">
                  <StatIcon className="w-5 h-5 text-nexo-red" />
                </div>
                <div className="text-2xl font-semibold serif-heading mb-0.5 text-nexo-text">
                  {stat.value}<span className="text-base font-sans text-nexo-text-muted">{stat.suffix}</span>
                </div>
                <p className="text-xs text-nexo-text-secondary">{stat.label}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Rank Progress */}
        <motion.div className="card mb-8" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className="flex items-center gap-5">
            <div className="flex-shrink-0">
              <div className="relative w-16 h-16 rounded-full bg-nexo-cream-dark border-2 border-nexo-red/30 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-nexo-red" />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-nexo-red flex items-center justify-center">
                  <span className="text-xs font-bold text-nexo-cream">{user?.altitude || 1}</span>
                </div>
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="serif-heading text-lg text-nexo-text">Nível {user?.altitude || 1}</h3>
                  <p className="text-xs text-nexo-text-secondary">
                    {1000 - ((user?.xp || 0) % 1000)} XP para o próximo nível
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-nexo-red">
                    {Math.floor(calculateLevelProgress())}%
                  </p>
                </div>
              </div>
              <div className="h-2 bg-nexo-cream-dark rounded-full overflow-hidden">
                <motion.div className="h-full bg-nexo-red rounded-full" initial={{ width: 0 }} animate={{ width: `${calculateLevelProgress()}%` }} transition={{ duration: 0.8 }} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Daily Missions */}
            <motion.div className="card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded bg-nexo-red/10 flex items-center justify-center">
                    <Target className="w-4 h-4 text-nexo-red" />
                  </div>
                  <h2 className="serif-heading text-lg text-nexo-text">Missões Diárias</h2>
                </div>
                <span className="text-xs text-nexo-text-secondary">
                  {missions.filter(m => m.completed).length}/{missions.length}
                </span>
              </div>

              <div className="space-y-2.5">
                {missions.map((mission, index) => (
                  <motion.div
                    key={mission.id}
                    className={`p-3 rounded flex items-center gap-3 transition-all ${
                      mission.completed
                        ? 'bg-nexo-success/5 border border-nexo-success/20'
                        : 'bg-nexo-cream-light'
                    }`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + index * 0.05 }}
                  >
                    <div className={`w-8 h-8 rounded flex items-center justify-center flex-shrink-0 ${
                      mission.completed
                        ? 'bg-nexo-success/20 text-nexo-success'
                        : 'bg-nexo-red/10 text-nexo-red'
                    }`}>
                      {mission.completed ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-sm ${mission.completed ? 'text-nexo-text-muted line-through' : 'text-nexo-text font-medium'}`}>
                          {mission.title}
                        </span>
                        <span className="text-xs text-nexo-red">+{mission.xp} XP</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1 bg-nexo-divider rounded-full overflow-hidden">
                          <motion.div className="h-full bg-nexo-red rounded-full" initial={{ width: 0 }} animate={{ width: `${(mission.progress / mission.total) * 100}%` }} transition={{ duration: 0.4 }} />
                        </div>
                        <span className="text-[10px] text-nexo-text-secondary w-8">
                          {mission.total > 10 ? `${mission.progress}%` : `${mission.progress}/${mission.total}`}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Current Courses */}
            <motion.div className="card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded bg-nexo-red/10 flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-nexo-red" />
                  </div>
                  <h2 className="serif-heading text-lg text-nexo-text">Estudos Ativos</h2>
                </div>
                <button className="text-xs text-nexo-red hover:text-nexo-red/80 transition-colors">
                  Ver Todos
                </button>
              </div>

              <div className="space-y-2.5">
                {currentCourses.map((course) => (
                  <motion.button
                    key={course.id}
                    onClick={() => navigate(`/course/${course.id}`)}
                    className="w-full p-3 rounded bg-nexo-cream-light hover:bg-nexo-cream-dark transition-all flex items-center gap-4 group"
                    whileHover={{ x: 2 }}
                  >
                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs px-2 py-0.5 rounded bg-nexo-red/10 text-nexo-red">
                          {course.category}
                        </span>
                        <span className="text-[10px] text-nexo-text-secondary">{course.level}</span>
                      </div>
                      <h3 className="text-sm font-medium text-nexo-text mb-1.5">{course.title}</h3>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1 bg-nexo-divider rounded-full overflow-hidden">
                          <motion.div className="h-full bg-nexo-red rounded-full" initial={{ width: 0 }} animate={{ width: `${course.progress}%` }} />
                        </div>
                        <span className="text-[10px] text-nexo-text-secondary">{course.progress}%</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-nexo-text-secondary group-hover:text-nexo-red transition-colors" />
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* NIX Assistant */}
            <motion.div className="card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
              <div className="flex items-center gap-3 mb-4">
                <NIXMascot size="sm" variant="simple" />
                <div>
                  <h3 className="font-medium text-sm text-nexo-text">NIX</h3>
                  <p className="text-[10px] text-nexo-text-secondary">Seu Mentor</p>
                </div>
              </div>
              <p className="text-xs text-nexo-text-secondary mb-4">
                Pronto para guiar sua jornada intelectual e responder perguntas.
              </p>
              <motion.button onClick={() => navigate('/chat')} className="w-full btn-primary text-sm py-2.5 flex items-center justify-center gap-2" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                <MessageSquare className="w-4 h-4" />
                Consultar NIX
              </motion.button>
            </motion.div>

            {/* Study Recommendation */}
            <motion.div className="card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-4 h-4 text-nexo-red" />
                <h3 className="font-medium text-sm text-nexo-text">Estudo Recomendado</h3>
              </div>

              <div className="space-y-3">
                <div className="p-2.5 rounded bg-nexo-cream-light">
                  <div className="flex items-start gap-3">
                    <Brain className="w-5 h-5 text-nexo-red mt-0.5" />
                    <div>
                      <h4 className="text-sm font-medium text-nexo-text mb-1">Lógica Matemática</h4>
                      <p className="text-[10px] text-nexo-text-secondary mb-2">
                        Fortaleça sua base analítica
                      </p>
                      <span className="text-[10px] text-nexo-red">+500 XP disponível</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-nexo-text-secondary pt-2 border-t border-nexo-divider">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    ~4 horas
                  </span>
                  <span>12 lições</span>
                </div>
              </div>

              <motion.button onClick={() => navigate('/course/math-logic')} className="w-full btn-primary text-sm mt-4 py-2.5 flex items-center justify-center gap-2" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                <Play className="w-4 h-4" />
                Começar
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
