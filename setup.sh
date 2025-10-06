#!/bin/bash

# Portfolio Setup Script
# This script helps you set up your portfolio with proper configuration

echo "🚀 Portfolio Website Setup"
echo "=========================="
echo ""

# Check if config file exists
if [ -f "config/config.js" ]; then
    echo "⚠️  Configuration file already exists!"
    read -p "Do you want to overwrite it? (y/N): " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Setup cancelled."
        exit 1
    fi
fi

# Copy example config
echo "📋 Creating configuration file..."
cp config/config.example.env config/config.js

# Replace the env format with JS format
sed -i 's/EMAILJS_PUBLIC_KEY=/publicKey: "/g' config/config.js
sed -i 's/EMAILJS_SERVICE_ID=/serviceId: "/g' config/config.js
sed -i 's/EMAILJS_TEMPLATE_ID=/templateId: "/g' config/config.js
sed -i 's/CONTACT_EMAIL=/email: "/g' config/config.js
sed -i 's/=/: "/g' config/config.js
sed -i 's/$/",/g' config/config.js

echo "✅ Configuration file created at config/config.js"
echo ""

# Check for resume file
if [ ! -f "assets/documents/resume.pdf" ]; then
    echo "📄 Resume file not found!"
    echo "Please add your resume as: assets/documents/resume.pdf"
    echo ""
fi

# Check for profile image
if [ ! -f "assets/images/peterImage.jpg" ]; then
    echo "🖼️  Profile image not found!"
    echo "Please add your profile picture as: assets/images/peterImage.jpg"
    echo ""
fi

echo "📝 Next Steps:"
echo "1. Edit config/config.js with your EmailJS credentials"
echo "2. Add your resume PDF to assets/documents/resume.pdf"
echo "3. Replace profile picture in assets/images/peterImage.jpg"
echo "4. Test the contact form"
echo ""
echo "📚 Documentation:"
echo "- Read docs/EmailJS_Setup_Instructions.md for email setup"
echo "- Check README.md for full setup guide"
echo ""
echo "🎉 Setup complete! Your portfolio is ready to configure."