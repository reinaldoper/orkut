import Categories from "../database/models/categoriesModel";
import TCategory from "../types/TTypeCategory";
import PostsModel from "../database/models/postsModel";


class CategoriesService {

    constructor() {
    }

    create = async (category: TCategory): Promise<TCategory> => {
      const { name } = category;
        const categoryCreate = await Categories.create({
            name,
        });

      return categoryCreate;
    }

    getAllCategories = async (): Promise<TCategory[]> => {
        const categories = await Categories.findAll();
        return categories;
    }

    getCategoryById = async (id: number): Promise<TCategory[]> => {
        const category = await Categories.findAll({
            where: {
                id,
            },
            include: [
                {
                    model: PostsModel,
                    as: 'posts',
                }
            ]
        });
        return category as unknown as TCategory[];
    }

    updateCategory = async (id: number, category: TCategory): Promise<TCategory | string> => {
        const { name } = category;

        const categoryById = await this.getCategoryById(id);
        if (!categoryById) {
            return "Cannot find category";
        }
        const categoryUpdate = await Categories.update({
            name,
        }, {
            where: {
                id,
            },
            returning: true,
        });

        return categoryUpdate[1][0];
    }

    deleteCategory = async (id: number): Promise<string> => {
        const category = await this.getCategoryById(id);
        if (!category) {
            return "Cannot find category";
        }
        await Categories.destroy({
            where: {
                id,
            },
        });

        return "Category deleted";
    }
}


export default new CategoriesService();