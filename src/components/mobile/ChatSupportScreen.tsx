import React, { useState } from 'react';
import { ArrowLeft, Send, Bot } from 'lucide-react';

interface ChatSupportScreenProps {
  onBack: () => void;
}

export const ChatSupportScreen: React.FC<ChatSupportScreenProps> = ({ onBack }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'support',
      text: 'Halo! Saya asisten dukungan cocok.in. Ada yang bisa saya bantu?',
      time: '09:41',
    },
  ]);
  const [draft, setDraft] = useState('');

  const sendMessage = () => {
    if (!draft.trim()) return;

    const now = new Date();
    const time = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), sender: 'user', text: draft.trim(), time },
      {
        id: Date.now() + 1,
        sender: 'support',
        text: 'Terima kasih, tim kami akan menindaklanjuti permintaan Anda dalam beberapa menit.',
        time,
      },
    ]);
    setDraft('');
  };

  return (
    <div className="flex h-[70vh] flex-col pb-4">
      <div className="flex items-center gap-3 border-b border-slate-200 pb-3 mb-3">
        <button onClick={onBack} className="p-1 rounded-lg hover:bg-slate-100 text-slate-600">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-full bg-blue-100 text-blue-600">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-800">Live Chat Dukungan</h3>
            <p className="text-[10px] text-slate-500">Online • balas dalam hitungan menit</p>
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-2 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-3">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-xs ${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'}`}>
              <p>{msg.text}</p>
              <p className={`mt-1 text-[10px] ${msg.sender === 'user' ? 'text-blue-100' : 'text-slate-400'}`}>{msg.time}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-2 rounded-2xl border border-slate-200 bg-white p-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Ketik pertanyaan Anda..."
          className="flex-1 bg-transparent px-2 py-2 text-sm outline-none"
        />
        <button
          onClick={sendMessage}
          className="rounded-xl bg-blue-600 p-2 text-white"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
