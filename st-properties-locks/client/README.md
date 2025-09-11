# Smart Lock Manager MVP

A secure, production-ready smart lock management system with Seam.co integration and extensible architecture for future custom integrations.

## Features

- **Seam.co Integration**: Full support for Seam's smart lock API
- **Lock Management**: View status, lock/unlock devices remotely
- **Schedule Management**: Create, view, and manage automated lock schedules
- **Security First**: Secure API key handling, audit logging, and data protection
- **Extensible Architecture**: Provider pattern for easy integration of custom lock APIs
- **Offline Support**: Local data caching for reliability
- **Real-time Updates**: Live status monitoring and updates

## Quick Start

1. **Get Seam Credentials**
   - Sign up at [Seam Console](https://console.seam.co/)
   - Create a new workspace
   - Generate an API key
   - Note your workspace ID

2. **Configure the Application**
   - Run the application
   - Enter your Seam API key and workspace ID
   - Choose sandbox for testing or production for live locks
   - Test the connection

3. **Start Managing Locks**
   - View all connected locks
   - Monitor lock status and battery levels
   - Lock/unlock devices remotely
   - Create and manage schedules

## Environment Setup

### Sandbox Testing
- Use sandbox environment for development and testing
- No real locks are affected
- Perfect for development and demonstrations

### Production Deployment
- Switch to production environment
- Connect real smart locks
- All actions affect actual hardware

## Security Features

- **API Key Protection**: Keys are stored securely and never logged in plain text
- **Audit Logging**: All actions are logged with timestamps and user context
- **Input Validation**: All inputs are validated and sanitized
- **Rate Limiting**: Built-in protection against API abuse
- **Error Handling**: Comprehensive error handling with user-friendly messages

## Architecture

### Provider Pattern
The system uses an abstract provider interface that allows for easy integration of multiple lock systems:

```typescript
interface LockProvider {
  name: string;
  getLocks(): Promise<Lock[]>;
  getLockStatus(lockId: string): Promise<Lock>;
  lockDevice(lockId: string): Promise<boolean>;
  unlockDevice(lockId: string): Promise<boolean>;
  // ... schedule management methods
}
```

### Current Providers
- **SeamProvider**: Full integration with Seam.co API

### Future Providers
The architecture supports adding custom providers for:
- Direct manufacturer APIs (August, Yale, Schlage, etc.)
- Custom IoT platforms
- Legacy systems integration

## Data Storage

Currently uses local file storage for easy development and testing. The storage layer is abstracted and can be easily replaced with:
- PostgreSQL
- MongoDB
- Redis
- Any other database system

## API Integration

### Seam.co Integration
- Device management and control
- Access code scheduling
- Real-time status monitoring
- Battery level tracking
- Connection status monitoring

### Supported Lock Operations
- **Status Check**: Get current lock state and metadata
- **Lock Control**: Remote lock/unlock operations
- **Schedule Management**: Time-based access control
- **Battery Monitoring**: Track device power levels
- **Connection Status**: Monitor device connectivity

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Configuration

The application supports both environment variables and runtime configuration:

1. **Environment Variables** (`.env` file)
2. **Runtime Configuration** (through the UI)
3. **Local Storage** (for persistence)

## Security Considerations

- Never commit API keys to version control
- Use environment variables for sensitive configuration
- Regularly rotate API keys
- Monitor audit logs for suspicious activity
- Use HTTPS in production
- Implement proper user authentication for multi-user deployments

## Troubleshooting

### Common Issues

1. **Connection Failed**
   - Verify API key and workspace ID
   - Check network connectivity
   - Ensure correct environment (sandbox vs production)

2. **No Locks Found**
   - Verify locks are connected to your Seam workspace
   - Check lock connectivity and power
   - Refresh the device list

3. **Schedule Issues**
   - Ensure lock supports scheduling features
   - Check time zone settings
   - Verify schedule conflicts

## Support

For Seam-specific issues, consult the [Seam Documentation](https://docs.seam.co/) or contact Seam support.

For application issues, check the browser console for detailed error messages and audit logs.