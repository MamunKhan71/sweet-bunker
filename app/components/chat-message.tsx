"use client"

import { Card } from "@/components/ui/card"
import { BookOpen, Bot, Clock, ExternalLink, FileText, User } from "lucide-react"
import { useEffect, useState } from "react"
import ImageFromBase64 from "./imageBase64"

interface PDFResult {
    fileName: string
    title: string
    description: string
    pageNo: number
    imageBuffer: string
}

interface Message {
    id: string
    type: "user" | "results"
    content: string
    searchQuantity?: number
    results?: PDFResult[]
    timestamp: Date
}

interface ChatMessageProps {
    message: Message
    language: string
    onPDFClick: (pdf: PDFResult) => void
}

function useTypewriter(text: string, speed = 30) {
    const [displayText, setDisplayText] = useState("")
    const [isComplete, setIsComplete] = useState(false)
    useEffect(() => {
        if (!text) return

        setDisplayText("")
        setIsComplete(false)
        let i = 0

        const timer = setInterval(() => {
            if (i < text.length) {
                setDisplayText(text.slice(0, i + 1))
                i++
            } else {
                setIsComplete(true)
                clearInterval(timer)
            }
        }, speed)

        return () => clearInterval(timer)
    }, [text, speed])

    return { displayText, isComplete }
}

export default function ChatMessage({ message, onPDFClick, language }: ChatMessageProps) {
    const { displayText: typedContent, isComplete } = useTypewriter(message.type === "results" ? message.content : "", 20)

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }


    if (message.type === "user") {
        return (
            <div className="flex justify-end group mb-6">
                <div className="max-w-2xl">
                    <div className="flex items-start gap-3">
                        <div className="flex-1">
                            <Card className="bg-gray-100 dark:bg-primary text-black dark:text-white p-4 rounded-2xl rounded-br-md shadow-md hover:shadow-lg transition-all duration-200">
                                <p className="text-sm leading-relaxed">{message.content}</p>
                                {message.searchQuantity && (
                                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-300 dark:border-white/30">
                                        <span className="text-xs opacity-70 dark:opacity-80">
                                            Requesting {message.searchQuantity} results
                                        </span>
                                    </div>
                                )}
                            </Card>
                            <div className="flex items-center justify-end gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Clock className="w-3 h-3 text-gray-400 dark:text-white/70" />
                                <span className="text-xs text-gray-500 dark:text-white/70">
                                    {formatTime(message.timestamp)}
                                </span>
                            </div>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#dac0ac] to-[#c4a688] dark:from-primary dark:to-primary/90 flex items-center justify-center flex-shrink-0 shadow-sm">
                            <User className="w-4 h-4 text-white" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    return (
        <div className="flex justify-start group mb-6">
            <div className="md:max-w-4xl w-full">
                <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-primary dark:to-primary/80 flex items-center justify-center flex-shrink-0 shadow-sm">
                        <Bot className="w-4 h-4 text-gray-600 dark:text-white" />
                    </div>
                    <div className="flex-1 space-y-4">
                        {/* Main response text with typewriter effect */}
                        <div className="bg-white dark:bg-primary border border-gray-200 dark:border-white/20 p-4 rounded-2xl rounded-bl-md shadow-md">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <p className="text-sm font-medium text-gray-700 dark:text-white">
                                    {typedContent}
                                    {!isComplete && <span className="animate-pulse">|</span>}
                                </p>
                            </div>
                        </div>

                        {/* Results section - only show after typing is complete */}
                        {isComplete && message.results && message.results.length > 0 && (
                            <div className="space-y-4">
                                {message.results.map((pdf, index) => (
                                    <div key={index} className="space-y-3">
                                        {/* Text information */}
                                        <div
                                            className="p-4 transition-all duration-300 cursor-pointer group/card hover:shadow-md rounded-xl border border-gray-100 dark:border-white/10 hover:border-[#dac0ac] bg-gray-50/50 dark:bg-primary/30 hover:bg-white dark:hover:bg-primary/50"
                                            onClick={() => onPDFClick(pdf)}
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between gap-2">
                                                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm leading-tight group-hover/card:text-[#dac0ac] transition-colors line-clamp-1">
                                                            {pdf.title}
                                                        </h4>
                                                        <ExternalLink className="w-4 h-4 text-gray-400 dark:text-white group-hover/card:text-[#dac0ac] transition-colors flex-shrink-0" />
                                                    </div>
                                                    <div className="flex items-center gap-4 mt-2">
                                                        <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-white/70">
                                                            <FileText className="w-4 h-4 text-[#c4a688] rounded-full" />
                                                            <span className="font-medium truncate max-w-24">{pdf.fileName}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-white/70">
                                                            <BookOpen className="w-4 h-4 text-[#c4a688] rounded-full" />
                                                            {pdf.pageNo ? (
                                                                <span>페이지 {pdf.pageNo}</span>
                                                            ) : (
                                                                <span>페이지 번호가 명확하지 않아 유사한 결과를 표시합니다.</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Image that pops out - ChatGPT style */}
                                        <div className="flex justify-start">
                                            <div className="w-full md:w-96 h-fit object-contain border dark:border-white/10 rounded-lg overflow-hidden shadow-lg hover:shadow-xl bg-white dark:bg-primary/40">
                                                <ImageFromBase64 base64String={pdf.imageBuffer} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Timestamp */}
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Clock className="w-3 h-3 text-gray-400 dark:text-white/60" />
                            <span className="text-xs text-gray-500 dark:text-white/60">
                                {formatTime(message.timestamp)}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}
