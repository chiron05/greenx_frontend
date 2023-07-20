import React, { useState } from 'react';
import LoadingOverlay from 'react-loading-overlay';

const Chatbot = () => {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Define rules for chatbot responses
  const chatbotRules = [
    {
      question: 'What is your name?',
      answer: 'My name is Chatbot.'
    },
    // Add more question-answer pairs here
  ];

  // Function to handle user input and get chatbot response
  const handleSendMessage = () => {
    // Add user message to chat history
    setChatHistory([...chatHistory, { text: userInput, isUser: true }]);
    setUserInput('');

    // Get the last chat message (which is the user input)
    const lastMessage = chatHistory[chatHistory.length - 1]?.text;

    // Find a matching rule for the user input
    const matchedRule = chatbotRules.find((rule) =>
      lastMessage.toLowerCase().includes(rule.question.toLowerCase())
    );

    // Display chatbot response
    if (matchedRule) {
      const chatbotResponse = matchedRule.answer;
      setChatHistory([...chatHistory, { text: chatbotResponse, isUser: false }]);
    } else {
      const defaultResponse = 'Sorry, I do not have an answer for that.';
      setChatHistory([...chatHistory, { text: defaultResponse, isUser: false }]);
    }
  };

  return (
    <div>
      <div className="chat-container">
        {chatHistory.map((message, index) => (
          <div key={index} className={message.isUser ? 'user-message' : 'bot-message'}>
            {message.text}
          </div>
        ))}
      </div>
      <input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} />
      <button onClick={handleSendMessage}>Send</button>

      {/* Loading overlay while the model is loading */}
      <LoadingOverlay active={isLoading} spinner text="Loading..." />
    </div>
  );
};

export default Chatbot;
