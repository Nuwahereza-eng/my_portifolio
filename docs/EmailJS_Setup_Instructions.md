# EmailJS Setup Instructions

To receive contact form messages directly in your email inbox, follow these steps:

## 1. Create EmailJS Account
- Go to https://www.emailjs.com/
- Sign up for a free account
- Verify your email address

## 2. Create Email Service
- In EmailJS dashboard, go to "Email Services"
- Click "Add New Service"
- Choose your email provider (Gmail, Outlook, etc.)
- **Important**: Use YOUR email account (nuwaherezapeter34@gmail.com)
- Follow the setup instructions for your chosen provider
- This service will send emails TO your inbox

## 3. Create Email Template
- Go to "Email Templates"
- Click "Create New Template"
- **Set the "To Email" field to: `nuwaherezapeter34@gmail.com`**
- Use this template structure:

```
To: nuwaherezapeter34@gmail.com
Subject: New Contact Message: {{subject}}

You have received a new message from your portfolio website:

Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
Reply directly to this email to respond to {{from_name}} at {{from_email}}
Sent via Portfolio Contact Form
```

## 4. Template Variables Setup
Make sure your template includes these variables:
- `{{from_name}}` - Visitor's name
- `{{from_email}}` - Visitor's email (for you to reply)
- `{{subject}}` - Message subject
- `{{message}}` - The actual message content

## 5. Update Your Code
Replace the placeholders in script.js:

```javascript
emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your actual public key
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
```

Find these values in your EmailJS dashboard:
- **Public Key**: Account → API Keys
- **Service ID**: Email Services → Your service
- **Template ID**: Email Templates → Your template

## 6. Test the Setup
- Deploy your website
- Fill out the contact form with test data
- Check your email inbox (nuwaherezapeter34@gmail.com)
- You should receive the visitor's message

## How It Works
1. Visitor fills out your contact form
2. EmailJS sends their message to your email inbox
3. You receive their contact details and message
4. You can reply directly from your email

## Important Notes
- **Free plan**: 200 emails per month
- **Emails go TO you**: You'll receive each contact form submission
- **Reply capability**: You can reply directly to the sender
- **Spam protection**: EmailJS handles delivery and security

## Email Template Example
When someone contacts you, you'll receive an email like this:

```
To: nuwaherezapeter34@gmail.com
Subject: New Contact Message: Project Collaboration

You have received a new message from your portfolio website:

Name: John Smith
Email: john.smith@company.com
Subject: Project Collaboration

Message:
Hi Peter, I saw your portfolio and I'm interested in discussing a Flutter project. Could we schedule a call this week?

---
Reply directly to this email to respond to John Smith at john.smith@company.com
Sent via Portfolio Contact Form
```

## Alternative Fallback
If you don't set up EmailJS, the form will fall back to opening the visitor's default email client with a pre-filled message to your email address.