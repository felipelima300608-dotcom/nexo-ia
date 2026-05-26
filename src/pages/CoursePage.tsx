import { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Check,
  Clock,
  BookOpen,
  Star,
  Brain,
  Lightbulb,
  FileText,
  Zap,
  Users,
  TrendingUp,
  MessageSquare,
} from 'lucide-react';
import { NIXMascot } from '../components/NIXMascot';

interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  type: 'video' | 'article' | 'quiz' | 'practice';
}

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
  progress: number;
}

const courseData = {
  id: 'python-fundamentals',
  title: 'Python Fundamentals',
  description: 'Master the art of programming through structured learning',
  category: 'Programming',
  level: 'Foundation',
  duration: '12 hours',
  enrolled: 15420,
  modules: [
    {
      id: 'm1',
      title: 'Foundations',
      progress: 100,
      lessons: [
        { id: 'l1', title: 'The Philosophy of Python', duration: '5 min', completed: true, type: 'video' },
        { id: 'l2', title: 'Setting Up Your Environment', duration: '10 min', completed: true, type: 'video' },
        { id: 'l3', title: 'Your First Program', duration: '15 min', completed: true, type: 'practice' },
        { id: 'l4', title: 'Assessment: Foundations', duration: '5 min', completed: true, type: 'quiz' },
      ],
    },
    {
      id: 'm2',
      title: 'Data Mastery',
      progress: 75,
      lessons: [
        { id: 'l5', title: 'Understanding Variables', duration: '8 min', completed: true, type: 'video' },
        { id: 'l6', title: 'Numbers and Strings', duration: '12 min', completed: true, type: 'video' },
        { id: 'l7', title: 'Collections: Lists and Tuples', duration: '15 min', completed: true, type: 'video' },
        { id: 'l8', title: 'Dictionaries and Sets', duration: '12 min', completed: false, type: 'video' },
        { id: 'l9', title: 'Practice: Data Types', duration: '20 min', completed: false, type: 'practice' },
        { id: 'l10', title: 'Assessment: Data', duration: '5 min', completed: false, type: 'quiz' },
      ],
    },
    {
      id: 'm3',
      title: 'Control Logic',
      progress: 0,
      lessons: [
        { id: 'l11', title: 'Conditional Logic', duration: '10 min', completed: false, type: 'video' },
        { id: 'l12', title: 'Iteration Patterns', duration: '15 min', completed: false, type: 'video' },
        { id: 'l13', title: 'Flow Control', duration: '8 min', completed: false, type: 'video' },
        { id: 'l14', title: 'Practice: Control Flow', duration: '25 min', completed: false, type: 'practice' },
        { id: 'l15', title: 'Assessment: Logic', duration: '5 min', completed: false, type: 'quiz' },
      ],
    },
    {
      id: 'm4',
      title: 'Functions',
      progress: 0,
      lessons: [
        { id: 'l16', title: 'Defining Functions', duration: '12 min', completed: false, type: 'video' },
        { id: 'l17', title: 'Parameters and Arguments', duration: '10 min', completed: false, type: 'video' },
        { id: 'l18', title: 'Return Values', duration: '8 min', completed: false, type: 'video' },
        { id: 'l19', title: 'Lambda Expressions', duration: '10 min', completed: false, type: 'video' },
        { id: 'l20', title: 'Practice: Functions', duration: '30 min', completed: false, type: 'practice' },
      ],
    },
  ],
  aiNotes: [
    {
      id: 'n1',
      title: 'Core Concept: Variables',
      content: 'Variables are named containers for data. Python dynamically types based on assignment.',
      icon: Brain,
    },
    {
      id: 'n2',
      title: 'Best Practice: Strings',
      content: 'Use f-strings for modern string formatting: f"Value: {variable}"',
      icon: Lightbulb,
    },
    {
      id: 'n3',
      title: 'Distinction: List vs Tuple',
      content: 'Lists are mutable, tuples immutable. Choose based on data integrity needs.',
      icon: FileText,
    },
  ],
  revisionCards: [
    {
      id: 'r1',
      front: 'What is a variable in Python?',
      back: 'A named reference to a stored value. Python determines type dynamically.',
    },
    {
      id: 'r2',
      front: 'List vs Tuple distinction?',
      back: 'Lists are mutable (changeable), tuples are immutable (fixed after creation).',
    },
    {
      id: 'r3',
      front: 'What is type casting?',
      back: 'Converting one data type to another: int("5") converts string to integer.',
    },
  ],
};

export default function CoursePage() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [activeModule, setActiveModule] = useState(1);
  const [showRevision, setShowRevision] = useState(false);
  const [currentCard, setCurrentCard] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const course = courseData;
  const nextLesson = course.modules[activeModule]?.lessons.find(l => !l.completed);

  const getLessonTypeLabel = (type: string) => {
    switch (type) {
      case 'video': return 'Lesson';
      case 'article': return 'Reading';
      case 'quiz': return 'Assessment';
      case 'practice': return 'Practice';
      default: return 'Lesson';
    }
  };

  return (
    <div className="min-h-screen bg-nexo-bg">
      {/* Navigation */}
      <motion.div
        className="bg-nexo-bg-secondary border-b border-nexo-border px-6 py-3 sticky top-0 z-40"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 rounded-lg hover:bg-nexo-bg-card transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="font-medium serif-heading text-lg">{course.title}</h1>
              <div className="flex items-center gap-2 text-xs text-nexo-text-muted">
                <span>{course.category}</span>
                <span>·</span>
                <span>{course.level}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate('/chat')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-nexo-bg-card hover:bg-nexo-bg-tertiary transition-colors"
          >
            <NIXMascot size="sm" />
            <span className="text-xs">Ask NIX</span>
          </button>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Course Header */}
        <motion.div
          className="card mb-8"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 rounded-lg bg-nexo-gold/10 text-nexo-gold text-xs">
                  {course.category}
                </span>
                <span className="px-3 py-1 rounded-lg bg-nexo-secondary/30 text-nexo-text-secondary text-xs">
                  {course.level}
                </span>
              </div>

              <h1 className="serif-heading text-3xl mb-2">{course.title}</h1>
              <p className="text-nexo-text-secondary text-sm mb-4">{course.description}</p>

              <div className="flex items-center gap-5 text-xs text-nexo-text-muted">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {course.duration}
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="w-4 h-4" />
                  {course.enrolled.toLocaleString()} students
                </span>
              </div>
            </div>

            {/* Progress */}
            <div className="bg-nexo-bg-tertiary rounded-lg p-4 min-w-[200px]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-nexo-text-muted">Course Progress</span>
                <span className="text-sm font-medium text-nexo-gold">65%</span>
              </div>
              <div className="h-1.5 bg-nexo-border rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-nexo-gold rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '65%' }}
                  transition={{ duration: 0.8 }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Module Navigation */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
          {course.modules.map((module, index) => (
            <motion.button
              key={module.id}
              onClick={() => setActiveModule(index)}
              className={`flex-shrink-0 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                activeModule === index
                  ? 'bg-nexo-gold text-nexo-bg'
                  : 'bg-nexo-bg-card hover:bg-nexo-bg-tertiary text-nexo-text-secondary'
              }`}
              whileHover={{ scale: activeModule !== index ? 1.02 : 1 }}
              whileTap={{ scale: 0.98 }}
            >
              {module.title}
            </motion.button>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Module Content */}
            <motion.div
              className="card"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key={activeModule}
            >
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="serif-heading text-xl">{course.modules[activeModule].title}</h2>
                  <p className="text-xs text-nexo-text-muted mt-1">
                    {course.modules[activeModule].progress}% complete
                  </p>
                </div>
                <div className="text-xs text-nexo-gold">
                  Module {activeModule + 1} of {course.modules.length}
                </div>
              </div>

              <div className="space-y-2">
                {course.modules[activeModule].lessons.map((lesson, index) => (
                  <motion.button
                    key={lesson.id}
                    className={`w-full p-3 rounded-lg flex items-center gap-3 transition-all ${
                      lesson.completed
                        ? 'bg-nexo-success/5 border border-nexo-success/20'
                        : 'bg-nexo-bg-tertiary hover:bg-nexo-bg-card'
                    }`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: lesson.completed ? 0 : 2 }}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      lesson.completed
                        ? 'bg-nexo-success/20 text-nexo-success'
                        : 'bg-nexo-gold/10 text-nexo-gold'
                    }`}>
                      {lesson.completed ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                    </div>

                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={`text-sm ${lesson.completed ? 'text-nexo-text-muted line-through' : ''}`}>
                          {lesson.title}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-nexo-border">
                          {getLessonTypeLabel(lesson.type)}
                        </span>
                      </div>
                      <span className="text-[10px] text-nexo-text-muted flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {lesson.duration}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Revision Cards */}
            <motion.div
              className="card"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-nexo-gold/10 flex items-center justify-center">
                    <Star className="w-4 h-4 text-nexo-gold" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">Quick Review</h3>
                    <p className="text-[10px] text-nexo-text-muted">{course.revisionCards.length} cards</p>
                  </div>
                </div>
                <motion.button
                  onClick={() => setShowRevision(!showRevision)}
                  className="text-xs text-nexo-gold hover:text-nexo-gold-light"
                  whileHover={{ scale: 1.02 }}
                >
                  {showRevision ? 'Hide' : 'Practice'}
                </motion.button>
              </div>

              {showRevision && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                >
                  <div className="bg-nexo-bg-tertiary rounded-lg p-4 mb-3">
                    <p className="text-[10px] text-nexo-text-muted mb-2">
                      Card {currentCard + 1} of {course.revisionCards.length}
                    </p>
                    <p className="text-sm">
                      {showAnswer
                        ? course.revisionCards[currentCard].back
                        : course.revisionCards[currentCard].front}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => { setCurrentCard(Math.max(0, currentCard - 1)); setShowAnswer(false); }}
                      disabled={currentCard === 0}
                      className="p-2 rounded-lg bg-nexo-bg-tertiary disabled:opacity-30"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setShowAnswer(!showAnswer)}
                      className="px-4 py-2 rounded-lg bg-nexo-bg-tertiary text-xs"
                    >
                      {showAnswer ? 'Question' : 'Answer'}
                    </button>

                    <button
                      onClick={() => { setCurrentCard(Math.min(course.revisionCards.length - 1, currentCard + 1)); setShowAnswer(false); }}
                      disabled={currentCard === course.revisionCards.length - 1}
                      className="p-2 rounded-lg bg-nexo-bg-tertiary disabled:opacity-30"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Next Lesson */}
            {nextLesson && (
              <motion.div
                className="card"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="w-4 h-4 text-nexo-gold" />
                  <h3 className="font-medium text-sm">Continue Studies</h3>
                </div>

                <button className="w-full p-3 rounded-lg bg-nexo-bg-tertiary hover:bg-nexo-bg-card text-left group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-nexo-gold flex items-center justify-center flex-shrink-0">
                      <Play className="w-5 h-5 text-nexo-bg" />
                    </div>
                    <div className="flex-1">
                      <p className="text-[10px] text-nexo-text-muted">Next lesson</p>
                      <p className="text-sm font-medium">{nextLesson.title}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-nexo-text-muted group-hover:text-nexo-gold transition-colors" />
                  </div>
                </button>
              </motion.div>
            )}

            {/* AI Notes */}
            <motion.div
              className="card"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <NIXMascot size="sm" />
                <div>
                  <h3 className="font-medium text-sm">NIX Notes</h3>
                  <p className="text-[10px] text-nexo-text-muted">Key insights</p>
                </div>
              </div>

              <div className="space-y-2">
                {course.aiNotes.map((note) => {
                  const NoteIcon = note.icon;
                  return (
                    <div key={note.id} className="p-2.5 rounded-lg bg-nexo-bg-tertiary">
                      <div className="flex items-center gap-2 mb-1">
                        <NoteIcon className="w-3.5 h-3.5 text-nexo-gold" />
                        <span className="text-xs font-medium">{note.title}</span>
                      </div>
                      <p className="text-[10px] text-nexo-text-muted leading-relaxed">{note.content}</p>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="card"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="font-medium text-sm mb-4">Course Statistics</h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-nexo-text-muted">Duration</span>
                  <span>~4 hours remaining</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-nexo-text-muted">XP Available</span>
                  <span className="text-nexo-gold">+850 XP</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-nexo-text-muted">On completion</span>
                  <span>+1 Achievement</span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-nexo-border">
                <button
                  onClick={() => navigate('/chat')}
                  className="w-full btn-secondary text-sm py-2.5 flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  Consult NIX
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
