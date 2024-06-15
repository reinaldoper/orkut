import { Request, Response } from "express";
import userService from "../service/userService";
import statusCodes from "../statusCodes";
import becrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import IUserDto from "../Dtos/userDTO";

class UserController implements IUserDto {
    async create(req: Request, res: Response) {
      const { password } = req.body;
        
        const hashPassword = becrypt.hashSync(password, 10);
        req.body.password = hashPassword;
        const user = await userService.createUser(req.body);
        return res.status(statusCodes.CREATED).json(user);
    }

    async login(req: Request, res: Response) {
        const { email, password } = req.body;
        const user = await userService.getUserEmail(email);
        if (!user) {
            return res.status(statusCodes.BAD_REQUEST).json({ message: "Invalid email" });
        }
        const isPasswordValid = becrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(statusCodes.BAD_REQUEST).json({ message: "Invalid password" });
        }
        const token = jwt.sign({ email: user.email, id: user.id }, 'secretKey');
        return res.status(statusCodes.OK).json({ token: token });
    }

    async list(req: Request, res: Response) {
        const users = await userService.getAll();
        return res.status(statusCodes.OK).json({ message: users });
    }

    async findById(req: Request, res: Response) {
        const { id } = req.params;
        const user = await userService.getUserId(Number(id));
        return res.status(statusCodes.OK).json({ message: user });
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        const { id: userId } = req.body.id
        if(userId !== Number(id)) return res.status(statusCodes.UNAUTHORIZED).json({ message: "User not authorization" });
        const user = await userService.deleteUserById(Number(id));
        return res.status(statusCodes.OK).json({ message: user });
    }

    async getUserFollowerById(req: Request, res: Response) {
        const { id } = req.params;
        const user = await userService.getUserFollowersById(Number(id));
        if(user) return res.status(statusCodes.OK).json({ message: user });
        else return res.status(statusCodes.NOT_FOUND).json({ message: "User not found" });
    }

    async getUserFollowingById(req: Request, res: Response) {
        const { id } = req.params;
        const user = await userService.getUserFollowingsById(Number(id));
        if(user) return res.status(statusCodes.OK).json({ message: user });
        else return res.status(statusCodes.NOT_FOUND).json({ message: "User not found" });
    }
}

export default new UserController();