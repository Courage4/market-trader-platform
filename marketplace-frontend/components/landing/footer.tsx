"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, Mail, MapPin, Globe, MessageCircle } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container-modern">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gradient">MarketPlace Ghana</h3>
            <p className="text-gray-400">
              Connecting local markets with modern technology for a better shopping experience.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-emerald-400 hover:bg-emerald-400/10 transition-all duration-300">
                <Globe className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-emerald-400 hover:bg-emerald-400/10 transition-all duration-300">
                <MessageCircle className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-emerald-300">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-emerald-400 transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-emerald-400 transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-emerald-300">For Vendors</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/vendor/register" className="hover:text-emerald-400 transition-colors">
                  Become a Vendor
                </Link>
              </li>
              <li>
                <Link href="/vendor/dashboard" className="hover:text-emerald-400 transition-colors">
                  Vendor Dashboard
                </Link>
              </li>
              <li>
                <Link href="/vendor/support" className="hover:text-emerald-400 transition-colors">
                  Vendor Support
                </Link>
              </li>
              <li>
                <Link href="/vendor/resources" className="hover:text-emerald-400 transition-colors">
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-emerald-300">Contact Info</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center hover:text-emerald-400 transition-colors cursor-pointer">
                <Phone className="w-4 h-4 mr-2" />
                +233 24 123 4567
              </li>
              <li className="flex items-center hover:text-emerald-400 transition-colors cursor-pointer">
                <Mail className="w-4 h-4 mr-2" />
                hello@marketplaceghana.com
              </li>
              <li className="flex items-center hover:text-emerald-400 transition-colors cursor-pointer">
                <MapPin className="w-4 h-4 mr-2" />
                Accra, Ghana
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 MarketPlace Ghana. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}