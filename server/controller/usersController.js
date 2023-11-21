import CookieService from "../../client/src/utils/CookieService.mjs";
import userModel from "../model/userModel.js";
import brcypt from 'bcrypt'

const register = async (req, res, next) => {
    try {
        const {username, email, password } = req.body;
        const usernameCheck = await userModel.findOne({username});
        if (usernameCheck){
            return res.json({msg: "Username is already used", status: false});
        }
        const emailCheck = await userModel.findOne({email});
        if (emailCheck){
            return res.json({msg: "Email is already used", status: false});
        }
        const hashedPassword = await brcypt.hash(password, 10);
        const user = await userModel.create({
            username,
            email,
            password: hashedPassword
        });
        const newUser = { ...user._doc, password:'' }

        // CookieService.saveCookie(res, 'user', '123');
        console.log(newUser);
        return res.json({status: true, newUser})
    } catch (error) {
        next(error);
    }
}
export default register;