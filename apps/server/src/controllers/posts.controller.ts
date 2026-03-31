import { Request, Response } from "express";
import postService from "../services/posts.service.js";


export const addPost = async (req: Request, res: Response) => {
  try {
    const newPost = await postService.createPost(req.body);
    return res.status(201).json({ message: "Post créé", post: newPost })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message })
    }
  }
}

export const getAllPosts = async (req: Request, res: Response) => {
  try {
    const allPosts = await postService.findAllPosts();
    return res.status(200).json(allPosts);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message })
    }
  }
}

export const updateOnePost = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    const updatedPost = await postService.updateById(id, req.body);
    return res.status(200).json({ message: "post modifié", updatedPost })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message })
    }
  }
}

export const deleteOnePost = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    const deletedPost = await postService.removeById(id);
    return res.status(200).json({ message: "Post supprimé", post: deleteOnePost })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message })
    }
  }
}

export const getOnePost = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    const post = await postService.findPostById(id);
    return res.status(200).json(post)
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message })
    }
  }
}
