const { app } = require('@azure/functions');
const sgMail = require('@sendgrid/mail');

// Set your SendGrid API key from the environment variables
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.http('contactmetrigger', {
  methods: ['POST'],
  authLevel: 'anonymous',
  handler: async (request, context) => {
    context.log(`HTTP function processed request for url "${request.url}"`);

    let body;
    try {
      body = await request.json();
    } catch (err) {
      return { status: 400, body: { error: 'Invalid JSON payload.' } };
    }

    const { name, email, message } = body;
    if (!name || !email || !message) {
      return {
        status: 400,
        body: { error: 'Please pass name, email, and message in the request body.' }
      };
    }

    // Construct the email message
    const msg = {
      to: 'name@exqample.com',      // Destination email (your email)
      from: 'name@exqample.com',    // Sender email (must be verified in SendGrid)
      subject: 'New Contact Form Submission',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `<h3>New Contact Form Submission</h3>
             <p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong><br>${message}</p>`
    };

    try {
      // Send the email via SendGrid
      await sgMail.send(msg);
      return {
        status: 200,
        body: { success: true, message: 'Email sent successfully!' }
      };
    } catch (error) {
      context.log.error('Error sending email:', error);
      return {
        status: 500,
        body: { success: false, message: 'Failed to send email', error: error.toString() }
      };
    }
  }
});
