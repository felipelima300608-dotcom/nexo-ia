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
      content: "Saudações, Estudante. Sou NIX, seu mentor nesta jornada de crescimento intelectual. Estou aqui para iluminar conceitos, criar avaliações, orientar seus estudos e ajudá-lo a alcançar excelência. O que vamos explorar hoje?",
      timestamp: new Date(),
      actions: [
        { label: 'Explicar conceito', icon: Lightbulb, action: () => {} },
        { label: 'Criar avaliação', icon: BookOpen, action: () => {} },
        { label: 'Resumir tópico', icon: FileText, action: () => {} },
        { label: 'Orientação de estudo', icon: Brain, action: () => {} },
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
    "Explicar fundações de aprendizado de máquina",
    "Criar um quiz sobre sintaxe de Python",
    "Resumir conceitos de estruturas de dados",
    "Orientar-me através de redes neurais",
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
        'explain': "Deixe-me iluminar este conceito para você.\n\n**Princípios Fundamentais:**\n1. A premissa fundamental repousa na compreensão de relações\n2. Estes conceitos interconectam-se através de estruturas lógicas\n3. A aplicação prática aprofunda a compreensão\n\nDevo elaborar sobre algum princípio, ou prefere um exemplo prático?",
        'quiz': "Aqui está uma breve avaliação para medir sua compreensão:\n\n**Pergunta:**\nQual é o propósito principal desta metodologia?\n\nA) Primeira abordagem\nB) Segunda abordagem\nC) Terceira abordagem\nD) Quarta abordagem\n\nTome seu tempo para considerar. Revelarei a resposta quando estiver preparado.",
        'summarize': "Aqui está uma visão geral concisa:\n\n**Tese Central:** O conceito central concentra-se na compreensão da relação entre elementos.\n\n**Pontos-chave:**\n- Primeiro princípio e suas implicações\n- Segundo princípio e aplicações\n- Terceiro princípio e resultados\n\n**Aplicação:** Este conhecimento viabiliza resolução prática de problemas.\n\nGostaria de explorar algum elemento adicionalmente?",
        'default': "Uma inquietação excelente. Deixe-me orientá-lo através deste conceito.\n\nBaseado em seu perfil de aprendizado, recomendo foco nestos aspectos:\n\n1. **Fundação:** Comece com os princípios fundamentais\n2. **Aplicação:** Observe como a teoria se manifesta na prática\n3. **Domínio:** Solidifique através de prática deliberada\n\nVamos proceder com exploração detalhada, ou prefere exercícios práticos?",
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
          <strong key={index} className="font-semibold text-nexo-red">
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
      <div className="hidden lg:flex w-72 bg-nexo-cream-light border-r border-nexo-divider flex-col items-center justify-center relative overflow-hidden">
        <div className="relative z-10 text-center px-6">
          <NIXMascot size="lg" className="mx-auto mb-6" />

          <h2 className="serif-heading text-2xl mb-1 text-nexo-red">NIX</h2>
          <p className="text-xs text-nexo-text-secondary uppercase tracking-widest mb-6">Seu Mentor</p>

          <div className="space-y-3 text-left max-w-xs">
            <div className="flex items-center gap-3 text-sm">
              <Brain className="w-4 h-4 text-nexo-red" />
              <span className="text-nexo-text-secondary">Ilumina conceitos</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <BookOpen className="w-4 h-4 text-nexo-red" />
              <span className="text-nexo-text-secondary">Cria avaliações</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <FileText className="w-4 h-4 text-nexo-red" />
              <span className="text-nexo-text-secondary">Sintetiza conhecimento</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat */}
      <div className="flex-1 flex flex-col h-screen">
        {/* Header */}
        <motion.div
          className="bg-nexo-cream-light border-b border-nexo-divider px-6 py-3 flex items-center justify-between"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="p-2 rounded-lg hover:bg-nexo-divider transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <NIXMascot size="sm" />
              <div>
                <h1 className="font-medium serif-heading text-nexo-red">NIX</h1>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-nexo-red" />
                  <span className="text-[10px] text-nexo-text-secondary">Pronto para orientar</span>
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
                    className={`max-w-lg rounded-xl p-4 ${
                      message.role === 'user'
                        ? 'bg-nexo-red text-nexo-cream'
                        : 'bg-nexo-cream-light border border-nexo-divider'
                    }`}
                  >
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {formatMessage(message.content)}
                    </div>

                    {message.actions && (
                      <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-nexo-divider">
                        {message.actions.map((action) => {
                          const ActionIcon = action.icon;
                          return (
                            <motion.button
                              key={action.label}
                              onClick={action.action}
                              className="px-3 py-1.5 rounded-lg bg-nexo-divider hover:bg-nexo-beige transition-all flex items-center gap-2 text-xs"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <ActionIcon className="w-3.5 h-3.5 text-nexo-red" />
                              {action.label}
                            </motion.button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {message.role === 'user' && (
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-nexo-red/10 flex items-center justify-center">
                      <span className="text-xs font-medium text-nexo-red">E</span>
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
                <div className="bg-nexo-cream-light border border-nexo-divider rounded-xl p-4">
                  <div className="flex gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-1.5 h-1.5 bg-nexo-red rounded-full"
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
              <p className="text-xs text-nexo-text-secondary mb-2">Perguntas sugeridas:</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion) => (
                  <motion.button
                    key={suggestion}
                    onClick={() => handleSendMessage(suggestion)}
                    className="px-3 py-1.5 rounded-lg bg-nexo-cream-light hover:bg-nexo-divider border border-nexo-divider transition-all text-xs text-nexo-text-secondary hover:text-nexo-text"
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
            <div className="bg-nexo-cream-light border border-nexo-divider rounded-xl p-1.5">
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
                  placeholder="Pergunte ao NIX..."
                  className="flex-1 bg-transparent border-none outline-none resize-none px-4 py-2.5 text-sm placeholder:text-nexo-text-secondary"
                  rows={1}
                  style={{ minHeight: '40px', maxHeight: '100px' }}
                />
                <motion.button
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim() || isTyping}
                  className={`p-2.5 rounded-lg transition-all ${
                    inputValue.trim() && !isTyping
                      ? 'bg-nexo-red text-nexo-cream'
                      : 'bg-nexo-divider text-nexo-text-secondary cursor-not-allowed'
                  }`}
                  whileHover={inputValue.trim() && !isTyping ? { scale: 1.05 } : {}}
                  whileTap={inputValue.trim() && !isTyping ? { scale: 0.95 } : {}}
                >
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            <p className="text-[10px] text-center text-nexo-text-secondary mt-3">
              NIX pode explicar conceitos, criar avaliações, resumir tópicos e orientar seus estudos
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
