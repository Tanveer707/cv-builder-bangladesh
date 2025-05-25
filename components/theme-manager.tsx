"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2, Save, Upload, Download, Palette } from "lucide-react"

interface Theme {
  id: string
  name: string
  description: string
  preview: string
  popular: boolean
  styles: {
    backgroundColor: string
    textColor: string
    primaryColor: string
    secondaryColor: string
    borderColor: string
    headerStyle: string
    fontFamily: string
    fontSize: string
    spacing: string
  }
}

interface ThemeManagerProps {
  language: "en" | "bn"
  onThemeAdd: (theme: Theme) => void
  existingThemes: Theme[]
}

export function ThemeManager({ language, onThemeAdd, existingThemes }: ThemeManagerProps) {
  const [newTheme, setNewTheme] = useState<Theme>({
    id: "",
    name: "",
    description: "",
    preview: "bg-gradient-to-br from-blue-400/30 to-indigo-500/30",
    popular: false,
    styles: {
      backgroundColor: "#ffffff",
      textColor: "#000000",
      primaryColor: "#3b82f6",
      secondaryColor: "#6b7280",
      borderColor: "#e5e7eb",
      headerStyle: "modern",
      fontFamily: "Inter",
      fontSize: "14px",
      spacing: "normal",
    },
  })

  const translations = {
    en: {
      title: "Theme Manager",
      subtitle: "Create and manage custom CV themes",
      addNewTheme: "Add New Theme",
      themeName: "Theme Name",
      themeDescription: "Theme Description",
      backgroundColor: "Background Color",
      textColor: "Text Color",
      primaryColor: "Primary Color",
      secondaryColor: "Secondary Color",
      borderColor: "Border Color",
      headerStyle: "Header Style",
      fontFamily: "Font Family",
      fontSize: "Font Size",
      spacing: "Spacing",
      popular: "Mark as Popular",
      saveTheme: "Save Theme",
      exportThemes: "Export Themes",
      importThemes: "Import Themes",
      preview: "Preview",
      existingThemes: "Existing Themes",
      deleteTheme: "Delete Theme",
      editTheme: "Edit Theme",
    },
    bn: {
      title: "থিম ম্যানেজার",
      subtitle: "কাস্টম সিভি থিম তৈরি এবং পরিচালনা করুন",
      addNewTheme: "নতুন থিম যোগ করুন",
      themeName: "থিমের নাম",
      themeDescription: "থিমের বিবরণ",
      backgroundColor: "ব্যাকগ্রাউন্ড রঙ",
      textColor: "টেক্সট রঙ",
      primaryColor: "প্রাথমিক রঙ",
      secondaryColor: "দ্বিতীয় রঙ",
      borderColor: "বর্ডার রঙ",
      headerStyle: "হেডার স্টাইল",
      fontFamily: "ফন্ট পরিবার",
      fontSize: "ফন্ট সাইজ",
      spacing: "স্পেসিং",
      popular: "জনপ্রিয় হিসেবে চিহ্নিত করুন",
      saveTheme: "থিম সেভ করুন",
      exportThemes: "থিম এক্সপোর্ট করুন",
      importThemes: "থিম ইমপোর্ট করুন",
      preview: "প্রিভিউ",
      existingThemes: "বিদ্যমান থিম",
      deleteTheme: "থিম মুছুন",
      editTheme: "থিম সম্পাদনা করুন",
    },
  }

  const t = translations[language]

  const handleSaveTheme = () => {
    if (newTheme.name && newTheme.description) {
      const themeWithId = {
        ...newTheme,
        id: newTheme.name.toLowerCase().replace(/\s+/g, "-"),
      }
      onThemeAdd(themeWithId)
      // Reset form
      setNewTheme({
        id: "",
        name: "",
        description: "",
        preview: "bg-gradient-to-br from-blue-400/30 to-indigo-500/30",
        popular: false,
        styles: {
          backgroundColor: "#ffffff",
          textColor: "#000000",
          primaryColor: "#3b82f6",
          secondaryColor: "#6b7280",
          borderColor: "#e5e7eb",
          headerStyle: "modern",
          fontFamily: "Inter",
          fontSize: "14px",
          spacing: "normal",
        },
      })
    }
  }

  const handleExportThemes = () => {
    const dataStr = JSON.stringify(existingThemes, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)
    const exportFileDefaultName = "cv-themes.json"

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  const handleImportThemes = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const themes = JSON.parse(e.target?.result as string)
          themes.forEach((theme: Theme) => onThemeAdd(theme))
        } catch (error) {
          console.error("Error importing themes:", error)
        }
      }
      reader.readAsText(file)
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">{t.title}</h2>
        <p className="text-white/80">{t.subtitle}</p>
      </div>

      {/* Theme Creation Form */}
      <Card className="glass-dark border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-white">
            <Palette className="h-5 w-5" />
            <span>{t.addNewTheme}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-white">{t.themeName}</Label>
              <Input
                value={newTheme.name}
                onChange={(e) => setNewTheme({ ...newTheme, name: e.target.value })}
                className="bg-white/10 border-white/20 text-white"
                placeholder="e.g., Professional Blue"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white">{t.themeDescription}</Label>
              <Input
                value={newTheme.description}
                onChange={(e) => setNewTheme({ ...newTheme, description: e.target.value })}
                className="bg-white/10 border-white/20 text-white"
                placeholder="e.g., Clean design for corporate roles"
              />
            </div>
          </div>

          {/* Color Settings */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="space-y-2">
              <Label className="text-white">{t.backgroundColor}</Label>
              <Input
                type="color"
                value={newTheme.styles.backgroundColor}
                onChange={(e) =>
                  setNewTheme({
                    ...newTheme,
                    styles: { ...newTheme.styles, backgroundColor: e.target.value },
                  })
                }
                className="h-10 w-full"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white">{t.textColor}</Label>
              <Input
                type="color"
                value={newTheme.styles.textColor}
                onChange={(e) =>
                  setNewTheme({
                    ...newTheme,
                    styles: { ...newTheme.styles, textColor: e.target.value },
                  })
                }
                className="h-10 w-full"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white">{t.primaryColor}</Label>
              <Input
                type="color"
                value={newTheme.styles.primaryColor}
                onChange={(e) =>
                  setNewTheme({
                    ...newTheme,
                    styles: { ...newTheme.styles, primaryColor: e.target.value },
                  })
                }
                className="h-10 w-full"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white">{t.secondaryColor}</Label>
              <Input
                type="color"
                value={newTheme.styles.secondaryColor}
                onChange={(e) =>
                  setNewTheme({
                    ...newTheme,
                    styles: { ...newTheme.styles, secondaryColor: e.target.value },
                  })
                }
                className="h-10 w-full"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white">{t.borderColor}</Label>
              <Input
                type="color"
                value={newTheme.styles.borderColor}
                onChange={(e) =>
                  setNewTheme({
                    ...newTheme,
                    styles: { ...newTheme.styles, borderColor: e.target.value },
                  })
                }
                className="h-10 w-full"
              />
            </div>
          </div>

          {/* Typography and Layout */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label className="text-white">{t.fontFamily}</Label>
              <Select
                value={newTheme.styles.fontFamily}
                onValueChange={(value) =>
                  setNewTheme({
                    ...newTheme,
                    styles: { ...newTheme.styles, fontFamily: value },
                  })
                }
              >
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Inter">Inter</SelectItem>
                  <SelectItem value="Arial">Arial</SelectItem>
                  <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                  <SelectItem value="Helvetica">Helvetica</SelectItem>
                  <SelectItem value="Georgia">Georgia</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-white">{t.fontSize}</Label>
              <Select
                value={newTheme.styles.fontSize}
                onValueChange={(value) =>
                  setNewTheme({
                    ...newTheme,
                    styles: { ...newTheme.styles, fontSize: value },
                  })
                }
              >
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="12px">12px</SelectItem>
                  <SelectItem value="14px">14px</SelectItem>
                  <SelectItem value="16px">16px</SelectItem>
                  <SelectItem value="18px">18px</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-white">{t.spacing}</Label>
              <Select
                value={newTheme.styles.spacing}
                onValueChange={(value) =>
                  setNewTheme({
                    ...newTheme,
                    styles: { ...newTheme.styles, spacing: value },
                  })
                }
              >
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="compact">Compact</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="relaxed">Relaxed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-white">{t.headerStyle}</Label>
              <Select
                value={newTheme.styles.headerStyle}
                onValueChange={(value) =>
                  setNewTheme({
                    ...newTheme,
                    styles: { ...newTheme.styles, headerStyle: value },
                  })
                }
              >
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="modern">Modern</SelectItem>
                  <SelectItem value="classic">Classic</SelectItem>
                  <SelectItem value="minimal">Minimal</SelectItem>
                  <SelectItem value="bold">Bold</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Preview */}
          <div className="space-y-2">
            <Label className="text-white">{t.preview}</Label>
            <div
              className="h-32 rounded-lg border-2 border-white/20 flex items-center justify-center"
              style={{
                backgroundColor: newTheme.styles.backgroundColor,
                color: newTheme.styles.textColor,
                borderColor: newTheme.styles.borderColor,
                fontFamily: newTheme.styles.fontFamily,
                fontSize: newTheme.styles.fontSize,
              }}
            >
              <div className="text-center space-y-2 p-4">
                <div className="text-lg font-bold" style={{ color: newTheme.styles.primaryColor }}>
                  John Doe
                </div>
                <div style={{ color: newTheme.styles.secondaryColor }}>Software Engineer</div>
                <div className="text-sm">john.doe@email.com | +1234567890</div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="popular"
                checked={newTheme.popular}
                onChange={(e) => setNewTheme({ ...newTheme, popular: e.target.checked })}
                className="rounded"
              />
              <Label htmlFor="popular" className="text-white">
                {t.popular}
              </Label>
            </div>
            <Button onClick={handleSaveTheme} className="bg-gradient-to-r from-primary to-purple-600">
              <Save className="h-4 w-4 mr-2" />
              {t.saveTheme}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Import/Export */}
      <div className="flex justify-center space-x-4">
        <Button onClick={handleExportThemes} variant="outline" className="border-white/20 text-white">
          <Download className="h-4 w-4 mr-2" />
          {t.exportThemes}
        </Button>
        <div>
          <input type="file" accept=".json" onChange={handleImportThemes} className="hidden" id="import-themes" />
          <Button asChild variant="outline" className="border-white/20 text-white">
            <label htmlFor="import-themes" className="cursor-pointer">
              <Upload className="h-4 w-4 mr-2" />
              {t.importThemes}
            </label>
          </Button>
        </div>
      </div>

      {/* Existing Themes */}
      {existingThemes.length > 0 && (
        <Card className="glass-dark border-white/20">
          <CardHeader>
            <CardTitle className="text-white">{t.existingThemes}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {existingThemes.map((theme) => (
                <div key={theme.id} className="glass border-white/20 rounded-lg p-4">
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-white font-medium">{theme.name}</h3>
                      <p className="text-white/70 text-sm">{theme.description}</p>
                    </div>
                    <div
                      className="h-20 rounded border"
                      style={{
                        backgroundColor: theme.styles.backgroundColor,
                        borderColor: theme.styles.borderColor,
                      }}
                    >
                      <div className="p-2 text-center">
                        <div className="text-sm font-medium" style={{ color: theme.styles.primaryColor }}>
                          {theme.name}
                        </div>
                        <div className="text-xs" style={{ color: theme.styles.textColor }}>
                          Sample Text
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
                        {t.editTheme}
                      </Button>
                      <Button size="sm" variant="ghost" className="text-red-400 hover:bg-red-500/10">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
