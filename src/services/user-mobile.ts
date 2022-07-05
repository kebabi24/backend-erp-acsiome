import { Service, Inject } from "typedi"
import argon2 from 'argon2'
@Service()
export default class UserMobileService {
    constructor(
        @Inject("userMobileModel") private userMobileModel: Models.UserMobileModel,
        @Inject("profileMobileModel") private profileMobileModel: Models.ProfileMobileModel,
        @Inject("roleModel") private roleModel: Models.RoleModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const user_password = await argon2.hash(data.user_password)
            const user = await this.userMobileModel.create({ ...data, user_password })
            this.logger.silly("create user mstr")
            return user
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const user = await this.userMobileModel.findOne({ where: query,include: this.profileMobileModel })
            this.logger.silly("find one user mstr")
            return user
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const users = await this.userMobileModel.findAll({ where: query })
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
            const user = await this.userMobileModel.update({ ...data, usrd_pwd }, { where: query })
            this.logger.silly("update one user mstr")
            return user
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async updated(data: any, query: any): Promise<any> {
        try {
            const user = await this.userMobileModel.update(data, {
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
            const user = await this.userMobileModel.destroy({ where: query })
            this.logger.silly("delete one user mstr")
            return user
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}
