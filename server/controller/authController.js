import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../model/auth.js";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage }).single("avatar");

export const SignController = (req, res, next) => {
  upload(req, res, async (err) => {
    try {
      if (err) return res.status(500).json({ message: "File upload error" });

      const { name, email, password, role } = req.body;
      if (!name || !email || !password || !role) {
        return res.status(403).json({ message: "All fields are required" });
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: "User is already registered" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role: role || "user",
        avatar: req.file ? `/uploads/${req.file.filename}` : null,
      });

      await newUser.save();

      return res.status(201).json({
        message: "User registered successfully",
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          avatar: newUser.avatar,
        },
      });
    } catch (error) {
      next(error);
    }
  });
};

const generateToken = (user) => {
  const accessToken = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_TOKEN,
    { expiresIn: "2d" }
  );
  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.JWT_REFRESH_TOKEN,
    { expiresIn: "7d" }
  );
  return { accessToken, refreshToken };
};

export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(403).json({ message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword) {
      return res.status(401).json({ message: "Password is incorrect" });
    }

    const { accessToken, refreshToken } = generateToken(user);

    return res.status(200).json({
      message: "User logged in successfully",
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const profileController = async (req, res, next) => {
  try {
    const profile = await User.findById(req.user.id).select("-password");
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    return res.status(200).json({
      message: "User profile fetched successfully",
      profile,
    });
  } catch (error) {
    next(error);
  }
};
