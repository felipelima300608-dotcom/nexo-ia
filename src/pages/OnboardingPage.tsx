import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  ChevronRight,
  ChevronLeft,
  Target,
  Briefcase,
  TrendingUp,
  Clock,
  BookOpen,
  AlertCircle,
  Rocket,
  Check,
  LucideIcon,
} from 'lucide-react';
import { NIXMascot } from '../components/NIXMascot';
import { useUser } from '../context/UserContext';
import type { UserData } from '../context/UserContext';

interface Step {
  id: number;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  field: string;
  options?: { value: string; label: string; icon?: LucideIcon }[];
  multiSelect?: boolean;
}

const steps: Step[] = [
  {
    id: 1,
    title: 'What knowledge do you seek?',
    subtitle: 'Select disciplines you wish to master',
    icon: Target,
    field: 'goals',
    multiSelect: true,
    options: [
      { value: 'programming', label: 'Programming & Engineering' },
      { value: 'data', label: 'Data Science & Analytics' },
      { value: 'ai', label: 'Artificial Intelligence' },
      { value: 'design', label: 'Design & Architecture' },
      { value: 'business', label: 'Business & Strategy' },
      { value: 'languages', label: 'Languages & Literature' },
      { value: 'sciences', label: 'Natural Sciences' },
      { value: 'mathematics', label: 'Mathematics & Logic' },
    ],
  },
  {
    id: 2,
    title: 'What is your field of endeavor?',
    subtitle: 'This shapes your personalized curriculum',
    icon: Briefcase,
    field: 'professionalArea',
    options: [
      { value: 'technology', label: 'Technology & Engineering' },
      { value: 'finance', label: 'Finance & Economics' },
      { value: 'healthcare', label: 'Healthcare & Sciences' },
      { value: 'education', label: 'Education & Academia' },
      { value: 'consulting', label: 'Consulting & Strategy' },
      { value: 'entrepreneur', label: 'Entrepreneurship' },
      { value: 'arts', label: 'Arts & Humanities' },
      { value: 'student', label: 'Academic Pursuit' },
    ],
  },
  {
    id: 3,
    title: 'What is your current proficiency?',
    subtitle: 'Honest assessment leads to better guidance',
    icon: TrendingUp,
    field: 'skillLevel',
    options: [
      { value: 'beginner', label: 'Novice', icon: Target },
      { value: 'intermediate', label: 'Practitioner', icon: TrendingUp },
      { value: 'advanced', label: 'Expert', icon: Rocket },
    ],
  },
  {
    id: 4,
    title: 'How much time can you dedicate?',
    subtitle: 'We will optimize your curriculum accordingly',
    icon: Clock,
    field: 'timePerDay',
    options: [
      { value: '15min', label: '15 minutes daily' },
      { value: '30min', label: '30 minutes daily' },
      { value: '1hour', label: '1 hour daily' },
      { value: '2hours', label: '2+ hours daily' },
    ],
  },
  {
    id: 5,
    title: 'How do you learn most effectively?',
    subtitle: 'Understanding your style enhances retention',
    icon: BookOpen,
    field: 'learningStyle',
    options: [
      { value: 'visual', label: 'Visual & Diagrammatic' },
      { value: 'reading', label: 'Reading & Textual' },
      { value: 'hands-on', label: 'Practical Application' },
      { value: 'discussion', label: 'Discourse & Dialogue' },
    ],
  },
  {
    id: 6,
    title: 'What challenges your progress?',
    subtitle: 'Select all that apply',
    icon: AlertCircle,
    field: 'difficulties',
    multiSelect: true,
    options: [
      { value: 'time', label: 'Limited Time Available' },
      { value: 'motivation', label: 'Sustaining Motivation' },
      { value: 'focus', label: 'Maintaining Focus' },
      { value: 'resources', label: 'Finding Quality Resources' },
      { value: 'structure', label: 'Lack of Structure' },
      { value: 'practice', label: 'Practice Opportunities' },
    ],
  },
  {
    id: 7,
    title: 'What is your ultimate objective?',
    subtitle: 'Define your destination',
    icon: Rocket,
    field: 'mainObjective',
    options: [
      { value: 'career', label: 'Career Advancement' },
      { value: 'pivot', label: 'Career Transition' },
      { value: 'skills', label: 'Skill Development' },
      { value: 'knowledge', label: 'Pursuit of Knowledge' },
      { value: 'degree', label: 'Academic Credentials' },
      { value: 'business', label: 'Entrepreneurial Goals' },
    ],
  },
];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<UserData>>({
    goals: [],
    difficulties: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelect = (field: string, value: string, multiSelect?: boolean) => {
    if (multiSelect) {
      const currentValues = (formData[field as keyof UserData] as string[]) || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];
      setFormData({ ...formData, [field]: newValues });
    } else {
      setFormData({ ...formData, [field]: value });
    }
  };

  const isSelected = (field: string, value: string) => {
    const fieldValue = formData[field as keyof UserData];
    if (Array.isArray(fieldValue)) {
      return fieldValue.includes(value);
    }
    return fieldValue === value;
  };

  const canProceed = () => {
    const step = steps[currentStep];
    const fieldValue = formData[step.field as keyof UserData];
    if (step.multiSelect) {
      return Array.isArray(fieldValue) && fieldValue.length > 0;
    }
    return !!fieldValue;
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);

    setTimeout(() => {
      const userData: UserData = {
        name: 'Scholar',
        goals: (formData.goals as string[]) || [],
        professionalArea: formData.professionalArea || '',
        skillLevel: formData.skillLevel || '',
        timePerDay: formData.timePerDay || '',
        learningStyle: formData.learningStyle || '',
        difficulties: (formData.difficulties as string[]) || [],
        mainObjective: formData.mainObjective || '',
        altitude: 1,
        flights: 0,
        streak: 1,
        xp: 0,
        completedLessons: [],
        currentCourses: [],
      };

      setUser(userData);
      navigate('/diagnosis');
    }, 1000);
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-nexo-bg relative overflow-hidden">
      {/* Subtle background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/3 right-1/3 w-[500px] h-[500px] bg-nexo-navy/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-[400px] h-[400px] bg-nexo-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="relative min-h-screen flex flex-col">
        {/* Progress bar */}
        <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-nexo-border">
          <motion.div
            className="h-full bg-nexo-gold"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

        {/* Header */}
        <div className="fixed top-4 right-8 z-40 flex items-center gap-3">
          <NIXMascot size="sm" />
          <div className="text-right">
            <p className="text-xs text-nexo-gold font-medium">Your Mentor</p>
            <p className="text-[10px] text-nexo-text-muted">NIX</p>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex items-center justify-center px-6 py-24">
          <div className="w-full max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {/* Step indicator */}
                <div className="text-center mb-10">
                  <motion.div
                    className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-nexo-gold/10 border border-nexo-gold/30 mb-5"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring' }}
                  >
                    {(() => {
                      const IconComponent = steps[currentStep].icon;
                      return <IconComponent className="w-6 h-6 text-nexo-gold" />;
                    })()}
                  </motion.div>

                  <p className="text-xs text-nexo-gold uppercase tracking-[0.2em] mb-3">
                    Question {currentStep + 1} of {steps.length}
                  </p>
                  <h1 className="serif-heading text-3xl md:text-4xl mb-3">
                    {steps[currentStep]?.title}
                  </h1>
                  <p className="text-nexo-text-secondary">
                    {steps[currentStep]?.subtitle}
                  </p>
                </div>

                {/* Options */}
                <div className={`grid gap-3 ${
                  steps[currentStep].options && steps[currentStep].options.length <= 4
                    ? 'md:grid-cols-2'
                    : 'md:grid-cols-2'
                }`}>
                  {steps[currentStep].options?.map((option, index) => (
                    <motion.button
                      key={option.value}
                      onClick={() =>
                        handleSelect(
                          steps[currentStep].field,
                          option.value,
                          steps[currentStep].multiSelect
                        )
                      }
                      className={`relative p-4 rounded-lg text-left transition-all ${
                        isSelected(steps[currentStep].field, option.value)
                          ? 'bg-nexo-bg-card border-nexo-gold/40 border'
                          : 'bg-nexo-bg-tertiary hover:bg-nexo-bg-card border border-transparent'
                      }`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {option.icon && (
                            <option.icon className={`w-4 h-4 ${
                              isSelected(steps[currentStep].field, option.value)
                                ? 'text-nexo-gold'
                                : 'text-nexo-text-muted'
                            }`} />
                          )}
                          <span className="text-sm font-medium">{option.label}</span>
                        </div>

                        {isSelected(steps[currentStep].field, option.value) && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring' }}
                          >
                            <Check className="w-4 h-4 text-nexo-gold" />
                          </motion.div>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-12">
              <motion.button
                onClick={handleBack}
                disabled={currentStep === 0}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  currentStep === 0
                    ? 'opacity-30 cursor-not-allowed'
                    : 'hover:bg-nexo-bg-card text-nexo-text-secondary'
                }`}
                whileHover={currentStep > 0 ? { x: -3 } : {}}
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="text-sm">Previous</span>
              </motion.button>

              <div className="flex items-center gap-2">
                <span className="text-sm text-nexo-text-muted">
                  {currentStep + 1} / {steps.length}
                </span>
              </div>

              <motion.button
                onClick={handleNext}
                disabled={!canProceed() || isSubmitting}
                className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-all ${
                  canProceed() && !isSubmitting
                    ? 'btn-primary'
                    : 'bg-nexo-border text-nexo-text-muted cursor-not-allowed'
                }`}
                whileHover={canProceed() && !isSubmitting ? { scale: 1.02 } : {}}
                whileTap={canProceed() && !isSubmitting ? { scale: 0.98 } : {}}
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      className="w-4 h-4 border-2 border-nexo-bg border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                    <span className="text-sm">Analyzing...</span>
                  </>
                ) : currentStep === steps.length - 1 ? (
                  <>
                    <span className="text-sm">Complete</span>
                    <Rocket className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    <span className="text-sm">Continue</span>
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
