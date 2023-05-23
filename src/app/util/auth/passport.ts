import passport from "passport";
import { Strategy as LinkedInStrategy } from "passport-linkedin-oauth2";
import User from "../../models/auth/userModel";
import dotenv from "dotenv";

import { CaphubUser } from "@caphub-group/caphub-types";

dotenv.config();

function assertEnvVariable(variable: string | undefined, name: string): string {
  if (!variable) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return variable;
}

passport.serializeUser((user, done) => {
  done(null, (user as CaphubUser)._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use(
  new LinkedInStrategy(
    {
      clientID: assertEnvVariable(
        process.env.LINKEDIN_CLIENT_ID,
        "LINKEDIN_CLIENT_ID"
      ),
      clientSecret: assertEnvVariable(
        process.env.LINKEDIN_CLIENT_SECRET,
        "LINKEDIN_CLIENT_SECRET"
      ),
      callbackURL: `/auth/linkedin/callback${
        process.env.NODE_ENV === "development"
          ? process.env.LINKEDIN_CLIENT_SECRET
          : ""
      }`,
      scope: ["r_emailaddress", "r_liteprofile"],
    },
    async (_, __, profile, done) => {
      try {
        const userEmails = profile.emails.map(({ value }) => value);
        const userPromises = userEmails.map((email) => User.findOne({ email }));
        const users = await Promise.all(userPromises);

        const existingUser = users.find((user) => user !== null);
        if (existingUser) {
          done(null, existingUser);
        } else {
          const newUser = new User({
            email: profile.emails[0].value,
            name: profile.displayName,
            passwordHash: "unset",
          });
          await newUser.save();
          done(null, newUser);
        }
      } catch (error) {
        done(error);
      }
    }
  )
);

export default passport;
