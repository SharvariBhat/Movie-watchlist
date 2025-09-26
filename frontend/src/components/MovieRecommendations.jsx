import React, { useState, useRef, useEffect } from 'react';

const MovieRecommendations = ({ movies, onClose }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "Hi! I'm your movie recommendation bot. I can suggest movies based on your watchlist. Try asking me things like 'Recommend a movie' or 'What should I watch next?'",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getRecommendations = (query) => {
    const queryLower = query.toLowerCase();
    
    // Enhanced recommendation logic
    if (queryLower.includes('action') || queryLower.includes('thriller') || queryLower.includes('adventure')) {
      return movies.filter(movie => 
        (movie.genre.toLowerCase().includes('action') || 
         movie.genre.toLowerCase().includes('thriller') ||
         movie.genre.toLowerCase().includes('adventure')) && 
        movie.status !== 'Watched'
      );
    }
    
    if (queryLower.includes('drama') || queryLower.includes('emotional') || queryLower.includes('serious')) {
      return movies.filter(movie => 
        (movie.genre.toLowerCase().includes('drama') ||
         movie.genre.toLowerCase().includes('romance')) && 
        movie.status !== 'Watched'
      );
    }
    
    if (queryLower.includes('comedy') || queryLower.includes('funny') || queryLower.includes('humor')) {
      return movies.filter(movie => 
        movie.genre.toLowerCase().includes('comedy') && 
        movie.status !== 'Watched'
      );
    }
    
    if (queryLower.includes('sci-fi') || queryLower.includes('science') || queryLower.includes('futuristic')) {
      return movies.filter(movie => 
        (movie.genre.toLowerCase().includes('sci-fi') ||
         movie.genre.toLowerCase().includes('science fiction')) && 
        movie.status !== 'Watched'
      );
    }
    
    if (queryLower.includes('horror') || queryLower.includes('scary')) {
      return movies.filter(movie => 
        movie.genre.toLowerCase().includes('horror') && 
        movie.status !== 'Watched'
      );
    }
    
    if (queryLower.includes('romance') || queryLower.includes('love')) {
      return movies.filter(movie => 
        movie.genre.toLowerCase().includes('romance') && 
        movie.status !== 'Watched'
      );
    }
    
    if (queryLower.includes('high rating') || queryLower.includes('best') || queryLower.includes('top')) {
      return movies
        .filter(movie => movie.status !== 'Watched')
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 5);
    }
    
    if (queryLower.includes('will watch') || queryLower.includes('plan to watch')) {
      return movies.filter(movie => movie.status === 'Will Watch');
    }
    
    if (queryLower.includes('watching') || queryLower.includes('currently watching')) {
      return movies.filter(movie => movie.status === 'Watching');
    }
    
    // Default: recommend unwatched movies with high ratings
    return movies
      .filter(movie => movie.status !== 'Watched')
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3);
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate bot thinking time
    setTimeout(() => {
      const recommendations = getRecommendations(inputText);
      
      let botResponse = '';
      if (recommendations.length > 0) {
        botResponse = `Based on your request, I recommend these movies:\n\n`;
        recommendations.slice(0, 3).forEach((movie, index) => {
          botResponse += `${index + 1}. **${movie.title}** (${movie.genre})\n`;
          botResponse += `   Rating: ${movie.rating}/5 ⭐\n`;
          botResponse += `   Status: ${movie.status}\n`;
          botResponse += `   ${movie.description.substring(0, 100)}...\n\n`;
        });
        botResponse += `Would you like me to suggest movies from a specific genre?`;
      } else {
        botResponse = "I don't have any recommendations that match your criteria. Try asking for a different genre or check your watchlist!";
      }

      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        text: botResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg max-w-2xl w-full h-[600px] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">Movie Recommendations</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-netflix-red text-white'
                    : 'bg-gray-700 text-gray-100'
                }`}
              >
                <div className="whitespace-pre-wrap">{message.text}</div>
                <div className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-700 text-gray-100 px-4 py-2 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask for movie recommendations..."
              className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-netflix-red"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isTyping}
              className="bg-netflix-red text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieRecommendations;
