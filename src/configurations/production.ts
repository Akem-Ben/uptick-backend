import dotenv from 'dotenv'

dotenv.config()

const {
    PRODUCTION_DATABASE_URL,
    PROD_PORT
} = process.env

console.log('Running in production mode')

export default {
    DB_URL: PRODUCTION_DATABASE_URL,
    PORT: PROD_PORT
}