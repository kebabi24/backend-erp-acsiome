import { Service, Inject } from "typedi"

@Service()
export default class CurrencyService {
    constructor(
        @Inject("currencyModel") private currencyModel: Models.CurrencyModel,
        @Inject("logger") private logger
    ) {}

    public async create(data: any): Promise<any> {
        try {
            const currency = await this.currencyModel.create({ ...data })
            this.logger.silly("address", currency)
            return currency
        } catch (e) {
            this.logger.error(e)
            throw e
        }
    }
}
