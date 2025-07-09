"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Home, Lightbulb } from "lucide-react"
import { useState } from "react"

interface WelcomeScreenProps {
    onPromptSelect: (prompt: string) => void
}

const premadePrompts = [
    {
        category: "인테리어 디자인 스케치 유형",
        icon: Home,
        color: "from-pink-500 to-red-500",
        prompts: [
            "서버룸 저장소가 포함된 도면",
            "팬트리 맞춤 가구 도면",
            "소회의실이 있는 도면",
            "대표실이 포함된 복도 평면도",
        ],
    },
    {
        category: "디자인 리서치 및 영감",
        icon: Lightbulb,
        color: "from-yellow-500 to-orange-500",
        prompts: [
            "팬트리 수납이 포함된 소형 복도 도면",
            "회의실 2개가 있는 평면도",
            "수납이 포함된 간단한 복도 도면",
            "카페테리아가 있는 도면",
        ],
    }
];


export default function WelcomeScreen({ onPromptSelect }: WelcomeScreenProps) {
    const [hoveredCard, setHoveredCard] = useState<number | null>(null)
    return (
        <div className="py-12 animate-in fade-in-50 duration-700">
            {/* Hero Section */}
            {/* Prompt Categories */}
            <div className="space-y-8">
                <div className="text-center animate-in slide-in-from-bottom-4 duration-500 delay-400">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">이 프롬프트로 시작해보세요</h2>
                    <p className="text-gray-600 dark:text-gray-300">검색을 시작하려면 아무 프롬프트나 클릭하세요</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in slide-in-from-bottom-4 duration-500 delay-500">
                    {premadePrompts.map((category, categoryIndex) => (
                        <Card
                            key={categoryIndex}
                            className={`dark:bg-primary p-8 border-2  transition-all duration-300 hover:shadow-xl ${hoveredCard === categoryIndex
                                ? "border-[#dac0ac]/50 shadow-lg scale-[1.02]"
                                : "border-gray-100 dark:border-[#dac0ac]/30 hover:border-[#dac0ac]/30"
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
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{category.category}</h3>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm">Explore {category.category.toLowerCase()}</p>
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
