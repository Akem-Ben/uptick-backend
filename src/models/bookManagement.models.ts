import { DataTypes, Model } from 'sequelize';
import database from '../configurations/database';
import { BookAttributes, BookCategories } from '../types/bookTypes/bookTypes.types';
import Users from './users.models';


class Books extends Model<BookAttributes> implements BookAttributes {
    public id!: string;
    public title!: string;
    public description!: string;
    public content!: string;
    public image!: string | null;
    public userId!: string;
    public category!: string;
}

Books.init(
    {
        id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            },
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        category: {
            type: DataTypes.ENUM(...Object.values(BookCategories)),
            allowNull: false,
            defaultValue: BookCategories.Fiction,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: Users,
                key: 'id',
            },
        },
    },
    {
        sequelize: database,
        modelName: 'Books',
        tableName: 'books',
        timestamps: true,
    }
);

export default Books;