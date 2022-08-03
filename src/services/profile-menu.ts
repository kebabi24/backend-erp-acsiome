import { Service, Inject } from "typedi"

@Service()
export default class ProfileMenuService {
    constructor(
        @Inject("profile_menuModel") private profileMenuModel: Models.Profile_menuModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const profile_menu = await this.profileMenuModel.create({ ...data })
            this.logger.silly("create profile-menu mobile mstr")
            return profile_menu
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async findOne(query: any): Promise<any> {
        try {
            const profile_menu = await this.profileMenuModel.findOne({ where: query })
            this.logger.silly("find one profile-menu mobile mstr")
            return profile_menu
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async find(query: any): Promise<any> {
        try {
            const profile_menu = await this.profileMenuModel.findAll({ where: query })
            this.logger.silly("find All profiles mobile mstr")
            //console.log(profiles)
            return profile_menu
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }

    public async update(data: any, query: any): Promise<any> {
        try {
            // const profile_menu = await this.profileMenuModel.findAll({ where: query })
            const profile_menu = await this.profileMenuModel.destroy({ where: query })
            for (let entry of data.menus) {
                entry = { profile_code: data.profile.profile_code, menu_code: entry }
                await this.profileMenuModel.create(entry)
           
            
            }
            // tab.forEach(element => {
            //     if(profileMenuBeforeUpdate.includes(element)){
            //         console.log(element, " il existe dans le menu déjà")
            //     }else{
            //         console.log(element, " on doit l'ajouter a la base")
            //     }

            //     console.log(element, " on doit le supprimer de la base ")
            // })
            // console.log(profileMenuBeforeUpdate)
            // console.log(data.menus)
            // const profile_menu = await this.profileMenuModel.update(data, { where: query })
            this.logger.silly("update one profile mobile mstr")
            return profile_menu
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
    public async delete(query: any): Promise<any> {
        try {
            const profile_menu = await this.profileMenuModel.destroy({ where: query })
            this.logger.silly("delete one profile mobile mstr")
            return profile_menu
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}