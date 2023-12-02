import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

import passport from 'passport';
import dotenv from 'dotenv';
dotenv.config();
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
console.log(GOOGLE_CLIENT_ID);
console.log(GOOGLE_CLIENT_SECRET);

passport.use(
    new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: '/api/auth/login/google/callback',
            scope: ['profile'],
        },
        function (accessToken, refreshToken, profile, callback) {
            const user = {
                id: profile.id,
                username: profile.displayName,
                avatarImage: profile.photos[0].value,
            };
            callback(null, user);
        },
    ),
);
passport.serializeUser((user, callback) => {
    console.log(user);
    callback(null, user); // set cookies here
});
passport.deserializeUser((user, callback) => {

    callback(null, user);
});
export default passport;
