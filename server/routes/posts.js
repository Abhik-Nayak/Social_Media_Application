import express from "express";

import { getPosts ,createPost} from "../controllers/posts.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", createPost);
// router.get("/" , (req,res)=> {
//     res.send("This Works!");
// })
export default router;