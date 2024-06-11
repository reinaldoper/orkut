import PhotosModel from "../database/models/photosModel";
import PostsModel from "../database/models/postsModel";
import TPhoto from "../types/TTypePhotos";

class PhotosService {

  constructor(){

  }

    async getAll(): Promise<TPhoto[]> {
        return await PhotosModel.findAll({
            include: [
                {
                    model: PostsModel,
                    as: 'post',
                }
            ]
        });
    }

    async getById(id: number): Promise<TPhoto | null> {
        return await PhotosModel.findByPk(id, {
            include: [
                {
                    model: PostsModel,
                    as: 'post',
                }
            ]
        });
    }

    async create(photo: TPhoto, userId: number): Promise<TPhoto> {
      const { url, title = '', postId } = photo;
        const post = await PostsModel.findByPk(postId);

        if (!post) {
            throw new Error('Post not found');
        }

        if (post.userId !== userId) {
            throw new Error('Unauthorized');
        }

        return await PhotosModel.create({
            url,
            title,
            postId
        });
    }

    async update(id: number, updatedPhoto: TPhoto, userId: number) {
        const { url, title = '' } = updatedPhoto;
        const photo = await PhotosModel.findByPk(id, {
            include: [
                {
                    model: PostsModel,
                    as: 'post',
                }
            ]
        });

        if (!photo) {
            throw new Error('Photo not found');
        }

        if (photo.post.userId !== userId) {
            throw new Error('Unauthorized');
        }

        return await photo.update({
            url,
            title
        });
    }

    async delete(id: number, userId: number) {
        const photo = await PhotosModel.findByPk(id, {
            include: [
                {
                    model: PostsModel,
                    as: 'post',
                }
            ]
        });

        if (!photo) {
            throw new Error('Photo not found');
        }

        if (photo.post.userId !== userId) {
            throw new Error('Unauthorized');
        }

        return await photo.destroy();
    }
}

export default new PhotosService();
