import PostsModel from "../database/models/postsModel";
import TPost from "../types/TTypePost";
import CategoriesModel from "../database/models/categoriesModel"

class PostService {

  constructor() {
  }

  createPost = async (post: TPost): Promise<TPost> => {
    const { userId, content, categoryId = 0, title } = post;
    console.log('userId', userId);
    const newPost = await PostsModel.create({
      userId,
      content,
      categoryId,
      title
    });
    return newPost as unknown as TPost;
  }

  getAllPosts = async (): Promise<TPost[]> => {
    const posts = await PostsModel.findAll();
    return posts as unknown as TPost[];
  }

  getPostById = async (id: number): Promise<TPost> => {
    const post = await PostsModel.findByPk(id, {
      include: [{
        model: CategoriesModel,
        as: 'category',
      }]
    });
    return post as unknown as TPost;
  }

  deletePostById = async (id: number): Promise<string> => {
    const resultPost = await this.getPostById(id);
    
    if (resultPost.userId === id) {
      await PostsModel.destroy({
        where: { id }
      });
      return 'Post deleted successfully';
    } else {
      return 'Post not found or unauthorize';
    }
  }

  updatePostById = async (id: number, post: TPost): Promise<TPost | string> => {
    const { content, title, userId } = post;
    
    const resultPost = await this.getPostById(id);
    if (resultPost.userId === userId) {
      const updatedPost = await PostsModel.update({
        content,
        title
      }, {
        where: { id },
        returning: true,
      });
      return updatedPost as unknown as TPost;
    } else {
      return "Post not found or unauthorize";
    }
  }

  updatePostLikeById = async (id: number, post: TPost): Promise<TPost | string> => {
    const { likes = 0 } = post;
    const resultPost = await this.getPostById(id);
    if (resultPost) {
      const newLikes = (resultPost.likes ?? 0) + likes;
      const updatedPost = await PostsModel.update({
        likes: newLikes
      }, {
        where: { id },
        returning: true,
      });
      return updatedPost as unknown as TPost;
    } else {
      return "Post not found or unauthorize";
    }
  }
}


export default new PostService();