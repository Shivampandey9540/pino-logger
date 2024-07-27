import user from "../model/user.model.js";
import generateTokenAndSetCookie from "../utils/index.js";
import bcrypt from "bcryptjs";

async function signupUserService(req, res) {
  try {
    const userExist = await user.findOne({
      username: req.body.username,
    });
    if (userExist) {
      res.redirect("/dashboard")
      return res.status(502).send({
        message: "User Already Exist",
      });
    }
    let payload = req.body;
    const userCreated = await user.create(payload);

    generateTokenAndSetCookie(userCreated._id, res);
    return res.send({
      message: "User Created",
      data: userCreated,
    });
  } catch (error) {
    // console.log(error);
    res.send("Something Went Wrong");
  }
}

async function loginUserService(req, res) {
  try {
    console.log(req.body)
    let verificationPaylod = req.body;
    const userExist = await user.findOne({
      username: verificationPaylod.username,
    });
    console.log(verificationPaylod)
    if (!userExist) {
      return res.status(404).send({
        message: "User Not Found",
      });
    }
    let passwordMatch = bcrypt.compare(
      verificationPaylod.password,
      userExist.password
    );
    if (!passwordMatch) {
      return req.status(500).send({
        message: "Wrong Password",
      });
    }
    generateTokenAndSetCookie(userExist._id, res);
    res.status(200).send({
      message: "Login Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "something Went Wrong",
    });
  }
}
const UserService = {
  signupUserService,
  loginUserService,
};

export default UserService;
