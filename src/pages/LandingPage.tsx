import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  BookOpen,
  Compass,
  Trophy,
  Users,
  Award,
  ChevronRight,
  Star,
} from 'lucide-react';
import { NIXMascot } from '../components/NIXMascot';

export default function LandingPage() {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Caminhos Personalizados',
      description: 'Currículos curados pela IA especificamente para sua jornada de aprendizado.',
      icon: Compass,
    },
    {
      title: 'Mentoria Inteligente',
      description: 'NIX o guia em cada passo com sabedoria e insights personalizados.',
      icon: BookOpen,
    },
    {
      title: 'Excelência Acadêmica',
      description: 'Conteúdo rigoroso refinado para compreensão profunda e domínio.',
      icon: Award,
    },
    {
      title: 'Conquistas Significativas',
      description: 'Acompanhe seu crescimento através de marcos e rankings significativos.',
      icon: Trophy,
    },
  ];

  const stats = [
    { value: '50.000+', label: 'Alunos' },
    { value: '200+', label: 'Disciplinas' },
    { value: '98%', label: 'Satisfação' },
  ];

  return (
    <div className="min-h-screen bg-nexo-bg">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-nexo-bg/95 backdrop-blur-md border-b border-nexo-divider">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <NIXMascot size="sm" variant="simple" />
              <div>
                <h1 className="text-lg font-bold serif-heading text-nexo-red">NEXO</h1>
                <p className="text-[10px] text-nexo-text-secondary font-semibold">ACADEMY</p>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-nexo-text-secondary hover:text-nexo-red transition-colors">
                Princípios
              </a>
              <a href="#method" className="text-sm text-nexo-text-secondary hover:text-nexo-red transition-colors">
                Método
              </a>
              <a href="#excellence" className="text-sm text-nexo-text-secondary hover:text-nexo-red transition-colors">
                Excelência
              </a>
            </div>

            {/* CTA */}
            <motion.button
              onClick={() => navigate('/onboarding')}
              className="btn-primary text-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Começar Jornada
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(90deg, #B61F1F, #B61F1F 2px, transparent 2px, transparent 20px)',
            backgroundSize: '20px 20px'
          }} />
        </div>

        <div className="max-w-6xl mx-auto relative">
          <div className="max-w-3xl mx-auto text-center">
            {/* Tagline */}
            <motion.p
              className="text-nexo-red font-semibold text-sm mb-6 tracking-widest uppercase"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Educação de Excelência
            </motion.p>

            {/* Main Heading */}
            <motion.h1
              className="serif-heading text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight text-nexo-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Eleve Seu <span className="text-red-gradient">Intelecto</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-lg md:text-xl text-nexo-text-secondary mb-10 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Um mentor guiando sua evolução. NEXO Academy combina a sabedoria do aprendizado clássico com a precisão da inteligência artificial.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <motion.button
                onClick={() => navigate('/onboarding')}
                className="btn-primary text-base px-8 py-4 group inline-flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Comece sua Jornada
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </motion.button>
              <motion.button
                className="btn-secondary text-base px-8 py-4"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Conheça Nossa Filosofia
              </motion.button>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              className="mt-16 flex items-center justify-center gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-2xl font-bold serif-heading text-nexo-red">{stat.value}</p>
                  <p className="text-sm text-nexo-text-secondary">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* NIX Mascot */}
          <motion.div
            className="flex justify-center mt-16"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <NIXMascot size="lg" variant="badge" />
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="section-divider max-w-4xl mx-auto my-16" />

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-nexo-red font-semibold text-sm mb-3 tracking-widest uppercase">
              O Método NEXO
            </p>
            <h2 className="serif-heading text-3xl md:text-4xl mb-4 text-nexo-text">Filosofia de Excelência</h2>
            <p className="text-nexo-text-secondary max-w-2xl mx-auto">
              Onde a sabedoria ancestral encontra a inteligência moderna. Uma abordagem transformadora para aprendizado contínuo.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="card group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded bg-nexo-red/10 border border-nexo-red/20 flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-nexo-red/15 group-hover:border-nexo-red/30">
                    <feature.icon className="w-5 h-5 text-nexo-red" />
                  </div>
                  <div>
                    <h3 className="serif-heading text-lg mb-2 group-hover:text-nexo-red transition-colors text-nexo-text">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-nexo-text-secondary leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="method" className="py-20 px-6 bg-nexo-cream-dark/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-nexo-red font-semibold text-sm mb-3 tracking-widest uppercase">
              Sua Jornada
            </p>
            <h2 className="serif-heading text-3xl md:text-4xl mb-4 text-nexo-text">Caminho para o Domínio</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: 'I',
                title: 'Diagnóstico',
                description: 'NIX analisa seu conhecimento, padrões de aprendizado e objetivos intelectuais.',
              },
              {
                step: 'II',
                title: 'Currículo',
                description: 'Um caminho de aprendizado personalizado é criado para sua jornada única.',
              },
              {
                step: 'III',
                title: 'Domínio',
                description: 'Engaje-se profundamente, progrida significativamente, alcance excelência duradoura.',
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                className="relative text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-nexo-red/10 border-2 border-nexo-red/30 mb-4">
                  <span className="serif-heading text-2xl text-nexo-red">{item.step}</span>
                </div>
                <h3 className="serif-heading text-xl mb-2 text-nexo-text">{item.title}</h3>
                <p className="text-sm text-nexo-text-secondary">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Excellence Section */}
      <section id="excellence" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="academic-frame text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-6">
              <NIXMascot size="lg" variant="badge" className="mx-auto mb-6" />
            </div>

            <h2 className="serif-heading text-3xl md:text-4xl mb-4 text-nexo-text">
              Pronto para <span className="text-nexo-red">Evoluir</span>?
            </h2>

            <p className="text-nexo-text-secondary mb-8 max-w-xl mx-auto">
              Junte-se a milhares de estudiosos que transformaram suas capacidades intelectuais através de orientação de excelência.
            </p>

            <div className="flex items-center justify-center gap-1 mb-8">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-nexo-red fill-nexo-red" />
              ))}
            </div>

            <motion.button
              onClick={() => navigate('/onboarding')}
              className="btn-primary text-base px-10 py-4 group inline-flex items-center justify-center gap-2 mb-6"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Comece sua Jornada
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </motion.button>

            <div className="flex items-center justify-center gap-6 text-sm text-nexo-text-secondary border-t border-nexo-divider pt-6">
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                50.000+ estudiosos
              </span>
              <span className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                Excelência certificada
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-nexo-divider py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <NIXMascot size="sm" variant="simple" />
              <div>
                <h2 className="font-serif font-bold text-nexo-text">NEXO Academy</h2>
                <p className="text-xs text-nexo-text-secondary">Eleve Seu Intelecto</p>
              </div>
            </div>

            <p className="text-sm text-nexo-text-secondary">
              © 2024 NEXO Academy. Excelência em educação.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
