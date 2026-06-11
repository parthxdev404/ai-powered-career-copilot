import body from "express-validator";

export const createJobValidator = [
  body("title").notEmpty().withMessage("Title is required"),
  body("company").notEmpty().withMessage("Company is required"),
];
