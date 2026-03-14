"use client";

import React, { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  AgentSessionView,
  AudioVisualizerBar,
  AudioVisualizerRadial,
  AudioVisualizerGrid,
  AgentControlBar,
  AgentChatTranscript,
  type AgentState,
  type ChatMessage,
  type VisualizerType,
} from "@/registry/agents-ui";

export default function AgentsUIPage() {
  const [agentState, setAgentState] = useState<AgentState>("listening");
  const [visualizerType, setVisualizerType] = useState<VisualizerType>("radial");
  const [isMicEnabled, setIsMicEnabled] = useState(false);
  const [isCameraEnabled, setIsCameraEnabled] = useState(false);
  const [isScreenShareEnabled, setIsScreenShareEnabled] = useState(false);
  const [isConnected, setIsConnected] = useState(true);

  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    // Initialize messages on client side
    const now = Date.now();
    setMessages([
      {
        id: "1",
        content: "Hello! I'm your AI assistant. How can I help you today?",
        timestamp: new Date(now - 60000),
        sender: "agent",
      },
      {
        id: "2",
        content: "Hi! Can you tell me about the weather?",
        timestamp: new Date(now - 45000),
        sender: "user",
      },
      {
        id: "3",
        content: "I'd be happy to help with weather information! However, I don't have access to real-time weather data in this demo. In a full implementation, I could fetch weather data from an API and provide you with current conditions and forecasts.",
        timestamp: new Date(now - 30000),
        sender: "agent",
      },
    ]);
  }, []);

  const handleSendMessage = useCallback((message: string) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      content: message,
      timestamp: new Date(),
      sender: "user",
    };
    setMessages((prev) => [...prev, newMessage]);

    // Simulate agent thinking and responding
    setAgentState("thinking");
    setTimeout(() => {
      setAgentState("speaking");
      const agentResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: `Thanks for your message: "${message}". This is a demo response. In a real implementation, I would process your message and provide a helpful response.`,
        timestamp: new Date(),
        sender: "agent",
      };
      setMessages((prev) => [...prev, agentResponse]);
      setTimeout(() => setAgentState("listening"), 2000);
    }, 1500);
  }, []);

  const handleDisconnect = useCallback(() => {
    setIsConnected(false);
    setAgentState("idle");
  }, []);

  const states: AgentState[] = ["connecting", "listening", "thinking", "speaking", "idle"];
  const visualizers: VisualizerType[] = ["bar", "radial", "grid"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 px-4 py-8 md:px-8 lg:px-12">
        {/* Header */}
        <div className="max-w-6xl mx-auto mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Agents UI
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              Beautiful glass-morphism components for building voice agent interfaces.
              Inspired by LiveKit's Agents UI with a liquid glass aesthetic.
            </p>
          </motion.div>
        </div>

        {/* Main Session View Demo */}
        <div className="max-w-5xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 p-4 md:p-6">
              <h2 className="text-white font-semibold text-lg mb-4">Complete Session View</h2>
              <div className="h-[500px] md:h-[600px]">
                <AgentSessionView
                  agentState={agentState}
                  agentName="XMAD AI"
                  visualizerType={visualizerType}
                  messages={messages}
                  isMicEnabled={isMicEnabled}
                  isCameraEnabled={isCameraEnabled}
                  isScreenShareEnabled={isScreenShareEnabled}
                  isConnected={isConnected}
                  showChat={true}
                  onMicToggle={() => setIsMicEnabled(!isMicEnabled)}
                  onCameraToggle={() => setIsCameraEnabled(!isCameraEnabled)}
                  onScreenShareToggle={() => setIsScreenShareEnabled(!isScreenShareEnabled)}
                  onDisconnect={handleDisconnect}
                  onSendMessage={handleSendMessage}
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Controls */}
        <div className="max-w-5xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6"
          >
            <h2 className="text-white font-semibold text-lg mb-4">Demo Controls</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Agent State */}
              <div>
                <label className="text-white/60 text-sm mb-2 block">Agent State</label>
                <div className="flex flex-wrap gap-2">
                  {states.map((state) => (
                    <button
                      key={state}
                      onClick={() => setAgentState(state)}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                        agentState === state
                          ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                          : "bg-white/5 text-white/60 border border-white/10 hover:bg-white/10"
                      )}
                    >
                      {state}
                    </button>
                  ))}
                </div>
              </div>

              {/* Visualizer Type */}
              <div>
                <label className="text-white/60 text-sm mb-2 block">Visualizer Type</label>
                <div className="flex gap-2">
                  {visualizers.map((type) => (
                    <button
                      key={type}
                      onClick={() => setVisualizerType(type)}
                      className={cn(
                        "px-3 py-1.5 rounded-lg text-sm font-medium transition-all capitalize",
                        visualizerType === type
                          ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                          : "bg-white/5 text-white/60 border border-white/10 hover:bg-white/10"
                      )}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Individual Components */}
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-white font-semibold text-lg mb-4">Individual Components</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Bar Visualizer */}
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                <h3 className="text-white/80 text-sm font-medium mb-4">Bar Visualizer</h3>
                <div className="flex justify-center">
                  <AudioVisualizerBar state={agentState} size="lg" />
                </div>
              </div>

              {/* Radial Visualizer */}
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                <h3 className="text-white/80 text-sm font-medium mb-4">Radial Visualizer</h3>
                <div className="flex justify-center">
                  <AudioVisualizerRadial state={agentState} size="lg" />
                </div>
              </div>

              {/* Grid Visualizer */}
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
                <h3 className="text-white/80 text-sm font-medium mb-4">Grid Visualizer</h3>
                <div className="flex justify-center">
                  <AudioVisualizerGrid state={agentState} size="lg" />
                </div>
              </div>
            </div>

            {/* Standalone Control Bar */}
            <div className="mt-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-6">
              <h3 className="text-white/80 text-sm font-medium mb-4">Control Bar</h3>
              <div className="flex justify-center">
                <AgentControlBar
                  isMicEnabled={isMicEnabled}
                  isCameraEnabled={isCameraEnabled}
                  isScreenShareEnabled={isScreenShareEnabled}
                  isConnected={isConnected}
                  showChat={true}
                  onMicToggle={() => setIsMicEnabled(!isMicEnabled)}
                  onCameraToggle={() => setIsCameraEnabled(!isCameraEnabled)}
                  onScreenShareToggle={() => setIsScreenShareEnabled(!isScreenShareEnabled)}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
