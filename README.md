# CV Deling Platform 🚀

En moderne, professionel platform til at dele og opdage CV'er, bygget med Next.js 16, Neon PostgreSQL og UploadThing.

## ✨ Features

- 📄 **CV Upload** - Upload PDF CV'er med drag-and-drop interface
- 🎨 **Moderne UI** - Elegant design med Tailwind CSS og gradients
- 💾 **Database Integration** - Neon PostgreSQL med Drizzle ORM
- 🔍 **CV Gallery** - Gennemse alle uploadede CV'er med detaljer
- 👤 **Bruger Management** - Personligt dashboard og CV administration
- ⚡ **Performance** - Optimeret med Next.js 16 og moderne best practices

## 🛠️ Tech Stack

- **Framework**: Next.js 16
- **Database**: Neon PostgreSQL
- **ORM**: Drizzle ORM
- **File Upload**: UploadThing
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Language**: TypeScript

## 📋 Setup Guide

### 1. Installer dependencies

Dependencies er allerede installeret, men hvis du har brug for at geninstallere:

```bash
npm install
```

### 2. Opsæt UploadThing

1. Gå til [uploadthing.com](https://uploadthing.com)
2. Opret en konto og en ny app
3. Kopier din API key
4. Tilføj den til `.env.local`:

```env
UPLOADTHING_TOKEN=din_uploadthing_token_her
```

### 3. Database er allerede sat op

Databasen er allerede konfigureret med Neon og schema er pushet. Du kan se forbindelsen i `.env.local`.

### 4. Start udviklingsserveren

```bash
npm run dev
```

Åbn [http://localhost:3000](http://localhost:3000) i din browser.

## 📁 Projektstruktur

```
/
├── app/
│   ├── api/
│   │   ├── cvs/               # CV CRUD operations
│   │   └── uploadthing/       # File upload
│   ├── dashboard/             # Dashboard side
│   ├── layout.tsx             # Root layout
│   └── page.tsx               # Home page
├── components/
│   ├── CVGallery.tsx          # Vis alle CV'er
│   ├── CVUploadForm.tsx       # Upload formular
│   └── Header.tsx             # Navigation header
├── lib/
│   ├── db/
│   │   ├── schema.ts          # Database schema
│   │   ├── index.ts           # DB connection
│   │   └── migrations/        # SQL migrations
│   └── uploadthing.ts         # UploadThing helpers
└── drizzle.config.ts          # Drizzle konfiguration
```

## 🎯 Sådan bruges platformen

### For brugere:

1. **Gå til hjemmesiden** - Se hero section og features
2. **Se CV'er** - Scroll ned for at se alle uploadede CV'er
3. **Upload CV** - Gå til Dashboard og upload dit PDF CV
4. **Administrer** - Se og slet CV'er

### Database Schema:

```sql
Table: cvs
- id (uuid, primary key)
- userId (text)
- userName (text)
- userEmail (text)
- title (text)
- description (text, nullable)
- fileUrl (text)
- fileName (text)
- fileSize (text)
- uploadedAt (timestamp)
```

## 🚀 Deployment

### Vercel (Anbefalet)

1. Push koden til GitHub
2. Importer projektet i Vercel
3. Environment variables er allerede sat op
4. Deploy! 

## 🔑 Environment Variables

Alle nødvendige environment variables er allerede i `.env.local`:

- ✅ `DATABASE_URL` - Neon database forbindelse
- ⚠️ `UPLOADTHING_TOKEN` - Skal tilføjes fra uploadthing.com

## 💡 Features i detaljer

### CV Upload
- Drag-and-drop PDF upload
- Max 4MB filstørrelse
- Automatisk metadata extraction
- Preview af valgt fil

### CV Gallery
- Responsive grid layout
- Download CV direkte
- Slet CV'er

### UI/UX
- Dark mode support
- Gradient accents
- Hover animations
- Responsive design
- Loading states
- Error handling

## 📞 Support

Hvis du har spørgsmål eller problemer, tjek først:

1. Er alle environment variables sat korrekt?
2. Er UploadThing token tilføjet?
3. Kører udvikingsserveren på port 3000?

## 🎨 Customization

Du kan nemt tilpasse designet ved at ændre:

- Farver i Tailwind klasserne
- Gradient kombinationer
- Layout i components
- Text og beskrivelser

Held og lykke med din CV deling platform! 🎉

