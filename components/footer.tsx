"use client"

import { Github, Twitter, Linkedin, Instagram, Heart } from "lucide-react"
import Image from "next/image"

const socialLinks = [
  { icon: Instagram, href: "https://www.instagram.com/webytehub/", label: "Instagram" },
  { icon: Github, href: "https://github.com/juniorwebyte", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/j%C3%BAnior-alves-6a625049/", label: "LinkedIn" },
  { icon: Twitter, href: "https://x.com/juniorwebyte", label: "Twitter" },
]

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="relative py-12 px-4 border-t border-border/50">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <button onClick={scrollToTop} className="flex items-center">
            <Image
              src="/logo-white.png"
              alt="Webyte Hub"
              width={150}
              height={40}
              className="h-8 w-auto object-contain"
            />
          </button>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-secondary transition-all group"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Feito com <Heart className="w-4 h-4 text-red-500 fill-red-500" /> pela Webyte Hub ©{" "}
            {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  )
}
