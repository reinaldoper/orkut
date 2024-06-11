import { Response, Request } from "express";
import categoryService from "../service/categoryService";
import statusCodes from "../statusCodes"
import CategoryDto from "../Dtos/categoryDTO";


class CategoryController implements CategoryDto {
    async create(req: Request, res: Response) {
        const category = await categoryService.create(req.body);
        return res.status(statusCodes.CREATED).json({ message: category });
    }

    async findAll(req: Request, res: Response) {
        const categories = await categoryService.getAllCategories();
        return res.status(statusCodes.OK).json({ message: categories });
    }

    async findById(req: Request, res: Response) {
        const { id } = req.params;
        const category = await categoryService.getCategoryById(Number(id));
        return res.status(statusCodes.OK).json({ message: category });
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        const category = await categoryService.deleteCategory(Number(id));
        return res.status(statusCodes.OK).json({ message: category });
    }

    async update(req: Request, res: Response) {
        const { id } = req.params;
        const category = await categoryService.updateCategory(Number(id), req.body);
        return res.status(statusCodes.OK).json({ message: category });
    }
}


export default new CategoryController();