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
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    if (messageInput.trim() !== '') {
    const message = { text: messageInput };

    // Update state with the new message
    setMessages(prevMessages => [...prevMessages, message]);

    // Send message
    ws.send(JSON.stringify(message));

    // Default input value
    setMessageInput('');
    }
  };

  return (
    <div>
      <h1 className='text-3xl text-purple-600 font-semibold'>Chat</h1>
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message.text}</div>
        ))}
      </div>
      <input className='border-purple-600 border-2 rounded-lg'
        type="text"
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
      />
      <button className='text-purple-600 text-xl font-semibold' onClick={sendMessage}>Send</button>
    </div>
  );
};

export default GroupChat;