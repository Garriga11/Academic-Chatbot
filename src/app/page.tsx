// src/app/page.tsx

"use client"; // This ensures this is a client-side component

import { useEffect, useState } from 'react';
import { OpenAI } from 'openai';

export default function Home() {
  const [response, setResponse] = useState<string>(''); // Initialize as an empty string
  const [loading, setLoading] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>(''); // For capturing user input

  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, dangerouslyAllowBrowser: true // API key
  });

  // Handle user input change
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(e.target.value);
  };

  // Handle form submission to ask the AI
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse(''); // Clear previous response

    try {
      // Make the API call to OpenAI with the user's input
      const completion = await openai.chat.completions.create({
        model: 'gpt-4', // Make sure you're using the correct model
        messages: [
          {
            role: 'user',  // The user's input goes here
            content: userInput, // Dynamic user input
          },
        ],
      });

      // Set the AI response from the OpenAI API
      setResponse(completion.choices[0]?.message?.content || 'No response from AI');
    } catch (error) {
      console.error('Error with OpenAI API:', error);
      setResponse('Error fetching response from OpenAI.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center">Interactive OpenAI GPT-4 Example</h1>

      {/* User input form */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="userInput">Ask a question:</label>
          <textarea
            className="form-control"
            id="userInput"
            value={userInput}
            onChange={handleInputChange} // Event to update user input
            placeholder="Ask about history, science, etc."
            rows={4} // Adjust rows for better visibility
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Submit</button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="mt-4">
          <p><strong>AI Response:</strong></p>
          <p>{response}</p> {/* Display AI response */}
        </div>
      )}
    </div>
  );
}
