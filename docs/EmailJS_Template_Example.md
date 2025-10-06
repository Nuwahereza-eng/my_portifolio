# EmailJS Template Example

Copy this template exactly into your EmailJS template editor:

## Template Settings:
- **Template Name**: Portfolio Contact Form
- **Subject**: New Contact Message: {{subject}}
- **To Email**: nuwaherezapeter34@gmail.com

## Template Content:

```
You have received a new contact message from your portfolio website:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📧 CONTACT DETAILS:
Name: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

💬 MESSAGE:
{{message}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 TO REPLY:
Simply reply to this email and it will go directly to {{from_email}}

🌐 Sent via Portfolio Contact Form
⏰ Received on {{date}}
```

## Variable Mapping:
Make sure these variables are mapped correctly in EmailJS:

- `{{from_name}}` → Visitor's name from the form
- `{{from_email}}` → Visitor's email (this becomes the reply-to address)
- `{{subject}}` → Subject line from the form
- `{{message}}` → Message content from the form
- `{{to_name}}` → Your name (Nuwahereza Peter)
- `{{to_email}}` → Your email (nuwaherezapeter34@gmail.com)

## How to Set Up in EmailJS:

1. **Go to Email Templates** in your EmailJS dashboard
2. **Click "Create New Template"**
3. **Fill in the template details:**
   - Template Name: `Portfolio Contact Form`
   - Subject: `New Contact Message: {{subject}}`
   - To Email: `nuwaherezapeter34@gmail.com`
   - Content: Copy the template above

4. **Test the template** by sending a test email
5. **Save the template** and copy the Template ID
6. **Update your script.js** with the Template ID

## Expected Email Result:
When someone fills out your contact form, you'll receive an email like this:

```
To: nuwaherezapeter34@gmail.com
Subject: New Contact Message: Flutter App Development

You have received a new contact message from your portfolio website:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📧 CONTACT DETAILS:
Name: Jane Developer
Email: jane.developer@company.com
Subject: Flutter App Development

💬 MESSAGE:
Hi Peter! I came across your portfolio and I'm really impressed with your Flutter projects. We have an exciting mobile app project and would love to discuss potential collaboration. Are you available for a quick call this week?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📝 TO REPLY:
Simply reply to this email and it will go directly to jane.developer@company.com

🌐 Sent via Portfolio Contact Form
⏰ Received on October 6, 2025
```

This way, you get all the visitor's information and can easily reply to them!