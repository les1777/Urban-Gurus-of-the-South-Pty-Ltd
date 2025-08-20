import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat } from "@google/genai";
import Spinner from './Spinner';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const chat: Chat = ai.chats.create({
  model: 'gemini-2.5-flash',
  config: {
    systemInstruction: `You are 'Guru', an informational AI assistant for new parents. Your tone is warm, empathetic, and reassuring. Provide concise, helpful answers based on public knowledge. You are not a medical professional.
    IMPORTANT: ALWAYS end every single response with the following disclaimer on a new line:
    'Disclaimer: I am an AI assistant. This information is for educational purposes only and not a substitute for professional medical advice. Always consult with your doctor.'`,
  },
});

const KnowledgeHub: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
        const result = await chat.sendMessageStream({ message: input });
        let modelResponse = '';
        setMessages(prev => [...prev, { role: 'model', text: '' }]);

        for await (const chunk of result) {
            modelResponse += chunk.text;
            setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1].text = modelResponse;
                return newMessages;
            });
        }
    } catch (error) {
        console.error("Error sending message:", error);
        setMessages(prev => [...prev, { role: 'model', text: "Something went wrong. Try again." }]);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col h-[70vh]">
      <div className="flex-1 overflow-y-auto pr-2 space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs md:max-w-md lg:max-w-lg rounded-2xl px-4 py-2 whitespace-pre-wrap ${
              msg.role === 'user' 
                ? 'bg-blue-500 text-white rounded-br-none' 
                : 'bg-gray-200 text-gray-800 rounded-bl-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
         {isLoading && messages[messages.length-1].role === 'user' && (
             <div className="flex justify-start">
                <div className="bg-gray-200 text-gray-800 rounded-2xl rounded-bl-none px-4 py-3">
                    <Spinner/>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className="mt-4 flex items-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about sleep, feeding, etc..."
          className="flex-1 p-3 rounded-full border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="ml-3 bg-indigo-500 text-white rounded-full h-12 w-12 flex items-center justify-center disabled:bg-indigo-300 transition-colors"
          disabled={isLoading || !input.trim()}
          aria-label="Send message"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
        </button>
      </form>
    </div>
  );
};

export default KnowledgeHub;