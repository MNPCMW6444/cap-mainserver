import passport from "passport";
import { Strategy as LinkedInStrategy } from "passport-linkedin-oauth2";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { Strategy as TwitterStrategy } from "passport-twitter";
import { User } from "./models/userModel";

passport.serializeUser((user, done) => {
  done(null, (user as User)._id);
});

passport.deserializeUser(async (id, done) => {
  // Replace this with a function that finds a user by ID in your database
  // const user = await User.findById(id);
  const user = null;
  done(null, user);
});

// LinkedIn Strategy
passport.use(
  new LinkedInStrategy(
    {
      clientID: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
      callbackURL: "/auth/linkedin/callback",
      scope: ["r_emailaddress", "r_liteprofile"],
    },
    async (accessToken, refreshToken, profile, done) => {
      // Handle user data and save or update the user in your database
    }
  )
);

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
);

export default passport;
