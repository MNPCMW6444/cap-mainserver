import { google } from "googleapis";
import nodemailer from "nodemailer";

import dotenv from "dotenv";
dotenv.config();

async function refreshAccessToken(
  clientId: string,
  clientSecret: string,
  refreshToken: string
) {
  const oauth2Client = new google.auth.OAuth2(clientId, clientSecret);

  oauth2Client.setCredentials({
    refresh_token: refreshToken,
  });

  const result = await oauth2Client.getAccessToken();
  return result.token;
}

export async function sendEmail(to: string, subject: string, text: string) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: "michael@caphub-group.com",
      clientId: process.env.CCP_CLIENT_ID || "",
      clientSecret: process.env.CCP_SECRET || "",
      refreshToken: process.env.GCP_REFRESH_TOKEN || "",
      accessToken: process.env.GCP_ACCESS_TOKEN || "",
    },
  });

  let mailOptions = {
    from: "michael@caphub-group.com",
    sender: "service@caphub-group.com",
    to,
    subject,
    text,
  };

  let result = await transporter.sendMail(mailOptions);
  return result;
}
