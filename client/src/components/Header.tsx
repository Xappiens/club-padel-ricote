import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const navItems = [
    { href: "#inicio", label: "Inicio" },
    { href: "#instalaciones", label: "Instalaciones" },
    { href: "#servicios", label: "Servicios" },
    { href: "#tarifas", label: "Tarifas" },
    { href: "#galeria", label: "Galería" },
    { href: "#contacto", label: "Contacto" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#inicio"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("#inicio");
            }}
            className="flex items-center space-x-2 group"
          >
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center group-hover:bg-secondary transition-colors">
              <span className="text-primary-foreground font-bold text-xl">P</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-tight text-foreground">
                Club de Pádel
              </span>
              <span className="text-xs text-muted-foreground leading-tight">
                Ricote
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className="px-4 py-2 text-sm font-medium text-foreground hover:text-primary transition-colors rounded-md hover:bg-muted"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA Button Desktop */}
          <div className="hidden md:block">
            <Button
              onClick={() => scrollToSection("#contacto")}
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              Reservar Pista
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-foreground hover:bg-muted rounded-md"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 animate-fade-in">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className="px-4 py-3 text-sm font-medium text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-2">
                <Button
                  onClick={() => scrollToSection("#contacto")}
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  Reservar Pista
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

