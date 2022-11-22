import { Service, Inject } from "typedi"
import argon2 from 'argon2'
@Service()
export default class UserService {
    constructor(
        @Inject("userModel") private userModel: Models.UserModel,
        @Inject("profileModel") private profileModel: Models.ProfileModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const usrd_pwd = await argon2.hash(data.usrd_pwd)
            const user = await this.userModel.create({ ...data, usrd_pwd })
            this.logger.silly("create user mstr")
            return user
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const user = await this.userModel.findOne({ where: query,include: this.profileModel })
            this.logger.silly("find one user mstr")
            return user
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const users = await this.userModel.findAll({ where: query })
            this.logger.silly("find All users mstr")
            return users
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        const usrd_pwd = await argon2.hash(data.usrd_pwd)
        try {
            const user = await this.userModel.update({ ...data, usrd_pwd }, { where: query })
            this.logger.silly("update one user mstr")
            return user
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async updated(data: any, query: any): Promise<any> {
        const usrd_pwd = await argon2.hash(data.usrd_pwd)

        try {
            const user = await this.userModel.update({...data,usrd_pwd} ,{
                where: query,
            })
            this.logger.silly("update one tool mstr")
            return user
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const user = await this.userModel.destroy({ where: query })
            this.logger.silly("delete one user mstr")
            return user
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}
