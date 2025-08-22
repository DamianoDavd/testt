import React, { useRef, useEffect, useState } from "react";
import { collection, addDoc, onSnapshot, serverTimestamp } from "firebase/firestore";
import { db } from "./elemental";

const COLORS = {
  bg: "#f8fafc",
  card: "#ffffff",
  primary: "#2563eb",
  primaryHover: "#1d4ed8",
  primaryLight: "#3b82f6",
  secondary: "#10b981",
  accent: "#f59e0b",
  text: "#1e293b",
  textSecondary: "#64748b",
  border: "#e2e8f0",
  surface: "#f1f5f9",
  shadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
  shadowLight: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
};

const Section = {
  minHeight: "100vh",
  width: "100%",
  background: `linear-gradient(135deg, ${COLORS.bg} 0%, #e0f2fe 100%)`,
  color: COLORS.text,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  boxSizing: "border-box",
};

const Container = {
  display: "flex",
  width: "90%",
  maxWidth: "1400px",
  margin: "0 auto",
  gap: "24px",
  height: "88vh",
  boxSizing: "border-box",
  flexWrap: "nowrap",
  "@media (max-width: 768px)": {
    flexDirection: "column",
    height: "auto",
    gap: "16px",
  }
};

const ChatContainer = {
  width: "380px",
  height: "100%",
  background: COLORS.card,
  borderRadius: "24px",
  boxShadow: COLORS.shadow,
  border: `1px solid ${COLORS.border}`,
  display: "flex",
  flexDirection: "column",
  flexShrink: 0,
  overflow: "hidden",
  "@media (max-width: 768px)": {
    width: "100%",
    height: "60vh",
    minHeight: "400px",
  }
};

const ChatHeader = {
  background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryLight} 100%)`,
  color: "white",
  padding: "1.4rem 1.6rem",
  display: "flex",
  alignItems: "center",
  gap: "1.2rem",
  position: "relative",
  overflow: "hidden",
  borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
};

const HeaderPattern = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundImage: `
    radial-gradient(circle at 10% 30%, rgba(255,255,255,0.1) 0%, transparent 40%),
    radial-gradient(circle at 90% 70%, rgba(255,255,255,0.1) 0%, transparent 40%)
  `,
  pointerEvents: "none",
  opacity: 0.7,
};

const BotAvatar = {
  width: "52px",
  height: "52px",
  borderRadius: "18px",
  background: "rgba(255, 255, 255, 0.2)",
  border: "2px solid rgba(255, 255, 255, 0.3)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "1.7rem",
  zIndex: 1,
  boxShadow: "0 4px 14px rgba(0, 0, 0, 0.15)",
};

const HeaderText = {
  zIndex: 1,
};

const MessagesArea = {
  flex: 1,
  padding: "1.4rem 1.6rem",
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  gap: "1.2rem",
  background: `linear-gradient(to bottom, ${COLORS.surface}, ${COLORS.bg})`,
  scrollbarWidth: "thin",
  msOverflowStyle: "none",
};

MessagesArea["::-webkit-scrollbar"] = { width: "6px" };
MessagesArea["::-webkit-scrollbar-track"] = { background: "transparent" };
MessagesArea["::-webkit-scrollbar-thumb"] = {
  background: COLORS.border,
  borderRadius: "3px",
};

const Message = {
  display: "flex",
  gap: "1rem",
  maxWidth: "85%",
  position: "relative",
  animation: "fadeIn 0.3s ease-out",
};

const UserMessage = {
  ...Message,
  alignSelf: "flex-end",
  flexDirection: "row-reverse",
};

const BotMessage = {
  ...Message,
  alignSelf: "flex-start",
};

const AvatarWrapper = {
  flexShrink: 0,
  width: "40px",
  height: "40px",
  borderRadius: "12px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "1.2rem",
  boxShadow: "0 3px 8px rgba(0,0,0,0.15)",
};

const BotAvatarWrapper = {
  ...AvatarWrapper,
  background: `linear-gradient(135deg, ${COLORS.secondary} 0%, #059669 100%)`,
  color: "white",
};

const UserAvatarWrapper = {
  ...AvatarWrapper,
  background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryHover} 100%)`,
  color: "white",
};

const BubbleBase = {
  padding: "0.9rem 1.3rem",
  borderRadius: "20px",
  fontSize: "0.95rem",
  lineHeight: "1.6",
  wordWrap: "break-word",
  position: "relative",
  maxWidth: "100%",
  boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
};

const BotBubble = {
  ...BubbleBase,
  background: COLORS.card,
  color: COLORS.text,
  border: `1px solid ${COLORS.border}`,
  borderTopLeftRadius: "8px",
};

const UserBubble = {
  ...BubbleBase,
  background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryLight} 100%)`,
  color: "white",
  borderTopRightRadius: "8px",
};

const TypingIndicator = {
  ...BotBubble,
  display: "flex",
  alignItems: "center",
  gap: "0.6rem",
  padding: "0.7rem 1.3rem",
  color: COLORS.textSecondary,
  fontSize: "0.85rem",
  fontStyle: "italic",
};

const Dot = {
  width: "7px",
  height: "7px",
  backgroundColor: "currentColor",
  borderRadius: "50%",
  display: "inline-block",
};

const InputArea = {
  display: "flex",
  alignItems: "flex-end",
  gap: "0.9rem",
  padding: "1rem 1.6rem 1.4rem",
  background: COLORS.card,
  borderTop: `1px solid ${COLORS.border}`,
};

const InputWrapper = {
  flex: 1,
  position: "relative",
};

const Input = {
  width: "100%",
  padding: "0.9rem 1.3rem",
  border: `2px solid ${COLORS.border}`,
  borderRadius: "16px",
  background: COLORS.surface,
  color: COLORS.text,
  fontSize: "0.95rem",
  outline: "none",
  resize: "none",
  minHeight: "52px",
  maxHeight: "120px",
  lineHeight: "1.5",
  transition: "all 0.2s ease",
  fontFamily: "inherit",
  boxSizing: "border-box",
};

const ActionButton = {
  width: "44px",
  height: "44px",
  borderRadius: "14px",
  border: "none",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  fontSize: "1.2rem",
  transition: "all 0.2s ease",
  position: "relative",
  overflow: "hidden",
  fontWeight: "bold",
};

const UploadButton = {
  ...ActionButton,
  background: `linear-gradient(135deg, ${COLORS.textSecondary} 0%, #4b5563 100%)`,
  color: "white",
  boxShadow: "0 4px 12px rgba(107, 114, 128, 0.3)",
};

const SendButton = {
  ...ActionButton,
  background: `linear-gradient(135deg, ${COLORS.primary} 0%, ${COLORS.primaryLight} 100%)`,
  color: "white",
  boxShadow: "0 4px 14px rgba(37, 99, 235, 0.35)",
};

const SendButtonDisabled = {
  ...SendButton,
  background: COLORS.border,
  color: COLORS.textSecondary,
  boxShadow: "none",
  cursor: "not-allowed",
};

const CommentContainer = {
  flex: 1,
  background: COLORS.card,
  borderRadius: "20px",
  padding: "1.4rem",
  boxShadow: COLORS.shadow,
  display: "flex",
  flexDirection: "column",
  border: `1px solid ${COLORS.border}`,
  overflow: "hidden",
  "@media (max-width: 768px)": {
    width: "100%",
    flex: "none",
    height: "40vh",
    minHeight: "300px",
    padding: "1rem",
  }
};

const CommentHeader = {
  margin: "0 0 0.6rem 0",
  textAlign: "center",
  color: COLORS.text,
  fontSize: "1.2rem",
  fontWeight: "700",
  paddingBottom: "0.4rem",
  borderBottom: `2px solid ${COLORS.accent}`,
  display: "inline-block",
  marginInline: "auto",
};

const CommentSubtitle = {
  textAlign: "center",
  color: COLORS.textSecondary,
  fontSize: "0.9rem",
  margin: "0.4rem 0 1rem 0",
  fontStyle: "italic",
};

const CommentList = {
  flex: 1,
  overflowY: "auto",
  padding: "0.6rem",
  margin: "0 0 1rem 0",
  borderRadius: "14px",
  background: COLORS.surface,
  border: `1px solid ${COLORS.border}`,
  display: "flex",
  flexDirection: "column",
  gap: "0.6rem",
  scrollbarWidth: "thin",
};

CommentList["::-webkit-scrollbar"] = { width: "6px" };
CommentList["::-webkit-scrollbar-thumb"] = {
  background: COLORS.border,
  borderRadius: "3px",
};

const CommentItem = {
  padding: "0.9rem",
  background: COLORS.card,
  borderRadius: "12px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  display: "flex",
  flexDirection: "column",
  gap: "0.4rem",
  border: `1px solid ${COLORS.border}`,
  transition: "transform 0.1s ease",
};

CommentItem[":hover"] = {
  transform: "translateY(-2px)",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
};

const CommentUser = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: "0.9rem",
  fontWeight: "600",
};

const CommentUserName = {
  color: COLORS.accent,
  fontWeight: "700",
};

const CommentTime = {
  color: COLORS.textSecondary,
  fontSize: "0.75rem",
};

const CommentText = {
  margin: "0",
  fontSize: "0.95rem",
  lineHeight: "1.55",
  color: COLORS.text,
  wordWrap: "break-word",
};

const CommentForm = {
  display: "flex",
  gap: "0.6rem",
  marginTop: "auto",
};

const CommentInput = {
  flex: 1,
  padding: "0.7rem 1rem",
  border: `1px solid ${COLORS.border}`,
  borderRadius: "12px",
  outline: "none",
  fontSize: "0.95rem",
  background: COLORS.surface,
  boxShadow: "inset 0 1px 3px rgba(0,0,0,0.08)",
  transition: "border 0.2s ease",
};

CommentInput[":focus"] = {
  borderColor: COLORS.primary,
  boxShadow: `0 0 0 3px rgba(37, 99, 235, 0.1)`,
};

const CommentButton = {
  background: COLORS.accent,
  color: "white",
  border: "none",
  padding: "0.7rem 1.2rem",
  borderRadius: "12px",
  cursor: "pointer",
  fontWeight: "700",
  fontSize: "0.95rem",
  transition: "all 0.2s ease",
  boxShadow: "0 4px 12px rgba(245, 158, 11, 0.3)",
};

CommentButton[":hover"] = {
  background: "#d97706",
  transform: "translateY(-1px)",
  boxShadow: "0 6px 16px rgba(245, 158, 11, 0.35)",
};

const API_KEY = "AIzaSyDCVEGeZuzgyT5El2V9OBvf3BCB4iRR7Ok";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

const initialChatHistory = [
  {
    role: "user",
    parts: [
      {
        text: "Kamu adalah chatbot khusus yang hanya menjawab pertanyaan terkait program Adiwiyata, lingkungan sekolah, dan kegiatan peduli lingkungan. Jika ada pertanyaan di luar topik tersebut, tolak dengan sopan."
      }
    ]
  }
];

export default function Showcase() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [file, setFile] = useState(null);
  const [chatHistory, setChatHistory] = useState([...initialChatHistory]);
  const [isTyping, setIsTyping] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const messagesAreaRef = useRef(null);
  const commentsAreaRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "comments"), (snapshot) => {
      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate ? doc.data().timestamp.toDate() : new Date(),
      }));
      setComments(list);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    messagesAreaRef.current?.scrollTo({ 
      top: messagesAreaRef.current.scrollHeight, 
      behavior: "smooth" 
    });
  }, [messages]);

  useEffect(() => {
    commentsAreaRef.current?.scrollTo({ 
      top: commentsAreaRef.current.scrollHeight, 
      behavior: "smooth" 
    });
  }, [comments]);

  const handleSendComment = async () => {
    if (!newComment.trim()) return;
    await addDoc(collection(db, "comments"), {
      text: newComment.trim(),
      timestamp: serverTimestamp(),
    });
    setNewComment("");
  };

  const sendMessage = async () => {
    const trimmed = userInput.trim();
    if (!trimmed && !file) return;

    const userMsg = {
      id: Date.now(),
      sender: "user",
      text: trimmed,
      file,
      timestamp: new Date().toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };

    setMessages(prev => [...prev, userMsg]);
    setUserInput("");
    setFile(null);
    setIsTyping(true);

    const userContent = { role: "user", parts: [{ text: trimmed }] };
    if (file) {
      userContent.parts.push({
        inline_data: {
          data: file.base64String,
          mime_type: file.mime_type
        }
      });
    }

    setChatHistory(prev => [...prev, userContent]);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [...chatHistory, userContent] }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error?.message);

      const botText = data.candidates[0].content.parts[0].text
        .replace(/\\(.?)\\*/g, "$1")
        .trim();

      setIsTyping(false);
      setChatHistory(prev => [...prev, { 
        role: "model", 
        parts: [{ text: botText }] 
      }]);

      const botMsg = {
        id: Date.now() + 1,
        sender: "bot",
        text: botText,
        timestamp: new Date().toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: "bot",
        text: "Maaf, terjadi kesalahan. Silakan coba lagi nanti.",
        timestamp: new Date().toLocaleTimeString([], { 
          hour: '2-digit', 
          minute: '2-digit' 
        })
      }]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64String = e.target.result.split(",")[1];
      setFile({ base64String, mime_type: file.type });
    };
    reader.readAsDataURL(file);
  };

  const adjustTextareaHeight = (e) => {
    e.target.style.height = "52px";
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
  };

  const formatTime = (date) => {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return "baru saja";
    if (minutes < 60) return `${minutes} menit lalu`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)} jam lalu`;
    return `${Math.floor(minutes / 1440)} hari lalu`;
  };

  return (
    <div style={{
      ...Section,
      "@media (max-width: 768px)": {
        padding: "16px",
      }
    }}>
      <div style={{
        ...Container,
        ...(window.innerWidth <= 768 && {
          flexDirection: "column",
          height: "auto",
          gap: "16px",
        })
      }}>
        
        <div style={{
          ...ChatContainer,
          ...(window.innerWidth <= 768 && {
            width: "100%",
            height: "60vh",
            minHeight: "400px",
          })
        }}>
          <div style={ChatHeader}>
            <div style={HeaderPattern}></div>
            <div style={BotAvatar}>🌿</div>
            <div style={HeaderText}>
              <h1 style={{ 
                fontSize: "1.4rem", 
                fontWeight: "600", 
                margin: 0 
              }}>
                AdiBot
              </h1>
              <p style={{ 
                fontSize: "0.85rem", 
                opacity: "0.95", 
                margin: "0.2rem 0 0 0" 
              }}>
                Asisten Digital Program Adiwiyata
              </p>
            </div>
          </div>

          <div style={MessagesArea} ref={messagesAreaRef}>
            {messages.length === 0 ? (
              <div style={{
                ...BotBubble,
                alignSelf: "center",
                textAlign: "center",
                background: `linear-gradient(135deg, ${COLORS.secondary} 0%, #059669 100%)`,
                color: "white",
                maxWidth: "90%",
                padding: "1.6rem",
                boxShadow: "0 8px 25px rgba(16, 185, 129, 0.25)",
                fontWeight: "500",
                lineHeight: "1.6",
              }}>
                <div style={{ fontSize: "1.2rem", marginBottom: "0.6rem" }}>
                  Selamat datang di AdiBot! 👋
                </div>
                <div style={{ opacity: "0.95", fontSize: "0.95rem" }}>
                  Saya siap membantu Anda dengan pertanyaan seputar program Adiwiyata, 
                  pengelolaan lingkungan sekolah, bank sampah, dan kegiatan ramah lingkungan lainnya.
                </div>
              </div>
            ) : (
              <>
                {messages.map((msg) => (
                  <div key={msg.id} style={msg.sender === "user" ? UserMessage : BotMessage}>
                    <div style={msg.sender === "user" ? UserAvatarWrapper : BotAvatarWrapper}>
                      {msg.sender === "user" ? "👤" : "🤖"}
                    </div>
                    <div>
                      <div style={msg.sender === "user" ? UserBubble : BotBubble}>
                        <div style={{ whiteSpace: "pre-wrap" }}>
                          {msg.text}
                        </div>
                        {msg.file && (
                          <img
                            src={`data:${msg.file.mime_type};base64,${msg.file.base64String}`}
                            alt="Attachment"
                            style={{
                              marginTop: "0.8rem",
                              maxWidth: "160px",
                              maxHeight: "160px",
                              borderRadius: "12px",
                              objectFit: "cover",
                              border: `1px solid ${COLORS.border}`,
                              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                            }}
                          />
                        )}
                      </div>
                      <div style={{
                        fontSize: "0.75rem",
                        color: COLORS.textSecondary,
                        marginTop: "0.5rem",
                        textAlign: msg.sender === "user" ? "right" : "left",
                      }}>
                        {msg.timestamp}
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div style={BotMessage}>
                    <div style={BotAvatarWrapper}>🤖</div>
                    <div>
                      <div style={TypingIndicator}>
                        <span>AdiBot sedang mengetik</span>
                        <div style={{ display: "flex", gap: "3px" }}>
                          <span style={{ 
                            ...Dot, 
                            animation: "pulse 1.5s infinite ease-in-out" 
                          }}></span>
                          <span style={{ 
                            ...Dot, 
                            animation: "pulse 1.5s infinite ease-in-out 0.3s" 
                          }}></span>
                          <span style={{ 
                            ...Dot, 
                            animation: "pulse 1.5s infinite ease-in-out 0.6s" 
                          }}></span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          <div style={InputArea}>
            <div style={InputWrapper}>
              <textarea
                style={Input}
                value={userInput}
                onChange={(e) => {
                  setUserInput(e.target.value);
                  adjustTextareaHeight(e);
                }}
                onKeyPress={handleKeyPress}
                placeholder="Tanyakan tentang Adiwiyata..."
                rows="1"
              />
            </div>
            <label htmlFor="file-input" style={UploadButton}>📎</label>
            <button
              onClick={sendMessage}
              disabled={!userInput.trim() && !file}
              style={!userInput.trim() && !file ? SendButtonDisabled : SendButton}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2 21L23 12L2 3V10L17 12L2 14V21Z" />
              </svg>
            </button>
          </div>

          <input
            type="file"
            id="file-input"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>

        <div style={{
          ...CommentContainer,
          ...(window.innerWidth <= 768 && {
            width: "100%",
            flex: "none",
            height: "40vh",
            minHeight: "300px",
            padding: "1rem",
          })
        }}>
          <div style={CommentHeader}>Berikan Tanggapan Anda</div>
          <p style={CommentSubtitle}>Mengenai Program Adiwiyata</p>

          <div style={CommentList} ref={commentsAreaRef}>
            {comments.length === 0 ? (
              <div style={{
                padding: "1.2rem",
                textAlign: "center",
                color: COLORS.textSecondary,
                fontStyle: "italic",
              }}>
                Belum ada komentar...
              </div>
            ) : (
              comments.map((comment) => (
                <div key={comment.id} style={CommentItem}>
                  <div style={CommentUser}>
                    <span style={CommentUserName}>Anonim</span>
                    <span style={CommentTime}>
                      {formatTime(comment.timestamp)}
                    </span>
                  </div>
                  <p style={CommentText}>{comment.text}</p>
                </div>
              ))
            )}
          </div>

          <div style={CommentForm}>
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendComment()}
              placeholder="Ketik pesan..."
              style={CommentInput}
            />
            <button onClick={handleSendComment} style={CommentButton}>
              Kirim
            </button>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes fadeIn {
          from { 
            opacity: 0; 
            transform: translateY(10px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}