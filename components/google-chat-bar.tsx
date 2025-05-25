"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Search, Sparkles, Upload, MessageSquare, Zap } from "lucide-react"

interface GoogleChatBarProps {
  language: "en" | "bn"
}

export function GoogleChatBar({ language }: GoogleChatBarProps) {
  const [query, setQuery] = useState("")
  const [isFocused, setIsFocused] = useState(false)

  const translations = {
    en: {
      placeholder: "Drop your job description to analyze or ask for assistance...",
      searchButton: "Analyze",
      suggestions: [
        "Analyze this job posting for my CV",
        "How to improve my CV for ATS?",
        "What skills should I add?",
        "Review my professional summary",
      ],
    },
    bn: {
      placeholder: "বিশ্লেষণের জন্য চাকরির বিবরণ দিন বা সহায়তার জন্য জিজ্ঞাসা করুন...",
      searchButton: "বিশ্লেষণ করুন",
      suggestions: [
        "আমার সিভির জন্য এই চাকরির পোস্টিং বিশ্লেষণ করুন",
        "ATS এর জন্য আমার সিভি কীভাবে উন্নত করব?",
        "আমার কী দক্ষতা যোগ করা উচিত?",
        "আমার পেশাগত সারসংক্ষেপ পর্যালোচনা করুন",
      ],
    },
  }

  const t = translations[language]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      // Handle the query - this would integrate with the AI system
      console.log("Analyzing:", query)
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion)
  }

  return (
    <div className="w-full space-y-4">
      {/* Main Search Bar */}
      <Card className="glass-dark border-white/20 hover:border-palette-magenta/50 transition-all duration-300">
        <form onSubmit={handleSubmit} className="flex items-center p-2">
          <div className="flex items-center space-x-3 flex-1">
            <div className="relative">
              <MessageSquare className="h-5 w-5 text-muted-foreground" />
              <Sparkles className="h-2 w-2 text-yellow-500 absolute -top-0.5 -right-0.5 animate-pulse" />
            </div>

            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              placeholder={t.placeholder}
              className="border-0 bg-transparent text-base focus-visible:ring-0 focus-visible:ring-offset-0 text-white placeholder:text-white/60"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Button type="button" variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-muted/50">
              <Upload className="h-4 w-4" />
            </Button>

            <Button
              type="submit"
              disabled={!query.trim()}
              className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white rounded-full px-6 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
            >
              <Zap className="h-4 w-4 mr-2" />
              {t.searchButton}
            </Button>
          </div>
        </form>

        {/* Animated border effect */}
        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/20 via-purple-500/20 to-pink-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10"></div>
      </Card>

      {/* Suggestions */}
      {isFocused && (
        <Card className="glass-dark border-white/20 p-4 animate-fade-in-up">
          <div className="space-y-2">
            <p className="text-sm text-white/70 font-medium mb-3">Quick suggestions:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {t.suggestions.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="justify-start text-left h-auto p-3 hover:bg-white/10 transition-all duration-200 animate-fade-in text-white"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Search className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
                  <span className="text-sm">{suggestion}</span>
                </Button>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
