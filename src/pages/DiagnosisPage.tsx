import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Check,
  AlertTriangle,
  Target,
  TrendingUp,
  Brain,
  Rocket,
  ChevronRight,
  Award,
} from 'lucide-react';
import { NIXMascot } from '../components/NIXMascot';
import { useUser } from '../context/UserContext';

interface DiagnosisResult {
  category: string;
  icon: React.ElementType;
  items: { title: string; description: string; score: number }[];
}

export default function DiagnosisPage() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState<DiagnosisResult[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setResults(generateDiagnosis(user));
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, [user]);

  const generateDiagnosis = (userData: typeof user): DiagnosisResult[] => {
    const skillLevel = userData?.skillLevel || 'beginner';
    const goals = userData?.goals || [];

    const baseResults: DiagnosisResult[] = [];

    const strengths = [];
    if (skillLevel === 'advanced') {
      strengths.push({
        title: 'Strong Foundation',
        description: 'Your established knowledge base accelerates advanced learning',
        score: 85,
      });
    }
    if (goals.includes('programming') || goals.includes('ai')) {
      strengths.push({
        title: 'Future-Ready Focus',
        description: 'Your discipline choices align with emerging mastery paths',
        score: 78,
      });
    }
    if (userData?.timePerDay === '2hours') {
      strengths.push({
        title: 'Dedication Capacity',
        description: 'Time commitment enables deep comprehension',
        score: 90,
      });
    }
    if (strengths.length < 3) {
      strengths.unshift({
        title: 'Growth Mindset',
        description: 'Your commitment to learning is the foundation of excellence',
        score: 75,
      });
    }

    baseResults.push({
      category: 'Proficiencies',
      icon: Check,
      items: strengths.slice(0, 3),
    });

    const weaknesses = [];
    if (userData?.difficulties?.includes('time')) {
      weaknesses.push({
        title: 'Time Optimization',
        description: 'Structured scheduling will enhance your progress',
        score: 35,
      });
    } else {
      weaknesses.push({
        title: 'Consistency Building',
        description: 'Daily habits form the bedrock of mastery',
        score: 45,
      });
    }
    if (skillLevel === 'beginner') {
      weaknesses.push({
        title: 'Foundation Building',
        description: 'Establishing core knowledge is your first milestone',
        score: 30,
      });
    }
    if (weaknesses.length < 3) {
      weaknesses.push({
        title: 'Application Practice',
        description: 'Bridging theory and practical implementation',
        score: 50,
      });
    }

    baseResults.push({
      category: 'Areas for Development',
      icon: AlertTriangle,
      items: weaknesses.slice(0, 3),
    });

    const gaps = [];
    if (goals.includes('ai') && skillLevel !== 'advanced') {
      gaps.push({
        title: 'Mathematical Foundations',
        description: 'Linear algebra and statistics for AI comprehension',
        score: 25,
      });
    }
    if (goals.includes('data') && skillLevel !== 'advanced') {
      gaps.push({
        title: 'Analytical Tools',
        description: 'SQL, Python, and visualization mastery needed',
        score: 35,
      });
    }
    if (goals.includes('programming')) {
      gaps.push({
        title: 'Algorithmic Thinking',
        description: 'Problem-solving patterns and logic structures',
        score: 40,
      });
    }
    if (gaps.length < 3) {
      gaps.push({
        title: 'System Architecture',
        description: 'Design principles and scalability concepts',
        score: 30,
      });
    }

    baseResults.push({
      category: 'Knowledge Gaps',
      icon: Target,
      items: gaps.slice(0, 3),
    });

    const recommendations = [
      {
        title: 'Tailored Curriculum',
        description: `Optimized for ${userData?.timePerDay || '30min'} daily sessions`,
        score: 95,
      },
      {
        title: 'Structured Progression',
        description: 'Bite-sized lessons for deep comprehension',
        score: 88,
      },
      {
        title: 'Adaptive Difficulty',
        description: 'Challenge scaling for your growth trajectory',
        score: 92,
      },
    ];

    baseResults.push({
      category: 'NIX Recommendations',
      icon: Brain,
      items: recommendations,
    });

    return baseResults;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-nexo-bg flex items-center justify-center">
        <div className="text-center max-w-md">
          <NIXMascot size="lg" className="mx-auto mb-8" />
          <motion.div
            className="serif-heading text-2xl mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Analyzing Your Profile
          </motion.div>
          <p className="text-nexo-text-secondary mb-8 text-sm">
            NIX is crafting your personalized learning pathway
          </p>
          <div className="flex items-center justify-center gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 bg-nexo-gold rounded-full"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-nexo-bg relative overflow-hidden">
      {/* Subtle background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-nexo-navy/20 rounded-full blur-3xl" />
      </div>

      <div className="relative min-h-screen flex flex-col px-6 py-16">
        <div className="max-w-5xl mx-auto w-full">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center justify-center mb-4">
              <NIXMascot size="md" />
            </div>

            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-nexo-gold/10 border border-nexo-gold/20 mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring' }}
            >
              <Check className="w-4 h-4 text-nexo-gold" />
              <span className="text-sm text-nexo-gold">Analysis Complete</span>
            </motion.div>

            <h1 className="serif-heading text-3xl md:text-4xl mb-3">
              Your Intellectual <span className="text-nexo-gold">Profile</span>
            </h1>
            <p className="text-nexo-text-secondary max-w-xl mx-auto">
              NIX has assessed your knowledge, patterns, and potential for excellence
            </p>
          </motion.div>

          {/* Results Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {results.map((result, index) => (
              <motion.div
                key={result.category}
                className="card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {(() => {
                  const ResultIcon = result.icon;
                  return (
                    <div className="flex items-center gap-3 mb-5">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        result.category === 'Proficiencies'
                          ? 'bg-nexo-success/10 text-nexo-success'
                          : result.category === 'Areas for Development'
                          ? 'bg-nexo-warning/10 text-nexo-warning'
                          : result.category === 'Knowledge Gaps'
                          ? 'bg-nexo-error/10 text-nexo-error'
                          : 'bg-nexo-gold/10 text-nexo-gold'
                      }`}>
                        <ResultIcon className="w-5 h-5" />
                      </div>
                      <h2 className="serif-heading text-lg">{result.category}</h2>
                    </div>
                  );
                })()}

                <div className="space-y-4">
                  {result.items.map((item, idx) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + idx * 0.1 }}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-medium">{item.title}</span>
                        <span className="text-xs text-nexo-text-muted">{item.score}%</span>
                      </div>
                      <div className="h-1.5 bg-nexo-bg-tertiary rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-nexo-gold"
                          initial={{ width: 0 }}
                          animate={{ width: `${item.score}%` }}
                          transition={{ duration: 0.8, delay: 0.4 + idx * 0.1 }}
                        />
                      </div>
                      <p className="text-xs text-nexo-text-muted mt-1">{item.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Overall Assessment */}
          <motion.div
            className="card mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="relative w-28 h-28">
                  <svg className="w-28 h-28" style={{ transform: 'rotate(-90deg)' }}>
                    <circle
                      cx="56"
                      cy="56"
                      r="50"
                      stroke="#1A2334"
                      strokeWidth="6"
                      fill="none"
                    />
                    <motion.circle
                      cx="56"
                      cy="56"
                      r="50"
                      stroke="#C9A962"
                      strokeWidth="6"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={314}
                      initial={{ strokeDashoffset: 314 }}
                      animate={{ strokeDashoffset: 314 * 0.23 }}
                      transition={{ duration: 1, delay: 0.6 }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-semibold serif-heading text-nexo-gold">77%</div>
                      <div className="text-[10px] text-nexo-text-muted uppercase tracking-wider">Potential</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <h3 className="serif-heading text-xl mb-2">High Intellectual Potential</h3>
                <p className="text-nexo-text-secondary text-sm mb-4">
                  Based on your profile, NIX has identified an optimal path for your intellectual growth.
                  With personalized guidance, you are positioned for significant achievement.
                </p>
                <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-nexo-success" />
                    <span className="text-xs text-nexo-text-muted">Growth trajectory favorable</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-nexo-gold" />
                    <span className="text-xs text-nexo-text-muted">Excellence attainable</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <motion.button
              onClick={() => navigate('/dashboard')}
              className="btn-primary text-base px-10 py-4 group inline-flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Begin Your Journey
              <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
