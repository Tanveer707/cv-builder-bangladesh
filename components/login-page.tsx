"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { LogIn, Mail, Lock, Eye, EyeOff } from "lucide-react"

interface LoginPageProps {
  language: "en" | "bn"
}

export function LoginPage({ language }: LoginPageProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const translations = {
    en: {
      title: "Welcome Back",
      subtitle: "Sign in to your account to continue",
      email: "Email Address",
      password: "Password",
      login: "Log In",
      loginWithGmail: "Continue with Gmail",
      forgotPassword: "Forgot Password?",
      signUp: "Sign Up",
      noAccount: "Don't have an account?",
      emailPlaceholder: "Enter your email address",
      passwordPlaceholder: "Enter your password",
      loggingIn: "Logging in...",
    },
    bn: {
      title: "স্বাগতম",
      subtitle: "চালিয়ে যেতে আপনার অ্যাকাউন্টে সাইন ইন করুন",
      email: "ইমেইল ঠিকানা",
      password: "পাসওয়ার্ড",
      login: "লগ ইন",
      loginWithGmail: "Gmail দিয়ে চালিয়ে যান",
      forgotPassword: "পাসওয়ার্ড ভুলে গেছেন?",
      signUp: "সাইন আপ",
      noAccount: "কোনো অ্যাকাউন্ট নেই?",
      emailPlaceholder: "আপনার ইমেইল ঠিকানা লিখুন",
      passwordPlaceholder: "আপনার পাসওয়ার্ড লিখুন",
      loggingIn: "লগ ইন করা হচ্ছে...",
    },
  }

  const t = translations[language]

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false)
      // Handle login logic here
      console.log("Login attempt:", { email, password })
    }, 2000)
  }

  const handleGmailLogin = () => {
    // Handle Gmail login
    console.log("Gmail login")
  }

  const handleForgotPassword = () => {
    // Handle forgot password
    console.log("Forgot password")
  }

  const handleSignUp = () => {
    // Handle sign up navigation
    console.log("Navigate to sign up")
  }

  return (
    <div className="max-w-md mx-auto space-y-8">
      <div className="text-center animate-fade-in-up">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="p-3 rounded-full bg-primary/10">
            <LogIn className="h-8 w-8 text-primary" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">{t.title}</h1>
        <p className="text-white/70">{t.subtitle}</p>
      </div>

      <Card className="glass-dark border-white/20 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
        <CardHeader>
          <CardTitle className="text-center text-white">{t.login}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white font-medium">
                {t.email}
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
                <Input
                  id="email"
                  type="email"
                  placeholder={t.emailPlaceholder}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white font-medium">
                {t.password}
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/60" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={t.passwordPlaceholder}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              disabled={isLoading || !email || !password}
              className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white font-medium py-2.5"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {t.loggingIn}
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4 mr-2" />
                  {t.login}
                </>
              )}
            </Button>
          </form>

          {/* Separator */}
          <div className="relative">
            <Separator className="bg-white/20" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-palette-dark px-2 text-white/60 text-sm">or</span>
            </div>
          </div>

          {/* Gmail Login */}
          <Button
            onClick={handleGmailLogin}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-medium transition-all duration-300 transform hover:scale-105"
          >
            <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            {t.loginWithGmail}
          </Button>

          {/* Forgot Password */}
          <div className="text-center">
            <button
              onClick={handleForgotPassword}
              className="text-primary hover:text-primary/80 text-sm font-medium transition-colors"
            >
              {t.forgotPassword}
            </button>
          </div>

          {/* Sign Up */}
          <div className="text-center">
            <p className="text-white/70 text-sm mb-2">{t.noAccount}</p>
            <Button
              onClick={handleSignUp}
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
            >
              {t.signUp}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
