import { Router } from "express";
import { createUserInformation } from "../controllers/user_information.controller.js";

const router = Router();

// POST /user-information
router.post("/", createUserInformation);

router.get("/", (req, res)=> {
    res.status(200).json({message: 'Ok here!'})
});
export default router;
