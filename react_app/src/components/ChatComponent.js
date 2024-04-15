"use client"
import React, { useState } from 'react';

const ChatComponent = () => {
  const defaultMessage = "Hi! Ask me any questions about a PDF document! The default PDF is 'Startup Playbook' by Sam Altman."
  const [messages, setMessages] = useState([{text:defaultMessage, sender:'bot'}]);

  const sendMessage = async (messageText) => {
    // Add user message to local state
    // Send user message to backend
    let userMessage = { text: messageText, sender: 'user' };
    setMessages(prevItems => [...prevItems, userMessage]);
    const response = await fetch('https://chat-with-pdf-gq9x.onrender.com/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question: messageText }),
    });

    const data = await response.json();
    let botMessage = { text: data.message, sender: 'bot' };
    // Add bot response to local state
    setMessages(prevItems => [...prevItems, botMessage]);
  };

  return (
    <div style={{marginTop:'10px',marginLeft:'20px', marginRight:'20px'}}>
      <div className="chat-window" style={styles.chatWindow}>
        {messages.map((msg, index) => (
            <div key={index} style={msg.sender === 'user' ? styles.userMessageContainer : styles.botMessageContainer}>
                <div style={msg.sender === 'user' ? styles.userMessage : styles.botMessage}>
                    {msg.text}
                </div>
            </div>
      ))}
      </div>
      <div className="input-container" style={styles.inputContainer}>
        <input
          type="text"
          placeholder="Type a message..."
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              sendMessage(e.target.value);
              e.target.value = '';
            }
          }}
          style={styles.inputBox}
        />
        <button onClick={() => sendMessage(e.target.value)} style={styles.sendButton}>
            Send
        </button>
      </div>
    </div>
  );
};
const styles = {
    chatWindow: {
      height: '400px',
      overflowY: 'scroll',
      border: '1px solid #ccc',
      padding: '10px',
    },
    botMessageContainer: {
      marginBottom: '8px',
      display: 'flex',
      justifyContent: 'flex-start',
    },
    userMessageContainer: {
        marginBottom: '8px',
        display: 'flex',
        justifyContent: 'flex-end',
    },
    userMessage: {
      backgroundColor: '#007bff',
      padding: '8px',
      borderRadius: '8px',
      maxWidth: '70%',

    },
    botMessage: {
      backgroundColor: '#808080',
      color: '#fff',
      padding: '8px',
      borderRadius: '8px',
      maxWidth: '70%',
    },
    inputContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '10px',
      color: '#A9A9A9'
    },
    inputBox: {
      flex: '1',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '14px',
    },
    sendButton: {
      padding: '10px 20px',
      marginLeft: '10px',
      border: 'none',
      borderRadius: '4px',
      backgroundColor: '#007bff',
      color: '#fff',
      fontSize: '14px',
      cursor: 'pointer',
    },
  };
  export default ChatComponent;
