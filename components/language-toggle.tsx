import { Button } from "@/components/ui/button"
import { Globe, RotateCcw } from "lucide-react"

interface LanguageToggleProps {
    language: "en" | "ko"
    toggleLanguage: () => void
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ language, toggleLanguage }) => {
    const isEnglish = language === "en"
    const handleRefresh = () => {
        window.location.reload()
    }
    return (
        <div className="flex gap-2 md:gap-4 items-center">
            <Button
                onClick={() => handleRefresh()}
                variant="ghost"
                size="sm"
                className="relative h-9 w-9 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200  items-center justify-center hover:cursor-pointer hidden md:inline-flex"
            >
                <RotateCcw className="w-4 h-4" />
            </Button>

            <Button
                onClick={toggleLanguage}
                variant="ghost"
                size="sm"
                className="relative inline-flex h-8 w-20 items-center rounded-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 p-0 transition-all"
            >
                {/* Sliding knob */}
                <span
                    className={`absolute left-1 h-6 w-10 rounded-full bg-white dark:bg-primary/80 shadow-md transition-all duration-300 ${isEnglish ? "translate-x-0" : "translate-x-8"
                        }`}
                />
                {/* Labels */}
                <div className="flex gap-5 w-full justify-between p-3.5 text-xs font-medium z-10">
                    <span className={isEnglish ? "text-primary dark:text-white font-bold" : "text-gray-400"}>EN</span>
                    <span className={!isEnglish ? "text-primary dark:text-white font-bold" : "text-gray-400"}>KO</span>
                </div>
            </Button>
        </div>
    )
}

export { LanguageToggle }
