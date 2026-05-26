import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, BookOpen, Target, Briefcase, Brain, Zap } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();

  const topics = [
    { icon: Briefcase, label: 'PROGRAMAÇÃO\nE ENG.' },
    { icon: Brain, label: 'CIÊNCIA DE\nDADOS' },
    { icon: Zap, label: 'INTELIGÊNCIA\nARTIFICIAL' },
    { icon: Target, label: 'DESIGN E\nARQUITETURA' },
    { icon: BookOpen, label: 'NEGÓCIOS E\nESTRATÉGIA' },
    { icon: Brain, label: 'IDIOMAS E\nLITERATURA' },
  ];

  return (
    <div className="min-h-screen bg-nexo-bg">
      {/* Container Principal */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-3 gap-6">
          {/* COLUNA 1: TELA DE BOAS-VINDAS / ONBOARDING */}
          <motion.div
            className="content-box"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="red-header mb-6">
              1. TELA DE BOAS-VINDAS / ONBOARDING
            </div>

            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-1 mb-4">
                <span className="text-nexo-red text-lg">★</span>
                <span className="text-xs text-nexo-red font-bold uppercase tracking-widest">QUESTIONÁRIO 1 DE 7</span>
                <span className="text-nexo-red text-lg">★</span>
              </div>
              <h2 className="section-title text-2xl mb-3">QUE CONHECIMENTO VOCÊ BUSCA?</h2>
              <p className="text-sm text-nexo-text-secondary">Selecione as áreas que deseja dominar</p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {topics.map((topic, idx) => {
                const Icon = topic.icon;
                return (
                  <motion.button
                    key={idx}
                    className="content-box-sm hover:bg-nexo-red/5 transition-all"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Icon className="w-5 h-5 text-nexo-red" />
                      <span className="text-xs font-bold uppercase text-center text-nexo-text leading-tight">
                        {topic.label}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            <motion.button
              onClick={() => navigate('/onboarding')}
              className="btn-primary w-full flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
            >
              CONTINUAR
              <ChevronRight className="w-4 h-4" />
            </motion.button>

            {/* Indicador de página */}
            <div className="flex justify-center gap-2 mt-6">
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all ${i === 0 ? 'bg-nexo-red w-6' : 'bg-nexo-divider'}`}
                />
              ))}
            </div>

            {/* Citação do mascote */}
            <div className="mt-8 bg-nexo-red/10 border-l-4 border-nexo-red px-4 py-3 rounded">
              <p className="text-xs text-nexo-text font-medium leading-relaxed">
                "Cada pequeno passo te leva mais alto. Confie no processo e aproveite o voo."
              </p>
              <p className="text-[10px] text-nexo-red font-bold mt-2">— NIX, Seu Mentor de Evolução</p>
            </div>
          </motion.div>

          {/* COLUNA 2: HOME / DASHBOARD */}
          <motion.div
            className="content-box col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="red-header mb-4">
              2. HOME / DASHBOARD
            </div>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <img src="/Design_sem_nome_(21).png" alt="NEXO" className="h-12 w-auto" />
                <div>
                  <h1 className="text-lg font-bold text-nexo-red">NEXO</h1>
                  <p className="text-[10px] text-nexo-red font-bold">ACADEMY</p>
                </div>
              </div>
              <div className="flex gap-2">
                {['Início', 'Jornada', 'Missões', 'Cursos', 'NIX (IA)'].map((item, idx) => (
                  <motion.button
                    key={idx}
                    className="px-3 py-1.5 text-[10px] font-bold uppercase border-2 border-nexo-red text-nexo-red rounded hover:bg-nexo-red hover:text-nexo-cream transition-all"
                    whileHover={{ scale: 1.05 }}
                  >
                    {item}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="divider-red" />

            <h2 className="text-2xl font-bold text-nexo-red uppercase mb-2">BOM DIA, FELIPE!</h2>
            <p className="text-sm text-nexo-text-secondary mb-6">Pronto para mais um passo na sua evolução?</p>

            {/* Sua Jornada Card */}
            <div className="bg-nexo-red text-nexo-cream p-4 rounded-lg mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold uppercase text-sm">SUA JORNADA</h3>
                <div className="text-right">
                  <div className="text-2xl font-bold">73%</div>
                </div>
              </div>
              <p className="text-xs mb-3 font-semibold">NÍVEL ATUAL</p>
              <p className="text-xs mb-3">ALUNO DEDICADO</p>
              <div className="bg-nexo-cream/30 rounded-full h-2 overflow-hidden">
                <div className="bg-nexo-cream h-full rounded-full w-3/4" />
              </div>
              <p className="text-[10px] mt-2 font-semibold">FALTAM 820 XP PARA O PRÓXIMO NÍVEL</p>
            </div>

            {/* Continue Card */}
            <div className="bg-nexo-cream-light border-2 border-nexo-red p-4 rounded-lg mb-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-nexo-red rounded flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-nexo-cream" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-nexo-red uppercase">CONTINUE DE ONDE PAROU</h4>
                  <p className="text-[10px] text-nexo-text-secondary">COPYWRITING ESTRATÉGICO</p>
                </div>
              </div>
              <div className="bg-nexo-cream w-full h-1 rounded-full overflow-hidden mb-2">
                <div className="bg-nexo-red h-full w-2/3" />
              </div>
              <p className="text-[10px] text-nexo-text-secondary mb-3">66%</p>
              <button className="btn-secondary text-[10px] w-full">CONTINUAR</button>
            </div>

            {/* Seus Cursos */}
            <h3 className="font-bold text-nexo-red uppercase text-sm mb-3">SEUS CURSOS</h3>
            <div className="grid grid-cols-4 gap-2 mb-4">
              {['Copywriting\nEstratégico', 'Tráfego Pago', 'Gestão de\nNegocios', 'Comunicação\ne Oratória'].map((course, idx) => (
                <div key={idx} className="bg-nexo-red text-nexo-cream p-3 rounded text-center text-[9px] font-bold">
                  <p className="mb-1">{course}</p>
                  <p className="text-[8px]">120h aulas</p>
                </div>
              ))}
            </div>

            <button className="text-nexo-red font-bold text-sm uppercase flex items-center gap-2 w-full justify-center py-2 border-2 border-nexo-red rounded hover:bg-nexo-red hover:text-nexo-cream transition-all">
              <span>+</span>
              <span>EXPLORAR MAIS CURSOS</span>
            </button>
          </motion.div>

          {/* COLUNA 3: ASSISTENTE NIX (IA) */}
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
              <div className="flex justify-center mb-4">
                <img src="/Design_sem_nome_(22).png" alt="NIX" className="h-20 w-20 rounded-full object-cover" />
              </div>
              <h3 className="font-bold text-nexo-red uppercase text-sm">NIX</h3>
              <p className="text-[10px] text-nexo-text-secondary">Seu Mentor de Evolução</p>
            </div>

            <div className="bg-nexo-cream-light border-2 border-nexo-red p-4 rounded-lg mb-4 text-center">
              <h4 className="font-bold text-nexo-red uppercase mb-2">Olá, Felipe!</h4>
              <p className="text-xs text-nexo-text leading-relaxed">
                Estou aqui para guiar sua jornada e responder suas perguntas. Como posso te ajudar hoje?
              </p>
            </div>

            <div className="space-y-2 mb-6">
              {[
                'EXPLICAR ESTE CONTEÚDO',
                'CRIAR PLANO DE ESTUDOS',
                'RECOMENDAR CURSOS',
                'FAZER UM QUIZ',
                'TIRAR UMA DÚVIDA',
              ].map((action, idx) => (
                <motion.button
                  key={idx}
                  className="btn-secondary text-[10px] w-full flex items-center gap-2 justify-center"
                  whileHover={{ scale: 1.02 }}
                >
                  <Zap className="w-3 h-3" />
                  {action}
                </motion.button>
              ))}
            </div>

            {/* Chat Input */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Pergunte ao NIX..."
                className="flex-1 px-3 py-2 border-2 border-nexo-red rounded-lg text-xs placeholder-nexo-text-secondary focus:outline-none focus:ring-2 focus:ring-nexo-red"
              />
              <motion.button
                className="bg-nexo-red text-nexo-cream px-4 py-2 rounded-lg font-bold"
                whileHover={{ scale: 1.05 }}
              >
                →
              </motion.button>
            </div>

            {/* Stats */}
            <div className="divider-red mt-6 mb-4" />
            <h4 className="font-bold text-nexo-red uppercase text-xs mb-3">SEU DESEMPENHO</h4>
            <div className="stats-container">
              <div className="stat-item">
                <span className="text-[10px] font-bold text-nexo-text-secondary">AULAS CONCLUÍDAS</span>
                <span className="font-bold text-nexo-red">18</span>
              </div>
              <div className="stat-item">
                <span className="text-[10px] font-bold text-nexo-text-secondary">HORAS DE ESTUDO</span>
                <span className="font-bold text-nexo-red">12h 45m</span>
              </div>
              <div className="stat-item">
                <span className="text-[10px] font-bold text-nexo-text-secondary">QUIZZES ACERTOS</span>
                <span className="font-bold text-nexo-red">87%</span>
              </div>
              <div className="stat-item">
                <span className="text-[10px] font-bold text-nexo-text-secondary">SEQUÊNCIA ATUAL</span>
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
