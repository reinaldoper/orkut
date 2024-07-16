import Comments from "../database/models/comentsPosts";
import TComments from "../types/TTypeComments";
import PostsModel from "../database/models/postsModel";


class Comment {
  constructor() {
  }
  createComment = async (data: TComments): Promise<TComments> => {
    const { postId, comments } = data;
    const post = await PostsModel.findByPk(postId);
    if (!post) {
      throw new Error("Post not found");
    }
    const comment = await Comments.create({
      postId,
      comments
    });
    return comment;
  }

  deleteComment = async (id: number): Promise<number> => {
    const comment = await Comments.destroy({
      where: {
        id
      }
    });
    return comment;
  }

  updateComment = async (id: number, comments: string): Promise<TComments | null> => {
    const updatedComment = await Comments.findOne({
      where: {
        id
      }
    });

    if (!updatedComment) {
      throw new Error("Comment not found");
    };
    await Comments.update({ comments }, {
      where: {
        id
      }
    });

    return updatedComment ? updatedComment as TComments : null;
  }

  getComments = async (): Promise<TComments[]> => {
    const comments = await Comments.findAll();
    return comments;
  }

  getCommentsById = async (id: number): Promise<TComments> => {
    const comment = await Comments.findByPk(id);
    return comment as TComments;
  }
}

export default new Comment();