"use client"

import { Facebook, Twitter, Linkedin, Instagram, Mail, Heart, Star } from "lucide-react"

interface FooterProps {
  language: "en" | "bn"
}

export function Footer({ language }: FooterProps) {
  const translations = {
    en: {
      aboutUs: "About us",
      company: "Company",
      careers: "Careers",
      reviews: "Reviews",
      contactUs: "Contact us",
      support: "support@cvbuilder.com",
      help: "Help",
      languages: "Languages",
      languageList: [
        { code: "en", name: "English (BD)", flag: "🇧🇩" },
        { code: "bn", name: "Bengali (BD)", flag: "🇧🇩" },
      ],
      reviewsCount: "4,892 Reviews",
      madeWithLove: "Made with love by people who care.",
      copyright: "© 2025. All rights reserved.",
      trustpilot: "Trustpilot",
    },
    bn: {
      aboutUs: "আমাদের সম্পর্কে",
      company: "কোম্পানি",
      careers: "ক্যারিয়ার",
      reviews: "রিভিউ",
      contactUs: "যোগাযোগ করুন",
      support: "support@cvbuilder.com",
      help: "সাহায্য",
      languages: "ভাষা",
      languageList: [
        { code: "bn", name: "বাংলা (বিডি)", flag: "🇧🇩" },
        { code: "en", name: "ইংরেজি (বিডি)", flag: "🇧🇩" },
      ],
      reviewsCount: "৪,৮৯২ রিভিউ",
      madeWithLove: "যত্নশীল মানুষদের ভালোবাসা দিয়ে তৈরি।",
      copyright: "© ২০২৫। সকল অধিকার সংরক্ষিত।",
      trustpilot: "ট্রাস্টপাইলট",
    },
  }

  const t = translations[language]

  return (
    <footer className="relative mt-20 border-t border-white/10">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-palette-dark/50 to-transparent"></div>

      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About Us Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">{t.aboutUs}</h3>
            <div className="space-y-3">
              <a
                href="/company"
                className="block text-white/70 hover:text-palette-coral transition-colors duration-300"
              >
                {t.company}
              </a>
              <a
                href="/careers"
                className="block text-white/70 hover:text-palette-coral transition-colors duration-300"
              >
                {t.careers}
              </a>
              <a
                href="/reviews"
                className="block text-white/70 hover:text-palette-coral transition-colors duration-300"
              >
                {t.reviews}
              </a>
            </div>
          </div>

          {/* Contact Us Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">{t.contactUs}</h3>
            <div className="space-y-3">
              <a
                href={`mailto:${t.support}`}
                className="flex items-center space-x-2 text-white/70 hover:text-palette-coral transition-colors duration-300"
              >
                <Mail className="h-4 w-4" />
                <span>{t.support}</span>
              </a>
              <a href="/help" className="block text-white/70 hover:text-palette-coral transition-colors duration-300">
                {t.help}
              </a>
            </div>
          </div>

          {/* Languages Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">{t.languages}</h3>
            <div className="space-y-2">
              {t.languageList.map((lang, index) => (
                <button
                  key={index}
                  className="flex items-center space-x-2 text-white/70 hover:text-palette-coral transition-colors duration-300 text-sm"
                >
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Reviews Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              {/* Star Rating */}
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-green-400 text-green-400" />
                ))}
              </div>
              <span className="text-white font-semibold">{t.reviewsCount}</span>
            </div>
            <div className="text-white/70 text-sm">{t.trustpilot}</div>

            {/* Recent Review Preview */}
            <div className="glass-card p-4 rounded-lg border border-white/20">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white text-xs font-semibold">
                  A
                </div>
                <div>
                  <div className="text-white text-sm font-medium">Ahmed Hassan</div>
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-green-400 text-green-400" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-white/80 text-xs italic">
                "Excellent CV builder! Got my dream job within 2 weeks of using this platform."
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Social Media Icons */}
            <div className="flex items-center space-x-4">
              <a
                href="https://facebook.com"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-blue-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Facebook className="h-5 w-5 text-white" />
              </a>
              <a
                href="https://twitter.com"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-sky-500 flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Twitter className="h-5 w-5 text-white" />
              </a>
              <a
                href="https://linkedin.com"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-blue-700 flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Linkedin className="h-5 w-5 text-white" />
              </a>
              <a
                href="https://instagram.com"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-pink-600 flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <Instagram className="h-5 w-5 text-white" />
              </a>
            </div>

            {/* Made with Love */}
            <div className="flex items-center space-x-2 text-white/70 text-sm">
              <span>{t.madeWithLove}</span>
              <Heart className="h-4 w-4 text-red-400 animate-pulse" />
              <span>{t.copyright}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
