import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Información del Club */}
          <div>
            <h3 className="text-xl font-bold mb-4">Club de Pádel Ricote</h3>
            <p className="text-primary-foreground/80 mb-4">
              El mejor club de pádel del Valle de Ricote. Instalaciones modernas, 
              profesionales cualificados y un ambiente familiar.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
            </div>
          </div>

          {/* Enlaces Rápidos */}
          <div>
            <h3 className="text-xl font-bold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#instalaciones"
                  className="text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  Instalaciones
                </a>
              </li>
              <li>
                <a
                  href="#servicios"
                  className="text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  Servicios
                </a>
              </li>
              <li>
                <a
                  href="#tarifas"
                  className="text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  Tarifas
                </a>
              </li>
              <li>
                <a
                  href="#galeria"
                  className="text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  Galería
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="mt-1 flex-shrink-0" />
                <span className="text-primary-foreground/80">
                  C/ San Francisco, 7<br />
                  30610 Ricote, Murcia
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="flex-shrink-0" />
                <a
                  href="tel:+34968697063"
                  className="text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  968 697 063
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="flex-shrink-0" />
                <a
                  href="mailto:info@clubpadelricote.es"
                  className="text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  info@clubpadelricote.es
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/60 text-sm">
            © {currentYear} Club de Pádel Ricote. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

