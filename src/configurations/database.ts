import {Sequelize} from 'sequelize';
import config from './config';


const {
    DB_URL
} = config

const database = new Sequelize(`${DB_URL}`,
    {
      dialect: 'postgres',
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: false,
            rejectUnauthorized: false,
          }
        }
    }
)



export default database;