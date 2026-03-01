import { Request, Response } from "express";
import postService from "../services/posts.service.js";


export const addPost = async (req: Request, res: Response) => {
  try {
    const newPost = await postService.createPost(req.body);
    return res.status(201).json({ message: "Post créé",post: newPost })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message })
    }
  }
}
