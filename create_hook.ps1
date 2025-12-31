\$content = @'
import { useState, useEffect } from "react";

export type AgentState = "idle" | "listening" | "processing" | "speaking";

export interface TranscriptMessage {
  id: string;
  speaker: "Agent" | "User";
  content: string;
  timestamp: Date;
}

export interface UseAgentSimulatorReturn {
  currentAgentState: AgentState;
  transcript: TranscriptMessage[];
  isRunning: boolean;
  interrupt: () => void;
  stop: () => void;
  start: () => void;
}

const SPEAKING_DURATION = 5000;
const LISTENING_DURATION = 1000;
const USER_SPEAKING_DURATION = 3000;

export function useAgentSimulator(): UseAgentSimulatorReturn {
  const [currentAgentState, setCurrentAgentState] = useState<AgentState>("idle");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [activeTimer, setActiveTimer] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [transcript, setTranscript] = useState<TranscriptMessage[]>([]);
  const [messageCounter, setMessageCounter] = useState<number>(0);

  const transitionToState = (nextState: AgentState, speaker?: "Agent" | "User") => {
    if (activeTimer !== null) {
      clearTimeout(activeTimer);
      setActiveTimer(null);
    }

    setCurrentAgentState(nextState);

    if (speaker) {
      const newMessage: TranscriptMessage = {
        id: `msg-${messageCounter}`,
        speaker,
        content: generateMessageContent(speaker),
        timestamp: new Date(),
      };
      setTranscript((prev) => [...prev, newMessage]);
      setMessageCounter((prev) => prev + 1);
    }

    switch (nextState) {
      case "speaking":
        const timer = setTimeout(() => {
          transitionToState("listening");
        }, SPEAKING_DURATION);
        setActiveTimer(timer);
        break;

      case "listening":
        const listenTimer = setTimeout(() => {
          transitionToState("processing");
        }, LISTENING_DURATION);
        setActiveTimer(listenTimer);
        break;

      case "processing":
        transitionToState("speaking", "User");
        break;

      default:
        break;
    }
  };

  const generateMessageContent = (speaker: "Agent" | "User"): string => {
    const agentMessages = [
      "Hello, how can I help you today?",
      "I understand your concern.",
      "Let me process that information.",
      "That is a great question.",
      "I am here to assist you.",
    ];

    const userMessages = [
      "I need help with something.",
      "Can you explain that further?",
      "What are my options available?",
      "How do I proceed?",
      "I would like to know more.",
    ];

    const messages = speaker === "Agent" ? agentMessages : userMessages;
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
  };

  const stop = () => {
    if (activeTimer !== null) {
      clearTimeout(activeTimer);
      setActiveTimer(null);
    }
    setIsRunning(false);
  };

  const start = () => {
    if (isRunning) {
      return;
    }

    setIsRunning(true);

    if (currentAgentState === "idle") {
      transitionToState("speaking", "Agent");
    } else {
      switch (currentAgentState) {
        case "speaking":
          const lastMessage = transcript[transcript.length - 1];
          const speaker = lastMessage?.speaker === "User" ? "User" : "Agent";
          const timer = setTimeout(() => {
            transitionToState("listening");
          }, speaker === "User" ? USER_SPEAKING_DURATION : SPEAKING_DURATION);
          setActiveTimer(timer);
          break;

        case "listening":
          const listenTimer = setTimeout(() => {
            transitionToState("processing");
          }, LISTENING_DURATION);
          setActiveTimer(listenTimer);
          break;

        case "processing":
          transitionToState("speaking", "User");
          break;

        case "idle":
          transitionToState("speaking", "Agent");
          break;
      }
    }
  };

  const interrupt = () => {
    if (activeTimer !== null) {
      clearTimeout(activeTimer);
      setActiveTimer(null);
    }
    setCurrentAgentState("listening");
    const timer = setTimeout(() => {
      transitionToState("processing");
    }, LISTENING_DURATION);
    setActiveTimer(timer);
  };

  useEffect(() => {
    setIsRunning(true);
    transitionToState("speaking", "Agent");

    return () => {
      if (activeTimer !== null) {
        clearTimeout(activeTimer);
      }
      setIsRunning(false);
    };
  }, []);

  return {
    currentAgentState,
    transcript,
    isRunning,
    interrupt,
    stop,
    start,
  };
}
'@

[System.IO.File]::WriteAllText('hooks/useAgentSimulator.ts', \$content, [System.Text.Encoding]::UTF8)
Write-Output "File created: hooks/useAgentSimulator.ts"
