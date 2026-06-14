import User from "../models/user.model.js";

import {
  verifyGoogleToken,
} from "../services/googleAuth.service.js";

import jwt from "jsonwebtoken";

export const googleLogin =
  async (req, res) => {
    try {
      const { token } =
        req.body;

      if (!token) {
        return res.status(400).json({
          success: false,
          message:
            "Google token required",
        });
      }

      const payload =
        await verifyGoogleToken(
          token
        );

      const {
        sub,
        email,
        name,
        picture,
      } = payload;

      let user =
        await User.findOne({
          email,
        });

      if (!user) {
        user =
          await User.create({
            name,
            email,
            avatar: picture,
            googleID: sub,
          });
      }

      const accessToken =
        jwt.sign(
          {
            userId:
              user._id,
          },
          process.env
            .JWT_ACCESS_SECRET,
          {
            expiresIn:
              "15m",
          }
        );

      const refreshToken =
        jwt.sign(
          {
            userId:
              user._id,
          },
          process.env
            .JWT_REFRESH_SECRET,
          {
            expiresIn:
              "7d",
          }
        );

      user.refreshToken =
        refreshToken;

      await user.save();

      res.cookie(
        "accessToken",
        accessToken,
        {
          httpOnly: true,
          secure: true,
          sameSite:
            "strict",
        }
      );

      res.cookie(
        "refreshToken",
        refreshToken,
        {
          httpOnly: true,
          secure: true,
          sameSite:
            "strict",
        }
      );

      return res.status(200).json({
        success: true,
        token:
          accessToken,
        user,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };