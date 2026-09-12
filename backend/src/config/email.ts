import nodemailer from "nodemailer";

const smtpUser = process.env.SMTP_USER;
const smtpAppPassword = process.env.SMTP_APP_PASSWORD;

console.log({
  smtpUser: smtpUser,
  smtpAppPasswordConfigured: Boolean(smtpAppPassword),
  smtpAppPasswordLength: smtpAppPassword?.length,
});

if (!smtpUser) {
  throw new Error("SMTP_USER is not defined");
}

if (!smtpAppPassword) {
  throw new Error(
    "SMTP_APP_PASSWORD is not defined",
  );
}

export const emailTransporter =
  nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: smtpUser,
      pass: smtpAppPassword,
    },
  });