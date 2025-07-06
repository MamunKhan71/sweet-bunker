"use client"

import { Card } from "@/components/ui/card"
import { FileText, User, Bot, ExternalLink, Clock } from 'lucide-react'

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

interface ChatMessageProps {
    message: Message
    onPDFClick: (pdf: PDFResult) => void
}

export default function ChatMessage({ message, onPDFClick }: ChatMessageProps) {
    const formatTime = (date: Date) => {
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    }

    if (message.type === "user") {
        return (
            <div className="flex justify-end group mb-4">
                <div className="max-w-2xl">
                    <div className="flex items-start gap-3">
                        <div className="flex-1">
                            <Card className="bg-gray-50 text-black p-4 rounded-2xl rounded-br-md shadow-md hover:shadow-lg transition-all duration-200">
                                <p className="text-sm leading-relaxed">{message.content}</p>
                                {message.searchQuantity && (
                                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-700">
                                        <span className="text-xs opacity-70">Requesting {message.searchQuantity} results</span>
                                    </div>
                                )}
                            </Card>
                            <div className="flex items-center justify-end gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Clock className="w-3 h-3 text-gray-400" />
                                <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
                            </div>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#dac0ac] to-[#c4a688] flex items-center justify-center flex-shrink-0 shadow-sm">
                            <User className="w-4 h-4 text-white" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex justify-start group mb-4">
            <div className="max-w-4xl w-full">
                <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center flex-shrink-0 shadow-sm">
                        <Bot className="w-4 h-4 text-gray-600" />
                    </div>
                    <div className="flex-1">
                        <Card className="bg-white border border-gray-200 p-4 rounded-2xl rounded-bl-md shadow-md hover:shadow-lg transition-all duration-200">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <p className="text-sm font-medium text-gray-700">{message.content}</p>
                            </div>

                            {message.results && message.results.length > 0 && (
                                <div className="space-y-2">
                                    {message.results.map((pdf, index) => (
                                        <div
                                            key={index}
                                            className="p-3 border border-gray-100 hover:border-[#dac0ac] transition-all duration-300 cursor-pointer group/card hover:shadow-md rounded-xl bg-gray-50/50 hover:bg-white"
                                            onClick={() => onPDFClick(pdf)}
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#dac0ac]/10 to-[#c4a688]/10 flex items-center justify-center flex-shrink-0 group-hover/card:from-[#dac0ac]/20 group-hover/card:to-[#c4a688]/20 transition-all duration-300">
                                                    <FileText className="w-4 h-4 text-[#dac0ac]" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start justify-between gap-2">
                                                        <h4 className="font-semibold text-gray-900 text-sm leading-tight group-hover/card:text-[#dac0ac] transition-colors line-clamp-1">
                                                            {pdf.title}
                                                        </h4>
                                                        <ExternalLink className="w-4 h-4 text-gray-400 group-hover/card:text-[#dac0ac] transition-colors flex-shrink-0" />
                                                    </div>
                                                    <p className="text-xs text-gray-600 mt-1 line-clamp-2 leading-relaxed">{pdf.description}</p>
                                                    <div className="flex items-center gap-4 mt-2">
                                                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                                            <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                                                            <span className="font-medium truncate max-w-24">{pdf.fileName}</span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                                                            <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                                                            <span>Page {pdf.pageNo}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </Card>
                        <div className="flex items-center gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Clock className="w-3 h-3 text-gray-400" />
                            <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
