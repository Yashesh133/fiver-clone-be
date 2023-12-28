import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const hash = bcrypt.hashSync(req.body.password, 5);
    console.log("hash: ", hash);
    req.body.password = hash;
    const newUser = new userModel(req.body);

    await newUser.save();
    res.status(201).send("new user created successfully");
  } catch (error) {
    res.status(500).send("something went wrong");
  }
};
export const login = async (req, res) => {
  try {
    // Check if the user with the provided username exists
    const user = await userModel.findOne({ username: req.body.username });
    if (!user) return res.status(404).send("User not found");

    // Compare the provided password with the hashed password stored in the database
    const isCorrect = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!isCorrect)
      return res.status(401).send("Password and username are incorrect");

    // If the credentials are correct, send user information (excluding the password)
    const { password, ...info } = user._doc;
    res.status(200).send(info);
  } catch (error) {
    // Handle any errors that occur during the process
    console.error(error);
    res.status(500).send("Something went wrong");
  }
};

export const logOut = async (req, res) => {};
