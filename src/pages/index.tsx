import { useState, useRef, useEffect } from "react";
import { HiOutlineEmojiHappy, HiOutlinePaperAirplane } from "react-icons/hi";
import Header from "../components/Header";
import { useTasks } from "../components/TasksContext";

interface Message {
  role: string;
  content: string;
  tool_call_id: null;
  tool_calls: null;
}

export default function Home() {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversation, setConversation] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I'm Tinkerbell, your beauty salon assistant! How can I help you today? ✨💅",
      tool_call_id: null,
      tool_calls: null,
    },
  ]);
  const chatRef = useRef<HTMLDivElement>(null);
  const { addTasks } = useTasks();

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [conversation]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setIsLoading(true);
    setConversation((prev) => [
      ...prev,
      { role: "user", content: message, tool_call_id: null, tool_calls: null },
    ]);
    try {
      const response = await fetch(
        "https://re53cs0k.clj5khk.gcp.restack.it/api/agents/AgentChatToolFunctions/7e986f3c-AgentChatToolFunctions/019671f6-c007-7f14-9126-e9d0ee2290d1",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            eventName: "messages",
            eventInput: {
              messages: [
                {
                  role: "user",
                  content: message,
                },
              ],
            },
          }),
        }
      );
      if (!response.ok) throw new Error("Failed to send message");
      const data = await response.json();
      if (data.tasks && Array.isArray(data.tasks)) {
        addTasks(data.tasks);
      }
      setConversation((prev) => [
        ...prev,
        ...Object.values(data).filter((msg: any): msg is Message => typeof msg === 'object' && msg && typeof msg.role === 'string' && typeof msg.content === 'string'),
      ]);
      setMessage("");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex flex-col items-center justify-start pt-20">
        <div className="w-full max-w-2xl mx-auto pt-16 px-4 flex flex-col items-center">
          <h1 className="text-4xl font-bold text-gray-800 text-center mb-2 tracking-tight">
            Welcome to Your Beauty Assistant <span className="inline-block align-middle">✨</span>
          </h1>
          <p className="text-lg text-gray-600 text-center mb-10">
            Meet Tinkerbell, your personal beauty salon concierge. Book appointments, get beauty advice, and more! <span role="img" aria-label="flower">🌸</span>
          </p>
          <div className="w-full flex-1 flex flex-col">
            <div
              ref={chatRef}
              className="flex-1 overflow-y-auto pb-6"
              style={{ minHeight: 120, maxHeight: 220 }}
            >
              {conversation.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} mb-4`}
                >
                  <div
                    className={`rounded-2xl px-6 py-4 text-base max-w-[80%] ${
                      msg.role === "user"
                        ? "bg-pink-200 text-gray-800"
                        : "bg-pink-300 text-gray-800"
                    }`}
                    style={{ wordBreak: "break-word" }}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
            <form
              onSubmit={handleSubmit}
              className="w-full flex items-center gap-2 border-t border-pink-100 pt-6 mt-2"
              autoComplete="off"
            >
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-pink-100 text-pink-400">
                <HiOutlineEmojiHappy size={24} />
              </span>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Message Tinkerbell..."
                className="flex-1 px-4 py-3 rounded-full border border-pink-100 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-200 text-base shadow-sm"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !message.trim()}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-pink-300 hover:bg-pink-400 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <HiOutlinePaperAirplane size={22} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
