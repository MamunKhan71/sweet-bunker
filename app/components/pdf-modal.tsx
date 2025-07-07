"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, Download, ExternalLink, Maximize2, Minimize2 } from "lucide-react"

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

    const handleDownload = () => {
        const link = document.createElement("a")
        link.href = `/pdfs/${pdf.fileName}`
        link.download = pdf.fileName
        link.click()
    }

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in-0 duration-300">
            <div
                className={`bg-white rounded-3xl shadow-2xl flex flex-col transition-all duration-300 ${isFullscreen ? "w-full h-full" : "w-full max-w-7xl h-[90vh]"
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <div className="flex-1 min-w-0">
                        <h2 className="text-2xl font-bold text-gray-900 truncate">{pdf.title}</h2>
                        <div className="flex items-center gap-4 mt-2">
                            <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">📄 {pdf.fileName}</span>
                            <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">📍 페이지 {pdf.pageNo}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 ml-6">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setIsFullscreen(!isFullscreen)}
                            className="border-gray-200 hover:border-[#dac0ac] hover:text-[#dac0ac] bg-transparent rounded-xl"
                        >
                            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleDownload}
                            className="border-gray-200 hover:border-[#dac0ac] hover:text-[#dac0ac] bg-transparent rounded-xl"
                        >
                            <Download className="w-4 h-4 mr-2" />
                            Download
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(`/pdfs/${pdf.fileName}#page=${pdf.pageNo}`, "_blank")}
                            className="border-gray-200 hover:border-[#dac0ac] hover:text-[#dac0ac] rounded-xl"
                        >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Open
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={onClose}
                            className="border-gray-200 hover:border-red-200 hover:text-red-600 bg-transparent rounded-xl"
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                {/* PDF Viewer */}
                <div className="flex-1 relative bg-gray-50 rounded-b-3xl overflow-hidden">
                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white">
                            <div className="text-center">
                                <div className="w-16 h-16 border-4 border-[#dac0ac]/20 border-t-[#dac0ac] rounded-full animate-spin mx-auto mb-6"></div>
                                <p className="text-gray-600 text-lg font-medium">Loading PDF...</p>
                                <p className="text-gray-500 text-sm mt-2">Please wait while we prepare your document</p>
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
                    <div className="p-4 border-t border-gray-100 bg-gray-50 rounded-b-3xl">
                        <p className="text-sm text-gray-600 text-center leading-relaxed">{pdf.description}</p>
                    </div>
                )}
            </div>
        </div>
    )
}
