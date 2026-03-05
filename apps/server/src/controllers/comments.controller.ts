import { Request, Response } from "express";
import commentService from "../services/comments.service.js";


export const addComment = async (req: Request, res: Response) => {
  try {
    const newComment = await commentService.createComment(req.body);
    return res.status(201).json({ message: "Commentaire créé", commentaire: newComment })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message })
    }
  }
}

export const getAllComments = async (req: Request, res: Response) => {
  try {
    const allComments = await commentService.findAllComments();
    return res.status(200).json(allComments);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message })
    }
  }
}

export const updateOneComment = async (req: Request<{id: string}>, res: Response) => {
  try {
    const { id } = req.params;
    const updatedComment = await commentService.updateById(id, req.body);
    return res.status(200).json({message: "Comment modifié", commentaire: updatedComment})
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message })
    }
  }
}

export const deleteOneComment = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    const deletedComment = await commentService.removeById(id);
    return res.status(200).json({ message: "Commentaire supprimé", commentaire: deletedComment })
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message })
    }
  }
}

export const getOneComment = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const { id } = req.params;
    const comment = await commentService.findCommentById(id);
    return res.status(200).json({message:"comment trouvé", comment: comment})
  } catch (error) {
    if (error instanceof Error) {
      return res.status(400).json({ error: error.message })
    }
  }
}
