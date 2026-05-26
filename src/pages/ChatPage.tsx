import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Send,
  BookOpen,
  Lightbulb,
  FileText,
  MessageSquare,
  ChevronLeft,
  Brain,
} from 'lucide-react';
import { NIXMascot } from '../components/NIXMascot';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  actions?: { label: string; icon: React.ElementType; action: () => void }[];
}

export default function ChatPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Greetings, Scholar. I am NIX, your mentor in this journey of intellectual growth. I am here to illuminate concepts, create assessments, guide your studies, and help you achieve mastery. What shall we explore today?",
      timestamp: new Date(),
      actions: [
        { label: 'Explain concept', icon: Lightbulb, action: () => {} },
        { label: 'Create assessment', icon: BookOpen, action: () => {} },
        { label: 'Summarize topic', icon: FileText, action: () => {} },
        { label: 'Study guidance', icon: Brain, action: () => {} },
      ],
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const suggestions = [
    "Explain machine learning foundations",
    "Create a quiz on Python syntax",
    "Summarize data structures concepts",
    "Guide me through neural networks",
  ];

  const handleSendMessage = async (text?: string) => {
    const messageText = text || inputValue.trim();
    if (!messageText) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const responses: { [key: string]: string } = {
        'explain': "Let me illuminate this concept for you.\n\n**Core Principles:**\n1. The fundamental premise rests on understanding relationships\n2. These concepts interconnect through logical frameworks\n3. Practical application deepens comprehension\n\nShall I elaborate on any principle, or would you prefer a practical example?",
        'quiz': "Here is a brief assessment to gauge your understanding:\n\n**Question:**\nWhat is the primary purpose of this methodology?\n\nA) First approach\nB) Second approach\nC) Third approach\nD) Fourth approach\n\nTake your time to consider. I will reveal the answer when you are prepared.",
        'summarize': "Here is a concise overview:\n\n**Central Thesis:** The core concept centers on understanding the relationship between elements.\n\n**Key Points:**\n- First principle and its implications\n- Second principle and applications\n- Third principle and outcomes\n\n**Application:** This knowledge enables practical problem-solving.\n\nWould you like to explore any element further?",
        'default': "An excellent inquiry. Let me guide you through this concept.\n\nBased on your learning profile, I recommend focusing on these aspects:\n\n1. **Foundation:** Begin with the core principles\n2. **Application:** Witness how theory manifests in practice\n3. **Mastery:** Solidify through deliberate practice\n\nShall we proceed with detailed exploration, or would you prefer practical exercises?",
      };

      let responseKey = 'default';
      const lowerText = messageText.toLowerCase();
      if (lowerText.includes('explain')) responseKey = 'explain';
      else if (lowerText.includes('quiz') || lowerText.includes('assessment')) responseKey = 'quiz';
      else if (lowerText.includes('summarize')) responseKey = 'summarize';

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responses[responseKey],
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const formatMessage = (content: string) => {
    const parts = content.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={index} className="font-semibold text-nexo-gold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className="min-h-screen bg-nexo-bg flex">
      {/* Left Panel - NIX */}
      <div className="hidden lg:flex w-72 bg-nexo-bg-secondary border-r border-nexo-border flex-col items-center justify-center relative overflow-hidden">
        <div className="relative z-10 text-center px-6">
          <NIXMascot size="lg" className="mx-auto mb-6" />

          <h2 className="serif-heading text-2xl mb-1 text-nexo-gold">NIX</h2>
          <p className="text-xs text-nexo-text-muted uppercase tracking-widest mb-6">Your Mentor</p>

          <div className="space-y-3 text-left max-w-xs">
            <div className="flex items-center gap-3 text-sm">
              <Brain className="w-4 h-4 text-nexo-gold" />
              <span className="text-nexo-text-secondary">Illuminates concepts</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <BookOpen className="w-4 h-4 text-nexo-gold" />
              <span className="text-nexo-text-secondary">Creates assessments</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <FileText className="w-4 h-4 text-nexo-gold" />
              <span className="text-nexo-text-secondary">Synthesizes knowledge</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat */}
      <div className="flex-1 flex flex-col h-screen">
        {/* Header */}
        <motion.div
          className="bg-nexo-bg-secondary border-b border-nexo-border px-6 py-3 flex items-center justify-between"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 rounded-lg hover:bg-nexo-bg-card transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <NIXMascot size="sm" />
              <div>
                <h1 className="font-medium">NIX</h1>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-nexo-success" />
                  <span className="text-[10px] text-nexo-text-muted">Ready to guide</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          <div className="max-w-2xl mx-auto space-y-5">
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}
                >
                  {message.role === 'assistant' && (
                    <div className="flex-shrink-0 pt-1">
                      <NIXMascot size="sm" />
                    </div>
                  )}

                  <div
                    className={`max-w-lg ${
                      message.role === 'user'
                        ? 'bg-nexo-secondary text-nexo-text'
                        : 'bg-nexo-bg-card border border-nexo-border'
                    } rounded-xl p-4`}
                  >
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {formatMessage(message.content)}
                    </div>

                    {message.actions && (
                      <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-nexo-border">
                        {message.actions.map((action) => {
                          const ActionIcon = action.icon;
                          return (
                            <motion.button
                              key={action.label}
                              onClick={action.action}
                              className="px-3 py-1.5 rounded-lg bg-nexo-bg-tertiary hover:bg-nexo-bg-card transition-all flex items-center gap-2 text-xs"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <ActionIcon className="w-3.5 h-3.5 text-nexo-gold" />
                              {action.label}
                            </motion.button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {message.role === 'user' && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-nexo-secondary/30 flex items-center justify-center">
                      <span className="text-xs font-medium text-nexo-text">S</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && (
              <motion.div
                className="flex gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <NIXMascot size="sm" />
                <div className="bg-nexo-bg-card border border-nexo-border rounded-xl p-4">
                  <div className="flex gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-1.5 h-1.5 bg-nexo-gold rounded-full"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Suggestions */}
        {messages.length === 1 && (
          <motion.div
            className="px-6 mb-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="max-w-2xl mx-auto">
              <p className="text-xs text-nexo-text-muted mb-2">Suggested inquiries:</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion) => (
                  <motion.button
                    key={suggestion}
                    onClick={() => handleSendMessage(suggestion)}
                    className="px-3 py-1.5 rounded-lg bg-nexo-bg-card hover:bg-nexo-bg-card/80 border border-nexo-border transition-all text-xs text-nexo-text-secondary hover:text-nexo-text"
                    whileHover={{ scale: 1.02 }}
                  >
                    {suggestion}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Input */}
        <motion.div
          className="px-6 pb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="max-w-2xl mx-auto">
            <div className="bg-nexo-bg-card border border-nexo-border rounded-xl p-1.5">
              <div className="flex items-end gap-2">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Ask NIX anything..."
                  className="flex-1 bg-transparent border-none outline-none resize-none px-4 py-2.5 text-sm placeholder:text-nexo-text-muted"
                  rows={1}
                  style={{ minHeight: '40px', maxHeight: '100px' }}
                />
                <motion.button
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim() || isTyping}
                  className={`p-2.5 rounded-lg transition-all ${
                    inputValue.trim() && !isTyping
                      ? 'bg-nexo-gold text-nexo-bg'
                      : 'bg-nexo-bg-tertiary text-nexo-text-muted cursor-not-allowed'
                  }`}
                  whileHover={inputValue.trim() && !isTyping ? { scale: 1.05 } : {}}
                  whileTap={inputValue.trim() && !isTyping ? { scale: 0.95 } : {}}
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            <p className="text-[10px] text-center text-nexo-text-muted mt-3">
              NIX can explain concepts, create assessments, summarize topics, and guide your studies
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
