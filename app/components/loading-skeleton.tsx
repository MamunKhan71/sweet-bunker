import { Card } from "@/components/ui/card"
import { Bot } from "lucide-react"

export default function LoadingSkeleton() {
    return (
        <div className="flex justify-start animate-in slide-in-from-bottom-4 duration-500">
            <div className="max-w-4xl w-full">
                <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-primary dark:to-primary/80 flex items-center justify-center flex-shrink-0 shadow-md">
                        <Bot className="w-5 h-5 text-gray-600 dark:text-white" />
                    </div>
                    <div className="flex-1">
                        <Card className="bg-white dark:bg-primary border-2 border-gray-100 dark:border-white/10 p-6 rounded-3xl rounded-bl-lg shadow-lg">
                            <div className="animate-pulse">
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-2 h-2 bg-[#dac0ac] rounded-full animate-bounce"></div>
                                    <div className="h-4 bg-gray-200 dark:bg-white/20 rounded-full w-1/2"></div>
                                </div>

                                <div className="space-y-4">
                                    {[1, 2, 3].map((i) => (
                                        <Card
                                            key={i}
                                            className="p-5 border-2 border-gray-100 dark:border-white/10 rounded-2xl bg-gray-50 dark:bg-primary/40"
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-gray-200 dark:bg-white/10 flex-shrink-0"></div>
                                                <div className="flex-1 space-y-3">
                                                    <div className="h-5 bg-gray-200 dark:bg-white/10 rounded-lg w-3/4"></div>
                                                    <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-full"></div>
                                                    <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-2/3"></div>
                                                    <div className="flex gap-6 mt-4">
                                                        <div className="h-3 bg-gray-200 dark:bg-white/10 rounded-full w-24"></div>
                                                        <div className="h-3 bg-gray-200 dark:bg-white/10 rounded-full w-16"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
