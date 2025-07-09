"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Home, Lightbulb } from "lucide-react"
import { useState } from "react"

interface WelcomeScreenProps {
    onPromptSelect: (prompt: string) => void
    language: "en" | "ko"
}

const promptMetadata = [
    {
        icon: Home,
        color: "from-pink-500 to-red-500",
    },
    {
        icon: Lightbulb,
        color: "from-yellow-500 to-orange-500",
    },
]

const translations = {
    en: {
        heading: "Get started with a prompt",
        subheading: "Click any prompt to begin your search",
        categories: [
            {
                category: "Interior Design Sketch Types",
                prompts: [
                    "Drawing with server room storage",
                    "show me a custom furniture drawing",
                    "Drawing with small and large conference room",
                    "Hallway plan with executive office",
                ],
            },
            {
                category: "Design Research & Inspiration",
                prompts: [
                    "Drawings related to heating, cooling and ventilation",
                    "Floor plan with conference room",
                    "Show me a drawing with an image wall",
                    "Drawing with spacious work space",
                ],
            },
        ],
    },
    ko: {
        heading: "이 프롬프트로 시작해보세요",
        subheading: "검색을 시작하려면 아무 프롬프트나 클릭하세요",
        categories: [
            {
                category: "인테리어 디자인 스케치 유형",
                prompts: [
                    "서버실과 창고가 포함된 도면",
                    "맞춤 가구 도면을 보여줘",
                    "소회의실 대회의실 도면",
                    "대표실이 포함된 복도 평면도",
                ],
            },
            {
                category: "디자인 리서치 및 영감",
                prompts: [
                    "냉난방 환기 관련 도면",
                    "회의실이 있는 평면도",
                    "이미지 벽이 있는 도면을 보여주세요",
                    "넓은 업무공간이 있는 도면",
                ],
            },
        ],
    },
}


export default function WelcomeScreen({ onPromptSelect, language }: WelcomeScreenProps) {
    const [hoveredCard, setHoveredCard] = useState<number | null>(null)
    const t = translations[language]
    return (
        <div className="py-12 animate-in fade-in-50 duration-700">
            {/* Hero Section */}
            {/* Prompt Categories */}
            <div className="space-y-8">
                <div className="text-center animate-in slide-in-from-bottom-4 duration-500 delay-400">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">{t.heading}</h2>
                    <p className="text-gray-600 dark:text-gray-300">{t.subheading}</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in slide-in-from-bottom-4 duration-500 delay-500">
                    {t.categories.map((category, categoryIndex) => {
                        const { icon: Icon, color } = promptMetadata[categoryIndex]
                        return (
                            <Card
                                key={categoryIndex}
                                className={`dark:bg-primary p-4 md:p-8 border-2  transition-all duration-300 hover:shadow-xl ${hoveredCard === categoryIndex
                                    ? "border-[#dac0ac]/50 shadow-lg scale-[1.02]"
                                    : "border-gray-100 dark:border-[#dac0ac]/30 hover:border-[#dac0ac]/30"
                                    }`}
                                onMouseEnter={() => setHoveredCard(categoryIndex)}
                                onMouseLeave={() => setHoveredCard(null)}
                            >
                                <div className="flex items-center gap-4 md:mb-6">
                                    <div
                                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}
                                    >
                                         <Icon className="w-7 h-7 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm md:text-xl font-bold text-gray-900 dark:text-white">{category.category}</h3>
                                        <p className="text-gray-600 dark:text-gray-300 text-xs md:text-sm">Explore {category.category.toLowerCase()}</p>
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
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
