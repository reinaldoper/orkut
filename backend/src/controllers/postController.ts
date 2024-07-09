import postService from "../service/postService";
import { Request, Response } from "express";
import statusCodes from "../statusCodes"
import PostDto from "../Dtos/postDTO";
import { io } from '../server';

class PostController implements PostDto {
    async create(req: Request, res: Response) {
        const { id: userId } = req.body.id;
        req.body.userId = userId;
        const post = await postService.createPost(req.body);
        io.emit('message', post);
        return res.status(statusCodes.CREATED).json({ message: post });
    }

    async list(req: Request, res: Response) {
        const posts = await postService.getAllPosts();
        return res.status(statusCodes.OK).json({ message: posts });
    }

    async getPostById(req: Request, res: Response) {
        const { id } = req.params;
        const post = await postService.getPostById(Number(id));
        if(post) return res.status(statusCodes.OK).json({ message: post });
        else return res.status(statusCodes.NOT_FOUND).json({ message: "Post not found" });
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const { content, title } = req.body;
        const { id: userId } = req.body.id;
        const post = await postService.updatePostById(Number(id), { content, title, userId });
        return res.status(statusCodes.OK).json({ message: post });
    }

    async updatePartial(req: Request, res: Response) {
        const { id } = req.params;
        const { likes } = req.body;
        const post = await postService.updatePostLikeById(Number(id), { likes });
        return res.status(statusCodes.OK).json({ message: post });
    }

    async deletePostById(req: Request, res: Response) {
        const { id } = req.params;
        const post = await postService.deletePostById(Number(id));
        return res.status(statusCodes.OK).json({ message: post });
    }
}


export default new PostController();