import dotenv from 'dotenv'

dotenv.config()

const {
    DEV_DATABASE_URL,
    DEV_PORT
} = process.env

console.log('Running in development mode')

export default {
    DB_URL: DEV_DATABASE_URL,
    PORT: DEV_PORT
}