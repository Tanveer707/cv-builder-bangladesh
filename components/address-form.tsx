"use client"

import type React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Address } from "@/types/cv"

interface AddressFormProps {
  title: string
  address: Address
  onAddressChange: (address: Address) => void
  language: "en" | "bn"
  icon?: React.ReactNode
}

export function AddressForm({ title, address, onAddressChange, language, icon }: AddressFormProps) {
  const translations = {
    en: {
      street: "Street/House No.",
      area: "Area/Village",
      district: "District",
      division: "Division",
      postCode: "Post Code",
      country: "Country",
      streetPlaceholder: "House/Flat No., Street Name",
      areaPlaceholder: "Area, Village, or Locality",
      postCodePlaceholder: "Post/ZIP Code",
      selectDivision: "Select Division",
      selectDistrict: "Select District",
      searchDistrict: "Search district...",
      selectCountry: "Select Country",
      firstSelectDivision: "First select division",
      noDistrictFound: "No district found",
      divisions: {
        dhaka: "Dhaka",
        chittagong: "Chittagong",
        rajshahi: "Rajshahi",
        khulna: "Khulna",
        barisal: "Barisal",
        sylhet: "Sylhet",
        rangpur: "Rangpur",
        mymensingh: "Mymensingh",
      },
      districts: {
        // Dhaka Division
        dhaka: "Dhaka",
        faridpur: "Faridpur",
        gazipur: "Gazipur",
        gopalganj: "Gopalganj",
        kishoreganj: "Kishoreganj",
        madaripur: "Madaripur",
        manikganj: "Manikganj",
        munshiganj: "Munshiganj",
        narayanganj: "Narayanganj",
        narsingdi: "Narsingdi",
        rajbari: "Rajbari",
        shariatpur: "Shariatpur",
        tangail: "Tangail",
        // Chittagong Division
        bandarban: "Bandarban",
        brahmanbaria: "Brahmanbaria",
        chandpur: "Chandpur",
        chittagong: "Chittagong",
        comilla: "Comilla",
        coxsbazar: "Cox's Bazar",
        feni: "Feni",
        khagrachhari: "Khagrachhari",
        lakshmipur: "Lakshmipur",
        noakhali: "Noakhali",
        rangamati: "Rangamati",
        // Rajshahi Division
        bogura: "Bogura",
        joypurhat: "Joypurhat",
        naogaon: "Naogaon",
        natore: "Natore",
        nawabganj: "Nawabganj",
        pabna: "Pabna",
        rajshahi: "Rajshahi",
        sirajganj: "Sirajganj",
        // Khulna Division
        bagerhat: "Bagerhat",
        chuadanga: "Chuadanga",
        jessore: "Jessore",
        jhenaidah: "Jhenaidah",
        khulna: "Khulna",
        kushtia: "Kushtia",
        magura: "Magura",
        meherpur: "Meherpur",
        narail: "Narail",
        satkhira: "Satkhira",
        // Barisal Division
        barguna: "Barguna",
        barisal: "Barisal",
        bhola: "Bhola",
        jhalokati: "Jhalokati",
        patuakhali: "Patuakhali",
        pirojpur: "Pirojpur",
        // Sylhet Division
        habiganj: "Habiganj",
        moulvibazar: "Moulvibazar",
        sunamganj: "Sunamganj",
        sylhet: "Sylhet",
        // Rangpur Division
        dinajpur: "Dinajpur",
        gaibandha: "Gaibandha",
        kurigram: "Kurigram",
        lalmonirhat: "Lalmonirhat",
        nilphamari: "Nilphamari",
        panchagarh: "Panchagarh",
        rangpur: "Rangpur",
        thakurgaon: "Thakurgaon",
        // Mymensingh Division
        jamalpur: "Jamalpur",
        mymensingh: "Mymensingh",
        netrokona: "Netrokona",
        sherpur: "Sherpur",
      },
    },
    bn: {
      street: "রাস্তা/বাড়ি নং",
      area: "এলাকা/গ্রাম",
      district: "জেলা",
      division: "বিভাগ",
      postCode: "পোস্ট কোড",
      country: "দেশ",
      streetPlaceholder: "বাড়ি/ফ্ল্যাট নং, রাস্তার নাম",
      areaPlaceholder: "এলাকা, গ্রাম, বা এলাকা",
      postCodePlaceholder: "পোস্ট/জিপ কোড",
      selectDivision: "বিভাগ নির্বাচন করুন",
      selectDistrict: "জেলা নির্বাচন করুন",
      searchDistrict: "জেলা খুঁজুন...",
      selectCountry: "দেশ নির্বাচন করুন",
      firstSelectDivision: "প্রথমে বিভাগ নির্বাচন করুন",
      noDistrictFound: "কোনো জেলা পাওয়া যায়নি",
      divisions: {
        dhaka: "ঢাকা",
        chittagong: "চট্টগ্রাম",
        rajshahi: "রাজশাহী",
        khulna: "খুলনা",
        barisal: "বরিশাল",
        sylhet: "সিলেট",
        rangpur: "রংপুর",
        mymensingh: "ময়মনসিংহ",
      },
      districts: {
        // Dhaka Division
        dhaka: "ঢাকা",
        faridpur: "ফরিদপুর",
        gazipur: "গাজীপুর",
        gopalganj: "গোপালগঞ্জ",
        kishoreganj: "কিশোরগঞ্জ",
        madaripur: "মাদারীপুর",
        manikganj: "মানিকগঞ্জ",
        munshiganj: "মুন্সিগঞ্জ",
        narayanganj: "নারায়ণগঞ্জ",
        narsingdi: "নরসিংদী",
        rajbari: "রাজবাড়ী",
        shariatpur: "শরীয়তপুর",
        tangail: "টাঙ্গাইল",
        // Chittagong Division
        bandarban: "বান্দরবান",
        brahmanbaria: "ব্রাহ্মণবাড়িয়া",
        chandpur: "চাঁদপুর",
        chittagong: "চট্টগ্রাম",
        comilla: "কুমিল্লা",
        coxsbazar: "কক্সবাজার",
        feni: "ফেনী",
        khagrachhari: "খাগড়াছড়ি",
        lakshmipur: "লক্ষ্মীপুর",
        noakhali: "নোয়াখালী",
        rangamati: "রাঙ্গামাটি",
        // Rajshahi Division
        bogura: "বগুড়া",
        joypurhat: "জয়পুরহাট",
        naogaon: "নওগাঁ",
        natore: "নাটোর",
        nawabganj: "নবাবগঞ্জ",
        pabna: "পাবনা",
        rajshahi: "রাজশাহী",
        sirajganj: "সিরাজগঞ্জ",
        // Khulna Division
        bagerhat: "বাগেরহাট",
        chuadanga: "চুয়াডাঙ্গা",
        jessore: "যশোর",
        jhenaidah: "ঝিনাইদহ",
        khulna: "খুলনা",
        kushtia: "কুষ্টিয়া",
        magura: "মাগুরা",
        meherpur: "মেহেরপুর",
        narail: "নড়াইল",
        satkhira: "সাতক্ষীরা",
        // Barisal Division
        barguna: "বরগুনা",
        barisal: "বরিশাল",
        bhola: "ভোলা",
        jhalokati: "ঝালকাঠি",
        patuakhali: "পটুয়াখালী",
        pirojpur: "পিরোজপুর",
        // Sylhet Division
        habiganj: "হবিগঞ্জ",
        moulvibazar: "মৌলভীবাজার",
        sunamganj: "সুনামগঞ্জ",
        sylhet: "সিলেট",
        // Rangpur Division
        dinajpur: "দিনাজপুর",
        gaibandha: "গাইবান্ধা",
        kurigram: "কুড়িগ্রাম",
        lalmonirhat: "লালমনিরhat",
        nilphamari: "নীলফামারী",
        panchagarh: "পঞ্চগড়",
        rangpur: "রংপুর",
        thakurgaon: "ঠাকুরগাঁও",
        // Mymensingh Division
        jamalpur: "জামালপুর",
        mymensingh: "ময়মনসিংহ",
        netrokona: "নেত্রকোনা",
        sherpur: "শেরপুর",
      },
    },
  }

  const t = translations[language]

  // Complete district mapping
  const districtsByDivision: Record<string, string[]> = {
    dhaka: [
      "dhaka",
      "faridpur",
      "gazipur",
      "gopalganj",
      "kishoreganj",
      "madaripur",
      "manikganj",
      "munshiganj",
      "narayanganj",
      "narsingdi",
      "rajbari",
      "shariatpur",
      "tangail",
    ],
    chittagong: [
      "bandarban",
      "brahmanbaria",
      "chandpur",
      "chittagong",
      "comilla",
      "coxsbazar",
      "feni",
      "khagrachhari",
      "lakshmipur",
      "noakhali",
      "rangamati",
    ],
    rajshahi: ["bogura", "joypurhat", "naogaon", "natore", "nawabganj", "pabna", "rajshahi", "sirajganj"],
    khulna: [
      "bagerhat",
      "chuadanga",
      "jessore",
      "jhenaidah",
      "khulna",
      "kushtia",
      "magura",
      "meherpur",
      "narail",
      "satkhira",
    ],
    barisal: ["barguna", "barisal", "bhola", "jhalokati", "patuakhali", "pirojpur"],
    sylhet: ["habiganj", "moulvibazar", "sunamganj", "sylhet"],
    rangpur: ["dinajpur", "gaibandha", "kurigram", "lalmonirhat", "nilphamari", "panchagarh", "rangpur", "thakurgaon"],
    mymensingh: ["jamalpur", "mymensingh", "netrokona", "sherpur"],
  }

  const updateAddress = (field: keyof Address, value: string) => {
    const newAddress = {
      ...address,
      [field]: value,
    }
    onAddressChange(newAddress)
  }

  const handleDivisionChange = (value: string) => {
    // Update division and reset district
    const newAddress = {
      ...address,
      division: value,
      district: "", // Reset district when division changes
    }
    onAddressChange(newAddress)
  }

  const handleDistrictChange = (value: string) => {
    updateAddress("district", value)
  }

  const getAvailableDistricts = () => {
    if (!address.division) return []
    return districtsByDivision[address.division] || []
  }

  return (
    <Card className="glass-dark border-white/20 bg-transparent">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center space-x-2 text-base text-white font-bold">
          {icon}
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 bg-transparent">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor={`${title}-street`} className="text-white">
              {t.street}
            </Label>
            <Input
              id={`${title}-street`}
              placeholder={t.streetPlaceholder}
              value={address.street || ""}
              onChange={(e) => updateAddress("street", e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${title}-area`} className="text-white">
              {t.area}
            </Label>
            <Input
              id={`${title}-area`}
              placeholder={t.areaPlaceholder}
              value={address.area || ""}
              onChange={(e) => updateAddress("area", e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor={`${title}-division`} className="text-white">
              {t.division}
            </Label>
            <Select value={address.division || ""} onValueChange={handleDivisionChange}>
              <SelectTrigger className="w-full bg-white/10 border-white/20 text-white">
                <SelectValue placeholder={t.selectDivision} />
              </SelectTrigger>
              <SelectContent className="max-h-[200px] bg-palette-dark border-white/20 text-white">
                {Object.entries(t.divisions).map(([key, value]) => (
                  <SelectItem key={key} value={key} className="text-white hover:bg-white/10">
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`${title}-district`} className="text-white">
              {t.district}
            </Label>
            {!address.division ? (
              <div className="p-3 border border-dashed border-white/25 rounded text-center text-sm text-white/60 glass">
                {t.firstSelectDivision}
              </div>
            ) : (
              <Select value={address.district || ""} onValueChange={handleDistrictChange}>
                <SelectTrigger className="w-full bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder={t.selectDistrict} />
                </SelectTrigger>
                <SelectContent className="max-h-[200px] bg-palette-dark border-white/20 text-white">
                  {getAvailableDistricts().map((districtKey) => (
                    <SelectItem key={districtKey} value={districtKey} className="text-white hover:bg-white/10">
                      {t.districts[districtKey as keyof typeof t.districts] || districtKey}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor={`${title}-postCode`} className="text-white">
              {t.postCode}
            </Label>
            <Input
              id={`${title}-postCode`}
              placeholder={t.postCodePlaceholder}
              value={address.postCode || ""}
              onChange={(e) => updateAddress("postCode", e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${title}-country`} className="text-white">
              {t.country}
            </Label>
            <Select value={address.country || ""} onValueChange={(value) => updateAddress("country", value)}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder={t.selectCountry} />
              </SelectTrigger>
              <SelectContent className="max-h-[200px] bg-palette-dark border-white/20 text-white">
                <SelectItem value="bangladesh" className="text-white hover:bg-white/10">
                  {language === "en" ? "Bangladesh" : "বাংলাদেশ"}
                </SelectItem>
                <SelectItem value="india" className="text-white hover:bg-white/10">
                  {language === "en" ? "India" : "ভারত"}
                </SelectItem>
                <SelectItem value="pakistan" className="text-white hover:bg-white/10">
                  {language === "en" ? "Pakistan" : "পাকিস্তান"}
                </SelectItem>
                <SelectItem value="nepal" className="text-white hover:bg-white/10">
                  {language === "en" ? "Nepal" : "নেপাল"}
                </SelectItem>
                <SelectItem value="sri-lanka" className="text-white hover:bg-white/10">
                  {language === "en" ? "Sri Lanka" : "শ্রীলঙ্কা"}
                </SelectItem>
                <SelectItem value="other" className="text-white hover:bg-white/10">
                  {language === "en" ? "Other" : "অন্যান্য"}
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
