# Portfolio Website Structure

This portfolio website is organized with a professional folder structure for better maintainability and security.

## 📁 Project Structure

```
my_portifolio/
├── index.html                 # Main HTML file
├── .gitignore                # Git ignore file for security
├── 
├── assets/                   # Static assets
│   ├── images/              # Images and photos
│   │   └── peterImage.jpg   # Profile picture
│   └── documents/           # Documents and files
│       ├── resume.pdf       # Your resume (add this file)
│       └── resume_placeholder.txt
│
├── css/                     # Stylesheets
│   └── styles.css          # Main stylesheet
│
├── js/                      # JavaScript files
│   └── script.js           # Main JavaScript functionality
│
├── config/                  # Configuration files
│   ├── config.js           # Main configuration (DO NOT COMMIT)
│   └── config.example.env  # Example environment variables
│
└── docs/                    # Documentation
    ├── README.md           # This file
    ├── EmailJS_Setup_Instructions.md
    └── EmailJS_Template_Example.md
```

## 🔧 Configuration Setup

### 1. Setup EmailJS Configuration

1. Copy the example configuration:
   ```bash
   cp config/config.example.env config/config.js
   ```

2. Edit `config/config.js` with your actual EmailJS credentials:
   ```javascript
   const CONFIG = {
       emailjs: {
           publicKey: 'your_actual_public_key',
           serviceId: 'your_actual_service_id', 
           templateId: 'your_actual_template_id',
       },
       // ... other settings
   };
   ```

### 2. Add Your Resume

Place your PDF resume in the `assets/documents/` folder:
- File name: `resume.pdf`
- The download link will work automatically

### 3. Update Profile Picture

Replace `assets/images/peterImage.jpg` with your actual profile picture:
- Recommended size: 400x400px or larger (square format)
- Supported formats: JPG, PNG, WebP

## 🔒 Security Features

### Environment Variables
- Sensitive configuration is stored in `config/config.js`
- This file is excluded from version control via `.gitignore`
- Use `config.example.env` as a template

### Git Ignore
The `.gitignore` file prevents committing:
- Configuration files with API keys
- Temporary files
- System files
- Personal notes

## 🚀 Deployment

### Before Deploying:
1. ✅ Configure EmailJS in `config/config.js`
2. ✅ Add your PDF resume to `assets/documents/resume.pdf`
3. ✅ Update profile picture in `assets/images/`
4. ✅ Test contact form functionality
5. ✅ Update social media links in config

### Deployment Options:
- **GitHub Pages**: Free hosting for static sites
- **Netlify**: Easy deployment with form handling
- **Vercel**: Fast deployment with analytics
- **Custom Server**: Upload files to your web server

## 🛠 Development

### Local Development:
1. Clone the repository
2. Open `index.html` in a web browser
3. For live reloading, use a local server:
   ```bash
   python -m http.server 8000
   # or
   npx serve .
   ```

### Making Changes:
1. Edit files in their respective folders
2. Test locally before committing
3. Don't commit `config/config.js` with real API keys

## 📝 File Descriptions

| File/Folder | Purpose |
|-------------|---------|
| `index.html` | Main webpage |
| `css/styles.css` | All styling and animations |
| `js/script.js` | Interactivity and EmailJS integration |
| `config/config.js` | Configuration and API keys |
| `assets/images/` | Profile pictures and project images |
| `assets/documents/` | Resume and other downloadable files |
| `docs/` | Documentation and setup guides |

## 🔄 Updates and Maintenance

### Regular Updates:
- Keep EmailJS credentials secure
- Update resume periodically
- Add new projects to the portfolio
- Update social media links

### Version Control:
- Commit changes regularly
- Use meaningful commit messages
- Don't commit sensitive configuration files

## 📞 Support

If you need help with setup or configuration, refer to:
- `docs/EmailJS_Setup_Instructions.md` for email setup
- `docs/EmailJS_Template_Example.md` for email templates

---

Built with ❤️ by Nuwahereza Peter