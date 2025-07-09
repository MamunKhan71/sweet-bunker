import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"


interface LanguageToggleProps {
    language: "en" | "ko"
    toggleLanguage: () => void
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ language, toggleLanguage }) => {
    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleLanguage}
            className="relative h-9 w-9 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
        >
            <Sun
                className={`h-4 w-4 transition-all ${language === "en" ? "rotate-0 scale-100" : "-rotate-90 scale-0"}`}
            />
            <Moon
                className={`absolute h-4 w-4 transition-all ${language === "ko" ? "rotate-0 scale-100" : "rotate-90 scale-0"}`}
            />
            <span className="sr-only">Toggle language</span>
        </Button>
    )
}

export { LanguageToggle }