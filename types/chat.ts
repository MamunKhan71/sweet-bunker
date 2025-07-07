export interface PdfResult {
    id: string
    title: string
    description: string
    pdfFileName: string
    pdfUrl: string
    pageNumber: number
    thumbnail: string
}

export interface Message {
    id: string
    content: string
    role: "user" | "assistant"
    timestamp: Date
    pdfResults?: PdfResult[]
}

export interface ChatSession {
    id: string
    title: string
    messages: Message[]
    createdAt: Date
}

