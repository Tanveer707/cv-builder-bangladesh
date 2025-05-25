"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Plus,
  Trash2,
  Upload,
  User,
  GraduationCap,
  Briefcase,
  BookOpen,
  Award,
  Globe,
  Languages,
  MessageSquare,
  MapPin,
  Home,
} from "lucide-react"
import { AIJobAnalyzer } from "@/components/ai-job-analyzer"
import { AddressForm } from "@/components/address-form"
import type {
  CVData,
  Education,
  Experience,
  Publication,
  Award as AwardType,
  Language,
  Reference,
  Address,
} from "@/types/cv"

interface CVBuilderProps {
  cvData: CVData
  setCvData: (data: CVData) => void
  language: "en" | "bn"
}

export function CVBuilder({ cvData, setCvData, language }: CVBuilderProps) {
  const [includePicture, setIncludePicture] = useState(false)
  const [includeNationalId, setIncludeNationalId] = useState(false)
  const [includeBirthCertificate, setIncludeBirthCertificate] = useState(false)
  const [showAIAnalyzer, setShowAIAnalyzer] = useState(false)

  const translations = {
    en: {
      personalInfo: "Personal Information",
      fullName: "Full Name",
      email: "Email Address",
      phone: "Phone Number",
      presentAddress: "Present Address",
      permanentAddress: "Permanent Address",
      sameAsPresentAddress: "Same as present address",
      website: "Website",
      linkedin: "LinkedIn Profile",
      nationalId: "National ID Number",
      birthCertificate: "Birth Certificate Number",
      profilePicture: "Profile Picture",
      uploadPicture: "Upload Picture",
      aiAnalyzer: "AI Job Analyzer",
      openAIAnalyzer: "Open AI Job Analyzer",
      summary: "Professional Summary",
      summaryPlaceholder: "Write a brief summary about yourself...",
      education: "Education",
      addEducation: "Add Education",
      degree: "Degree",
      institution: "Institution",
      year: "Year",
      grade: "Grade/CGPA",
      experience: "Work Experience",
      addExperience: "Add Experience",
      jobTitle: "Job Title",
      company: "Company",
      duration: "Duration",
      description: "Description",
      publications: "Publications",
      addPublication: "Add Publication",
      publicationTitle: "Title",
      journal: "Journal/Conference",
      authors: "Authors",
      doi: "DOI",
      awards: "Awards & Achievements",
      addAward: "Add Award",
      awardTitle: "Award Title",
      organization: "Organization",
      languages: "Languages",
      addLanguage: "Add Language",
      languageName: "Language",
      proficiency: "Proficiency",
      proficiencyLevels: {
        native: "Native",
        fluent: "Fluent",
        advanced: "Advanced",
        intermediate: "Intermediate",
        beginner: "Beginner",
      },
      skills: "Skills",
      addSkill: "Add Skill",
      skillName: "Skill Name",
      references: "References",
      addReference: "Add Reference",
      referenceName: "Name",
      referenceTitle: "Title",
      referenceCompany: "Company",
      referencePhone: "Phone",
      referenceEmail: "Email",
      technicalSkills: "Technical Skills",
      softwareSkills: "Software Skills",
    },
    bn: {
      personalInfo: "ব্যক্তিগত তথ্য",
      fullName: "পূর্ণ নাম",
      email: "ইমেইল ঠিকানা",
      phone: "ফোন নম্বর",
      presentAddress: "বর্তমান ঠিকানা",
      permanentAddress: "স্থায়ী ঠিকানা",
      sameAsPresentAddress: "বর্তমান ঠিকানার মতো একই",
      website: "ওয়েবসাইট",
      linkedin: "লিংকডইন প্রোফাইল",
      nationalId: "জাতীয় পরিচয়পত্র নম্বর",
      birthCertificate: "জন্ম নিবন্ধন নম্বর",
      profilePicture: "প্রোফাইল ছবি",
      uploadPicture: "ছবি আপলোড করুন",
      aiAnalyzer: "এআই চাকরি বিশ্লেষক",
      openAIAnalyzer: "এআই চাকরি বিশ্লেষক খুলুন",
      summary: "পেশাগত সারসংক্ষেপ",
      summaryPlaceholder: "নিজের সম্পর্কে একটি সংক্ষিপ্ত বিবরণ লিখুন...",
      education: "শিক্ষাগত যোগ্যতা",
      addEducation: "শিক্ষাগত যোগ্যতা যোগ করুন",
      degree: "ডিগ্রি",
      institution: "প্রতিষ্ঠান",
      year: "বছর",
      grade: "গ্রেড/সিজিপিএ",
      experience: "কর্মঅভিজ্ঞতা",
      addExperience: "অভিজ্ঞতা যোগ করুন",
      jobTitle: "পদবি",
      company: "কোম্পানি",
      duration: "সময়কাল",
      description: "বিবরণ",
      publications: "প্রকাশনা",
      addPublication: "প্রকাশনা যোগ করুন",
      publicationTitle: "শিরোনাম",
      journal: "জার্নাল/কনফারেন্স",
      authors: "লেখকগণ",
      doi: "ডিওআই",
      awards: "পুরস্কার ও অর্জন",
      addAward: "পুরস্কার যোগ করুন",
      awardTitle: "পুরস্কারের নাম",
      organization: "প্রতিষ্ঠান",
      languages: "ভাষা",
      addLanguage: "ভাষা যোগ করুন",
      languageName: "ভাষা",
      proficiency: "দক্ষতা",
      proficiencyLevels: {
        native: "মাতৃভাষা",
        fluent: "সাবলীল",
        advanced: "উন্নত",
        intermediate: "মধ্যম",
        beginner: "প্রাথমিক",
      },
      skills: "দক্ষতা",
      addSkill: "দক্ষতা যোগ করুন",
      skillName: "দক্ষতার নাম",
      references: "রেফারেন্স",
      addReference: "রেফারেন্স যোগ করুন",
      referenceName: "নাম",
      referenceTitle: "পদবি",
      referenceCompany: "কোম্পানি",
      referencePhone: "ফোন",
      referenceEmail: "ইমেইল",
      technicalSkills: "প্রযুক্তিগত দক্ষতা",
      softwareSkills: "সফটওয়্যার দক্ষতা",
    },
  }

  const t = translations[language]

  const updatePersonalInfo = (field: string, value: string | boolean) => {
    setCvData({
      ...cvData,
      personalInfo: {
        ...cvData.personalInfo,
        [field]: value,
      },
    })
  }

  const updatePresentAddress = (address: Address) => {
    const newCvData = {
      ...cvData,
      personalInfo: {
        ...cvData.personalInfo,
        presentAddress: address,
        ...(cvData.personalInfo.sameAsPresentAddress && { permanentAddress: address }),
      },
    }
    setCvData(newCvData)
  }

  const updatePermanentAddress = (address: Address) => {
    setCvData({
      ...cvData,
      personalInfo: {
        ...cvData.personalInfo,
        permanentAddress: address,
      },
    })
  }

  const handleSameAddressToggle = (checked: boolean) => {
    setCvData({
      ...cvData,
      personalInfo: {
        ...cvData.personalInfo,
        sameAsPresentAddress: checked,
        ...(checked && { permanentAddress: cvData.personalInfo.presentAddress }),
      },
    })
  }

  // Rest of the functions remain the same...
  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      degree: "",
      institution: "",
      year: "",
      grade: "",
    }
    setCvData({
      ...cvData,
      education: [...cvData.education, newEducation],
    })
  }

  const updateEducation = (id: string, field: string, value: string) => {
    setCvData({
      ...cvData,
      education: cvData.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    })
  }

  const removeEducation = (id: string) => {
    setCvData({
      ...cvData,
      education: cvData.education.filter((edu) => edu.id !== id),
    })
  }

  const calculateDuration = (startDate: string, endDate: string, isCurrentJob: boolean): string => {
    if (!startDate) return ""

    const start = new Date(startDate)
    const end = isCurrentJob ? new Date() : new Date(endDate)

    if (!endDate && !isCurrentJob) return ""

    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    const years = Math.floor(diffDays / 365)
    const months = Math.floor((diffDays % 365) / 30)

    if (years > 0 && months > 0) {
      return `${years} year${years > 1 ? "s" : ""} ${months} month${months > 1 ? "s" : ""}`
    } else if (years > 0) {
      return `${years} year${years > 1 ? "s" : ""}`
    } else if (months > 0) {
      return `${months} month${months > 1 ? "s" : ""}`
    } else {
      return "Less than a month"
    }
  }

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      jobTitle: "",
      company: "",
      startDate: "",
      endDate: "",
      isCurrentJob: false,
      duration: "",
      description: "",
    }
    setCvData({
      ...cvData,
      experience: [...cvData.experience, newExperience],
    })
  }

  const updateExperience = (id: string, field: string, value: string | boolean) => {
    setCvData({
      ...cvData,
      experience: cvData.experience.map((exp) => {
        if (exp.id === id) {
          const updatedExp = { ...exp, [field]: value }
          if (field === "startDate" || field === "endDate" || field === "isCurrentJob") {
            updatedExp.duration = calculateDuration(
              updatedExp.startDate,
              updatedExp.endDate,
              updatedExp.isCurrentJob || false,
            )
          }
          return updatedExp
        } else {
          return exp
        }
      }),
    })
  }

  const removeExperience = (id: string) => {
    setCvData({
      ...cvData,
      experience: cvData.experience.filter((exp) => exp.id !== id),
    })
  }

  const addPublication = () => {
    const newPublication: Publication = {
      id: Date.now().toString(),
      title: "",
      journal: "",
      year: "",
      authors: "",
      doi: "",
      description: "",
    }
    setCvData({
      ...cvData,
      publications: [...cvData.publications, newPublication],
    })
  }

  const updatePublication = (id: string, field: string, value: string) => {
    setCvData({
      ...cvData,
      publications: cvData.publications.map((pub) => (pub.id === id ? { ...pub, [field]: value } : pub)),
    })
  }

  const removePublication = (id: string) => {
    setCvData({
      ...cvData,
      publications: cvData.publications.filter((pub) => pub.id !== id),
    })
  }

  const addAward = () => {
    const newAward: AwardType = {
      id: Date.now().toString(),
      title: "",
      organization: "",
      year: "",
      description: "",
    }
    setCvData({
      ...cvData,
      awards: [...cvData.awards, newAward],
    })
  }

  const updateAward = (id: string, field: string, value: string) => {
    setCvData({
      ...cvData,
      awards: cvData.awards.map((award) => (award.id === id ? { ...award, [field]: value } : award)),
    })
  }

  const removeAward = (id: string) => {
    setCvData({
      ...cvData,
      awards: cvData.awards.filter((award) => award.id !== id),
    })
  }

  const addLanguage = () => {
    const newLanguage: Language = {
      id: Date.now().toString(),
      name: "",
      proficiency: "",
    }
    setCvData({
      ...cvData,
      languages: [...cvData.languages, newLanguage],
    })
  }

  const updateLanguage = (id: string, field: string, value: string) => {
    setCvData({
      ...cvData,
      languages: cvData.languages.map((lang) => (lang.id === id ? { ...lang, [field]: value } : lang)),
    })
  }

  const removeLanguage = (id: string) => {
    setCvData({
      ...cvData,
      languages: cvData.languages.filter((lang) => lang.id !== id),
    })
  }

  const addSkill = (category: string) => {
    setCvData({
      ...cvData,
      skills: {
        ...cvData.skills,
        [category]: [...(cvData.skills[category] || []), ""],
      },
    })
  }

  const updateSkill = (category: string, index: number, value: string) => {
    const newSkills = { ...cvData.skills }
    newSkills[category] = [...(newSkills[category] || [])]
    newSkills[category][index] = value
    setCvData({
      ...cvData,
      skills: newSkills,
    })
  }

  const removeSkill = (category: string, index: number) => {
    const newSkills = { ...cvData.skills }
    newSkills[category] = (newSkills[category] || []).filter((_, i) => i !== index)
    setCvData({
      ...cvData,
      skills: newSkills,
    })
  }

  const addReference = () => {
    const newReference: Reference = {
      id: Date.now().toString(),
      name: "",
      title: "",
      company: "",
      phone: "",
      email: "",
    }
    setCvData({
      ...cvData,
      references: [...cvData.references, newReference],
    })
  }

  const updateReference = (id: string, field: string, value: string) => {
    setCvData({
      ...cvData,
      references: cvData.references.map((ref) => (ref.id === id ? { ...ref, [field]: value } : ref)),
    })
  }

  const removeReference = (id: string) => {
    setCvData({
      ...cvData,
      references: cvData.references.filter((ref) => ref.id !== id),
    })
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* AI Job Analyzer Button */}
      <div className="flex justify-end">
        <Button
          onClick={() => setShowAIAnalyzer(!showAIAnalyzer)}
          className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white border-0 font-bold"
        >
          <MessageSquare className="h-4 w-4" />
          <span>{t.openAIAnalyzer}</span>
        </Button>
      </div>

      {/* AI Job Analyzer */}
      {showAIAnalyzer && (
        <Card className="glass-dark border-white/20 bg-transparent">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-white font-bold">
              <MessageSquare className="h-5 w-5" />
              <span>{t.aiAnalyzer}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="bg-transparent">
            <AIJobAnalyzer cvData={cvData} language={language} />
          </CardContent>
        </Card>
      )}

      {/* Personal Information */}
      <Card className="glass-dark border-white/20 bg-transparent">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-white font-bold">
            <User className="h-5 w-5" />
            <span>{t.personalInfo}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 bg-transparent">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-white font-bold">
                {t.fullName}
              </Label>
              <Input
                id="fullName"
                value={cvData.personalInfo.fullName}
                onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white font-bold">
                {t.email}
              </Label>
              <Input
                id="email"
                type="email"
                value={cvData.personalInfo.email}
                onChange={(e) => updatePersonalInfo("email", e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-white font-bold">
                {t.phone}
              </Label>
              <Input
                id="phone"
                value={cvData.personalInfo.phone}
                onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website" className="text-white font-bold">
                {t.website}
              </Label>
              <Input
                id="website"
                placeholder="https://yourwebsite.com"
                value={cvData.personalInfo.website || ""}
                onChange={(e) => updatePersonalInfo("website", e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="linkedin" className="text-white font-bold">
                {t.linkedin}
              </Label>
              <Input
                id="linkedin"
                placeholder="https://linkedin.com/in/yourprofile"
                value={cvData.personalInfo.linkedin || ""}
                onChange={(e) => updatePersonalInfo("linkedin", e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
            </div>
          </div>

          {/* Address Section */}
          <div className="space-y-6">
            <AddressForm
              title={t.presentAddress}
              address={cvData.personalInfo.presentAddress}
              onAddressChange={updatePresentAddress}
              language={language}
              icon={<MapPin className="h-4 w-4" />}
            />

            <div className="flex items-center space-x-2">
              <Switch
                id="same-address"
                checked={cvData.personalInfo.sameAsPresentAddress}
                onCheckedChange={handleSameAddressToggle}
              />
              <Label htmlFor="same-address" className="text-white font-bold">
                {t.sameAsPresentAddress}
              </Label>
            </div>

            {!cvData.personalInfo.sameAsPresentAddress && (
              <AddressForm
                title={t.permanentAddress}
                address={cvData.personalInfo.permanentAddress}
                onAddressChange={updatePermanentAddress}
                language={language}
                icon={<Home className="h-4 w-4" />}
              />
            )}
          </div>

          {/* Optional Fields */}
          <div className="space-y-4 border-t pt-6">
            <div className="flex items-center space-x-2">
              <Switch id="include-picture" checked={includePicture} onCheckedChange={setIncludePicture} />
              <Label htmlFor="include-picture" className="text-white font-bold">
                {t.profilePicture}
              </Label>
            </div>

            {includePicture && (
              <div className="space-y-2">
                <Button variant="outline" className="w-full">
                  <Upload className="h-4 w-4 mr-2" />
                  {t.uploadPicture}
                </Button>
              </div>
            )}

            <div className="flex items-center space-x-2">
              <Switch id="include-national-id" checked={includeNationalId} onCheckedChange={setIncludeNationalId} />
              <Label htmlFor="include-national-id" className="text-white font-bold">
                {t.nationalId}
              </Label>
            </div>

            {includeNationalId && (
              <div className="space-y-2">
                <Input
                  placeholder="Enter your National ID number"
                  value={cvData.personalInfo.nationalId || ""}
                  onChange={(e) => updatePersonalInfo("nationalId", e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                />
              </div>
            )}

            <div className="flex items-center space-x-2">
              <Switch
                id="include-birth-certificate"
                checked={includeBirthCertificate}
                onCheckedChange={setIncludeBirthCertificate}
              />
              <Label htmlFor="include-birth-certificate" className="text-white font-bold">
                {t.birthCertificate}
              </Label>
            </div>

            {includeBirthCertificate && (
              <div className="space-y-2">
                <Input
                  placeholder="Enter your Birth Certificate number"
                  value={cvData.personalInfo.birthCertificate || ""}
                  onChange={(e) => updatePersonalInfo("birthCertificate", e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Rest of the sections remain the same... */}
      {/* Professional Summary */}
      <Card className="glass-dark border-white/20 bg-transparent">
        <CardHeader>
          <CardTitle className="text-white font-bold">{t.summary}</CardTitle>
        </CardHeader>
        <CardContent className="bg-transparent">
          <Textarea
            placeholder={t.summaryPlaceholder}
            value={cvData.summary}
            onChange={(e) => setCvData({ ...cvData, summary: e.target.value })}
            rows={4}
            className="bg-white/10 border-white/20 text-white"
          />
        </CardContent>
      </Card>

      {/* Education */}
      <Card className="glass-dark border-white/20 bg-transparent">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-white font-bold">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-5 w-5" />
              <span>{t.education}</span>
            </div>
            <Button onClick={addEducation} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              {t.addEducation}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 bg-transparent">
          {cvData.education.map((edu) => (
            <div key={edu.id} className="glass border-white/20 rounded-lg p-4 space-y-4">
              <div className="flex justify-end">
                <Button variant="ghost" size="sm" onClick={() => removeEducation(edu.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label className="text-white font-bold">{t.degree}</Label>
                  <Input
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white font-bold">{t.institution}</Label>
                  <Input
                    value={edu.institution}
                    onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white font-bold">{t.year}</Label>
                  <Input
                    value={edu.year}
                    onChange={(e) => updateEducation(edu.id, "year", e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white font-bold">{t.grade}</Label>
                  <Input
                    value={edu.grade || ""}
                    onChange={(e) => updateEducation(edu.id, "grade", e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Experience */}
      <Card className="glass-dark border-white/20 bg-transparent">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-white font-bold">
            <div className="flex items-center space-x-2">
              <Briefcase className="h-5 w-5" />
              <span>{t.experience}</span>
            </div>
            <Button onClick={addExperience} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              {t.addExperience}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 bg-transparent">
          {cvData.experience.map((exp) => (
            <div key={exp.id} className="glass border-white/20 rounded-lg p-4 space-y-4">
              <div className="flex justify-end">
                <Button variant="ghost" size="sm" onClick={() => removeExperience(exp.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-white font-bold">{t.jobTitle}</Label>
                  <Input
                    value={exp.jobTitle}
                    onChange={(e) => updateExperience(exp.id, "jobTitle", e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white font-bold">{t.company}</Label>
                  <Input
                    value={exp.company}
                    onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white font-bold">Start Date</Label>
                  <Input
                    type="date"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white font-bold">End Date</Label>
                  <Input
                    type="date"
                    value={exp.endDate}
                    onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    disabled={exp.isCurrentJob || false}
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Switch
                    id={`is-current-job-${exp.id}`}
                    checked={exp.isCurrentJob || false}
                    onCheckedChange={(checked) => updateExperience(exp.id, "isCurrentJob", checked)}
                  />
                  <Label htmlFor={`is-current-job-${exp.id}`} className="text-white font-bold">
                    Current Job
                  </Label>
                </div>
                <div className="space-y-2">
                  <Label className="text-white font-bold">Duration</Label>
                  <Input
                    value={exp.duration}
                    readOnly
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-white font-bold">{t.description}</Label>
                <Textarea
                  value={exp.description}
                  onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
                  rows={3}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Publications */}
      <Card className="glass-dark border-white/20 bg-transparent">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-white font-bold">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5" />
              <span>{t.publications}</span>
            </div>
            <Button onClick={addPublication} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              {t.addPublication}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 bg-transparent">
          {cvData.publications.map((pub) => (
            <div key={pub.id} className="glass border-white/20 rounded-lg p-4 space-y-4">
              <div className="flex justify-end">
                <Button variant="ghost" size="sm" onClick={() => removePublication(pub.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-white font-bold">{t.publicationTitle}</Label>
                  <Input
                    value={pub.title}
                    onChange={(e) => updatePublication(pub.id, "title", e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white font-bold">{t.journal}</Label>
                  <Input
                    value={pub.journal}
                    onChange={(e) => updatePublication(pub.id, "journal", e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white font-bold">{t.year}</Label>
                  <Input
                    value={pub.year}
                    onChange={(e) => updatePublication(pub.id, "year", e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white font-bold">{t.authors}</Label>
                  <Input
                    value={pub.authors || ""}
                    onChange={(e) => updatePublication(pub.id, "authors", e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white font-bold">{t.doi}</Label>
                  <Input
                    value={pub.doi || ""}
                    onChange={(e) => updatePublication(pub.id, "doi", e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-white font-bold">{t.description}</Label>
                <Textarea
                  value={pub.description || ""}
                  onChange={(e) => updatePublication(pub.id, "description", e.target.value)}
                  rows={2}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Awards */}
      <Card className="glass-dark border-white/20 bg-transparent">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-white font-bold">
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5" />
              <span>{t.awards}</span>
            </div>
            <Button onClick={addAward} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              {t.addAward}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 bg-transparent">
          {cvData.awards.map((award) => (
            <div key={award.id} className="glass border-white/20 rounded-lg p-4 space-y-4">
              <div className="flex justify-end">
                <Button variant="ghost" size="sm" onClick={() => removeAward(award.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-white font-bold">{t.awardTitle}</Label>
                  <Input
                    value={award.title}
                    onChange={(e) => updateAward(award.id, "title", e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white font-bold">{t.organization}</Label>
                  <Input
                    value={award.organization}
                    onChange={(e) => updateAward(award.id, "organization", e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white font-bold">{t.year}</Label>
                  <Input
                    value={award.year}
                    onChange={(e) => updateAward(award.id, "year", e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-white font-bold">{t.description}</Label>
                <Textarea
                  value={award.description || ""}
                  onChange={(e) => updateAward(award.id, "description", e.target.value)}
                  rows={2}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Languages */}
      <Card className="glass-dark border-white/20 bg-transparent">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-white font-bold">
            <div className="flex items-center space-x-2">
              <Languages className="h-5 w-5" />
              <span>{t.languages}</span>
            </div>
            <Button onClick={addLanguage} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              {t.addLanguage}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 bg-transparent">
          {cvData.languages.map((lang) => (
            <div key={lang.id} className="glass border-white/20 rounded-lg p-4 space-y-4">
              <div className="flex justify-end">
                <Button variant="ghost" size="sm" onClick={() => removeLanguage(lang.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white font-bold">{t.languageName}</Label>
                  <Input
                    value={lang.name}
                    onChange={(e) => updateLanguage(lang.id, "name", e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white font-bold">{t.proficiency}</Label>
                  <Select
                    value={lang.proficiency}
                    onValueChange={(value) => updateLanguage(lang.id, "proficiency", value)}
                    className="bg-white/10 border-white/20 text-white"
                  >
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select proficiency level" />
                    </SelectTrigger>
                    <SelectContent className="bg-white/10 border-white/20 text-white">
                      <SelectItem value="native">{t.proficiencyLevels.native}</SelectItem>
                      <SelectItem value="fluent">{t.proficiencyLevels.fluent}</SelectItem>
                      <SelectItem value="advanced">{t.proficiencyLevels.advanced}</SelectItem>
                      <SelectItem value="intermediate">{t.proficiencyLevels.intermediate}</SelectItem>
                      <SelectItem value="beginner">{t.proficiencyLevels.beginner}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Skills */}
      <Card className="glass-dark border-white/20 bg-transparent">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-white font-bold">
            <div className="flex items-center space-x-2">
              <Globe className="h-5 w-5" />
              <span>{t.skills}</span>
            </div>
            <div className="flex space-x-2">
              <Button onClick={() => addSkill("technical")} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                {t.technicalSkills}
              </Button>
              <Button onClick={() => addSkill("software")} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                {t.softwareSkills}
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 bg-transparent">
          {Object.entries(cvData.skills).map(([category, skills]) => (
            <div key={category} className="space-y-2">
              <h3 className="text-white font-bold capitalize">{t[category as keyof typeof t] || category}</h3>
              {skills &&
                skills.map((skill, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      value={skill}
                      onChange={(e) => updateSkill(category, index, e.target.value)}
                      placeholder={t.skillName}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                    />
                    <Button variant="ghost" size="sm" onClick={() => removeSkill(category, index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* References */}
      <Card className="glass-dark border-white/20 bg-transparent">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-white font-bold">
            {t.references}
            <Button onClick={addReference} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              {t.addReference}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 bg-transparent">
          {cvData.references.map((ref) => (
            <div key={ref.id} className="glass border-white/20 rounded-lg p-4 space-y-4">
              <div className="flex justify-end">
                <Button variant="ghost" size="sm" onClick={() => removeReference(ref.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white font-bold">{t.referenceName}</Label>
                  <Input
                    value={ref.name}
                    onChange={(e) => updateReference(ref.id, "name", e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white font-bold">{t.referenceTitle}</Label>
                  <Input
                    value={ref.title}
                    onChange={(e) => updateReference(ref.id, "title", e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white font-bold">{t.referenceCompany}</Label>
                  <Input
                    value={ref.company}
                    onChange={(e) => updateReference(ref.id, "company", e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white font-bold">{t.referencePhone}</Label>
                  <Input
                    value={ref.phone}
                    onChange={(e) => updateReference(ref.id, "phone", e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label className="text-white font-bold">{t.referenceEmail}</Label>
                  <Input
                    value={ref.email}
                    onChange={(e) => updateReference(ref.id, "email", e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
