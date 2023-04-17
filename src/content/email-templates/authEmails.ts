const signupreq = (key: number): string =>
  `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registration Email</title>
</head>
<body>
    <div style="font-family: Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Welcome to CapHub!</h2>
        <p>Thank you for signing up. Please confirm your email address by providing the key below:</p>
        <p style="background-color: #3f3f3f; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 5px; display: inline-block; margin-bottom: 20px;">${key}</p>
        <p>If you did not sign up for our platform, please ignore this email.</p>
        <p>Best regards,</p>
        <p>The CapHub Team</p>
    </div>
</body>
</html>
`;

const passreset = (key: number): string =>
  `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Forgot Password Email</title>
  </head>
  <body>
      <div style="font-family: Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Welcome to CapHub!</h2>
          <p>We received a request to reset your password. Please provide the key below to set a new password:</p>
          <p style="background-color: #3f3f3f; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 5px; display: inline-block; margin-bottom: 20px;">${key}</p>
          <p>If you did not request a password reset, please ignore this email.</p>
          <p>Best regards,</p>
          <p>The CapHub Team</p>
      </div>
  </body>
  </html>
  `;

export { signupreq, passreset };
