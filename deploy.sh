#!/bin/bash

# 🚀 DentalFlow Deployment Script
# Automated deployment to Vercel with all checks

echo "🦷 DentalFlow - Starting deployment process..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the project root."
    exit 1
fi

print_status "Checking project structure..."

# Check for required files
required_files=("vercel.json" "src/main.tsx" "src/App.tsx" "vite.config.ts")
for file in "${required_files[@]}"; do
    if [ ! -f "$file" ]; then
        print_error "Required file $file not found!"
        exit 1
    fi
done

print_success "Project structure verified ✓"

# Clean previous builds
print_status "Cleaning previous builds..."
npm run clean 2>/dev/null || rm -rf dist .vercel

# Install dependencies
print_status "Installing dependencies..."
if ! npm ci; then
    print_error "Failed to install dependencies"
    exit 1
fi

print_success "Dependencies installed ✓"

# Run type checking
print_status "Running type checking..."
if ! npm run typecheck; then
    print_error "TypeScript type checking failed"
    exit 1
fi

print_success "Type checking passed ✓"

# Run linting
print_status "Running ESLint..."
if ! npm run lint; then
    print_warning "Linting issues found, but continuing..."
fi

print_success "Linting completed ✓"

# Build for production
print_status "Building for production..."
if ! npm run build; then
    print_error "Production build failed"
    exit 1
fi

print_success "Production build completed ✓"

# Check if dist directory exists and has content
if [ ! -d "dist" ] || [ -z "$(ls -A dist)" ]; then
    print_error "Build output directory 'dist' is missing or empty"
    exit 1
fi

print_success "Build output verified ✓"

# Test the build locally (optional)
read -p "Do you want to test the build locally before deploying? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    print_status "Starting local preview server..."
    print_status "Preview will be available at http://localhost:4173"
    print_status "Press Ctrl+C when done testing, then this script will continue..."
    npm run preview
fi

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    print_warning "Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Deploy to Vercel
print_status "Deploying to Vercel..."

# Check if this is the first deployment
if [ ! -d ".vercel" ]; then
    print_status "First time deployment - you may need to configure your project"
    vercel --prod
else
    print_status "Deploying to existing Vercel project..."
    vercel --prod
fi

deployment_status=$?

if [ $deployment_status -eq 0 ]; then
    print_success "🎉 Deployment completed successfully!"
    print_success "Your DentalFlow app is now live!"
    
    # Get deployment URL
    if [ -f ".vercel/project.json" ]; then
        PROJECT_NAME=$(cat .vercel/project.json | grep -o '"name":"[^"]*' | cut -d'"' -f4)
        print_success "Production URL: https://$PROJECT_NAME.vercel.app"
    fi
    
    echo ""
    echo "📋 Next steps:"
    echo "1. Test your live application"
    echo "2. Configure custom domain (if needed)"
    echo "3. Set up monitoring and analytics"
    echo "4. Add environment variables in Vercel dashboard"
    echo ""
    echo "🇲🇦 Your Moroccan dental practice app is ready!"
    
else
    print_error "Deployment failed"
    exit 1
fi