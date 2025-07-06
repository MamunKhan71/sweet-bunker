"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Copyright, Send, Sparkles } from "lucide-react"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "./components/app-sidebar"
import WelcomeScreen from "./components/welcome-screen"
import ChatMessage from "./components/chat-message"
import LoadingSkeleton from "./components/loading-skeleton"
import { Textarea } from "@/components/ui/textarea"
import PDFModal from "./components/pdf-modal"
import { BorderBeam } from "@/components/magicui/border-beam"

interface PDFResult {
  fileName: string
  title: string
  description: string
  pageNo: number
}

interface Message {
  id: string
  type: "user" | "results"
  content: string
  searchQuantity?: number
  results?: PDFResult[]
  timestamp: Date
}

export default function ChatApp() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [searchQuantity, setSearchQuantity] = useState(5)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedPDF, setSelectedPDF] = useState<PDFResult | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
  
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    };
  
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "query": input,
        }),
      });
  
      const data = await response.json();

      const enrichedResults = data.map((item: any) => {
        const match = item.answer.match(/page(?:\s+no\.?|:)?\s*(\d+)/i);
        const pageNo = match ? parseInt(match[1]) : null;
        return {
          fileName: item.filename,
          pageNo : pageNo,
          description: item.answer
        };
      });

      console.log(enrichedResults)
  
      const resultsMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "results",
        content: `Found ${enrichedResults.length} results for "${input}"`,
        results: enrichedResults,
        timestamp: new Date(),
      };
  
      setMessages((prev) => [...prev, resultsMessage]);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsLoading(false);
    }
  };
  

  const handlePromptSelect = (prompt: string) => {
    setInput(prompt)
  }

  const openPDF = (pdf: PDFResult) => {
    setSelectedPDF(pdf)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as any)
    }
  }

  return (
    <>
      <AppSidebar />
      <SidebarInset>
        <div className="min-h-screen bg-gradient-to-br from-white via-gray-50/30 to-white flex flex-col">
          {/* Header */}
          <header className="border-b border-gray-100 bg-white/80 backdrop-blur-xl sticky top-0 z-10">
            <div className="px-6 py-4">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="text-gray-600 hover:text-black transition-colors" />
                <div className="flex items-center gap-3 w-full">
                  <div className="w-8 h-8 flex items-center justify-center">
                    <img src="/sweet-banker.png" alt="sweet-banker" />
                  </div>
                  <div className="flex justify-between w-full items-center">
                    <div className="w-full">
                      <h1 className="text-xl font-bold text-gray-900">PDF Search Assistant</h1>
                      <p className="text-xs text-gray-500">AI-powered document discovery</p>
                    </div>
                    <div className="text-sm text-gray-400 flex gap-2 items-center w-96 ">
                      <Copyright className="w-4 h-4" />
                      <span className="font-medium text-right">All Rights Reserved | <span><a target="_blank" href="https://acotegroup.com/">Acote Group LTD</a></span></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Chat Container */}
          <div className="flex-1 px-6 pb-40 overflow-y-auto">
            <div className="md:max-w-5xl mx-auto">
              {messages.length === 0 ? (
                <WelcomeScreen onPromptSelect={handlePromptSelect} />
              ) : (
                <div className="py-8 space-y-8">
                  {messages.map((message) => (
                    <div key={message.id} className="animate-in slide-in-from-bottom-4 duration-500">
                      <ChatMessage message={message} onPDFClick={openPDF} />
                    </div>
                  ))}
                  {isLoading && <LoadingSkeleton />}
                </div>
              )}
            </div>
          </div>

          {/* Enhanced Input Form - Fixed at bottom */}
          <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-100">
            <div className="md:max-w-5xl mx-auto pl-61 p-6">
              <div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative rounded-2xl ">
                    <BorderBeam
                      duration={6}
                      size={400}
                      className="from-transparent via-red-500 to-transparent"
                    />
                    <BorderBeam
                      duration={6}
                      delay={3}
                      size={400}
                      borderWidth={2}
                      className="from-transparent via-blue-500 to-transparent"
                    />
                    <Textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask me anything about your documents... (Press Enter to send, Shift+Enter for new line)"
                      className="min-h-[80px] max-h-[200px] w-full resize-none border-2 border-gray-200 focus:border-black focus:ring-0 rounded-2xl px-6 py-4 pr-32 text-base placeholder:text-gray-400 shadow-lg transition-all duration-200 hover:shadow-xl focus:shadow-xl"
                      disabled={isLoading}
                    />

                    {/* Quantity Selector */}
                    <div className="absolute right-4 top-4 flex items-center gap-3">
                      {/* <div className="flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1.5">
                        <span className="text-xs font-medium text-gray-600">Results:</span>
                        <select
                          value={searchQuantity}
                          onChange={(e) => setSearchQuantity(Number.parseInt(e.target.value))}
                          className="text-xs font-medium bg-transparent border-none outline-none text-gray-800"
                          disabled={isLoading}
                        >
                          {[3, 5, 8, 10, 15].map((num) => (
                            <option key={num} value={num}>
                              {num}
                            </option>
                          ))}
                        </select>
                      </div> */}

                      <Button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="bg-black hover:bg-gray-800 text-white rounded-full w-12 h-12 p-0 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                      >
                        <Send className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>

                  {/* Status indicator */}
                  {isLoading && (
                    <div className="flex items-center gap-2 text-sm text-gray-500 animate-pulse">
                      <div className="w-2 h-2 bg-[#dac0ac] rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-[#dac0ac] rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-[#dac0ac] rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <span className="ml-2">Searching your documents...</span>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>

          {/* PDF Modal */}
          {selectedPDF && <PDFModal pdf={selectedPDF} onClose={() => setSelectedPDF(null)} />}
        </div>
      </SidebarInset>
    </>
  )
}
