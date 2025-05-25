export interface Address {
  street: string
  area: string
  district: string
  division: string
  postCode: string
  country: string
}

export interface PersonalInfo {
  fullName: string
  email: string
  phone: string
  presentAddress: Address
  permanentAddress: Address
  sameAsPresentAddress: boolean
  website?: string
  linkedin?: string
  nationalId?: string
  birthCertificate?: string
  profilePicture: string | null
}

export interface Education {
  id: string
  degree: string
  institution: string
  year: string
  grade?: string
}

export interface Experience {
  id: string
  jobTitle: string
  company: string
  startDate: string
  endDate: string
  isCurrentJob: boolean
  duration: string
  description: string
}

export interface Publication {
  id: string
  title: string
  journal: string
  year: string
  authors?: string
  doi?: string
  description?: string
}

export interface Award {
  id: string
  title: string
  organization: string
  year: string
  description?: string
}

export interface Language {
  id: string
  name: string
  proficiency: string
}

export interface Reference {
  id: string
  name: string
  title: string
  company: string
  phone: string
  email: string
}

export interface SkillCategories {
  technical: string[]
  software: string[]
}

export interface CVData {
  personalInfo: PersonalInfo
  summary: string
  education: Education[]
  experience: Experience[]
  publications: Publication[]
  awards: Award[]
  languages: Language[]
  skills: SkillCategories
  references: Reference[]
}

export interface ChatMessage {
  id: string
  type: "user" | "ai"
  content: string
  timestamp: Date
}

export interface JobAnalysis {
  requiredSkills: string[]
  preferredQualifications: string[]
  experienceLevel: string
  suggestions: string[]
}
