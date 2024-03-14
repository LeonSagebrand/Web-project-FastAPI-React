import React, { useState, useEffect } from 'react';

const GroupChat = () => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [ws, setWs] = useState(null);

  useEffect(() => {
    // Establish WebSocket connection
    const ws = new WebSocket('ws://localhost:8000/chat'); // Replace with your WebSocket URL
    setWs(ws);

    ws.onopen = () => {
      console.log('Connected to WebSocket');
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      // Clean up WebSocket connection
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    if (messageInput.trim() !== '') {
      const message = { text: messageInput };
      ws.send(JSON.stringify(message));
      setMessageInput('');
    }
  };

  return (
    <div>
      <h1>Chat</h1>
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message.text}</div>
        ))}
      </div>
      <input
        type="text"
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default GroupChat;