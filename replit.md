# replit.md

## Overview

This is a Flask-based personal portfolio website for Shaurya Gupta, an AI Developer and 11th-grade student. The application showcases projects, services, and achievements with a focus on AI tools, web applications, and data visualization. The site includes a contact form with email notification functionality and uses SQLAlchemy for database operations.

## System Architecture

### Frontend Architecture
- **Template Engine**: Jinja2 templates with Flask's built-in rendering
- **Styling Framework**: Bootstrap 5.3.0 for responsive design
- **JavaScript**: Vanilla JavaScript for smooth scrolling, navbar effects, and form interactions
- **Icons**: Feather Icons for consistent iconography
- **Fonts**: Google Fonts (Inter for headings, Roboto for body text)

### Backend Architecture
- **Framework**: Flask web framework with Python 3.11
- **Database ORM**: SQLAlchemy with Flask-SQLAlchemy extension
- **Email Service**: Flask-Mail for contact form notifications
- **WSGI Server**: Gunicorn for production deployment
- **Middleware**: ProxyFix for handling proxy headers in deployment

### Data Storage
- **Primary Database**: Configurable via DATABASE_URL environment variable
- **Default**: SQLite for development (`portfolio.db`)
- **Production Ready**: PostgreSQL support via psycopg2-binary
- **Connection Management**: Pool recycling and pre-ping for reliability

## Key Components

### Models (`models.py`)
- **ContactMessage**: Stores contact form submissions with fields for name, email, message, and timestamp

### Routes (`routes.py`)
- **Index Route** (`/`): Serves the main portfolio page
- **Contact Route** (`/contact`): Handles POST requests for contact form submissions with validation and email notifications

### Application Factory (`app.py`)
- Centralized Flask application configuration
- Extension initialization (SQLAlchemy, Flask-Mail)
- Environment-based configuration management
- Database table creation on startup

### Entry Point (`main.py`)
- Simple WSGI application entry point
- Development server configuration

## Data Flow

1. **Contact Form Submission**:
   - User fills out contact form on frontend
   - Form data validated on server-side
   - Valid submissions saved to ContactMessage table
   - Email notification sent to configured recipient
   - User redirected with success/error flash message

2. **Database Operations**:
   - SQLAlchemy handles ORM operations
   - Database connection pooling manages concurrent requests
   - Automatic table creation on application startup

## External Dependencies

### Core Dependencies
- **Flask**: Web framework and template engine
- **Flask-SQLAlchemy**: Database ORM integration
- **Flask-Mail**: Email notification service
- **Gunicorn**: Production WSGI server
- **psycopg2-binary**: PostgreSQL database adapter
- **email-validator**: Email address validation

### Frontend Dependencies (CDN)
- **Bootstrap 5.3.0**: CSS framework
- **Feather Icons**: Icon library
- **Google Fonts**: Typography (Inter, Roboto)

### Environment Variables
- **SESSION_SECRET**: Flask session security key
- **DATABASE_URL**: Database connection string
- **MAIL_SERVER**: SMTP server configuration
- **MAIL_PORT**: SMTP port (default: 587)
- **MAIL_USERNAME**: Email authentication username
- **MAIL_PASSWORD**: Email authentication password
- **MAIL_DEFAULT_SENDER**: Default email sender address

## Deployment Strategy

### Replit Configuration
- **Runtime**: Python 3.11 with Nix package management
- **Packages**: OpenSSL and PostgreSQL system dependencies
- **Deployment Target**: Autoscale for production scaling
- **Process**: Gunicorn with host binding and port configuration

### Production Settings
- **WSGI Server**: Gunicorn with process binding on 0.0.0.0:5000
- **Proxy Handling**: ProxyFix middleware for reverse proxy compatibility
- **Database**: Connection pooling with 300-second recycle and pre-ping health checks
- **Logging**: Debug-level logging for troubleshooting

### Development vs Production
- **Development**: SQLite database, debug mode enabled
- **Production**: PostgreSQL recommended, environment-based configuration
- **Security**: Session secret from environment variable, TLS for email

## Recent Changes
- June 26, 2025: Complete portfolio website implementation and enhancements
  - Added Shaurya's professional profile photo from wooden deck setting
  - Implemented authentic personal storytelling to avoid AI-generated feel
  - Created comprehensive project showcase with live links
  - Built working contact form with Flask-Mail integration
  - Added SEO meta tags and social media sharing optimization
  - Integrated professional design with Inter/Roboto typography
  - Implemented smooth scrolling and fade-in animations
  - Added responsive design for mobile compatibility
  - Changed navbar branding from "Shaurya Gupta" to "sCODER"
  - Added continuous typewriter effect with type/erase animation loop
  - Fixed dark theme navbar scrolling bug with proper background updates
  - Prevented theme flash on load with inline script
  - Added Twitter link: https://x.com/shaurya13797357
  - Created stylized "S" favicon with blue gradient background

## Changelog
- June 26, 2025: Portfolio website completed and ready for deployment

## User Preferences

Preferred communication style: Simple, everyday language.