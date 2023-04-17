import passport from "passport";
import { Strategy as LinkedInStrategy } from "passport-linkedin-oauth2";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { Strategy as TwitterStrategy } from "passport-twitter";
import User, { UserType } from "../../models/userModel";
import dotenv from "dotenv";
dotenv.config();

function assertEnvVariable(variable: string | undefined, name: string): string {
  if (!variable) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return variable;
}

passport.serializeUser((user, done) => {
  done(null, (user as UserType)._id);
});

passport.deserializeUser(async (id, done) => {
  console.log("deserializeUser");
  console.log(id);
  //const user = await User.findById(id);
  done(null, null);
});

// LinkedIn Strategy

// ...
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

// ...

/* 
// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      // Handle user data and save or update the user in your database
    }
  )
);

// Facebook Strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID!,
      clientSecret: process.env.FACEBOOK_APP_SECRET!,
      callbackURL: "/auth/facebook/callback",
      profileFields: ["id", "email", "displayName", "photos"],
    },
    async (accessToken, refreshToken, profile, done) => {
      // Handle user data and save or update the user in your database
    }
  )
);

// Twitter Strategy
passport.use(
  new TwitterStrategy(
    {
      consumerKey: process.env.TWITTER_CONSUMER_KEY!,
      consumerSecret: process.env.TWITTER_CONSUMER_SECRET!,
      callbackURL: "/auth/twitter/callback",
      includeEmail: true,
    },
    async (accessToken, tokenSecret, profile, done) => {
      // Handle user data and save or update the user in your database
    }
  )
); */

export default passport;
