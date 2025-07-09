"use client"

import { Button } from "@/components/ui/button"
import { ExternalLink, Maximize2, Minimize2, X } from "lucide-react"
import { useState } from "react"

interface PDFResult {
    fileName: string
    title: string
    description: string
    pageNo: number
}

interface PDFModalProps {
    pdf: PDFResult
    onClose: () => void
}

export default function PDFModal({ pdf, onClose }: PDFModalProps) {
    const [isLoading, setIsLoading] = useState(true)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const pdfUrl = `/pdfs/${pdf.fileName}#page=${pdf.pageNo}`

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in-0 duration-300 ">
            <div
                className={`bg-white dark:bg-primary rounded-3xl shadow-2xl flex flex-col transition-all duration-300 ${isFullscreen ? "w-full h-full" : "w-full max-w-[95vw] sm:max-w-7xl h-[90vh] sm:h-[90vh]"
                    }`}
            >
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-6 border-b border-gray-100 dark:border-white/10">
                    <div className="flex-1 min-w-0">
                        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white truncate">{pdf.title}</h2>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2">
                            <span className="text-xs sm:text-sm text-gray-600 dark:text-white bg-gray-100 dark:bg-white/10 px-2 sm:px-3 py-1 rounded-full">
                                📄 {pdf.fileName}
                            </span>
                            <span className="text-xs sm:text-sm text-gray-600 dark:text-white bg-gray-100 dark:bg-white/10 px-2 sm:px-3 py-1 rounded-full">
                                📍 페이지 {pdf.pageNo}
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2 ml-0 sm:ml-6 mt-2 sm:mt-0">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setIsFullscreen(!isFullscreen)}
                            className="border-gray-200 dark:border-white/20 hover:border-[#dac0ac] hover:text-[#dac0ac] bg-transparent rounded-xl p-2 sm:p-3"
                        >
                            {isFullscreen ? <Minimize2 className="w-3 sm:w-4 h-3 sm:h-4" /> : <Maximize2 className="w-3 sm:w-4 h-3 sm:h-4" />}
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(pdfUrl, "_blank")}
                            className="border-gray-200 dark:border-white/20 hover:border-[#dac0ac] hover:text-[#dac0ac] rounded-xl p-2 sm:p-3"
                        >
                            <ExternalLink className="w-3 sm:w-4 h-3 sm:h-4 mr-0 sm:mr-2" />
                            <span className="hidden sm:inline">Open</span>
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={onClose}
                            className="border-gray-200 dark:border-white/20 hover:border-red-200 dark:hover:border-red-400 hover:text-red-600 dark:hover:text-red-400 bg-transparent rounded-xl p-2 sm:p-3"
                        >
                            <X className="w-3 sm:w-4 h-3 sm:h-4" />
                        </Button>
                    </div>
                </div>

                {/* PDF Viewer */}
                <div className="flex-1 relative bg-gray-50 dark:bg-primary/40 rounded-b-3xl overflow-hidden">
                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-primary">
                            <div className="text-center">
                                <div className="w-12 sm:w-16 h-12 sm:h-16 border-4 border-[#dac0ac]/20 border-t-[#dac0ac] rounded-full animate-spin mx-auto mb-4 sm:mb-6"></div>
                                <p className="text-gray-600 dark:text-white text-sm sm:text-lg font-medium">Loading PDF...</p>
                                <p className="text-gray-500 dark:text-white/70 text-xs sm:text-sm mt-1 sm:mt-2">Please wait while we prepare your document</p>
                            </div>
                        </div>
                    )}
                    <iframe
                        src={pdfUrl}
                        className="w-full h-full border-0"
                        onLoad={() => setIsLoading(false)}
                        title={pdf.title}
                    />
                </div>

                {/* Footer */}
                {!isFullscreen && (
                    <div className="p-3 sm:p-4 border-t border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-primary/30 rounded-b-3xl">
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-white/80 text-center leading-relaxed">
                            {pdf.description}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}