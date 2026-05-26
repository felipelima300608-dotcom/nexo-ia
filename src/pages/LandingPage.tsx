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
      title: 'Personalized Learning Paths',
      description: 'AI-curated curricula designed for your unique intellectual journey.',
      icon: Compass,
    },
    {
      title: 'Intelligent Mentorship',
      description: 'NIX guides every step with wisdom and personalized insights.',
      icon: BookOpen,
    },
    {
      title: 'Academic Excellence',
      description: 'Rigorous content refined for deep understanding and mastery.',
      icon: Award,
    },
    {
      title: 'Progressive Achievement',
      description: 'Track your growth through meaningful milestones and ranks.',
      icon: Trophy,
    },
  ];

  const stats = [
    { value: '50,000+', label: 'Scholars' },
    { value: '200+', label: 'Disciplines' },
    { value: '98%', label: 'Satisfaction' },
  ];

  return (
    <div className="min-h-screen bg-nexo-bg">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-nexo-bg/90 backdrop-blur-md border-b border-nexo-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <NIXMascot size="sm" />
              <div>
                <h1 className="text-xl font-serif font-semibold tracking-tight">NEXO</h1>
                <p className="text-[10px] text-nexo-gold uppercase tracking-[0.2em] -mt-0.5">Academy</p>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#philosophy" className="text-sm text-nexo-text-muted hover:text-nexo-text transition-colors">
                Philosophy
              </a>
              <a href="#method" className="text-sm text-nexo-text-muted hover:text-nexo-text transition-colors">
                Method
              </a>
              <a href="#excellence" className="text-sm text-nexo-text-muted hover:text-nexo-text transition-colors">
                Excellence
              </a>
            </div>

            {/* CTA */}
            <motion.button
              onClick={() => navigate('/onboarding')}
              className="btn-primary text-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Begin Journey
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-nexo-navy/30 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-nexo-gold/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto relative">
          <div className="max-w-3xl mx-auto text-center">
            {/* Tagline */}
            <motion.p
              className="text-nexo-gold uppercase tracking-[0.25em] text-xs font-medium mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Intelligent Learning Excellence
            </motion.p>

            {/* Main Heading */}
            <motion.h1
              className="serif-heading text-4xl md:text-6xl lg:text-7xl mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Elevate Your{' '}
              <span className="text-gold-gradient">Intellect</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-lg md:text-xl text-nexo-text-secondary mb-10 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              A mentor guiding your evolution. NEXO Academy combines the wisdom of classical education
              with the precision of artificial intelligence.
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
                Start Your Journey
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </motion.button>
              <motion.button
                className="btn-outline text-base px-8 py-4"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Learn Our Philosophy
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
                  <p className="text-2xl font-semibold serif-heading text-nexo-gold">{stat.value}</p>
                  <p className="text-sm text-nexo-text-muted">{stat.label}</p>
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
            <div className="relative">
              <NIXMascot size="xl" />
              <motion.div
                className="mt-6 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <p className="text-nexo-gold font-serif text-lg">NIX</p>
                <p className="text-xs text-nexo-text-muted uppercase tracking-widest">Your Mentor</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="section-divider max-w-4xl mx-auto my-16" />

      {/* Features Section */}
      <section id="philosophy" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-nexo-gold uppercase tracking-[0.2em] text-xs font-medium mb-3">
              The NEXO Method
            </p>
            <h2 className="serif-heading text-3xl md:text-4xl mb-4">Philosophy of Excellence</h2>
            <p className="text-nexo-text-secondary max-w-2xl mx-auto">
              Where ancient wisdom meets modern intelligence. A transformative approach to lifelong learning.
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
                  <div className="w-12 h-12 rounded-lg bg-nexo-gold/10 border border-nexo-gold/20 flex items-center justify-center flex-shrink-0 transition-colors group-hover:bg-nexo-gold/15 group-hover:border-nexo-gold/30">
                    <feature.icon className="w-5 h-5 text-nexo-gold" />
                  </div>
                  <div>
                    <h3 className="serif-heading text-lg mb-2 group-hover:text-nexo-gold transition-colors">
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

      {/* How It Works */}
      <section id="method" className="py-20 px-6 bg-nexo-bg-secondary">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-nexo-gold uppercase tracking-[0.2em] text-xs font-medium mb-3">
              Your Path
            </p>
            <h2 className="serif-heading text-3xl md:text-4xl mb-4">The Journey to Mastery</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: 'I',
                title: 'Diagnosis',
                description: 'NIX analyzes your knowledge, learning patterns, and intellectual goals.',
              },
              {
                step: 'II',
                title: 'Curriculum',
                description: 'A personalized learning path is crafted for your unique journey.',
              },
              {
                step: 'III',
                title: 'Mastery',
                description: 'Engage deeply, progress meaningfully, achieve lasting excellence.',
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
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-nexo-gold/10 border border-nexo-gold/30 mb-4">
                  <span className="serif-heading text-2xl text-nexo-gold">{item.step}</span>
                </div>
                <h3 className="serif-heading text-xl mb-2">{item.title}</h3>
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
            className="card text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="py-8">
              <NIXMascot size="lg" className="mx-auto mb-6" />

              <h2 className="serif-heading text-3xl md:text-4xl mb-4">
                Ready to <span className="text-nexo-gold">Elevate</span>?
              </h2>

              <p className="text-nexo-text-secondary mb-8 max-w-xl mx-auto">
                Join thousands of scholars who have transformed their intellectual capabilities
                through guided excellence.
              </p>

              <div className="flex items-center justify-center gap-3 mb-8">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-nexo-gold fill-nexo-gold" />
                ))}
              </div>

              <motion.button
                onClick={() => navigate('/onboarding')}
                className="btn-primary text-base px-10 py-4 group inline-flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Begin Your Journey
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </motion.button>

              <div className="mt-6 flex items-center justify-center gap-6 text-sm text-nexo-text-muted">
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  50,000+ scholars
                </span>
                <span className="flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  Excellence certified
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-nexo-border py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <NIXMascot size="sm" />
              <div>
                <h2 className="font-serif font-semibold">NEXO Academy</h2>
                <p className="text-xs text-nexo-text-muted">Elevate Your Mind</p>
              </div>
            </div>

            <p className="text-sm text-nexo-text-muted">
              © 2024 NEXO Academy. Excellence in education.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
