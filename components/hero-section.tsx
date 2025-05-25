"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { FileText, Download, Eye, Palette, Globe, Sparkles, ArrowRight, Zap, Star, CheckCircle } from "lucide-react"
import { GoogleChatBar } from "@/components/google-chat-bar"

interface HeroSectionProps {
  language: "en" | "bn"
  onGetStarted: () => void
}

export function HeroSection({ language, onGetStarted }: HeroSectionProps) {
  const [currentFeature, setCurrentFeature] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const translations = {
    en: {
      title: "Create Your Standout CV",
      subtitle: "with Precision and Ease",
      description:
        "Create ATS-optimized CVs tailored for Bangladesh job market with multiple themes and bilingual support",
      getStarted: "Get Started",
      watchDemo: "Watch Demo",
      trustedBy: "Trusted by 10,000+ professionals",
      features: {
        ats: "ATS Optimized",
        themes: "Multiple Themes",
        export: "Export Options",
        bilingual: "Bangla & English",
        ai: "AI Powered",
      },
      stats: [
        { number: "10K+", label: "CVs Created" },
        { number: "95%", label: "Success Rate" },
        { number: "50+", label: "Templates" },
        { number: "24/7", label: "Support" },
      ],
      benefits: [
        "Beat ATS systems with optimized formatting",
        "AI-powered content suggestions",
        "Professional templates for every industry",
        "Export to PDF, Word, and more",
      ],
    },
    bn: {
      title: "আপনার আকর্ষণীয় সিভি তৈরি করুন",
      subtitle: "নির্ভুলতা এবং সহজতার সাথে",
      description: "বাংলাদেশের চাকরির বাজারের জন্য ATS-অপ্টিমাইজড সিভি তৈরি করুন একাধিক থিম এবং দ্বিভাষিক সাপোর্ট সহ",
      getStarted: "শুরু করুন",
      watchDemo: "ডেমো দেখুন",
      trustedBy: "১০,০০০+ পেশাদারদের বিশ্বস্ত",
      features: {
        ats: "ATS অপ্টিমাইজড",
        themes: "একাধিক থিম",
        export: "এক্সপোর্ট অপশন",
        bilingual: "বাংলা ও ইংরেজি",
        ai: "এআই চালিত",
      },
      stats: [
        { number: "১০K+", label: "সিভি তৈরি" },
        { number: "৯৫%", label: "সফলতার হার" },
        { number: "৫০+", label: "টেমপ্লেট" },
        { number: "২৪/৭", label: "সাপোর্ট" },
      ],
      benefits: [
        "অপ্টিমাইজড ফরম্যাটিং দিয়ে ATS সিস্টেম পরাজিত করুন",
        "এআই-চালিত কন্টেন্ট পরামর্শ",
        "প্রতিটি ইন্ডাস্ট্রির জন্য পেশাদার টেমপ্লেট",
        "PDF, Word এবং আরও অনেক কিছুতে এক্সপোর্ট করুন",
      ],
    },
  }

  const t = translations[language]

  const features = [
    { icon: FileText, label: t.features.ats, color: "text-palette-magenta", bg: "bg-palette-magenta/10" },
    { icon: Palette, label: t.features.themes, color: "text-palette-coral", bg: "bg-palette-coral/10" },
    { icon: Download, label: t.features.export, color: "text-palette-gray", bg: "bg-palette-gray/10" },
    { icon: Globe, label: t.features.bilingual, color: "text-white", bg: "bg-white/10" },
    { icon: Sparkles, label: t.features.ai, color: "text-palette-magenta", bg: "bg-palette-magenta/10" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [features.length])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-hero-gradient opacity-50"></div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Mouse Follower */}
      <div
        className="fixed w-96 h-96 pointer-events-none z-0 opacity-20"
        style={{
          left: mousePosition.x - 192,
          top: mousePosition.y - 192,
          background: "radial-gradient(circle, rgba(216, 63, 135, 0.3) 0%, transparent 70%)",
          transition: "all 0.1s ease-out",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center space-y-8 animate-fade-in-up">
          {/* Main Heading */}
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm text-white/80 animate-fade-in">
              <Star className="h-4 w-4 text-yellow-400" />
              <span>{t.trustedBy}</span>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-white via-palette-coral to-palette-magenta bg-clip-text text-transparent animate-gradient-shift">
                {t.title}
              </span>
              <br />
              <span className="bg-gradient-to-r from-palette-magenta to-purple-600 bg-clip-text text-transparent">
                {t.subtitle}
              </span>
            </h1>

            <p
              className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed animate-fade-in-up"
              style={{ animationDelay: "300ms" }}
            >
              {t.description}
            </p>
          </div>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
            style={{ animationDelay: "600ms" }}
          >
            <Button
              onClick={onGetStarted}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/25"
            >
              <Zap className="h-5 w-5 mr-2" />
              {t.getStarted}
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>

            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/25"
            >
              <Eye className="h-5 w-5 mr-2" />
              {t.watchDemo}
            </Button>
          </div>

          {/* Animated Features Grid */}
          <div
            className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-4xl mx-auto animate-fade-in-up"
            style={{ animationDelay: "900ms" }}
          >
            {features.map((feature, index) => (
              <div
                key={index}
                className={`flex flex-col items-center space-y-3 p-6 rounded-2xl glass border border-white/20 hover:shadow-lg transition-all duration-500 hover:scale-110 cursor-pointer ${
                  currentFeature === index ? "ring-2 ring-primary/50 bg-white/10" : ""
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`p-4 rounded-full bg-white/10 ${feature.color} transition-all duration-300 ${
                    currentFeature === index ? "animate-bounce" : ""
                  }`}
                >
                  <feature.icon className="h-8 w-8" />
                </div>
                <span className="text-sm font-medium text-white text-center">{feature.label}</span>
              </div>
            ))}
          </div>

          {/* Stats Section */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto animate-fade-in-up"
            style={{ animationDelay: "1200ms" }}
          >
            {t.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-white/70 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Benefits List - Center Aligned */}
          <div className="max-w-2xl mx-auto space-y-4 animate-fade-in-up" style={{ animationDelay: "1500ms" }}>
            {t.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center justify-center space-x-3 text-white/90">
                <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                <span className="text-center">{benefit}</span>
              </div>
            ))}
          </div>

          {/* Google-style Chat Bar */}
          <div className="max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: "1800ms" }}>
            <GoogleChatBar language={language} />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
