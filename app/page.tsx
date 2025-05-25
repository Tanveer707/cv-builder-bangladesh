"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { FileText, Eye, Palette, Sparkles, Home, LogIn, Star } from "lucide-react"
import { CVBuilder } from "@/components/cv-builder"
import { CVPreview } from "@/components/cv-preview"
import { ThemeSelector } from "@/components/theme-selector"
import { LanguageSelector } from "@/components/language-selector"
import { InitialStyleSelector } from "@/components/initial-style-selector"
import { HeroSection } from "@/components/hero-section"
import { ATSScoreCard } from "@/components/ats-score-card"
import { AIAssistant } from "@/components/ai-assistant"
import { LoginPage } from "@/components/login-page"
import { Footer } from "@/components/footer"
import type { CVData } from "@/types/cv"

export default function HomePage() {
  const [currentStep, setCurrentStep] = useState<"style" | "build" | "preview" | "themes" | "ai-assistant" | "login">(
    "style",
  )
  const [cvData, setCvData] = useState<CVData>({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      presentAddress: {
        street: "",
        area: "",
        district: "",
        division: "",
        postCode: "",
        country: "bangladesh", // Default to Bangladesh
      },
      permanentAddress: {
        street: "",
        area: "",
        district: "",
        division: "",
        postCode: "",
        country: "bangladesh", // Default to Bangladesh
      },
      sameAsPresentAddress: true,
      website: "",
      linkedin: "",
      nationalId: "",
      birthCertificate: "",
      profilePicture: null,
    },
    summary: "",
    education: [],
    experience: [],
    publications: [],
    awards: [],
    languages: [],
    skills: {
      technical: [],
      software: [],
    },
    references: [],
  })
  const [selectedTheme, setSelectedTheme] = useState("modern")
  const [language, setLanguage] = useState<"en" | "bn">("en")
  const [mounted, setMounted] = useState(false)
  const [showATSScore, setShowATSScore] = useState(false)

  const [navigationHistory, setNavigationHistory] = useState<
    Array<"style" | "build" | "preview" | "themes" | "ai-assistant" | "login">
  >(["style"])

  const navigateTo = (step: "style" | "build" | "preview" | "themes" | "ai-assistant" | "login") => {
    setCurrentStep(step)
    setNavigationHistory((prev) => [...prev, step])
  }

  const goBack = () => {
    if (navigationHistory.length > 1) {
      const newHistory = [...navigationHistory]
      newHistory.pop() // Remove current step
      const previousStep = newHistory[newHistory.length - 1]
      setCurrentStep(previousStep)
      setNavigationHistory(newHistory)
    }
  }

  const goHome = () => {
    setCurrentStep("style")
    setNavigationHistory(["style"])
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  // Check if CV is substantially complete
  useEffect(() => {
    const totalSkills = cvData.skills.technical.length + cvData.skills.software.length
    const isComplete =
      cvData.personalInfo.fullName.length > 0 &&
      cvData.personalInfo.email.length > 0 &&
      cvData.summary.length > 50 &&
      cvData.education.length > 0 &&
      totalSkills > 2

    setShowATSScore(isComplete)
  }, [cvData])

  const translations = {
    en: {
      title: "Professional CV Builder",
      subtitle: "Create ATS-optimized CVs tailored for Bangladesh job market",
      buildCV: "Build CV",
      preview: "Preview",
      themes: "Themes",
      home: "Home",
      login: "Login",
      getStarted: "Get Started",
      features: {
        ats: "ATS Optimized",
        themes: "Multiple Themes",
        export: "Export Options",
        bilingual: "Bangla & English",
        ai: "AI Powered",
      },
    },
    bn: {
      title: "পেশাদার সিভি নির্মাতা",
      subtitle: "বাংলাদেশের চাকরির বাজারের জন্য ATS-অপ্টিমাইজড সিভি তৈরি করুন",
      buildCV: "সিভি তৈরি করুন",
      preview: "প্রিভিউ",
      themes: "থিম",
      home: "হোম",
      login: "লগইন",
      getStarted: "শুরু করুন",
      features: {
        ats: "ATS অপ্টিমাইজড",
        themes: "একাধিক থিম",
        export: "এক্সপোর্ট অপশন",
        bilingual: "বাংলা ও ইংরেজি",
        ai: "এআই চালিত",
      },
    },
  }

  const t = translations[language]

  const handleStyleSelected = (theme: string) => {
    setSelectedTheme(theme)
    navigateTo("build")
  }

  const handleGetStarted = () => {
    navigateTo("build")
  }

  const handleThemeGetStarted = () => {
    navigateTo("build")
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-main-gradient animate-gradient-shift">
      {/* Header */}
      <header className="border-b border-white/10 glass-dark sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="relative">
                <FileText className="h-8 w-8 text-palette-magenta" />
                <Sparkles className="h-3 w-3 text-white absolute -top-1 -right-1 animate-pulse" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-palette-magenta to-palette-coral bg-clip-text text-transparent">
                {t.title}
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Home Button */}
            <Button
              variant="ghost"
              onClick={goHome}
              className="flex items-center space-x-1 text-white hover:bg-white/10 hover:text-white border-white/20"
            >
              <Home className="h-4 w-4" />
              <span>{t.home}</span>
            </Button>

            {/* Themes Button */}
            <Button
              variant="ghost"
              onClick={() => navigateTo("themes")}
              className="flex items-center space-x-1 text-white hover:bg-white/10 hover:text-white border-white/20"
            >
              <Palette className="h-4 w-4" />
              <span>{t.themes}</span>
            </Button>

            {/* AI Powered Button */}
            <Button
              variant="ghost"
              onClick={() => navigateTo("ai-assistant")}
              className="flex items-center space-x-1 text-white hover:bg-white/10 hover:text-white border-white/20"
            >
              <Sparkles className="h-4 w-4" />
              <span>{language === "en" ? "AI Powered" : "এআই চালিত"}</span>
            </Button>

            {/* Login Button */}
            <Button
              variant="ghost"
              onClick={() => navigateTo("login")}
              className="flex items-center space-x-1 text-white hover:bg-white/10 hover:text-white border-white/20"
            >
              <LogIn className="h-4 w-4" />
              <span>{t.login}</span>
            </Button>

            {/* ATS Score Button */}
            <Button
              variant="ghost"
              onClick={() => setShowATSScore(!showATSScore)}
              className="flex items-center space-x-1 text-white hover:bg-white/10 hover:text-white border-white/20"
            >
              <Star className="h-4 w-4" />
              <span>{language === "en" ? "ATS Score" : "ATS স্কোর"}</span>
            </Button>

            {/* Language Selector */}
            <LanguageSelector language={language} onLanguageChange={setLanguage} />
          </div>
        </div>
      </header>

      {/* Navigation - Centered */}
      {currentStep !== "style" &&
        currentStep !== "themes" &&
        currentStep !== "ai-assistant" &&
        currentStep !== "login" && (
          <nav className="glass-dark">
            <div className="container mx-auto px-4">
              <div className="flex justify-center space-x-4 py-4">
                <Button
                  variant={currentStep === "build" ? "default" : "ghost"}
                  onClick={() => navigateTo("build")}
                  className={`rounded-full px-6 transition-all duration-300 hover:scale-105 ${
                    currentStep === "build"
                      ? "bg-gradient-to-r from-palette-magenta to-palette-coral text-white"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  {t.buildCV}
                </Button>
                <Button
                  variant={currentStep === "preview" ? "default" : "ghost"}
                  onClick={() => navigateTo("preview")}
                  className={`rounded-full px-6 transition-all duration-300 hover:scale-105 ${
                    currentStep === "preview"
                      ? "bg-gradient-to-r from-palette-magenta to-palette-coral text-white"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  <Eye className="h-4 w-4 mr-2" />
                  {t.preview}
                </Button>
                <Button
                  variant={currentStep === "themes" ? "default" : "ghost"}
                  onClick={() => navigateTo("themes")}
                  className={`rounded-full px-6 transition-all duration-300 hover:scale-105 ${
                    currentStep === "themes"
                      ? "bg-gradient-to-r from-palette-magenta to-palette-coral text-white"
                      : "text-white hover:bg-white/10"
                  }`}
                >
                  <Palette className="h-4 w-4 mr-2" />
                  {t.themes}
                </Button>
              </div>
            </div>
          </nav>
        )}

      {/* Hero Section - Only for style selection */}
      {currentStep === "style" && <HeroSection language={language} onGetStarted={handleGetStarted} />}

      {/* ATS Score Card - Show when CV has basic data */}
      {(cvData.personalInfo.fullName || cvData.summary || cvData.education.length > 0) &&
        currentStep !== "style" &&
        currentStep !== "ai-assistant" &&
        currentStep !== "login" && (
          <div className="container mx-auto px-4 py-4">
            <ATSScoreCard cvData={cvData} language={language} />
          </div>
        )}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="animate-fade-in">
          {currentStep === "style" && <InitialStyleSelector onStyleSelect={handleStyleSelected} language={language} />}

          {currentStep === "build" && <CVBuilder cvData={cvData} setCvData={setCvData} language={language} />}

          {currentStep === "preview" && (
            <div>
              <CVPreview cvData={cvData} theme={selectedTheme} language={language} />
            </div>
          )}

          {currentStep === "themes" && (
            <ThemeSelector
              selectedTheme={selectedTheme}
              onThemeSelect={setSelectedTheme}
              onGetStarted={handleThemeGetStarted}
              language={language}
            />
          )}

          {currentStep === "ai-assistant" && <AIAssistant cvData={cvData} setCvData={setCvData} language={language} />}

          {currentStep === "login" && <LoginPage language={language} />}
        </div>
      </main>

      {/* Footer */}
      <Footer language={language} />
    </div>
  )
}
