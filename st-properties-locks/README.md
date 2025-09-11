# ST Properties - Smart Lock Manager

A secure, production-ready smart lock management system with Seam.co integration, featuring a React frontend and Node.js/Express backend with Prisma database integration.

## 📋 Overview

This project provides a complete solution for managing smart locks through the Seam.co platform, with an extensible architecture that supports future custom lock integrations. The system prioritizes security, audit logging, and reliability.

### Key Features

- **🔐 Seam.co Integration**: Full support for Seam's smart lock API
- **🎯 Lock Management**: View status, lock/unlock devices remotely
- **⏰ Schedule Management**: Create and manage automated lock schedules
- **🛡️ Security First**: Secure API key handling, audit logging, and data protection
- **🏗️ Extensible Architecture**: Provider pattern for easy integration of custom lock APIs
- **💾 Database Integration**: Prisma ORM with PostgreSQL/MySQL/SQLite support
- **📱 Real-time Updates**: Live status monitoring and updates
- **🔍 Audit Logging**: Comprehensive activity tracking

## 🏗️ Project Structure

```
st-properties-locks/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── providers/      # Context providers
│   │   └── types/          # TypeScript type definitions
│   ├── .env.example        # Client environment variables template
│   └── package.json
├── server/                 # Node.js/Express backend
│   ├── src/
│   │   ├── controllers/    # API controllers
│   │   ├── services/       # Business logic services
│   │   ├── routes/         # API routes
│   │   └── types/          # TypeScript type definitions
│   ├── prisma/
│   │   ├── schema.prisma   # Database schema
│   │   └── seed.ts         # Database seeding script
│   ├── cli/                # Command line tools
│   ├── .env.example        # Server environment variables template
│   └── package.json
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and npm
- **Database**: PostgreSQL, MySQL, or SQLite
- **Seam Account**: Sign up at [Seam Console](https://console.seam.co/)

### 1. Get Seam Credentials

1. Sign up at [Seam Console](https://console.seam.co/)
2. Create a new workspace
3. Generate an API key
4. Note your workspace ID

### 2. Clone and Install

```bash
# Clone the repository
git clone <repository-url>
cd st-properties-locks

# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 3. Database Setup

#### Choose Your Database

The project supports PostgreSQL, MySQL, or SQLite. Update the database provider in `server/prisma/schema.prisma`:

```prisma
datasource db {
  provider = "postgresql"  // or "mysql" or "sqlite"
  url      = env("DATABASE_URL")
}
```

#### Database Options

**PostgreSQL (Recommended for production):**
```bash
# Install PostgreSQL locally or use a cloud service
# Create a database named 'st_properties_locks'
```

**MySQL:**
```bash
# Install MySQL locally or use a cloud service
# Create a database named 'st_properties_locks'
```

**SQLite (Great for development):**
```bash
# No installation needed - SQLite file will be created automatically
```

### 4. Environment Configuration

#### Server Environment

```bash
cd server
cp .env.example .env
```

Edit `server/.env`:

```env
# Seam Configuration
SEAM_API_KEY=seam_apikey_your_actual_key_here
SEAM_WORKSPACE_ID=your_actual_workspace_id_here
SEAM_ENVIRONMENT=sandbox

# Server Configuration
PORT=3001
NODE_ENV=development

# Database Configuration
# PostgreSQL example:
DATABASE_URL="postgresql://username:password@localhost:5432/st_properties_locks?schema=public"

# MySQL example:
# DATABASE_URL="mysql://username:password@localhost:3306/st_properties_locks"

# SQLite example:
# DATABASE_URL="file:./dev.db"
```

#### Client Environment

```bash
cd ../client
cp .env.example .env
```

Edit `client/.env`:

```env
# Seam Configuration
VITE_SEAM_API_KEY=seam_apikey_your_actual_key_here
VITE_SEAM_WORKSPACE_ID=your_actual_workspace_id_here
VITE_SEAM_ENVIRONMENT=sandbox

# Server Configuration
VITE_SERVER_URL=http://localhost:3001
VITE_SERVER_TIMEOUT=30000

# Environment
VITE_NODE_ENV=development
```

### 5. Database Initialization

```bash
cd server

# Generate Prisma client
npm run db:generate

# Create and run database migrations
npm run db:migrate

# Seed the database with sample data
npm run db:seed

# (Optional) Open Prisma Studio to view your data
npm run db:studio
```

### 6. Start Development Servers

#### Terminal 1 - Server
```bash
cd server
npm run dev
```

#### Terminal 2 - Client
```bash
cd client
npm run dev
```

### 7. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001
- **Health Check**: http://localhost:3001/health
- **Prisma Studio**: http://localhost:5555 (if running `npm run db:studio`)

## 📊 Database Management

### Available Commands

```bash
# Generate Prisma client after schema changes
npm run db:generate

# Create a new migration
npm run db:migrate

# Deploy migrations (production)
npm run db:migrate:deploy

# Push schema changes without migrations (development)
npm run db:push

# Reset database (⚠️ destroys all data)
npm run db:reset

# Seed database with sample data
npm run db:seed

# Open Prisma Studio database browser
npm run db:studio
```

### Schema Management

The database schema is defined in [`server/prisma/schema.prisma`](server/prisma/schema.prisma). Key models include:

- **Lock**: Device information and status
- **Schedule**: Automated lock/unlock schedules
- **AccessCode**: Temporary and permanent access codes
- **AuditLog**: Security and activity logging

### Making Schema Changes

1. Edit `server/prisma/schema.prisma`
2. Run `npm run db:migrate` to create a migration
3. Run `npm run db:generate` to update the Prisma client

## 🔧 Development

### Server Development

```bash
cd server

# Start development server with hot reload
npm run dev

# Run tests
npm test

# Build for production
npm run build

# Start production server
npm start
```

### Client Development

```bash
cd client

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### CLI Tools

The server includes CLI tools for administration:

```bash
cd server

# Access CLI tools
npm run cli
```

## 🛡️ Security Features

- **API Key Protection**: Keys are stored securely and never logged
- **Audit Logging**: All actions are logged with timestamps and context
- **Input Validation**: Comprehensive validation and sanitization
- **Rate Limiting**: Built-in protection against API abuse
- **HTTPS Enforcement**: Security headers and CSP policies
- **Database Security**: Parameterized queries via Prisma

## 🏭 Production Deployment

### Environment Setup

1. **Use Production Environment Variables**
   ```env
   NODE_ENV=production
   SEAM_ENVIRONMENT=production
   DATABASE_URL=your_production_database_url
   ```

2. **Database Migration**
   ```bash
   npm run db:migrate:deploy
   ```

3. **Build Applications**
   ```bash
   # Build server
   cd server && npm run build
   
   # Build client
   cd client && npm run build
   ```

### Security Checklist

- [ ] Use production Seam API keys
- [ ] Enable HTTPS
- [ ] Set secure environment variables
- [ ] Configure database encryption at rest
- [ ] Set up monitoring and alerting
- [ ] Regular security audits
- [ ] Implement proper user authentication

## 📖 API Documentation

### Health Endpoints

- `GET /health` - Basic health check
- `GET /api/health` - Detailed health check with service status

### Lock Management

- `GET /api/locks` - Get all locks
- `GET /api/locks/:id` - Get specific lock
- `POST /api/locks/:id/lock` - Lock device
- `POST /api/locks/:id/unlock` - Unlock device

### Schedule Management

- `GET /api/schedules` - Get all schedules
- `POST /api/schedules` - Create schedule
- `PUT /api/schedules/:id` - Update schedule
- `DELETE /api/schedules/:id` - Delete schedule

## 🔍 Troubleshooting

### Common Issues

**Database Connection Failed**
- Verify DATABASE_URL in `.env`
- Ensure database server is running
- Check network connectivity and credentials

**Seam API Connection Failed**
- Verify API key and workspace ID
- Check SEAM_ENVIRONMENT setting
- Ensure network connectivity to Seam servers

**Migration Errors**
- Check database permissions
- Verify schema syntax
- Use `npm run db:reset` for development (⚠️ destroys data)

**Frontend Build Issues**
- Ensure all environment variables are prefixed with `VITE_`
- Check TypeScript errors
- Verify API endpoint configuration

### Logs and Debugging

- **Server logs**: Console output shows detailed request/response info
- **Database queries**: Enable in development via Prisma log settings
- **Audit logs**: Check database `audit_logs` table
- **Browser console**: Frontend errors and network requests

## 📚 Documentation

- [Client Documentation](client/README.md) - Frontend-specific details
- [Security Guidelines](client/docs/SECURITY.md) - Comprehensive security guide
- [Seam API Documentation](https://docs.seam.co/) - Official Seam docs
- [Prisma Documentation](https://www.prisma.io/docs/) - Database ORM guide

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Run security checks
6. Submit a pull request

## 📄 License

ISC License - see LICENSE file for details

## 📞 Support

- **Application Issues**: Check browser console and server logs
- **Seam Integration**: [Seam Documentation](https://docs.seam.co/) and support
- **Database Issues**: [Prisma Documentation](https://www.prisma.io/docs/)
- **Security Concerns**: See [Security Guidelines](client/docs/SECURITY.md)

---

**⚠️ Security Note**: Never commit API keys or sensitive data to version control. Always use environment variables for configuration.