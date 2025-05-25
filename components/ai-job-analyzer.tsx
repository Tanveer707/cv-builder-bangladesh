"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Send, Bot, User, AlertCircle, CheckCircle, XCircle, Lightbulb, Sparkles, Zap } from "lucide-react"
import type { CVData, ChatMessage, JobAnalysis } from "@/types/cv"

interface AIJobAnalyzerProps {
  cvData: CVData
  language: "en" | "bn"
}

export function AIJobAnalyzer({ cvData, language }: AIJobAnalyzerProps) {
  const [jobDescription, setJobDescription] = useState("")
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysis, setAnalysis] = useState<JobAnalysis | null>(null)
  const [currentMessage, setCurrentMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const translations = {
    en: {
      title: "AI Job Analyzer",
      subtitle: "Paste a job description to get personalized CV optimization suggestions",
      placeholder: "Paste the job description or job circular here...",
      analyze: "Analyze Job",
      analyzing: "Analyzing...",
      chatPlaceholder: "Ask me anything about optimizing your CV...",
      send: "Send",
      requiredSkills: "Required Skills",
      missingSkills: "Missing Skills",
      matchingSkills: "Matching Skills",
      suggestions: "AI Suggestions",
      experienceLevel: "Experience Level",
      noAnalysis: "Hi! I'm your AI CV assistant. Paste a job description above and I'll help optimize your CV.",
      analysisComplete: "✨ Analysis complete! I've found some great ways to improve your CV for this role.",
      typing: "AI is thinking...",
    },
    bn: {
      title: "এআই চাকরি বিশ্লেষক",
      subtitle: "ব্যক্তিগতকৃত সিভি অপ্টিমাইজেশন পরামর্শের জন্য একটি চাকরির বিবরণ পেস্ট করুন",
      placeholder: "এখানে চাকরির বিবরণ বা চাকরির সার্কুলার পেস্ট করুন...",
      analyze: "চাকরি বিশ্লেষণ করুন",
      analyzing: "বিশ্লেষণ করা হচ্ছে...",
      chatPlaceholder: "আপনার সিভি অপ্টিমাইজেশন সম্পর্কে আমাকে যেকোনো কিছু জিজ্ঞাসা করুন...",
      send: "পাঠান",
      requiredSkills: "প্রয়োজনীয় দক্ষতা",
      missingSkills: "অনুপস্থিত দক্ষতা",
      matchingSkills: "মিলে যাওয়া দক্ষতা",
      suggestions: "এআই পরামর্শ",
      experienceLevel: "অভিজ্ঞতার স্তর",
      noAnalysis: "হাই! আমি আপনার এআই সিভি সহায়ক। উপরে একটি চাকরির বিবরণ পেস্ট করুন এবং আমি আপনার সিভি অপ্টিমাইজ করতে সাহায্য করব।",
      analysisComplete: "✨ বিশ্লেষণ সম্পূর্ণ! এই ভূমিকার জন্য আপনার সিভি উন্নত করার কিছু দুর্দান্ত উপায় আমি খুঁজে পেয়েছি।",
      typing: "এআই চিন্তা করছে...",
    },
  }

  const t = translations[language]

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isTyping])

  const analyzeJob = async () => {
    if (!jobDescription.trim()) return

    setIsAnalyzing(true)

    // Simulate AI analysis with realistic delay
    setTimeout(() => {
      const mockAnalysis: JobAnalysis = {
        requiredSkills: extractSkillsFromJobDescription(jobDescription),
        preferredQualifications: ["Bachelor's degree", "2+ years experience", "Team leadership"],
        experienceLevel: "Mid-level",
        suggestions: generateSuggestions(),
      }

      setAnalysis(mockAnalysis)

      const analysisMessage: ChatMessage = {
        id: Date.now().toString(),
        type: "ai",
        content: t.analysisComplete,
        timestamp: new Date(),
      }

      setMessages([analysisMessage])
      setIsAnalyzing(false)
    }, 2500)
  }

  const extractSkillsFromJobDescription = (description: string): string[] => {
    const commonSkills = [
      "JavaScript",
      "React",
      "Node.js",
      "Python",
      "Java",
      "SQL",
      "MongoDB",
      "AWS",
      "Docker",
      "Git",
      "Agile",
      "Scrum",
      "Leadership",
      "Communication",
      "Project Management",
      "Data Analysis",
      "Machine Learning",
      "UI/UX",
    ]

    return commonSkills.filter((skill) => description.toLowerCase().includes(skill.toLowerCase())).slice(0, 8)
  }

  const generateSuggestions = (): string[] => {
    const suggestions = []

    if (cvData.summary.length < 100) {
      suggestions.push("Expand your professional summary to 2-3 sentences highlighting your key achievements")
    }

    if (cvData.skills.length < 5) {
      suggestions.push("Add more relevant technical skills to match the job requirements")
    }

    if (cvData.experience.length === 0) {
      suggestions.push("Add work experience or internships, even if they're not directly related")
    }

    if (cvData.experience.some((exp) => exp.description.length < 50)) {
      suggestions.push("Provide more detailed descriptions of your work experience with quantifiable achievements")
    }

    suggestions.push("Use action verbs like 'developed', 'implemented', 'managed' in your experience descriptions")
    suggestions.push("Quantify your achievements with numbers, percentages, or metrics where possible")

    return suggestions
  }

  const getMatchingSkills = () => {
    if (!analysis) return []
    return cvData.skills.filter((skill) =>
      analysis.requiredSkills.some(
        (reqSkill) =>
          skill.toLowerCase().includes(reqSkill.toLowerCase()) || reqSkill.toLowerCase().includes(skill.toLowerCase()),
      ),
    )
  }

  const getMissingSkills = () => {
    if (!analysis) return []
    const userSkills = cvData.skills.map((s) => s.toLowerCase())
    return analysis.requiredSkills.filter(
      (skill) =>
        !userSkills.some(
          (userSkill) => userSkill.includes(skill.toLowerCase()) || skill.toLowerCase().includes(userSkill),
        ),
    )
  }

  const sendMessage = async (content: string) => {
    if (!content.trim()) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setCurrentMessage("")
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: generateAIResponse(content),
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = (userMessage: string): string => {
    const responses = [
      "Based on your CV analysis, I recommend focusing on the missing skills highlighted above. Consider taking online courses or highlighting transferable skills.",
      "Your experience section could benefit from more quantifiable achievements. Try using the STAR method (Situation, Task, Action, Result) to describe your accomplishments.",
      "For ATS optimization, ensure your CV includes keywords from the job description. I've identified several key terms you should incorporate.",
      "Your professional summary is the first thing recruiters see. Make it compelling by highlighting your most relevant achievements for this specific role.",
      "Consider adding more technical skills that align with the job requirements. Even basic knowledge can be valuable if mentioned appropriately.",
    ]

    return responses[Math.floor(Math.random() * responses.length)]
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage(currentMessage)
    }
  }

  return (
    <div className="space-y-6">
      {/* Job Description Input */}
      <div className="space-y-4">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="relative">
              <Sparkles className="h-6 w-6 text-primary animate-pulse" />
              <Zap className="h-3 w-3 text-yellow-500 absolute -top-1 -right-1 animate-bounce" />
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              {t.title}
            </h3>
          </div>
          <p className="text-white/70">{t.subtitle}</p>
        </div>

        <div className="relative">
          <Textarea
            placeholder={t.placeholder}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={6}
            className="resize-none border-2 border-dashed border-primary/20 focus:border-primary/50 transition-all duration-300 bg-background/50 backdrop-blur-sm bg-white/10 border-white/20 text-white placeholder:text-white/60"
          />
          {jobDescription && (
            <div className="absolute top-2 right-2">
              <Badge variant="secondary" className="animate-pulse">
                Ready to analyze
              </Badge>
            </div>
          )}
        </div>

        <Button
          onClick={analyzeJob}
          disabled={!jobDescription.trim() || isAnalyzing}
          className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 transition-all duration-300 transform hover:scale-105"
          size="lg"
        >
          {isAnalyzing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              {t.analyzing}
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2" />
              {t.analyze}
            </>
          )}
        </Button>
      </div>

      {/* Analysis Results */}
      {analysis && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-fade-in-up">
          {/* Skills Analysis */}
          <Card className="glass-dark border-white/20">
            <CardHeader>
              <CardTitle className="text-lg flex items-center text-white">
                <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                {t.requiredSkills}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-green-600 mb-3 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  {t.matchingSkills} ({getMatchingSkills().length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {getMatchingSkills().map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400 animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="text-sm font-medium text-red-600 mb-3 flex items-center">
                  <XCircle className="h-4 w-4 mr-1" />
                  {t.missingSkills} ({getMissingSkills().length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {getMissingSkills().map((skill, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="border-red-200 text-red-600 dark:border-red-800 dark:text-red-400 animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Suggestions */}
          <Card className="glass-dark border-white/20">
            <CardHeader>
              <CardTitle className="text-lg flex items-center text-white">
                <Lightbulb className="h-5 w-5 mr-2 text-yellow-500" />
                {t.suggestions}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-48">
                <ul className="space-y-3">
                  {analysis.suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="text-sm flex items-start p-3 rounded-lg bg-muted/50 animate-fade-in-up"
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      <AlertCircle className="h-4 w-4 mr-2 mt-0.5 text-blue-500 flex-shrink-0" />
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Gemini-style Chat Interface */}
      <Card className="border-0 bg-transparent shadow-none">
        <CardContent className="p-0">
          <div className="glass-dark rounded-2xl border-white/20 overflow-hidden">
            {/* Chat Messages */}
            <ScrollArea className="h-80 p-6">
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center space-y-4 animate-fade-in">
                    <div className="relative mx-auto w-16 h-16">
                      <Bot className="h-16 w-16 text-primary/60" />
                      <Sparkles className="h-4 w-4 text-yellow-500 absolute -top-1 -right-1 animate-pulse" />
                    </div>
                    <p className="text-white/70 max-w-md">{t.noAnalysis}</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {messages.map((message, index) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === "user" ? "justify-end" : "justify-start"} animate-fade-in-up`}
                      style={{ animationDelay: `${index * 200}ms` }}
                    >
                      <div
                        className={`flex items-start space-x-3 max-w-[85%] ${message.type === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
                      >
                        <div
                          className={`p-2 rounded-full ${message.type === "user" ? "bg-primary" : "bg-gradient-to-br from-purple-500 to-pink-500"}`}
                        >
                          {message.type === "user" ? (
                            <User className="h-4 w-4 text-primary-foreground" />
                          ) : (
                            <Bot className="h-4 w-4 text-white" />
                          )}
                        </div>
                        <div
                          className={`p-4 rounded-2xl ${
                            message.type === "user" ? "bg-primary text-primary-foreground" : "glass border-white/20"
                          }`}
                        >
                          <p className="text-sm leading-relaxed">{message.content}</p>
                          <p className="text-xs opacity-60 mt-2">
                            {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start animate-fade-in">
                      <div className="flex items-start space-x-3 max-w-[85%]">
                        <div className="p-2 rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
                          <Bot className="h-4 w-4 text-white" />
                        </div>
                        <div className="p-4 rounded-2xl glass border-white/20">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-primary rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-primary rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                          <p className="text-xs opacity-60 mt-2">{t.typing}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              <div ref={messagesEndRef} />
            </ScrollArea>

            {/* Chat Input */}
            <div className="p-4 border-t border-border/50 bg-background/50 backdrop-blur-sm">
              <div className="flex space-x-3">
                <Textarea
                  ref={textareaRef}
                  placeholder={t.chatPlaceholder}
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  rows={1}
                  className="resize-none border-0 bg-muted/50 focus:bg-background transition-all duration-300 rounded-xl"
                  disabled={isTyping}
                />
                <Button
                  size="icon"
                  onClick={() => sendMessage(currentMessage)}
                  disabled={!currentMessage.trim() || isTyping}
                  className="rounded-xl bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 transition-all duration-300 transform hover:scale-105"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
