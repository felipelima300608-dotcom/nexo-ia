import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Send,
  BookOpen,
  Lightbulb,
  FileText,
  MessageSquare,
  Brain,
  ChevronLeft,
  Plus,
  Copy,
  ThumbsUp,
  Share2,
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content:
        'Saudações, Felipe! Sou NIX, seu mentor neste caminho de crescimento intelectual. Estou aqui para iluminar conceitos, criar avaliações, orientar seus estudos e ajudá-lo a alcançar excelência. O que vamos explorar hoje?',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (text?: string) => {
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
        explain:
          'Deixe-me iluminar este conceito para você.\n\n**Princípios Fundamentais:**\n1. A premissa fundamental repousa na compreensão\n2. Estes conceitos interconectam-se através de lógica\n3. A aplicação prática aprofunda compreensão',
        quiz: 'Aqui está uma breve avaliação:\n\n**Pergunta:**\nQual é o propósito principal?\n\nA) Primeira\nB) Segunda\nC) Terceira',
        summarize: 'Aqui está uma visão geral:\n\n**Conceito Central:** A compreensão de relações\n\n**Pontos-chave:**\n- Primeiro princípio\n- Segundo princípio',
        default:
          'Uma pergunta excelente. Deixe-me orientá-lo.\n\nBased em seu perfil, recomendo:\n\n1. **Fundação:** Comece com princípios\n2. **Aplicação:** Veja na prática\n3. **Domínio:** Pratique deliberadamente',
      };

      let responseKey = 'default';
      const lowerText = messageText.toLowerCase();
      if (lowerText.includes('explain')) responseKey = 'explain';
      else if (lowerText.includes('quiz')) responseKey = 'quiz';
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

  return (
    <div className="min-h-screen bg-nexo-bg">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-3 gap-6">
          {/* COLUNA 1: Histórico/Sugestões */}
          <motion.div
            className="content-box"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="red-header mb-6">
              HISTÓRICO DE CONVERSAS
            </div>

            <button className="btn-primary w-full mb-6 flex items-center justify-center gap-2">
              <Plus className="w-4 h-4" />
              NOVA CONVERSA
            </button>

            <div className="space-y-2 mb-8">
              {[
                'Explicar Machine Learning',
                'Python para Iniciantes',
                'Estratégia de Copywriting',
                'Análise de Dados Básica',
                'SEO e Otimização',
              ].map((topic, idx) => (
                <motion.button
                  key={idx}
                  className="w-full text-left p-3 border-2 border-nexo-red rounded-lg hover:bg-nexo-red hover:text-nexo-cream transition-all text-xs font-bold text-nexo-text"
                  whileHover={{ x: 4 }}
                >
                  {topic}
                </motion.button>
              ))}
            </div>

            <div className="divider-red mb-6" />

            <h3 className="font-bold text-nexo-red uppercase text-xs mb-4">SUGESTÕES RÁPIDAS</h3>
            <div className="space-y-2">
              {[
                'Explicar este conteúdo',
                'Criar um quiz',
                'Resumir tópico',
                'Orientação de estudo',
              ].map((suggestion, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => handleSendMessage(suggestion)}
                  className="btn-secondary text-[10px] w-full"
                  whileHover={{ scale: 1.02 }}
                >
                  {suggestion}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* COLUNA 2: Chat Principal */}
          <motion.div
            className="content-box"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="red-header mb-4">
              3. ASSISTENTE NIX (IA)
            </div>

            {/* Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b-2 border-nexo-red">
              <div className="flex items-center gap-3">
                <motion.button
                  onClick={() => navigate('/dashboard')}
                  whileHover={{ scale: 1.05 }}
                >
                  <ChevronLeft className="w-5 h-5 text-nexo-red" />
                </motion.button>
                <div>
                  <h1 className="font-bold text-nexo-red uppercase text-sm">NIX</h1>
                  <p className="text-[10px] text-nexo-text-secondary">Pronto para guiar</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
              {messages.map((message, idx) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && (
                    <img
                      src="/Design_sem_nome_(22).png"
                      alt="NIX"
                      className="h-8 w-8 rounded-full object-cover flex-shrink-0"
                    />
                  )}

                  <div
                    className={`max-w-xs rounded-lg p-3 ${
                      message.role === 'user'
                        ? 'bg-nexo-red text-nexo-cream'
                        : 'bg-nexo-cream-light border-2 border-nexo-red'
                    }`}
                  >
                    <p className="text-xs leading-relaxed">{message.content}</p>
                    <p className="text-[8px] mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>

                  {message.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-nexo-red/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-nexo-red">F</span>
                    </div>
                  )}
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  className="flex gap-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <img
                    src="/Design_sem_nome_(22).png"
                    alt="NIX"
                    className="h-8 w-8 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="bg-nexo-cream-light border-2 border-nexo-red rounded-lg p-3">
                    <div className="flex gap-1.5">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-1.5 h-1.5 bg-nexo-red rounded-full"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.15,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Pergunte ao NIX..."
                className="flex-1 px-3 py-2 border-2 border-nexo-red rounded-lg text-xs placeholder-nexo-text-secondary focus:outline-none focus:ring-2 focus:ring-nexo-red"
              />
              <motion.button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isTyping}
                className={`px-4 py-2 rounded-lg font-bold transition-all ${
                  inputValue.trim() && !isTyping
                    ? 'bg-nexo-red text-nexo-cream hover:bg-nexo-red-dark'
                    : 'bg-nexo-divider text-nexo-text-secondary cursor-not-allowed'
                }`}
                whileHover={inputValue.trim() && !isTyping ? { scale: 1.05 } : {}}
              >
                <Send className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>

          {/* COLUNA 3: Recursos e Informações */}
          <motion.div
            className="content-box"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="red-header mb-6">
              RECURSOS E DICAS
            </div>

            <div className="bg-nexo-red text-nexo-cream p-4 rounded-lg mb-6 text-center">
              <h3 className="font-bold uppercase text-sm mb-2">O que NIX pode fazer?</h3>
              <p className="text-xs leading-relaxed">
                NIX pode explicar conceitos, criar avaliações, resumir tópicos e guiar seus estudos com precisão acadêmica.
              </p>
            </div>

            <div className="space-y-3 mb-6">
              {[
                { icon: Brain, label: 'Explicar Conceitos', desc: 'Defina e ilumine qualquer ideia' },
                { icon: BookOpen, label: 'Criar Avaliações', desc: 'Quizzes personalizados' },
                { icon: FileText, label: 'Sintetizar', desc: 'Resumos precisos' },
                { icon: Lightbulb, label: 'Orientação', desc: 'Próximos passos' },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={idx}
                    className="border-l-4 border-nexo-red pl-3 py-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="w-4 h-4 text-nexo-red" />
                      <p className="font-bold text-xs text-nexo-red uppercase">{item.label}</p>
                    </div>
                    <p className="text-[10px] text-nexo-text-secondary">{item.desc}</p>
                  </motion.div>
                );
              })}
            </div>

            <div className="divider-red mb-6" />

            <h3 className="font-bold text-nexo-red uppercase text-xs mb-3">DICAS IMPORTANTES</h3>
            <div className="space-y-2 text-[10px] text-nexo-text leading-relaxed">
              <p>
                <span className="font-bold text-nexo-red">★</span> Seja específico em suas perguntas
              </p>
              <p>
                <span className="font-bold text-nexo-red">★</span> Forneça contexto quando possível
              </p>
              <p>
                <span className="font-bold text-nexo-red">★</span> Peça exemplos para melhor compreensão
              </p>
              <p>
                <span className="font-bold text-nexo-red">★</span> Questione respostas para aprofundar
              </p>
            </div>

            <div className="divider-red mt-6 mb-6" />

            <div className="bg-nexo-red/10 border-2 border-nexo-red p-4 rounded-lg text-center">
              <p className="text-xs text-nexo-text font-medium leading-relaxed">
                "A qualidade de suas perguntas determina a qualidade de seu aprendizado."
              </p>
              <p className="text-[10px] text-nexo-red font-bold mt-2">— NIX</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
