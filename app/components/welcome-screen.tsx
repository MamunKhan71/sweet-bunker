"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Sparkles, FileText, Search, Brain, BookOpen, TrendingUp, Zap, Target } from "lucide-react"

interface WelcomeScreenProps {
    onPromptSelect: (prompt: string) => void
}

const premadePrompts = [
    {
        category: "Research & Analysis",
        icon: Brain,
        color: "from-blue-500 to-blue-600",
        prompts: [
            "Find research papers about machine learning algorithms",
            "Show me documents related to data science methodologies",
            "Search for papers on artificial intelligence ethics",
        ],
    },
    {
        category: "Technical Documentation",
        icon: FileText,
        color: "from-green-500 to-green-600",
        prompts: [
            "Find technical specifications and API documentation",
            "Show me implementation guides and best practices",
            "Search for system architecture documents",
        ],
    }
]

export default function WelcomeScreen({ onPromptSelect }: WelcomeScreenProps) {
    const [hoveredCard, setHoveredCard] = useState<number | null>(null)

    return (
        <div className="py-12 animate-in fade-in-50 duration-700">
            {/* Hero Section */}
            {/* Prompt Categories */}
            <div className="space-y-8">
                <div className="text-center animate-in slide-in-from-bottom-4 duration-500 delay-400">
                    <h2 className="text-3xl font-bold text-gray-900 mb-3">Get Started with These Prompts</h2>
                    <p className="text-gray-600">Click on any prompt to begin your search journey</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in slide-in-from-bottom-4 duration-500 delay-500">
                    {premadePrompts.map((category, categoryIndex) => (
                        <Card
                            key={categoryIndex}
                            className={`p-8 border-2 transition-all duration-300 hover:shadow-xl ${hoveredCard === categoryIndex
                                    ? "border-[#dac0ac]/50 shadow-lg scale-[1.02]"
                                    : "border-gray-100 hover:border-[#dac0ac]/30"
                                }`}
                            onMouseEnter={() => setHoveredCard(categoryIndex)}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div
                                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg`}
                                >
                                    <category.icon className="w-7 h-7 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">{category.category}</h3>
                                    <p className="text-gray-600 text-sm">Explore {category.category.toLowerCase()}</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {category.prompts.map((prompt, promptIndex) => (
                                    <Button
                                        key={promptIndex}
                                        variant="outline"
                                        className="w-full justify-start text-left h-auto p-4 border-2 border-gray-200 hover:border-black hover:bg-black hover:text-white transition-all duration-200 text-sm leading-relaxed bg-transparent"
                                        onClick={() => onPromptSelect(prompt)}
                                    >
                                        <span className="truncate">{prompt}</span>
                                    </Button>
                                ))}
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}
