"use client"

import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"

interface LanguageSelectorProps {
  language: "en" | "bn"
  onLanguageChange: (language: "en" | "bn") => void
}

export function LanguageSelector({ language, onLanguageChange }: LanguageSelectorProps) {
  return (
    <div className="flex items-center space-x-2">
      <Globe className="h-4 w-4" />
      <Button variant={language === "en" ? "default" : "ghost"} size="sm" onClick={() => onLanguageChange("en")}>
        English
      </Button>
      <Button variant={language === "bn" ? "default" : "ghost"} size="sm" onClick={() => onLanguageChange("bn")}>
        বাংলা
      </Button>
    </div>
  )
}
