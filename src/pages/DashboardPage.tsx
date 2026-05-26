import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
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
import { useUser } from '../context/UserContext';

interface Mission {
  id: string;
  title: string;
  progress: number;
  total: number;
  xp: number;
  completed: boolean;
}

interface Course {
  id: string;
  title: string;
  hours: string;
  progress?: number;
}

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useUser();

  const missions: Mission[] = [
    { id: '1', title: 'Completar 3 lições', progress: 2, total: 3, xp: 150, completed: false },
    { id: '2', title: 'Praticar fundamentos', progress: 1, total: 1, xp: 100, completed: true },
    { id: '3', title: 'Atingir Nível Bronze', progress: 0, total: 1, xp: 250, completed: false },
  ];

  const courses: Course[] = [
    { id: '1', title: 'Copywriting\nEstratégico', hours: '120h aulas' },
    { id: '2', title: 'Tráfego Pago', hours: '90h aulas' },
    { id: '3', title: 'Gestão de\nNegocios', hours: '80h aulas' },
    { id: '4', title: 'Comunicação\ne Oratória', hours: '95h aulas' },
  ];

  const stats = [
    { label: 'Aulas Concluídas', value: '18', icon: BookOpen },
    { label: 'Horas de Estudo', value: '12h 45m', icon: Clock },
    { label: 'Quizzes Acertos', value: '87%', icon: Trophy },
    { label: 'Sequência Atual', value: '7 DIAS', icon: Flame },
  ];

  return (
    <div className="min-h-screen bg-nexo-bg">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-3 gap-6">
          {/* COLUNA 1: Missions & Courses */}
          <motion.div
            className="content-box"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="red-header mb-6">
              MISSÕES DIÁRIAS
            </div>

            <div className="space-y-3 mb-8">
              {missions.map((mission, idx) => (
                <motion.div
                  key={mission.id}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    mission.completed
                      ? 'bg-nexo-green/10 border-nexo-success'
                      : 'bg-nexo-cream-light border-nexo-red'
                  }`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-5 h-5 rounded flex items-center justify-center ${
                        mission.completed
                          ? 'bg-nexo-success text-nexo-cream'
                          : 'bg-nexo-red text-nexo-cream'
                      }`}>
                        {mission.completed ? <Check className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                      </div>
                      <span className="font-bold text-sm text-nexo-text">{mission.title}</span>
                    </div>
                    <span className="text-xs font-bold text-nexo-red">+{mission.xp} XP</span>
                  </div>
                  <div className="bg-nexo-cream/30 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${mission.completed ? 'bg-nexo-success' : 'bg-nexo-red'}`}
                      style={{ width: `${(mission.progress / mission.total) * 100}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-nexo-text-secondary mt-1">
                    {mission.progress}/{mission.total} completo
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="divider-red mb-6" />

            <h3 className="font-bold text-nexo-red uppercase text-sm mb-4">SEUS CURSOS</h3>
            <div className="grid grid-cols-2 gap-2 mb-4">
              {courses.map((course, idx) => (
                <motion.div
                  key={course.id}
                  className="bg-nexo-red text-nexo-cream p-3 rounded-lg text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <p className="text-[10px] font-bold leading-tight mb-1">{course.title}</p>
                  <p className="text-[8px] opacity-90">{course.hours}</p>
                </motion.div>
              ))}
            </div>

            <button className="text-nexo-red font-bold text-xs uppercase w-full py-2 border-2 border-nexo-red rounded hover:bg-nexo-red hover:text-nexo-cream transition-all">
              + EXPLORAR MAIS CURSOS
            </button>
          </motion.div>

          {/* COLUNA 2: Home/Status Principal */}
          <motion.div
            className="content-box"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="red-header mb-4">
              2. HOME / DASHBOARD
            </div>

            <div className="text-center mb-6">
              <h1 className="section-title text-2xl">BOM DIA, FELIPE!</h1>
              <p className="text-sm text-nexo-text-secondary">Pronto para mais um passo na sua evolução?</p>
            </div>

            {/* Sua Jornada */}
            <div className="bg-nexo-red text-nexo-cream p-4 rounded-lg mb-4">
              <h3 className="font-bold uppercase text-xs mb-3">SUA JORNADA</h3>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-[10px] font-bold mb-1">NÍVEL ATUAL</p>
                  <p className="text-sm font-bold">ALUNO DEDICADO</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold">73%</p>
                </div>
              </div>
              <div className="bg-nexo-cream/30 rounded-full h-2 overflow-hidden mb-3">
                <div className="bg-nexo-cream h-full rounded-full w-3/4" />
              </div>
              <p className="text-[10px] font-semibold">FALTAM 820 XP PARA O PRÓXIMO NÍVEL</p>
            </div>

            {/* Continue */}
            <div className="border-2 border-nexo-red p-4 rounded-lg mb-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-nexo-red rounded flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-4 h-4 text-nexo-cream" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-xs text-nexo-red uppercase">CONTINUE DE ONDE PAROU</h4>
                  <p className="text-[10px] text-nexo-text-secondary">COPYWRITING ESTRATÉGICO</p>
                </div>
              </div>
              <div className="bg-nexo-cream w-full h-1.5 rounded-full overflow-hidden mb-2">
                <div className="bg-nexo-red h-full w-2/3" />
              </div>
              <p className="text-[10px] text-nexo-text-secondary mb-3">66% complete</p>
              <button className="btn-secondary text-[10px] w-full">CONTINUAR</button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-2">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={idx}
                    className="bg-nexo-cream-light border-2 border-nexo-red p-3 rounded text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Icon className="w-4 h-4 text-nexo-red mx-auto mb-1" />
                    <p className="text-[9px] text-nexo-text-secondary mb-1 font-bold">{stat.label}</p>
                    <p className="text-sm font-bold text-nexo-red">{stat.value}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* COLUNA 3: NIX Assistant */}
          <motion.div
            className="content-box"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="red-header mb-4">
              3. ASSISTENTE NIX (IA)
            </div>

            <div className="text-center mb-6">
              <img src="/Design_sem_nome_(22).png" alt="NIX" className="h-20 w-20 rounded-full object-cover mx-auto mb-4" />
              <h3 className="font-bold text-nexo-red uppercase text-sm">NIX</h3>
              <p className="text-[10px] text-nexo-text-secondary">Seu Mentor de Evolução</p>
            </div>

            <div className="bg-nexo-red/10 border-2 border-nexo-red p-4 rounded-lg mb-4 text-center">
              <h4 className="font-bold text-nexo-red uppercase text-xs mb-2">Olá, Felipe!</h4>
              <p className="text-xs text-nexo-text leading-relaxed">
                Estou aqui para guiar sua jornada e responder suas perguntas. Como posso te ajudar hoje?
              </p>
            </div>

            <div className="space-y-2 mb-6">
              {[
                { icon: Zap, label: 'EXPLICAR ESTE CONTEÚDO' },
                { icon: BookOpen, label: 'CRIAR PLANO DE ESTUDOS' },
                { icon: Trophy, label: 'RECOMENDAR CURSOS' },
                { icon: Brain, label: 'FAZER UM QUIZ' },
                { icon: MessageSquare, label: 'TIRAR UMA DÚVIDA' },
              ].map((action, idx) => {
                const Icon = action.icon;
                return (
                  <motion.button
                    key={idx}
                    className="btn-secondary text-[10px] w-full flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Icon className="w-3 h-3" />
                    {action.label}
                  </motion.button>
                );
              })}
            </div>

            {/* Input */}
            <div className="flex gap-2 mb-6">
              <input
                type="text"
                placeholder="Pergunte ao NIX..."
                className="flex-1 px-3 py-2 border-2 border-nexo-red rounded-lg text-xs placeholder-nexo-text-secondary focus:outline-none focus:ring-2 focus:ring-nexo-red"
              />
              <motion.button
                className="bg-nexo-red text-nexo-cream px-4 py-2 rounded-lg font-bold text-sm"
                whileHover={{ scale: 1.05 }}
              >
                →
              </motion.button>
            </div>

            {/* Performance Stats */}
            <h4 className="font-bold text-nexo-red uppercase text-xs mb-3">SEU DESEMPENHO</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-2 bg-nexo-cream-light border-l-4 border-nexo-red rounded">
                <span className="text-[9px] text-nexo-text-secondary font-bold">AULAS CONCLUÍDAS</span>
                <span className="font-bold text-nexo-red">18</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-nexo-cream-light border-l-4 border-nexo-red rounded">
                <span className="text-[9px] text-nexo-text-secondary font-bold">HORAS DE ESTUDO</span>
                <span className="font-bold text-nexo-red">12h 45m</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-nexo-cream-light border-l-4 border-nexo-red rounded">
                <span className="text-[9px] text-nexo-text-secondary font-bold">QUIZZES ACERTOS</span>
                <span className="font-bold text-nexo-red">87%</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-nexo-cream-light border-l-4 border-nexo-red rounded">
                <span className="text-[9px] text-nexo-text-secondary font-bold">SEQUÊNCIA ATUAL</span>
                <span className="font-bold text-nexo-red">7 DIAS</span>
              </div>
            </div>

            <button className="btn-secondary text-[10px] w-full mt-4">VER RELATÓRIO COMPLETO</button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
