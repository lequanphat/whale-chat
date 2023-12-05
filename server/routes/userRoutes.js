import express from 'express';
import passport from 'passport';
import userController from '../controller/usersController.js';
const router = express.Router();

router.get('/user', userController.getUser);

router.get('/login/google', passport.authenticate('google'));
router.get(
    '/login/google/callback',
    passport.authenticate('google', {
        successRedirect: 'http://localhost:9999',
        failureRedirect: 'http://localhost:9999/login',
    }),
);

router.post('/set-avatar/:id', userController.setAvatarImage);
router.get('/all-users/:id', userController.getAllUsers);
export default router;
