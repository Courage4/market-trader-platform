"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { MapPin } from "lucide-react"

export interface Market {
  value: string
  label: string
  region: string
  city: string
}

export const ghanaMarkets: Market[] = [
  // Greater Accra Region
  { value: "makola-market", label: "Makola Market", region: "Greater Accra", city: "Accra" },
  { value: "kaneshie-market", label: "Kaneshie Market", region: "Greater Accra", city: "Accra" },
  { value: "madina-market", label: "Madina Market", region: "Greater Accra", city: "Accra" },
  { value: "dome-market", label: "Dome Market", region: "Greater Accra", city: "Accra" },
  { value: "tema-market", label: "Tema Market", region: "Greater Accra", city: "Tema" },
  { value: "ashaiman-market", label: "Ashaiman Market", region: "Greater Accra", city: "Ashaiman" },
  { value: "kasoa-market", label: "Kasoa Market", region: "Greater Accra", city: "Kasoa" },
  { value: "agbogbloshie-market", label: "Agbogbloshie Market", region: "Greater Accra", city: "Accra" },
  { value: "tudu-market", label: "Tudu Market", region: "Greater Accra", city: "Accra" },
  { value: "mallam-market", label: "Mallam Market", region: "Greater Accra", city: "Accra" },

  // Ashanti Region
  { value: "kejetia-market", label: "Kejetia Market", region: "Ashanti", city: "Kumasi" },
  { value: "central-market-kumasi", label: "Central Market", region: "Ashanti", city: "Kumasi" },
  { value: "adum-market", label: "Adum Market", region: "Ashanti", city: "Kumasi" },
  { value: "bantama-market", label: "Bantama Market", region: "Ashanti", city: "Kumasi" },
  { value: "asafo-market", label: "Asafo Market", region: "Ashanti", city: "Kumasi" },
  { value: "oforikrom-market", label: "Oforikrom Market", region: "Ashanti", city: "Kumasi" },
  { value: "ejisu-market", label: "Ejisu Market", region: "Ashanti", city: "Ejisu" },

  // Western Region
  { value: "takoradi-market", label: "Takoradi Market Circle", region: "Western", city: "Takoradi" },
  { value: "sekondi-market", label: "Sekondi Market", region: "Western", city: "Sekondi" },
  { value: "tarkwa-market", label: "Tarkwa Market", region: "Western", city: "Tarkwa" },
  { value: "axim-market", label: "Axim Market", region: "Western", city: "Axim" },

  // Central Region
  { value: "cape-coast-market", label: "Cape Coast Central Market", region: "Central", city: "Cape Coast" },
  { value: "elmina-market", label: "Elmina Market", region: "Central", city: "Elmina" },
  { value: "winneba-market", label: "Winneba Market", region: "Central", city: "Winneba" },
  { value: "kasoa-central-market", label: "Kasoa Central Market", region: "Central", city: "Kasoa" },

  // Eastern Region
  { value: "koforidua-market", label: "Koforidua Central Market", region: "Eastern", city: "Koforidua" },
  { value: "akropong-market", label: "Akropong Market", region: "Eastern", city: "Akropong" },
  { value: "nkawkaw-market", label: "Nkawkaw Market", region: "Eastern", city: "Nkawkaw" },
  { value: "akim-oda-market", label: "Akim Oda Market", region: "Eastern", city: "Akim Oda" },

  // Northern Region
  { value: "tamale-central-market", label: "Tamale Central Market", region: "Northern", city: "Tamale" },
  { value: "yendi-market", label: "Yendi Market", region: "Northern", city: "Yendi" },
  { value: "salaga-market", label: "Salaga Market", region: "Northern", city: "Salaga" },

  // Upper East Region
  { value: "bolgatanga-market", label: "Bolgatanga Market", region: "Upper East", city: "Bolgatanga" },
  { value: "navrongo-market", label: "Navrongo Market", region: "Upper East", city: "Navrongo" },

  // Upper West Region
  { value: "wa-market", label: "Wa Central Market", region: "Upper West", city: "Wa" },

  // Volta Region
  { value: "ho-market", label: "Ho Central Market", region: "Volta", city: "Ho" },
  { value: "keta-market", label: "Keta Market", region: "Volta", city: "Keta" },
  { value: "aflao-market", label: "Aflao Market", region: "Volta", city: "Aflao" },

  // Brong Ahafo Region
  { value: "sunyani-market", label: "Sunyani Central Market", region: "Brong Ahafo", city: "Sunyani" },
  { value: "techiman-market", label: "Techiman Market", region: "Brong Ahafo", city: "Techiman" },
  { value: "berekum-market", label: "Berekum Market", region: "Brong Ahafo", city: "Berekum" },

  // Western North Region
  { value: "sefwi-wiawso-market", label: "Sefwi Wiawso Market", region: "Western North", city: "Sefwi Wiawso" },

  // Ahafo Region
  { value: "goaso-market", label: "Goaso Market", region: "Ahafo", city: "Goaso" },

  // Bono East Region
  { value: "atebubu-market", label: "Atebubu Market", region: "Bono East", city: "Atebubu" },

  // North East Region
  { value: "nalerigu-market", label: "Nalerigu Market", region: "North East", city: "Nalerigu" },

  // Savannah Region
  { value: "damongo-market", label: "Damongo Market", region: "Savannah", city: "Damongo" },

  // Oti Region
  { value: "dambai-market", label: "Dambai Market", region: "Oti", city: "Dambai" },
]

interface MarketSelectorProps {
  value: string
  onValueChange: (value: string) => void
  placeholder?: string
  required?: boolean
  showRegion?: boolean
}

export function MarketSelector({
  value,
  onValueChange,
  placeholder = "Select a market",
  required = false,
  showRegion = true,
}: MarketSelectorProps) {
  // Group markets by region for better organization
  const marketsByRegion = ghanaMarkets.reduce(
    (acc, market) => {
      if (!acc[market.region]) {
        acc[market.region] = []
      }
      acc[market.region].push(market)
      return acc
    },
    {} as Record<string, Market[]>,
  )

  return (
    <Select value={value} onValueChange={onValueChange} required={required}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="max-h-80">
        {Object.entries(marketsByRegion).map(([region, markets]) => (
          <div key={region}>
            {showRegion && (
              <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground border-b">{region} Region</div>
            )}
            {markets.map((market) => (
              <SelectItem key={market.value} value={market.value}>
                <div className="flex items-center gap-2">
                  <MapPin className="h-3 w-3 text-muted-foreground" />
                  <div className="flex flex-col">
                    <span className="font-medium">{market.label}</span>
                    <span className="text-xs text-muted-foreground">{market.city}</span>
                  </div>
                </div>
              </SelectItem>
            ))}
          </div>
        ))}
      </SelectContent>
    </Select>
  )
}

export function MarketBadge({ marketValue, showCity = true }: { marketValue: string; showCity?: boolean }) {
  const market = ghanaMarkets.find((m) => m.value === marketValue)

  if (!market) return null

  return (
    <Badge variant="outline" className="text-xs">
      <MapPin className="h-3 w-3 mr-1" />
      {market.label}
      {showCity && `, ${market.city}`}
    </Badge>
  )
}

export function getMarketInfo(marketValue: string): Market | undefined {
  return ghanaMarkets.find((m) => m.value === marketValue)
}
