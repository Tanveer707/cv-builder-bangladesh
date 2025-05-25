"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, Sparkles, Bot, MessageSquare, Zap } from "lucide-react"
import type { CVData } from "@/types/cv"

interface AIAssistantProps {
  cvData: CVData
  setCvData: (data: CVData) => void
  language: "en" | "bn"
}

export function AIAssistant({ cvData, setCvData, language }: AIAssistantProps) {
  const [jobDescription, setJobDescription] = useState("")
  const [uploadedCV, setUploadedCV] = useState<File | null>(null)
  const [analysisMode, setAnalysisMode] = useState<"job" | "cv" | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const translations = {
    en: {
      title: "AI-Powered CV Assistant",
      subtitle: "Get personalized recommendations to improve your CV",
      chooseOption: "Choose how I can help you:",
      analyzeJob: "Analyze Job Description",
      analyzeCV: "Analyze Existing CV",
      jobDescriptionLabel: "Job Description",
      jobDescriptionPlaceholder:
        "Paste the job description here and I'll help optimize your CV for this specific role...",
      uploadCVLabel: "Upload Your CV",
      uploadCVPlaceholder: "Upload your existing CV and I'll provide suggestions for improvement...",
      analyze: "Analyze",
      analyzing: "Analyzing...",
      uploadFile: "Upload File",
      supportedFormats: "Supported formats: PDF, DOC, DOCX",
      howCanHelp: "How can I help you today?",
      option1: "📋 Analyze a job description to optimize your CV",
      option2: "📄 Review your existing CV for improvements",
      option3: "💡 Get general CV writing tips and best practices",
      getStarted: "Get Started",
    },
    bn: {
      title: "এআই-চালিত সিভি সহায়ক",
      subtitle: "আপনার সিভি উন্নত করার জন্য ব্যক্তিগতকৃত সুপারিশ পান",
      chooseOption: "আমি কীভাবে আপনাকে সাহায্য করতে পারি তা বেছে নিন:",
      analyzeJob: "চাকরির বিবরণ বিশ্লেষণ করুন",
      analyzeCV: "বিদ্যমান সিভি বিশ্লেষণ করুন",
      jobDescriptionLabel: "চাকরির বিবরণ",
      jobDescriptionPlaceholder:
        "এখানে চাকরির বিবরণ পেস্ট করুন এবং আমি এই নির্দিষ্ট ভূমিকার জন্য আপনার সিভি অপ্টিমাইজ করতে সাহায্য করব...",
      uploadCVLabel: "আপনার সিভি আপলোড করুন",
      uploadCVPlaceholder: "আপনার বিদ্যমান সিভি আপলোড করুন এবং আমি উন্নতির জন্য পরামর্শ প্রদান করব...",
      analyze: "বিশ্লেষণ করুন",
      analyzing: "বিশ্লেষণ করা হচ্ছে...",
      uploadFile: "ফাইল আপলোড করুন",
      supportedFormats: "সমর্থিত ফরম্যাট: PDF, DOC, DOCX",
      howCanHelp: "আজ আমি আপনাকে কীভাবে সাহায্য করতে পারি?",
      option1: "📋 আপনার সিভি অপ্টিমাইজ করার জন্য একটি চাকরির বিবরণ বিশ্লেষণ করুন",
      option2: "📄 উন্নতির জন্য আপনার বিদ্যমান সিভি পর্যালোচনা করুন",
      option3: "💡 সাধারণ সিভি লেখার টিপস এবং সর্বোত্তম অনুশীলন পান",
      getStarted: "শুরু করুন",
    },
  }

  const t = translations[language]

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedCV(file)
    }
  }

  const handleAnalyze = async () => {
    setIsAnalyzing(true)

    // Simulate analysis
    setTimeout(() => {
      setIsAnalyzing(false)
      // Here you would integrate with actual AI analysis
      alert("Analysis complete! This would show detailed recommendations.")
    }, 3000)
  }

  if (!analysisMode) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <div className="relative">
              <Bot className="h-12 w-12 text-primary animate-pulse" />
              <Sparkles className="h-4 w-4 text-yellow-500 absolute -top-1 -right-1 animate-bounce" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                {t.title}
              </h1>
              <p className="text-white/80 mt-2">{t.subtitle}</p>
            </div>
          </div>
        </div>

        {/* Options */}
        <Card className="glass-dark border-white/20">
          <CardHeader>
            <CardTitle className="text-center text-white text-xl">{t.howCanHelp}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Job Description Analysis */}
              <Card
                className="cursor-pointer transition-all duration-300 hover:scale-105 glass border-white/20 hover:border-primary/50"
                onClick={() => setAnalysisMode("job")}
              >
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                    <FileText className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{t.analyzeJob}</h3>
                  <p className="text-white/70 text-sm">{t.option1}</p>
                  <Button className="w-full bg-gradient-to-r from-primary to-purple-600">{t.getStarted}</Button>
                </CardContent>
              </Card>

              {/* CV Analysis */}
              <Card
                className="cursor-pointer transition-all duration-300 hover:scale-105 glass border-white/20 hover:border-primary/50"
                onClick={() => setAnalysisMode("cv")}
              >
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto bg-purple-500/10 rounded-full flex items-center justify-center">
                    <Upload className="h-8 w-8 text-purple-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">{t.analyzeCV}</h3>
                  <p className="text-white/70 text-sm">{t.option2}</p>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600">{t.getStarted}</Button>
                </CardContent>
              </Card>
            </div>

            {/* General Tips */}
            <Card className="glass border-white/20">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-yellow-500/10 rounded-full flex items-center justify-center">
                  <Sparkles className="h-8 w-8 text-yellow-500" />
                </div>
                <h3 className="text-lg font-semibold text-white">CV Writing Tips</h3>
                <p className="text-white/70 text-sm">{t.option3}</p>
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  {t.getStarted}
                </Button>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <Button variant="ghost" onClick={() => setAnalysisMode(null)} className="text-white hover:bg-white/10">
            ← Back
          </Button>
          <div className="relative">
            <Bot className="h-8 w-8 text-primary" />
            <Sparkles className="h-3 w-3 text-yellow-500 absolute -top-1 -right-1 animate-pulse" />
          </div>
          <h1 className="text-2xl font-bold text-white">{analysisMode === "job" ? t.analyzeJob : t.analyzeCV}</h1>
        </div>
      </div>

      {/* Analysis Interface */}
      <Card className="glass-dark border-white/20">
        <CardContent className="p-8 space-y-6">
          {analysisMode === "job" ? (
            <div className="space-y-4">
              <div>
                <label className="block text-white font-medium mb-2">{t.jobDescriptionLabel}</label>
                <Textarea
                  placeholder={t.jobDescriptionPlaceholder}
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  rows={8}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                />
              </div>
              <Button
                onClick={handleAnalyze}
                disabled={!jobDescription.trim() || isAnalyzing}
                className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90"
                size="lg"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {t.analyzing}
                  </>
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    {t.analyze}
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-white font-medium mb-2">{t.uploadCVLabel}</label>
                <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-white/60 mx-auto mb-4" />
                  <p className="text-white/80 mb-2">{t.uploadCVPlaceholder}</p>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="cv-upload"
                  />
                  <label htmlFor="cv-upload">
                    <Button asChild className="cursor-pointer">
                      <span>{t.uploadFile}</span>
                    </Button>
                  </label>
                  <p className="text-white/60 text-sm mt-2">{t.supportedFormats}</p>
                  {uploadedCV && (
                    <Badge className="mt-2 bg-green-500/20 text-green-400 border-green-500/30">{uploadedCV.name}</Badge>
                  )}
                </div>
              </div>
              <Button
                onClick={handleAnalyze}
                disabled={!uploadedCV || isAnalyzing}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-600/90 hover:to-pink-600/90"
                size="lg"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {t.analyzing}
                  </>
                ) : (
                  <>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    {t.analyze}
                  </>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
