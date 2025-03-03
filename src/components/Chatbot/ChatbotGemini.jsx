"use client";

import { useState } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  ChatContainer,
  MessageList,
  MessageInput,
  MainContainer,
  Message,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

const API_KEY = "AIzaSyBEuL6OActMOfUTkJaZTNEJ0ScJPWvI2nw";

export default function ChatBotGemini() {
  const [typing, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message:
        "¡Hola! Soy un asistente virtual de MobileCer, aquí para ayudarte con cualquier consulta sobre la reparación de tus celulares, tablets o laptops.  ¿En qué puedo ayudarte hoy?",
      sender: "bot",
    },
  ]);
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar si el chat está abierto o cerrado

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "user",
      direction: "outgoing",
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    setIsTyping(true);
    await processMessageToGemini(newMessages);
  };

  async function processMessageToGemini(chatMessages) {
    const userMessage = chatMessages[chatMessages.length - 1].message;

    const apiRequestBody = {
      contents: [
        {
          parts: [
            {
              text: "Eres un asistente experto en atención al público, que trabaja para la empresa MobileCer que se encarga de reparar celulares, tablets y laptops. Responde de forma profesional, amigable y en español. Mantén las respuestas cortas y claras.",
            },
          ],
          role: "model",
        },
        {
          parts: [{ text: userMessage }], // Mensaje del usuario
          role: "user",
        },
      ],
    };

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(apiRequestBody),
        }
      );

      const data = await response.json();

      if (data.candidates && data.candidates.length > 0) {
        const botResponse = data.candidates[0].content.parts[0].text;

        setMessages([
          ...chatMessages,
          {
            message: botResponse,
            sender: "bot",
          },
        ]);
      } else {
        console.error("Error en la respuesta de Gemini:", data);
      }
    } catch (error) {
      console.error("Error al llamar a la API de Gemini:", error);
    }

    setIsTyping(false);
  }

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 1000,
      }}
    >
      {/* Botón flotante para abrir/cerrar el chat */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          cursor: "pointer",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          transition: "transform 0.2s ease-in-out",
          transform: isOpen ? "rotate(360deg)" : "rotate(0deg)", // Efecto de rotación
        }}
        onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.9)")} // Efecto de escala al hacer clic
        onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")} // Restablecer escala
      >
        <i className="fas fa-comment"></i> {/* Icono de chat */}
      </button>

      {/* Chat desplegable */}
      <div
        style={{
          position: "absolute",
          bottom: isOpen ? "70px" : "-500px", // Desplazamiento suave
          right: "0",
          width: "350px",
          height: "400px",
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          transition: "bottom 0.3s ease-in-out", // Transición suave
          opacity: isOpen ? 1 : 0, // Fade-in
        }}
      >
        <MainContainer>
          <ChatContainer>
            <MessageList
              scrollBehavior="smooth"
              typingIndicator={
                typing ? <TypingIndicator content="Escribiendo..." /> : null
              }
            >
              {messages.map((message, i) => (
                <Message
                  key={i}
                  model={{
                    message: message.message,
                    sender: message.sender,
                    direction:
                      message.sender === "user" ? "outgoing" : "incoming",
                  }}
                />
              ))}
            </MessageList>
            <MessageInput
              placeholder="Escribe un mensaje..."
              onSend={handleSend}
              attachButton={false}
            />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
}
