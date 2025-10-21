import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import {
  Calendar,
  Clock,
  MapPin,
  Trophy,
  Users,
  Zap,
  Mail,
  Phone,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Construir mensaje para WhatsApp
    const mensaje = `*Nuevo contacto desde la web*%0A%0A` +
      `*Nombre:* ${formData.nombre}%0A` +
      `*Email:* ${formData.email}%0A` +
      `*Teléfono:* ${formData.telefono}%0A%0A` +
      `*Mensaje:*%0A${formData.mensaje}`;
    
    // Abrir WhatsApp con el mensaje
    const whatsappUrl = `https://wa.me/34671498983?text=${mensaje}`;
    window.open(whatsappUrl, '_blank');
    
    // Limpiar formulario
    setFormData({ nombre: "", email: "", telefono: "", mensaje: "" });
  };

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section
        id="inicio"
        className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-secondary to-primary overflow-hidden pt-16"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="container relative z-10 text-center text-white animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
            Club de Pádel Ricote
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
            Vive la pasión del pádel en el corazón del Valle de Ricote. 
            Instalaciones de primera, ambiente familiar y profesionales expertos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => window.location.href = "/reservas"}
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6"
            >
              Reservar Pista
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("#instalaciones")}
              className="bg-white/10 hover:bg-white/20 text-white border-white/30 text-lg px-8 py-6 backdrop-blur-sm"
            >
              Descubre Más
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/50 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Características Destacadas */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow animate-fade-in">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Instalaciones Premium</h3>
                <p className="text-muted-foreground">
                  Pistas de última generación con iluminación LED y césped artificial de calidad profesional.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Escuela Profesional</h3>
                <p className="text-muted-foreground">
                  Clases para todos los niveles con entrenadores certificados y programas personalizados.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold mb-2">Reserva Online</h3>
                <p className="text-muted-foreground">
                  Sistema de reservas 24/7 fácil y rápido. Gestiona tus partidos desde cualquier dispositivo.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Instalaciones */}
      <section id="instalaciones" className="py-20 scroll-mt-20">
        <div className="container">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Nuestras Instalaciones
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Espacios diseñados para ofrecerte la mejor experiencia deportiva en el Valle de Ricote.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6 animate-slide-in-left">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">4 Pistas Profesionales</h3>
                  <p className="text-muted-foreground">
                    Pistas panorámicas con cristal templado, césped artificial de última generación 
                    y sistema de iluminación LED para juego nocturno.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Vestuarios Completos</h3>
                  <p className="text-muted-foreground">
                    Vestuarios amplios con duchas, taquillas individuales y zona de aseo 
                    completamente equipada.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Cafetería & Terraza</h3>
                  <p className="text-muted-foreground">
                    Espacio social con cafetería, terraza exterior y zona de descanso 
                    para disfrutar antes y después de tus partidos.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Parking Gratuito</h3>
                  <p className="text-muted-foreground">
                    Amplio aparcamiento gratuito con fácil acceso y seguridad para tu vehículo.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 animate-slide-in-right">
              <img
                src="/club-interior.jpg"
                alt="Interior del club de pádel"
                className="rounded-lg shadow-lg w-full h-64 object-cover hover:scale-105 transition-transform"
              />
              <img
                src="/pistas-modernas.jpg"
                alt="Pistas de pádel modernas"
                className="rounded-lg shadow-lg w-full h-64 object-cover hover:scale-105 transition-transform"
              />
              <img
                src="/club-exterior.jpg"
                alt="Exterior del club"
                className="rounded-lg shadow-lg w-full h-64 object-cover col-span-2 hover:scale-105 transition-transform"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section id="servicios" className="py-20 bg-muted/30 scroll-mt-20">
        <div className="container">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Nuestros Servicios
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Todo lo que necesitas para disfrutar del pádel al máximo nivel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">Alquiler de Pistas</h3>
                <p className="text-muted-foreground text-sm">
                  Reserva por horas con flexibilidad horaria. Sistema online disponible 24/7.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="w-14 h-14 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-7 h-7 text-secondary" />
                </div>
                <h3 className="text-lg font-bold mb-2">Clases Particulares</h3>
                <p className="text-muted-foreground text-sm">
                  Entrenamiento personalizado con profesionales certificados para todos los niveles.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="w-14 h-14 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Trophy className="w-7 h-7 text-accent" />
                </div>
                <h3 className="text-lg font-bold mb-2">Torneos & Eventos</h3>
                <p className="text-muted-foreground text-sm">
                  Competiciones regulares, ligas internas y eventos especiales durante todo el año.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">Material Deportivo</h3>
                <p className="text-muted-foreground text-sm">
                  Alquiler y venta de palas, pelotas y accesorios de las mejores marcas.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tarifas */}
      <section id="tarifas" className="py-20 scroll-mt-20">
        <div className="container">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Tarifas
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Precios competitivos y opciones flexibles para todos los jugadores.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-2 border-border hover:border-primary transition-colors">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-2">Pista Diurna</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-primary">15€</span>
                  <span className="text-muted-foreground">/hora</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-sm">
                    <Clock className="w-4 h-4 mr-2 text-primary" />
                    Lunes a Viernes 9:00-17:00
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle2 className="w-4 h-4 mr-2 text-primary" />
                    Iluminación natural
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle2 className="w-4 h-4 mr-2 text-primary" />
                    Vestuarios incluidos
                  </li>
                </ul>
                <Button className="w-full" variant="outline">
                  Reservar
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary shadow-xl scale-105 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-accent text-accent-foreground px-4 py-1 rounded-full text-sm font-bold">
                  Más Popular
                </span>
              </div>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-2">Pista Nocturna</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-primary">20€</span>
                  <span className="text-muted-foreground">/hora</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-sm">
                    <Clock className="w-4 h-4 mr-2 text-primary" />
                    Lunes a Domingo 17:00-23:00
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle2 className="w-4 h-4 mr-2 text-primary" />
                    Iluminación LED profesional
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle2 className="w-4 h-4 mr-2 text-primary" />
                    Vestuarios incluidos
                  </li>
                </ul>
                <Button className="w-full bg-primary hover:bg-primary/90">
                  Reservar
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-border hover:border-secondary transition-colors">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-2">Bono 10 Horas</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-secondary">140€</span>
                  <span className="text-muted-foreground text-sm block">14€/hora</span>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-sm">
                    <CheckCircle2 className="w-4 h-4 mr-2 text-secondary" />
                    Válido 3 meses
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle2 className="w-4 h-4 mr-2 text-secondary" />
                    Horario flexible
                  </li>
                  <li className="flex items-center text-sm">
                    <CheckCircle2 className="w-4 h-4 mr-2 text-secondary" />
                    Ahorra 30€
                  </li>
                </ul>
                <Button className="w-full" variant="outline">
                  Comprar Bono
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground">
              <strong>Clases particulares:</strong> desde 25€/hora · 
              <strong> Grupos:</strong> desde 15€/persona
            </p>
          </div>
        </div>
      </section>

      {/* Galería */}
      <section id="galeria" className="py-20 bg-muted/30 scroll-mt-20">
        <div className="container">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Galería
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Descubre nuestras instalaciones y el ambiente único del club.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative overflow-hidden rounded-lg shadow-lg group h-64">
              <img
                src="/club-interior.jpg"
                alt="Interior del club"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <p className="text-white font-semibold">Interior del Club</p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-lg shadow-lg group h-64">
              <img
                src="/pistas-modernas.jpg"
                alt="Pistas de pádel"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <p className="text-white font-semibold">Pistas Profesionales</p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-lg shadow-lg group h-64">
              <img
                src="/club-exterior.jpg"
                alt="Exterior del club"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <p className="text-white font-semibold">Vista Exterior</p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-lg shadow-lg group h-64">
              <img
                src="/instalaciones.webp"
                alt="Instalaciones"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                <p className="text-white font-semibold">Instalaciones Completas</p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-lg shadow-lg group h-64 bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <div className="text-center text-white p-6">
                <Trophy className="w-16 h-16 mx-auto mb-4" />
                <p className="text-xl font-bold mb-2">Torneos Mensuales</p>
                <p className="text-sm">Participa en nuestras competiciones</p>
              </div>
            </div>

            <div className="relative overflow-hidden rounded-lg shadow-lg group h-64 bg-gradient-to-br from-secondary to-accent flex items-center justify-center">
              <div className="text-center text-white p-6">
                <Users className="w-16 h-16 mx-auto mb-4" />
                <p className="text-xl font-bold mb-2">Comunidad Activa</p>
                <p className="text-sm">Más de 200 socios activos</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section id="contacto" className="py-20 scroll-mt-20">
        <div className="container">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Contacto
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              ¿Tienes alguna pregunta? Estamos aquí para ayudarte.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Formulario */}
            <div className="animate-slide-in-left">
              <Card className="border-none shadow-xl">
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="nombre" className="block text-sm font-medium mb-2">
                        Nombre completo
                      </label>
                      <input
                        type="text"
                        id="nombre"
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        className="w-full px-4 py-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="telefono" className="block text-sm font-medium mb-2">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        id="telefono"
                        value={formData.telefono}
                        onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                        className="w-full px-4 py-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="mensaje" className="block text-sm font-medium mb-2">
                        Mensaje
                      </label>
                      <textarea
                        id="mensaje"
                        value={formData.mensaje}
                        onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-3 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background resize-none"
                        required
                      ></textarea>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-6"
                    >
                      Enviar Mensaje
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Información de contacto */}
            <div className="space-y-8 animate-slide-in-right">
              <div>
                <h3 className="text-2xl font-bold mb-6">Información de Contacto</h3>
                
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Dirección</h4>
                      <p className="text-muted-foreground">
                        C/ San Francisco, 7<br />
                        30610 Ricote, Murcia
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Teléfono</h4>
                      <a
                        href="tel:+34968697063"
                        className="text-muted-foreground hover:text-secondary transition-colors"
                      >
                        968 697 063
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Email</h4>
                      <a
                        href="mailto:info@clubpadelricote.es"
                        className="text-muted-foreground hover:text-accent transition-colors"
                      >
                        info@clubpadelricote.es
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Horario</h4>
                      <p className="text-muted-foreground">
                        Lunes a Domingo<br />
                        9:00 - 23:00
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mapa */}
              <div className="rounded-lg overflow-hidden shadow-lg h-64">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3141.234567890123!2d-1.370833!3d38.153333!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzjCsDA5JzEyLjAiTiAxwrAyMicxNS4wIlc!5e0!3m2!1ses!2ses!4v1234567890123!5m2!1ses!2ses"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación del Club de Pádel Ricote"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

