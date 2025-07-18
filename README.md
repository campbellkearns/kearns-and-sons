# Funeral Service Management Online

A funeral home website built with [Next.js](https://nextjs.org) and [Payload CMS](https://payloadcms.com) featuring memorial services, blog posts, contact forms, and condolence management.

## Quick Start

### Prerequisites

- **Node.js** 18.20.2+ or 20.9.0+
- **pnpm** (recommended) or npm
- **MongoDB** database (local or cloud)

### Setup

1. Clone the repo and navigate to the directory
2. Copy environment variables: `cp .env.example .env`
3. **Configure your environment variables** in `.env`:
   ```bash
   #Database
   DATABASE_URI=mongodb://127.0.0.1/your-database-name
   
   #Security
   PAYLOAD_SECRET=your-secret-key-here
   CRON_SECRET=your-cron-secret-here
   
   #URLs
   NEXT_PUBLIC_SERVER_URL=http://localhost:3000
   
   # Email notifications (if using email features, optional)
   EMAIL_FROM_ADDRESS="from@your-tld.com"
   EMAIL_FROM_NAME="Your Entity Name"
   ADMIN_EMAIL="recipient-of-emails@thebusiness.com"
   STAFF_NOTIFICATION_EMAIL="another-recipient-who-needs-to-know@thebusiness.com"
   ```

4. **Start MongoDB**:
   ```bash
   # macOS with Homebrew
   brew services start mongodb-community
   
   # Or use Docker
   docker run --name mongodb -p 27017:27017 -d mongo:latest
   ```

5. **Install and run**:
   ```bash
   pnpm install
   pnpm dev
   ```

6. Open `http://localhost:3000` and create your first admin user

### Email Setup

For email notifications in production, see the [Email Setup README](./EMAIL_SETUP_README.md).

## Core Features

### Collections

- **Memorials** - Obituary pages with condolences and visitor comments
- **Posts** - Blog posts and news articles  
- **Pages** - Static pages with layout builder
- **Comments** - Moderated condolences and blog comments with email notifications
- **Media** - File uploads with image resizing
- **Categories** - Organize posts and memorials
- **Users** - Admin authentication

### Website Features

- Layout builder with pre-built blocks (Hero, Content, Media, Call to Action, Archive, Forms)
- Draft preview and live preview
- SEO optimization
- Search functionality
- Contact forms with admin management
- Scheduled publishing
- Responsive design with TailwindCSS

## Database Options

### Local MongoDB
```bash
# macOS
brew install mongodb-community
brew services start mongodb-community

# Use in .env:
DATABASE_URI=mongodb://127.0.0.1/name-of-your-database
```

### MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create cluster and get connection string
3. Update `.env` with connection string

### Docker MongoDB
```bash
docker run --name mongodb -p 27017:27017 -d mongo:latest
```

## Docker Development

1. Copy `.env.example` to `.env` and configure
2. **Modify docker-compose.yml** (to use the package manager of your choice):
   ```yaml
   # Change this line in docker-compose.yml:
   command: sh -c "yarn install && yarn dev"
   # To :
    what you need it to be, eg:
   command: sh -c "npm install -g pnpm && pnpm install && pnpm dev"
   ```
3. Run: `docker-compose up`

## Production

1. Build: `npm run build`
2. Start: `npm start`
3. Configure production database (MongoDB Atlas recommended)
4. Set up email service [here's an easy email option](./EMAIL_SETUP_README.md)
5. Configure object storage for media files

This project is designed for self-hosting on a VPS.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **CMS**: Payload CMS 3.x
- **Database**: MongoDB with Mongoose
- **Styling**: TailwindCSS + shadcn/ui
- **Rich Text**: Lexical editor
- **Email**: Resend (production) / Ethereal (development)
- **Storage**: Local (development) / S3-compatible (production)

## Questions

If you have questions about Payload, reach out on their [Discord](https://discord.com/invite/payload) or start a [GitHub discussion](https://github.com/payloadcms/payload/discussions).
