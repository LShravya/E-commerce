import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const VoiceAssistant = ({ isActive, setIsActive }) => {
  const [isRecognizing, setIsRecognizing] = useState(false);
  const recognitionRef = useRef(null); // Store recognition instance in ref
  const navigate = useNavigate();
  const [lastCommandTime, setLastCommandTime] = useState(0);

  useEffect(() => {
    // Request permission for microphone access
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const synth = window.speechSynthesis;

        if (!SpeechRecognition || !synth) {
          console.log("Your browser doesn't support speech recognition or synthesis.");
          return;
        }

        if (!recognitionRef.current) {
          const recognition = new SpeechRecognition();
          recognition.lang = 'en-US';
          recognition.continuous = true; 
          recognition.interimResults = false; 
          recognition.maxAlternatives = 1; 
          recognitionRef.current = recognition;

          const speak = (text) => {
            const utterance = new SpeechSynthesisUtterance(text);
            synth.speak(utterance);
          };

          const handleCommand = (command) => {
            const currentTime = Date.now();
            if (currentTime - lastCommandTime < 1000) {
              console.log("Command ignored due to recent repetition");
              return;
            }
            setLastCommandTime(currentTime); 

            command = command.toLowerCase().trim();
            console.log("Handling command:", command);

            
            if (command.includes("open cart")) {
              speak("Opening your cart.");
              navigate("/cart");
            } else if (command.includes("open products")) {
              speak("Showing products.");
              navigate("/products");
            } else if (command.includes("open tracking")) {
              speak("Showing tracking.");
              navigate("/tracking");
            } else if (command.includes("logout")) {
              speak("Logging you out.");
              localStorage.removeItem("authToken");
              navigate("/");
            } else if (command.includes("home")) {
              speak("Taking you home.");
              navigate("/");
            } else if (command.includes("open orders")) {
              speak("Here are your orders.");
              navigate("/Order");
            } else {
              speak("Sorry, I didn't understand that.");
            }
          };

          recognition.onresult = (event) => {
            const transcript = event.results[event.results.length - 1][0].transcript.trim();  // Get the latest result
            console.log("Heard:", transcript);

            if (transcript.toLowerCase().includes("hello")) {
              speak("Good morning, how can I help?");
            } else {
              handleCommand(transcript);
            }
          };

          recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
          };

          recognition.onend = () => {
            console.log("Recognition ended");
            setIsRecognizing(false);
            // Only restart recognition if assistant is still active
            if (isActive) {
              startRecognition();  // Start recognition again if it's still active
            }
          };
        }
        if (isActive && !isRecognizing) {
          startRecognition();
        }

        return () => {
          // Cleanup on component unmount
          if (recognitionRef.current) {
            recognitionRef.current.stop();
            setIsRecognizing(false);
          }
        };
      })
      .catch((error) => {
        console.error("Microphone permission error:", error);
      });
  }, [isActive, isRecognizing, lastCommandTime, navigate]);

  const startRecognition = () => {
    if (recognitionRef.current && !isRecognizing) {
      recognitionRef.current.start();
      setIsRecognizing(true);
    }
  };

  return null;
};

export default VoiceAssistant;
