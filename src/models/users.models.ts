import { DataTypes, Model, Sequelize } from 'sequelize';
import database from '../configurations/database';
import { UserAttributes, UserRoles } from '../types/userTypes/userTypes.types';

class Users extends Model<UserAttributes> implements UserAttributes {
    public id!: string;
    public firstName!: string;
    public lastName!: string;
    public email!: string;
    public password!: string;
    public isVerified!: boolean;
    public isFirstTimeLogin!: boolean;
    public role!: string;
    public isActive!: boolean;
    public isBlocked!: boolean;
}

Users.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isVerified: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        isBlocked: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        isFirstTimeLogin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        role: {
            allowNull: false,
            type: DataTypes.ENUM(...Object.values(UserRoles)),
        },
    },
    {
        sequelize: database,
        modelName: 'Users',
        tableName: 'users',
        timestamps: true,
    }
);

export default Users;