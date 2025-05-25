"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Sparkles, Users, Star, TrendingUp } from "lucide-react"

interface InitialStyleSelectorProps {
  onStyleSelect: (theme: string) => void
  language: "en" | "bn"
}

export function InitialStyleSelector({ onStyleSelect, language }: InitialStyleSelectorProps) {
  const translations = {
    en: {
      title: "Choose Your CV Style",
      subtitle: "Select a professional theme that matches your industry and personality",
      atsOptimized: "ATS Optimized",
      getStarted: "Get Started",
      modern: "Modern",
      modernDesc: "Clean and contemporary design perfect for tech and creative industries",
      classic: "Classic",
      classicDesc: "Traditional format ideal for corporate and government positions",
      creative: "Creative",
      creativeDesc: "Eye-catching design for creative professionals and startups",
      minimal: "Minimal",
      minimalDesc: "Simple and elegant layout focusing on content over design",
      executive: "Executive",
      executiveDesc: "Premium design for senior-level positions and leadership roles",
      academic: "Academic",
      academicDesc: "Scholarly format perfect for research and academic positions",
      lovedBy: "Loved by world-class professionals",
      lovedBySubtitle: "Job seekers and HR professionals all around Bangladesh reach for our CV Builder by choice",
      whyChooseUs: "Why professionals choose us",
      reasons: [
        "ATS-optimized templates that pass screening systems",
        "AI-powered content suggestions for better impact",
        "Professional designs trusted by top companies",
        "Bilingual support for local and international opportunities",
      ],
    },
    bn: {
      title: "আপনার সিভি স্টাইল নির্বাচন করুন",
      subtitle: "আপনার ইন্ডাস্ট্রি এবং ব্যক্তিত্বের সাথে মানানসই একটি পেশাদার থিম নির্বাচন করুন",
      atsOptimized: "ATS অপ্টিমাইজড",
      getStarted: "শুরু করুন",
      modern: "আধুনিক",
      modernDesc: "প্রযুক্তি এবং সৃজনশীল শিল্পের জন্য পরিষ্কার এবং সমসাময়িক ডিজাইন",
      classic: "ক্লাসিক",
      classicDesc: "কর্পোরেট এবং সরকারি পদের জন্য ঐতিহ্যবাহী ফরম্যাট",
      creative: "সৃজনশীল",
      creativeDesc: "সৃজনশীল পেশাদার এবং স্টার্টআপের জন্য আকর্ষণীয় ডিজাইন",
      minimal: "মিনিমাল",
      minimalDesc: "ডিজাইনের চেয়ে কন্টেন্টের উপর ফোকাস করা সহজ এবং মার্জিত লেআউট",
      executive: "এক্সিকিউটিভ",
      executiveDesc: "সিনিয়র-লেভেল পদ এবং নেতৃত্বের ভূমিকার জন্য প্রিমিয়াম ডিজাইন",
      academic: "একাডেমিক",
      academicDesc: "গবেষণা এবং একাডেমিক পদের জন্য পারফেক্ট স্কলারলি ফরম্যাট",
      lovedBy: "বিশ্বমানের পেশাদারদের প্রিয়",
      lovedBySubtitle: "বাংলাদেশের চাকরিপ্রার্থী এবং এইচআর পেশাদাররা আমাদের সিভি বিল্ডার পছন্দ করে ব্যবহার করেন",
      whyChooseUs: "কেন পেশাদাররা আমাদের বেছে নেন",
      reasons: [
        "ATS-অপ্টিমাইজড টেমপ্লেট যা স্ক্রিনিং সিস্টেম পাস করে",
        "আরও ভাল প্রভাবের জন্য এআই-চালিত কন্টেন্ট পরামর্শ",
        "শীর্ষ কোম্পানিগুলির বিশ্বস্ত পেশাদার ডিজাইন",
        "স্থানীয় এবং আন্তর্জাতিক সুযোগের জন্য দ্বিভাষিক সাপোর্ট",
      ],
    },
  }

  const t = translations[language]

  const themes = [
    {
      id: "modern",
      name: t.modern,
      description: t.modernDesc,
      preview: "bg-gradient-to-br from-blue-400/30 to-indigo-500/30",
      popular: true,
    },
    {
      id: "classic",
      name: t.classic,
      description: t.classicDesc,
      preview: "bg-gradient-to-br from-gray-400/30 to-slate-500/30",
      popular: false,
    },
    {
      id: "creative",
      name: t.creative,
      description: t.creativeDesc,
      preview: "bg-gradient-to-br from-purple-400/30 to-pink-500/30",
      popular: true,
    },
    {
      id: "minimal",
      name: t.minimal,
      description: t.minimalDesc,
      preview: "bg-gradient-to-br from-white/20 to-gray-300/30",
      popular: false,
    },
    {
      id: "executive",
      name: t.executive,
      description: t.executiveDesc,
      preview: "bg-gradient-to-br from-emerald-400/30 to-teal-500/30",
      popular: true,
    },
    {
      id: "academic",
      name: t.academic,
      description: t.academicDesc,
      preview: "bg-gradient-to-br from-amber-400/30 to-orange-500/30",
      popular: false,
    },
  ]

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      {/* Loved by Section */}
      <div className="text-center space-y-8 animate-fade-in-up">
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white">{t.lovedBy}</h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">{t.lovedBySubtitle}</p>
        </div>

        {/* Professional Avatars */}
        <div className="flex justify-center items-center space-x-6">
          <div className="flex -space-x-3">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-3 border-white flex items-center justify-center text-white font-semibold text-lg animate-fade-in shadow-lg"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {String.fromCharCode(65 + i)}
              </div>
            ))}
          </div>
          <div className="flex items-center space-x-2 text-white/80">
            <Users className="h-5 w-5" />
            <span className="font-medium">15,000+ professionals</span>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold text-white mb-6">{t.whyChooseUs}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.reasons.map((reason, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 p-4 glass-card rounded-lg border border-white/20 animate-fade-in-up"
                style={{ animationDelay: `${300 + index * 100}ms` }}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center flex-shrink-0">
                  <Check className="h-4 w-4 text-white" />
                </div>
                <span className="text-white/90 text-sm">{reason}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
          {[
            { icon: Users, number: "15K+", label: language === "en" ? "Happy Users" : "সন্তুষ্ট ব্যবহারকারী" },
            { icon: Star, number: "4.9", label: language === "en" ? "Rating" : "রেটিং" },
            { icon: TrendingUp, number: "95%", label: language === "en" ? "Success Rate" : "সফলতার হার" },
            { icon: Sparkles, number: "50+", label: language === "en" ? "Templates" : "টেমপ্লেট" },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center animate-fade-in-up"
              style={{ animationDelay: `${600 + index * 100}ms` }}
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-white/10 flex items-center justify-center">
                <stat.icon className="h-6 w-6 text-palette-coral" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
              <div className="text-white/70 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Theme Selection */}
      <div className="text-center animate-fade-in-up" style={{ animationDelay: "1000ms" }}>
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white via-palette-coral to-palette-magenta bg-clip-text text-transparent">
          {t.title}
        </h2>
        <p className="text-lg text-white/90 max-w-2xl mx-auto">{t.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {themes.map((theme, index) => (
          <Card
            key={theme.id}
            className="cursor-pointer transition-all duration-500 hover:shadow-2xl hover:scale-105 group glass-card border-white/20 hover:border-palette-magenta/50 animate-fade-in-up relative overflow-hidden"
            style={{ animationDelay: `${1200 + index * 150}ms` }}
            onClick={() => {
              onStyleSelect(theme.id)
            }}
          >
            {theme.popular && (
              <div className="absolute top-4 right-4 z-10">
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 animate-pulse">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Popular
                </Badge>
              </div>
            )}

            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center justify-between text-xl">
                <span className="text-white group-hover:text-palette-coral transition-colors duration-300">
                  {theme.name}
                </span>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Check className="h-5 w-5 text-palette-coral" />
                </div>
              </CardTitle>
              <CardDescription className="text-sm leading-relaxed text-white/80">{theme.description}</CardDescription>
              <Badge variant="secondary" className="w-fit bg-white/20 text-white border-white/30">
                {t.atsOptimized}
              </Badge>
            </CardHeader>

            <CardContent className="relative">
              <div
                className={`h-48 rounded-lg border-2 border-white/20 flex items-center justify-center relative overflow-hidden ${theme.preview} group-hover:border-palette-coral/50 transition-all duration-300 glass-preview`}
              >
                {/* CV Preview Mockup */}
                <div className="w-full h-full p-4 space-y-3 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-center space-y-2">
                    <div className="h-3 bg-white/40 rounded w-24 mx-auto"></div>
                    <div className="h-2 bg-white/30 rounded w-32 mx-auto"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-palette-coral/60 rounded w-16"></div>
                    <div className="h-2 bg-white/20 rounded w-full"></div>
                    <div className="h-2 bg-white/20 rounded w-3/4"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-2 bg-palette-coral/60 rounded w-20"></div>
                    <div className="h-2 bg-white/20 rounded w-full"></div>
                    <div className="h-2 bg-white/20 rounded w-5/6"></div>
                  </div>
                  <div className="flex space-x-1">
                    <div className="h-6 bg-white/30 rounded-full px-2 flex-1"></div>
                    <div className="h-6 bg-white/30 rounded-full px-2 flex-1"></div>
                    <div className="h-6 bg-white/30 rounded-full px-2 flex-1"></div>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-palette-coral/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
