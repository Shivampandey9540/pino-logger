import { Router } from "express";

import UserService from "../service/user.service.js";
import protectRoute from "../middleware/index.js";
let userRoute = Router();

userRoute
  .post("/signup", UserService.signupUserService)
  .post("/login", UserService.loginUserService)
  .get("/profile", protectRoute, (req, res) => {
    try {
      res.send("hello");
    } catch (error) {
      console.log(error);
    }
  });

userRoute;
export default userRoute;
