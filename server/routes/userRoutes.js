import express from 'express';
import { register, login, setAvatarImage, getAllUsers, logout, refreshToken } from '../controller/usersController.js';
import passport from 'passport';
const router = express.Router();

router.get('/user', (req, res) => {
    console.log(req.user);
    res.json(req.user);
});
router.get('/login/google', passport.authenticate('google'));
router.get(
    '/login/google/callback',
    passport.authenticate('google', {
        successRedirect: 'http://localhost:9999',
        failureRedirect: 'http://localhost:9999/login',
    }),
);

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/refresh-token', refreshToken);
router.post('/set-avatar/:id', setAvatarImage);
router.get('/all-users/:id', getAllUsers);
export default router;
