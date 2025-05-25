"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, FileText, Globe, Linkedin } from "lucide-react"
import type { CVData } from "@/types/cv"

interface CVPreviewProps {
  cvData: CVData
  theme: string
  language: "en" | "bn"
}

export function CVPreview({ cvData, theme, language }: CVPreviewProps) {
  console.log("CVPreview rendered with:", { cvData, theme, language })

  const translations = {
    en: {
      downloadPDF: "Download PDF",
      downloadWord: "Download Word",
      summary: "Professional Summary",
      education: "Education",
      experience: "Work Experience",
      publications: "Publications",
      awards: "Awards & Achievements",
      languages: "Languages",
      skills: "Skills",
      references: "References",
      phone: "Phone",
      email: "Email",
      presentAddress: "Present Address",
      permanentAddress: "Permanent Address",
      website: "Website",
      linkedin: "LinkedIn",
      grade: "Grade",
      authors: "Authors",
      doi: "DOI",
      technicalSkills: "Technical Skills",
      softwareSkills: "Software Skills",
    },
    bn: {
      downloadPDF: "পিডিএফ ডাউনলোড",
      downloadWord: "ওয়ার্ড ডাউনলোড",
      summary: "পেশাগত সারসংক্ষেপ",
      education: "শিক্ষাগত যোগ্যতা",
      experience: "কর্মঅভিজ্ঞতা",
      publications: "প্রকাশনা",
      awards: "পুরস্কার ও অর্জন",
      languages: "ভাষা",
      skills: "দক্ষতা",
      references: "রেফারেন্স",
      phone: "ফোন",
      email: "ইমেইল",
      presentAddress: "বর্তমান ঠিকানা",
      permanentAddress: "স্থায়ী ঠিকানা",
      website: "ওয়েবসাইট",
      linkedin: "লিংকডইন",
      grade: "গ্রেড",
      authors: "লেখকগণ",
      doi: "ডিওআই",
      technicalSkills: "প্রযুক্তিগত দক্ষতা",
      softwareSkills: "সফটওয়্যার দক্ষতা",
    },
  }

  if (!cvData || !cvData.personalInfo) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <p className="text-muted-foreground">No CV data available. Please fill out the form first.</p>
      </div>
    )
  }

  const t = translations[language]

  const handleDownload = (format: "pdf" | "word") => {
    // This would integrate with a PDF/Word generation library
    console.log(`Downloading CV as ${format}`)
    alert(`CV download as ${format} would start here`)
  }

  const getThemeClasses = () => {
    switch (theme) {
      case "modern":
        return "bg-white text-black border border-gray-200"
      case "classic":
        return "bg-white text-black border border-gray-200"
      case "creative":
        return "bg-white text-black border border-gray-200"
      case "minimal":
        return "bg-white text-black border border-gray-200"
      default:
        return "bg-white text-black border border-gray-200"
    }
  }

  const formatAddress = (address: typeof cvData.personalInfo.presentAddress) => {
    const parts = []
    if (address.street) parts.push(address.street)
    if (address.area) parts.push(address.area)
    if (address.district) parts.push(address.district)
    if (address.division) parts.push(address.division)
    if (address.postCode) parts.push(address.postCode)
    if (address.country) parts.push(address.country)
    return parts.join(", ")
  }

  const calculateDuration = (startDate: string, endDate: string | null): string => {
    const start = new Date(startDate)
    const end = endDate ? new Date(endDate) : new Date()

    let years = end.getFullYear() - start.getFullYear()
    let months = end.getMonth() - start.getMonth()

    if (months < 0) {
      years--
      months += 12
    }

    const yearString = years > 0 ? `${years} year${years > 1 ? "s" : ""}` : ""
    const monthString = months > 0 ? `${months} month${months > 1 ? "s" : ""}` : ""

    if (yearString && monthString) {
      return `${yearString}, ${monthString}`
    } else if (yearString) {
      return yearString
    } else {
      return monthString
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Download Options */}
      <div className="flex justify-center space-x-4">
        <Button onClick={() => handleDownload("pdf")} className="flex items-center space-x-2">
          <Download className="h-4 w-4" />
          <span>{t.downloadPDF}</span>
        </Button>
        <Button onClick={() => handleDownload("word")} variant="outline" className="flex items-center space-x-2">
          <FileText className="h-4 w-4" />
          <span>{t.downloadWord}</span>
        </Button>
      </div>

      {/* CV Preview */}
      <Card className="shadow-lg">
        <CardContent className={`p-8 ${getThemeClasses()}`}>
          {/* Header */}
          <div className="text-center mb-8 border-b border-border pb-6">
            <h1 className="text-3xl font-bold mb-2 text-black">{cvData.personalInfo.fullName}</h1>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
              {cvData.personalInfo.email && (
                <span>
                  {t.email}: {cvData.personalInfo.email}
                </span>
              )}
              {cvData.personalInfo.phone && (
                <span>
                  {t.phone}: {cvData.personalInfo.phone}
                </span>
              )}
            </div>

            {/* Address Information */}
            {(cvData.personalInfo.presentAddress.street || cvData.personalInfo.permanentAddress.street) && (
              <div className="mt-3 space-y-1 text-sm text-gray-600">
                {cvData.personalInfo.presentAddress.street && (
                  <div>
                    <span className="font-medium">{t.presentAddress}:</span>{" "}
                    {formatAddress(cvData.personalInfo.presentAddress)}
                  </div>
                )}
                {!cvData.personalInfo.sameAsPresentAddress && cvData.personalInfo.permanentAddress.street && (
                  <div>
                    <span className="font-medium">{t.permanentAddress}:</span>{" "}
                    {formatAddress(cvData.personalInfo.permanentAddress)}
                  </div>
                )}
              </div>
            )}

            {/* Social Links */}
            {(cvData.personalInfo.website || cvData.personalInfo.linkedin) && (
              <div className="flex flex-wrap justify-center gap-4 text-sm text-primary mt-2">
                {cvData.personalInfo.website && (
                  <a href={cvData.personalInfo.website} className="flex items-center space-x-1 hover:underline">
                    <Globe className="h-3 w-3" />
                    <span>{t.website}</span>
                  </a>
                )}
                {cvData.personalInfo.linkedin && (
                  <a href={cvData.personalInfo.linkedin} className="flex items-center space-x-1 hover:underline">
                    <Linkedin className="h-3 w-3" />
                    <span>{t.linkedin}</span>
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Professional Summary */}
          {cvData.summary && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-purple-600">{t.summary}</h2>
              <p className="text-black leading-relaxed">{cvData.summary}</p>
            </div>
          )}

          {/* Education */}
          {cvData.education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-purple-600">{t.education}</h2>
              <div className="space-y-3">
                {cvData.education.map((edu) => (
                  <div key={edu.id} className="border-l-2 border-primary/30 pl-4">
                    <h3 className="font-medium">{edu.degree}</h3>
                    <p className="text-gray-600">{edu.institution}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{edu.year}</span>
                      {edu.grade && (
                        <span>
                          {t.grade}: {edu.grade}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Experience */}
          {cvData.experience.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-purple-600">{t.experience}</h2>
              <div className="space-y-4">
                {cvData.experience.map((exp) => (
                  <div key={exp.id} className="border-l-2 border-primary/30 pl-4">
                    <h3 className="font-medium">{exp.jobTitle}</h3>
                    <p className="text-gray-600">{exp.company}</p>
                    <p className="text-sm text-gray-600 mb-2">{calculateDuration(exp.startDate, exp.endDate)}</p>
                    {exp.description && <p className="text-black text-sm leading-relaxed">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Publications */}
          {cvData.publications.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-purple-600">{t.publications}</h2>
              <div className="space-y-4">
                {cvData.publications.map((pub) => (
                  <div key={pub.id} className="border-l-2 border-primary/30 pl-4">
                    <h3 className="font-medium">{pub.title}</h3>
                    <p className="text-gray-600">
                      {pub.journal} ({pub.year})
                    </p>
                    {pub.authors && (
                      <p className="text-sm text-gray-600">
                        {t.authors}: {pub.authors}
                      </p>
                    )}
                    {pub.doi && (
                      <p className="text-sm text-gray-600">
                        {t.doi}: {pub.doi}
                      </p>
                    )}
                    {pub.description && <p className="text-black text-sm leading-relaxed mt-1">{pub.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Awards */}
          {cvData.awards.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-purple-600">{t.awards}</h2>
              <div className="space-y-3">
                {cvData.awards.map((award) => (
                  <div key={award.id} className="border-l-2 border-primary/30 pl-4">
                    <h3 className="font-medium">{award.title}</h3>
                    <p className="text-gray-600">
                      {award.organization} ({award.year})
                    </p>
                    {award.description && (
                      <p className="text-black text-sm leading-relaxed mt-1">{award.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {cvData.languages.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-purple-600">{t.languages}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {cvData.languages.map((lang) => (
                  <div key={lang.id} className="flex justify-between items-center p-2 bg-muted/30 rounded">
                    <span className="font-medium">{lang.name}</span>
                    <span className="text-sm text-gray-600 capitalize">{lang.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {(cvData.skills.technical.length > 0 || cvData.skills.software.length > 0) && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-purple-600">{t.skills}</h2>
              <div className="space-y-4">
                {cvData.skills.technical.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-600 mb-2">{t.technicalSkills}</h3>
                    <div className="flex flex-wrap gap-2">
                      {cvData.skills.technical.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm border border-primary/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {cvData.skills.software.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-600 mb-2">{t.softwareSkills}</h3>
                    <div className="flex flex-wrap gap-2">
                      {cvData.skills.software.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 rounded-full text-sm border border-blue-200 dark:border-blue-800"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* References */}
          {cvData.references.length > 0 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-purple-600">{t.references}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cvData.references.map((ref) => (
                  <div key={ref.id} className="border border-border rounded-lg p-3 bg-muted/30">
                    <h3 className="font-medium">{ref.name}</h3>
                    <p className="text-sm text-gray-600">{ref.title}</p>
                    <p className="text-sm text-gray-600">{ref.company}</p>
                    {ref.phone && <p className="text-sm text-gray-600">{ref.phone}</p>}
                    {ref.email && <p className="text-sm text-gray-600">{ref.email}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
