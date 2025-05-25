"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertCircle, XCircle, TrendingUp, Award, Zap, Target, ChevronDown, ChevronUp } from "lucide-react"
import type { CVData } from "@/types/cv"

interface ATSScoreCardProps {
  cvData: CVData
  language: "en" | "bn"
}

interface ATSCriteria {
  name: string
  score: number
  status: "excellent" | "good" | "needs-improvement" | "poor"
  description: string
  suggestions: string[]
}

export function ATSScoreCard({ cvData, language }: ATSScoreCardProps) {
  const [overallScore, setOverallScore] = useState(0)
  const [criteria, setCriteria] = useState<ATSCriteria[]>([])
  const [isExpanded, setIsExpanded] = useState(false)
  const [animatedScore, setAnimatedScore] = useState(0)

  const translations = {
    en: {
      title: "ATS Compatibility Score",
      subtitle: "Your CV's compatibility with Applicant Tracking Systems",
      overallScore: "Overall Score",
      excellent: "Excellent",
      good: "Good",
      needsImprovement: "Needs Improvement",
      poor: "Poor",
      viewDetails: "View Detailed Analysis",
      hideDetails: "Hide Details",
      suggestions: "Suggestions",
      criteria: {
        contactInfo: "Contact Information",
        keywords: "Keywords & Skills",
        formatting: "Formatting & Structure",
        sections: "Required Sections",
        length: "CV Length",
        fileFormat: "File Format",
      },
      descriptions: {
        contactInfo: "Essential contact details are present and properly formatted",
        keywords: "Relevant keywords and skills are included for ATS scanning",
        formatting: "Clean, simple formatting that ATS systems can parse",
        sections: "All important CV sections are included",
        length: "Appropriate length for your experience level",
        fileFormat: "CV is in ATS-friendly format",
      },
    },
    bn: {
      title: "ATS সামঞ্জস্য স্কোর",
      subtitle: "আপনার সিভির অ্যাপ্লিকেন্ট ট্র্যাকিং সিস্টেমের সাথে সামঞ্জস্য",
      overallScore: "সামগ্রিক স্কোর",
      excellent: "চমৎকার",
      good: "ভাল",
      needsImprovement: "উন্নতি প্রয়োজন",
      poor: "দুর্বল",
      viewDetails: "বিস্তারিত বিশ্লেষণ দেখুন",
      hideDetails: "বিস্তারিত লুকান",
      suggestions: "পরামর্শ",
      criteria: {
        contactInfo: "যোগাযোগের তথ্য",
        keywords: "কীওয়ার্ড ও দক্ষতা",
        formatting: "ফরম্যাটিং ও কাঠামো",
        sections: "প্রয়োজনীয় বিভাগ",
        length: "সিভির দৈর্ঘ্য",
        fileFormat: "ফাইল ফরম্যাট",
      },
      descriptions: {
        contactInfo: "প্রয়োজনীয় যোগাযোগের বিবরণ উপস্থিত এবং সঠিকভাবে ফরম্যাট করা",
        keywords: "ATS স্ক্যানিংয়ের জন্য প্রাসঙ্গিক কীওয়ার্ড এবং দক্ষতা অন্তর্ভুক্ত",
        formatting: "পরিষ্কার, সহজ ফরম্যাটিং যা ATS সিস্টেম পার্স করতে পারে",
        sections: "সমস্ত গুরুত্বপূর্ণ সিভি বিভাগ অন্তর্ভুক্ত",
        length: "আপনার অভিজ্ঞতার স্তরের জন্য উপযুক্ত দৈর্ঘ্য",
        fileFormat: "সিভি ATS-বান্ধব ফরম্যাটে আছে",
      },
    },
  }

  const t = translations[language]

  useEffect(() => {
    calculateATSScore()
  }, [cvData])

  useEffect(() => {
    // Animate score counting
    const timer = setInterval(() => {
      setAnimatedScore((prev) => {
        if (prev < overallScore) {
          return prev + 1
        }
        clearInterval(timer)
        return overallScore
      })
    }, 30)

    return () => clearInterval(timer)
  }, [overallScore])

  const calculateATSScore = () => {
    const criteriaScores: ATSCriteria[] = []

    // Contact Information (20 points)
    const contactScore = calculateContactScore()
    criteriaScores.push({
      name: t.criteria.contactInfo,
      score: contactScore,
      status: getStatus(contactScore, 20),
      description: t.descriptions.contactInfo,
      suggestions: getContactSuggestions(contactScore),
    })

    // Keywords & Skills (25 points)
    const keywordScore = calculateKeywordScore()
    criteriaScores.push({
      name: t.criteria.keywords,
      score: keywordScore,
      status: getStatus(keywordScore, 25),
      description: t.descriptions.keywords,
      suggestions: getKeywordSuggestions(keywordScore),
    })

    // Formatting & Structure (20 points)
    const formatScore = calculateFormatScore()
    criteriaScores.push({
      name: t.criteria.formatting,
      score: formatScore,
      status: getStatus(formatScore, 20),
      description: t.descriptions.formatting,
      suggestions: getFormatSuggestions(formatScore),
    })

    // Required Sections (20 points)
    const sectionScore = calculateSectionScore()
    criteriaScores.push({
      name: t.criteria.sections,
      score: sectionScore,
      status: getStatus(sectionScore, 20),
      description: t.descriptions.sections,
      suggestions: getSectionSuggestions(sectionScore),
    })

    // CV Length (10 points)
    const lengthScore = calculateLengthScore()
    criteriaScores.push({
      name: t.criteria.length,
      score: lengthScore,
      status: getStatus(lengthScore, 10),
      description: t.descriptions.length,
      suggestions: getLengthSuggestions(lengthScore),
    })

    // File Format (5 points)
    const fileScore = 5 // Assuming good format since it's digital
    criteriaScores.push({
      name: t.criteria.fileFormat,
      score: fileScore,
      status: getStatus(fileScore, 5),
      description: t.descriptions.fileFormat,
      suggestions: [],
    })

    setCriteria(criteriaScores)
    const total = criteriaScores.reduce((sum, criteria) => sum + criteria.score, 0)
    setOverallScore(total)
  }

  const calculateContactScore = (): number => {
    let score = 0
    if (cvData.personalInfo.fullName) score += 5
    if (cvData.personalInfo.email) score += 5
    if (cvData.personalInfo.phone) score += 5
    if (cvData.personalInfo.address) score += 3
    if (cvData.personalInfo.linkedin) score += 2
    return score
  }

  const calculateKeywordScore = (): number => {
    let score = 0
    if (cvData.skills.length >= 5) score += 10
    if (cvData.skills.length >= 8) score += 5
    if (cvData.summary.length > 100) score += 5
    if (cvData.experience.length > 0) score += 5
    return score
  }

  const calculateFormatScore = (): number => {
    let score = 15 // Base score for clean digital format
    if (cvData.summary) score += 3
    if (cvData.education.length > 0) score += 2
    return score
  }

  const calculateSectionScore = (): number => {
    let score = 0
    if (cvData.personalInfo.fullName) score += 4
    if (cvData.summary) score += 4
    if (cvData.education.length > 0) score += 4
    if (cvData.experience.length > 0) score += 4
    if (cvData.skills.length > 0) score += 4
    return score
  }

  const calculateLengthScore = (): number => {
    const totalContent = cvData.summary.length + cvData.experience.reduce((sum, exp) => sum + exp.description.length, 0)

    if (totalContent >= 500 && totalContent <= 2000) return 10
    if (totalContent >= 300 && totalContent <= 2500) return 7
    if (totalContent >= 200) return 5
    return 2
  }

  const getStatus = (score: number, maxScore: number): "excellent" | "good" | "needs-improvement" | "poor" => {
    const percentage = (score / maxScore) * 100
    if (percentage >= 90) return "excellent"
    if (percentage >= 70) return "good"
    if (percentage >= 50) return "needs-improvement"
    return "poor"
  }

  const getContactSuggestions = (score: number): string[] => {
    const suggestions = []
    if (!cvData.personalInfo.fullName) suggestions.push("Add your full name")
    if (!cvData.personalInfo.email) suggestions.push("Add a professional email address")
    if (!cvData.personalInfo.phone) suggestions.push("Include your phone number")
    if (!cvData.personalInfo.linkedin) suggestions.push("Add your LinkedIn profile")
    return suggestions
  }

  const getKeywordSuggestions = (score: number): string[] => {
    const suggestions = []
    if (cvData.skills.length < 5) suggestions.push("Add more relevant skills (aim for 5-10)")
    if (cvData.summary.length < 100) suggestions.push("Expand your professional summary")
    if (cvData.experience.length === 0) suggestions.push("Add work experience or internships")
    return suggestions
  }

  const getFormatSuggestions = (score: number): string[] => {
    const suggestions = []
    if (!cvData.summary) suggestions.push("Add a professional summary section")
    if (cvData.education.length === 0) suggestions.push("Include your educational background")
    return suggestions
  }

  const getSectionSuggestions = (score: number): string[] => {
    const suggestions = []
    if (!cvData.summary) suggestions.push("Add a professional summary")
    if (cvData.education.length === 0) suggestions.push("Include education section")
    if (cvData.experience.length === 0) suggestions.push("Add work experience")
    if (cvData.skills.length === 0) suggestions.push("List your skills")
    return suggestions
  }

  const getLengthSuggestions = (score: number): string[] => {
    const totalContent = cvData.summary.length + cvData.experience.reduce((sum, exp) => sum + exp.description.length, 0)

    if (totalContent < 300) return ["Add more details to your experience and summary"]
    if (totalContent > 2500) return ["Consider condensing your content for better readability"]
    return []
  }

  const getScoreColor = (score: number): string => {
    if (score >= 85) return "text-green-600"
    if (score >= 70) return "text-blue-600"
    if (score >= 50) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBackground = (score: number): string => {
    if (score >= 85) return "from-green-500 to-emerald-500"
    if (score >= 70) return "from-blue-500 to-cyan-500"
    if (score >= 50) return "from-yellow-500 to-orange-500"
    return "from-red-500 to-pink-500"
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "excellent":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "good":
        return <CheckCircle className="h-4 w-4 text-blue-600" />
      case "needs-improvement":
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
      case "poor":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return null
    }
  }

  const getStatusText = (status: string): string => {
    switch (status) {
      case "excellent":
        return t.excellent
      case "good":
        return t.good
      case "needs-improvement":
        return t.needsImprovement
      case "poor":
        return t.poor
      default:
        return ""
    }
  }

  return (
    <Card className="glass-dark border-white/20 animate-fade-in-up">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Target className="h-6 w-6 text-primary" />
              <Zap className="h-3 w-3 text-yellow-500 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <div>
              <CardTitle className="text-xl text-white">{t.title}</CardTitle>
              <p className="text-sm text-white/70">{t.subtitle}</p>
            </div>
          </div>

          <div className="text-right">
            <div className={`text-3xl font-bold ${getScoreColor(animatedScore)}`}>{animatedScore}%</div>
            <Badge
              variant="secondary"
              className={`bg-gradient-to-r ${getScoreBackground(overallScore)} text-white border-0`}
            >
              <Award className="h-3 w-3 mr-1" />
              {getStatusText(getStatus(overallScore, 100))}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 bg-transparent">
        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-white">{t.overallScore}</span>
            <span className="font-medium text-white">{overallScore}/100</span>
          </div>
          <Progress value={animatedScore} className="h-3" />
        </div>

        {/* Toggle Details Button */}
        <Button variant="outline" onClick={() => setIsExpanded(!isExpanded)} className="w-full justify-between">
          <span className="flex items-center">
            <TrendingUp className="h-4 w-4 mr-2" />
            {isExpanded ? t.hideDetails : t.viewDetails}
          </span>
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>

        {/* Detailed Analysis */}
        {isExpanded && (
          <div className="space-y-4 animate-fade-in-up">
            {criteria.map((criterion, index) => (
              <Card key={index} className="glass border-white/20">
                <CardContent className="p-4 bg-transparent">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(criterion.status)}
                      <span className="font-medium text-white">{criterion.name}</span>
                    </div>
                    <Badge variant="outline">
                      {criterion.score}/
                      {criterion.name === t.criteria.keywords
                        ? 25
                        : criterion.name === t.criteria.contactInfo
                          ? 20
                          : criterion.name === t.criteria.formatting
                            ? 20
                            : criterion.name === t.criteria.sections
                              ? 20
                              : criterion.name === t.criteria.length
                                ? 10
                                : 5}
                    </Badge>
                  </div>

                  <p className="text-sm text-white/70 mb-3">{criterion.description}</p>

                  {criterion.suggestions.length > 0 && (
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-primary">{t.suggestions}:</p>
                      <ul className="text-sm text-white/70 space-y-1">
                        {criterion.suggestions.map((suggestion, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-primary mr-2">•</span>
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
