import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Target,
  Briefcase,
  TrendingUp,
  Clock,
  BookOpen,
  AlertCircle,
  Rocket,
  Check,
  ChevronRight,
  ChevronLeft,
  Brain,
  Zap,
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import type { UserData } from '../context/UserContext';

interface Step {
  id: number;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  field: string;
  options?: { value: string; label: string; icon?: React.ElementType }[];
  multiSelect?: boolean;
}

const steps: Step[] = [
  {
    id: 1,
    title: 'Que conhecimento você busca?',
    subtitle: 'Selecione as áreas que deseja dominar',
    icon: Target,
    field: 'goals',
    multiSelect: true,
    options: [
      { value: 'programming', label: 'Programação e Engenharia' },
      { value: 'data', label: 'Ciência de Dados' },
      { value: 'ai', label: 'Inteligência Artificial' },
      { value: 'design', label: 'Design' },
      { value: 'business', label: 'Negócios' },
      { value: 'languages', label: 'Idiomas' },
    ],
  },
  {
    id: 2,
    title: 'Qual é sua área de atuação?',
    subtitle: 'Isso moldará seu currículo personalizado',
    icon: Briefcase,
    field: 'professionalArea',
    options: [
      { value: 'technology', label: 'Tecnologia' },
      { value: 'finance', label: 'Finanças' },
      { value: 'healthcare', label: 'Saúde' },
      { value: 'education', label: 'Educação' },
      { value: 'entrepreneur', label: 'Empreendedorismo' },
      { value: 'student', label: 'Estudante' },
    ],
  },
  {
    id: 3,
    title: 'Qual é seu nível de proficiência?',
    subtitle: 'Avaliação honesta leva a melhor orientação',
    icon: TrendingUp,
    field: 'skillLevel',
    options: [
      { value: 'beginner', label: 'Iniciante' },
      { value: 'intermediate', label: 'Intermediário' },
      { value: 'advanced', label: 'Avançado' },
    ],
  },
  {
    id: 4,
    title: 'Quanto tempo pode dedicar diariamente?',
    subtitle: 'Otimizaremos seu currículo de acordo',
    icon: Clock,
    field: 'timePerDay',
    options: [
      { value: '15min', label: '15 minutos' },
      { value: '30min', label: '30 minutos' },
      { value: '1hour', label: '1 hora' },
      { value: '2hours', label: '2+ horas' },
    ],
  },
  {
    id: 5,
    title: 'Como você aprende mais efetivamente?',
    subtitle: 'Entender seu estilo melhora a retenção',
    icon: BookOpen,
    field: 'learningStyle',
    options: [
      { value: 'visual', label: 'Visual' },
      { value: 'reading', label: 'Leitura' },
      { value: 'hands-on', label: 'Prática' },
      { value: 'discussion', label: 'Discussão' },
    ],
  },
  {
    id: 6,
    title: 'O que desafia seu progresso?',
    subtitle: 'Selecione todos os que se aplicam',
    icon: AlertCircle,
    field: 'difficulties',
    multiSelect: true,
    options: [
      { value: 'time', label: 'Tempo limitado' },
      { value: 'motivation', label: 'Motivação' },
      { value: 'focus', label: 'Foco' },
      { value: 'resources', label: 'Recursos' },
    ],
  },
  {
    id: 7,
    title: 'Qual é seu objetivo final?',
    subtitle: 'Defina seu destino',
    icon: Rocket,
    field: 'mainObjective',
    options: [
      { value: 'career', label: 'Avanço na Carreira' },
      { value: 'pivot', label: 'Transição de Carreira' },
      { value: 'skills', label: 'Desenvolvimento de Habilidades' },
      { value: 'knowledge', label: 'Conhecimento' },
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
        name: 'Estudante',
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
      navigate('/dashboard');
    }, 1000);
  };

  const progress = ((currentStep + 1) / steps.length) * 100;
  const step = steps[currentStep];
  const IconComponent = step.icon;

  return (
    <div className="min-h-screen bg-nexo-bg">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-3 gap-6">
          {/* COLUNA 1: Progresso */}
          <motion.div
            className="content-box"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="red-header mb-6">
              QUESTIONÁRIO {currentStep + 1} DE {steps.length}
            </div>

            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-1 mb-4">
                <span className="text-nexo-red text-lg">★</span>
                <span className="text-xs text-nexo-red font-bold uppercase tracking-widest">PASSO {currentStep + 1}/{steps.length}</span>
                <span className="text-nexo-red text-lg">★</span>
              </div>

              <div className="w-12 h-12 rounded-full bg-nexo-red/10 border-2 border-nexo-red flex items-center justify-center mx-auto mb-4">
                <IconComponent className="w-6 h-6 text-nexo-red" />
              </div>

              <h2 className="section-title text-xl mb-2">{step.title}</h2>
              <p className="text-sm text-nexo-text-secondary mb-6">{step.subtitle}</p>
            </div>

            <div className="space-y-3 mb-8">
              {step.options?.map((option, idx) => (
                <motion.button
                  key={option.value}
                  onClick={() => handleSelect(step.field, option.value, step.multiSelect)}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                    isSelected(step.field, option.value)
                      ? 'bg-nexo-red/10 border-nexo-red'
                      : 'bg-nexo-cream-light border-nexo-cream-dark hover:border-nexo-red'
                  }`}
                  whileHover={{ scale: 1.01 }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-nexo-text uppercase">{option.label}</span>
                    {isSelected(step.field, option.value) && (
                      <Check className="w-4 h-4 text-nexo-red" />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Navegação */}
            <div className="flex gap-3">
              <motion.button
                onClick={handleBack}
                disabled={currentStep === 0}
                className={`flex-1 btn-secondary disabled:opacity-30 disabled:cursor-not-allowed`}
              >
                ← ANTERIOR
              </motion.button>
              <motion.button
                onClick={handleNext}
                disabled={!canProceed() || isSubmitting}
                className={`flex-1 ${!canProceed() || isSubmitting ? 'opacity-50 cursor-not-allowed bg-nexo-divider text-nexo-text-secondary' : 'btn-primary'}`}
              >
                {isSubmitting ? 'ANALISANDO...' : currentStep === steps.length - 1 ? 'CONCLUIR' : 'CONTINUAR →'}
              </motion.button>
            </div>

            {/* Indicador de página */}
            <div className="flex justify-center gap-2 mt-6">
              {steps.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all ${
                    i === currentStep ? 'bg-nexo-red w-6' : 'bg-nexo-divider w-2'
                  }`}
                />
              ))}
            </div>
          </motion.div>

          {/* COLUNA 2: Dicas/Informações */}
          <motion.div
            className="content-box"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="red-header mb-4">
              DICAS IMPORTANTES
            </div>

            <div className="space-y-4">
              <div className="bg-nexo-cream-light border-l-4 border-nexo-red p-4 rounded">
                <h4 className="font-bold text-nexo-red uppercase text-xs mb-2">HONESTIDADE</h4>
                <p className="text-xs text-nexo-text leading-relaxed">
                  Responda com sinceridade. Quanto mais precisos forem seus dados, melhor NIX poderá personalizar seu caminho.
                </p>
              </div>

              <div className="bg-nexo-cream-light border-l-4 border-nexo-red p-4 rounded">
                <h4 className="font-bold text-nexo-red uppercase text-xs mb-2">TEMPO</h4>
                <p className="text-xs text-nexo-text leading-relaxed">
                  Este questionário leva apenas 5 minutos. Seu investimento inicial vale muito a pena.
                </p>
              </div>

              <div className="bg-nexo-cream-light border-l-4 border-nexo-red p-4 rounded">
                <h4 className="font-bold text-nexo-red uppercase text-xs mb-2">DEPOIS</h4>
                <p className="text-xs text-nexo-text leading-relaxed">
                  Após concluir, você receberá um plano personalizado criado especialmente para você.
                </p>
              </div>
            </div>

            {/* Progresso visual */}
            <div className="mt-8 pt-6 border-t-2 border-nexo-red">
              <p className="text-xs text-nexo-text-secondary uppercase font-bold mb-3">PROGRESSO</p>
              <div className="bg-nexo-cream-dark rounded-full h-3 overflow-hidden">
                <motion.div
                  className="bg-nexo-red h-full rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <p className="text-xs text-nexo-red font-bold mt-2">{Math.round(progress)}%</p>
            </div>
          </motion.div>

          {/* COLUNA 3: Mascote + Motivação */}
          <motion.div
            className="content-box"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="red-header mb-4">
              MENTOR NIX
            </div>

            <div className="text-center mb-6">
              <img src="/Design_sem_nome_(22).png" alt="NIX" className="h-24 w-24 rounded-full object-cover mx-auto mb-4" />
              <h3 className="font-bold text-nexo-red uppercase text-sm">Olá, Estudante!</h3>
              <p className="text-[10px] text-nexo-text-secondary mt-1">Seu Mentor de Evolução</p>
            </div>

            <div className="bg-nexo-red text-nexo-cream p-4 rounded-lg mb-6 text-center">
              <p className="text-xs leading-relaxed font-medium">
                Estou aqui para guiar sua jornada. Cada resposta nos aproxima do seu plano perfeito.
              </p>
            </div>

            {/* Status Cards */}
            <div className="space-y-3 mb-6">
              <div className="bg-nexo-cream-light border-2 border-nexo-red p-3 rounded text-center">
                <p className="text-[10px] text-nexo-text-secondary uppercase font-bold">Questões Respondidas</p>
                <p className="text-lg font-bold text-nexo-red">{currentStep + 1}/{steps.length}</p>
              </div>

              <div className="bg-nexo-cream-light border-2 border-nexo-red p-3 rounded text-center">
                <p className="text-[10px] text-nexo-text-secondary uppercase font-bold">Tempo Estimado</p>
                <p className="text-lg font-bold text-nexo-red">{Math.ceil((steps.length - currentStep) * 0.8)}min</p>
              </div>
            </div>

            {/* Quote */}
            <div className="bg-nexo-red/10 border-2 border-nexo-red p-4 rounded-lg">
              <p className="text-xs text-nexo-text font-medium leading-relaxed mb-3">
                "{currentStep === 0 ? 'O primeiro passo determina toda a jornada.' : currentStep === 1 ? 'Seu contexto profissional importa.' : currentStep === 2 ? 'Honestidade sobre nível acelera progresso.' : 'Consistência vence intensidade.' }"
              </p>
              <p className="text-[10px] text-nexo-red font-bold">— NIX</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
