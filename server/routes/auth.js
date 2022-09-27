import express from 'express';
import { signin, signup, googleAuth, logout } from '../controllers/auth.js';

const router = express.Router();


// signup
router.post("/signup", signup);

// sign in
router.post("/signin", signin);

// google auth
router.post("/google", googleAuth);

// user logout
router.get("/logout", logout);

export default router;