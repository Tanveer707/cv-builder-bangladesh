"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, Sparkles, ArrowRight, Zap } from "lucide-react"

interface ThemeSelectorProps {
  selectedTheme: string
  onThemeSelect: (theme: string) => void
  onGetStarted?: () => void
  language: "en" | "bn"
}

export function ThemeSelector({ selectedTheme, onThemeSelect, onGetStarted, language }: ThemeSelectorProps) {
  const [showGetStarted, setShowGetStarted] = useState(false)

  const translations = {
    en: {
      title: "Choose Your CV Theme",
      subtitle: "Select a professional theme that matches your industry",
      atsOptimized: "ATS Optimized",
      getStarted: "Get Started",
      buildYourCV: "Build Your CV",
      themeSelected: "Theme Selected!",
      readyToBuild: "You're ready to build your professional CV with this theme.",
      modern: "Modern",
      modernDesc: "Clean and contemporary design perfect for tech and creative industries",
      classic: "Classic",
      classicDesc: "Traditional format ideal for corporate and government positions",
      creative: "Creative",
      creativeDesc: "Eye-catching design for creative professionals and startups",
      minimal: "Minimal",
      minimalDesc: "Simple and elegant layout focusing on content over design",
    },
    bn: {
      title: "আপনার সিভি থিম নির্বাচন করুন",
      subtitle: "আপনার ইন্ডাস্ট্রির সাথে মানানসই একটি পেশাদার থিম নির্বাচন করুন",
      atsOptimized: "ATS অপ্টিমাইজড",
      getStarted: "শুরু করুন",
      buildYourCV: "আপনার সিভি তৈরি করুন",
      themeSelected: "থিম নির্বাচিত!",
      readyToBuild: "এই থিম দিয়ে আপনার পেশাদার সিভি তৈরি করার জন্য আপনি প্রস্তুত।",
      modern: "আধুনিক",
      modernDesc: "প্রযুক্তি এবং সৃজনশীল শিল্পের জন্য পরিষ্কার এবং সমসাময়িক ডিজাইন",
      classic: "ক্লাসিক",
      classicDesc: "কর্পোরেট এবং সরকারি পদের জন্য ঐতিহ্যবাহী ফরম্যাট",
      creative: "সৃজনশীল",
      creativeDesc: "সৃজনশীল পেশাদার এবং স্টার্টআপের জন্য আকর্ষণীয় ডিজাইন",
      minimal: "মিনিমাল",
      minimalDesc: "ডিজাইনের চেয়ে কন্টেন্টের উপর ফোকাস করা সহজ এবং মার্জিত লেআউট",
    },
  }

  const t = translations[language]

  const themes = [
    {
      id: "modern",
      name: t.modern,
      description: t.modernDesc,
      preview: "bg-gradient-to-br from-blue-400/30 to-indigo-500/30",
    },
    {
      id: "classic",
      name: t.classic,
      description: t.classicDesc,
      preview: "bg-gradient-to-br from-gray-400/30 to-slate-500/30",
    },
    {
      id: "creative",
      name: t.creative,
      description: t.creativeDesc,
      preview: "bg-gradient-to-br from-purple-400/30 to-pink-500/30",
    },
    {
      id: "minimal",
      name: t.minimal,
      description: t.minimalDesc,
      preview: "bg-gradient-to-br from-white/20 to-gray-300/30",
    },
  ]

  const handleThemeSelect = (themeId: string) => {
    onThemeSelect(themeId)
    setShowGetStarted(true)
  }

  const handleGetStarted = () => {
    setShowGetStarted(false)
    if (onGetStarted) {
      onGetStarted()
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2 text-white">{t.title}</h2>
        <p className="text-white/80">{t.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {themes.map((theme) => (
          <Card
            key={theme.id}
            className={`cursor-pointer transition-all hover:shadow-lg glass-card border-white/20 ${
              selectedTheme === theme.id
                ? "ring-2 ring-palette-coral border-palette-coral/50"
                : "hover:border-palette-magenta/50"
            }`}
            onClick={() => handleThemeSelect(theme.id)}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <span className="text-white">{theme.name}</span>
                  {selectedTheme === theme.id && <Check className="h-5 w-5 text-palette-coral" />}
                </CardTitle>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  {t.atsOptimized}
                </Badge>
              </div>
              <CardDescription className="text-white/80">{theme.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className={`h-32 rounded-lg ${theme.preview} border-2 border-white/20 flex items-center justify-center glass-preview`}
              >
                <div className="text-center space-y-2">
                  <div className="h-3 bg-white/40 rounded w-24 mx-auto"></div>
                  <div className="h-2 bg-white/30 rounded w-32 mx-auto"></div>
                  <div className="h-2 bg-white/30 rounded w-28 mx-auto"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Get Started Popup */}
      {showGetStarted && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-gradient-to-br from-palette-dark to-palette-purple p-8 rounded-2xl border border-white/20 max-w-md mx-4 text-center space-y-6 animate-fade-in-up shadow-2xl">
            {/* Success Icon */}
            <div className="w-16 h-16 mx-auto bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center animate-pulse">
              <Check className="h-8 w-8 text-white" />
            </div>

            {/* Title */}
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-white">{t.themeSelected}</h3>
              <p className="text-white/80">{t.readyToBuild}</p>
            </div>

            {/* Selected Theme Preview */}
            <div className="glass border-white/20 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-palette-coral to-palette-magenta flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <div className="text-left">
                  <h4 className="text-white font-medium">{themes.find((t) => t.id === selectedTheme)?.name}</h4>
                  <p className="text-white/70 text-sm">{themes.find((t) => t.id === selectedTheme)?.description}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleGetStarted}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-semibold py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                size="lg"
              >
                <Zap className="h-5 w-5 mr-2" />
                {t.getStarted}
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>

              <Button
                onClick={() => setShowGetStarted(false)}
                variant="ghost"
                className="w-full text-white/70 hover:text-white hover:bg-white/10"
              >
                Continue Browsing
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
