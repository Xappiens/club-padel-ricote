# 🎾 Club de Pádel Ricote

Sitio web profesional del Club de Pádel Ricote (Murcia) con sistema completo de reservas online.

![Club de Pádel Ricote](https://img.shields.io/badge/Pádel-Ricote-blue)
![React](https://img.shields.io/badge/React-19-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)

## ✨ Características

### 🌐 Sitio Web Público
- **Diseño moderno y responsive** - Minimalista, dinámico y profesional
- **Optimización SEO** - Meta tags, Schema.org, Open Graph
- **Secciones completas**:
  - Hero con gradiente animado
  - Instalaciones premium
  - Servicios del club
  - Tarifas competitivas
  - Galería de fotos
  - Formulario de contacto integrado con WhatsApp

### 📅 Sistema de Reservas
- **Autenticación de usuarios** - Login/Registro seguro
- **Calendario interactivo** - Selección visual de fechas
- **4 pistas disponibles** - Con descripciones detalladas
- **Horarios flexibles** - De 9:00 a 23:00 en slots de 1 hora
- **Prevención de conflictos** - Validación automática de disponibilidad
- **Gestión de reservas** - Ver historial y cancelar reservas

### 🔧 Tecnologías

**Frontend:**
- React 19
- TypeScript
- Tailwind CSS 4
- shadcn/ui
- Wouter (routing)
- tRPC (type-safe API)

**Backend:**
- Node.js
- tRPC
- Drizzle ORM
- MySQL

**Características técnicas:**
- Base de datos relacional
- API type-safe con tRPC
- Autenticación integrada
- Responsive design mobile-first
- Animaciones suaves
- Optimización de rendimiento

## 🚀 Instalación

### Prerrequisitos
- Node.js 22+
- pnpm
- MySQL

### Configuración

1. **Clonar el repositorio**
```bash
git clone https://github.com/Xappiens/club-padel-ricote.git
cd club-padel-ricote
```

2. **Instalar dependencias**
```bash
pnpm install
```

3. **Configurar variables de entorno**

Crea un archivo `.env` en la raíz del proyecto:

```env
# Base de datos
DATABASE_URL=mysql://usuario:password@localhost:3306/padel_ricote

# Autenticación (configurar según tu proveedor OAuth)
JWT_SECRET=tu_secreto_jwt_aqui
OAUTH_SERVER_URL=https://tu-servidor-oauth.com
OWNER_OPEN_ID=tu_open_id
OWNER_NAME=Tu Nombre

# Aplicación
VITE_APP_TITLE=Club de Pádel Ricote
VITE_APP_LOGO=/logo.svg
```

4. **Inicializar base de datos**
```bash
# Aplicar migraciones
pnpm db:push

# Crear las 4 pistas del club
npx tsx server/seed.ts
```

5. **Iniciar servidor de desarrollo**
```bash
pnpm dev
```

El sitio estará disponible en `http://localhost:3000`

## 📁 Estructura del Proyecto

```
club-padel-ricote/
├── client/                 # Frontend React
│   ├── public/            # Assets estáticos
│   │   ├── padel-*.jpg   # Imágenes de las instalaciones
│   │   └── robots.txt    # SEO
│   └── src/
│       ├── components/    # Componentes reutilizables
│       │   ├── Header.tsx
│       │   ├── Footer.tsx
│       │   └── Layout.tsx
│       ├── pages/         # Páginas de la aplicación
│       │   ├── Home.tsx
│       │   ├── Reservas.tsx
│       │   └── MisReservas.tsx
│       └── index.css      # Estilos globales y tema
├── server/                # Backend Node.js
│   ├── db.ts             # Funciones de base de datos
│   ├── routers.ts        # Endpoints tRPC
│   └── seed.ts           # Script de inicialización
├── drizzle/              # Esquema de base de datos
│   └── schema.ts         # Definición de tablas
└── shared/               # Código compartido
    └── const.ts          # Constantes
```

## 🎯 Uso

### Para Usuarios

1. **Navegar el sitio** - Explora instalaciones, servicios y tarifas
2. **Registrarse** - Crea una cuenta para reservar pistas
3. **Reservar pista** - Selecciona fecha, pista y horario
4. **Gestionar reservas** - Ve tus reservas y cancela si es necesario
5. **Contactar** - Usa el formulario que se integra con WhatsApp

### Para Administradores

El primer usuario registrado con el `OWNER_OPEN_ID` será administrador automáticamente.

Los administradores pueden:
- Ver todas las reservas del sistema
- Crear nuevas pistas (mediante API)
- Gestionar el estado de las pistas

## 🎨 Personalización

### Colores y Tema

Edita `client/src/index.css` para cambiar la paleta de colores:

```css
:root {
  --primary: oklch(0.45 0.15 220);    /* Azul profundo */
  --secondary: oklch(0.55 0.12 200);  /* Verde azulado */
  --accent: oklch(0.65 0.18 40);      /* Naranja energético */
  /* ... más colores ... */
}
```

### Contenido

- **Textos**: Edita `client/src/pages/Home.tsx`
- **Imágenes**: Reemplaza archivos en `client/public/`
- **Contacto**: Actualiza el número de WhatsApp en `Home.tsx` (línea 42)

### Pistas

Modifica `server/seed.ts` para cambiar el número o descripción de las pistas.

## 📱 Contacto

- **WhatsApp**: +34 671 498 983
- **Ubicación**: Valle de Ricote, Murcia
- **Email**: info@clubpadelricote.es

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 🙏 Agradecimientos

Desarrollado con ❤️ para el Club de Pádel Ricote.

---

**¿Preguntas o sugerencias?** Abre un issue en GitHub o contáctanos por WhatsApp.

