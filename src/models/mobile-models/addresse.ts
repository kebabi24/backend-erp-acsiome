import { Container } from "typedi";
import Sequelize from "sequelize";

const sequelize = Container.get("sequelize")

const Addresses = sequelize.define(
    "addresses",  
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        customer_id :{
            type: Sequelize.STRING,
            references: {
                model: "aa_customer",
                key: "customer_name",
            },
        },
        addresse_one:{type:Sequelize.STRING,},
        addresse_two:{type:Sequelize.STRING},
        addresse_extended:{type:Sequelize.STRING},
        city: {type: Sequelize.STRING}, 
        postal_code: {type: Sequelize.STRING},
        state: {type: Sequelize.STRING},
        country: {type: Sequelize.STRING},
        geoarea_code: {type: Sequelize.STRING}, 
        longitude: {type: Sequelize.STRING},
        latitude: {type: Sequelize.STRING}

        
        
        // ...base,
    },
    {
        tableName: "aa_addresses",
    }
    
)
export default  Addresses;