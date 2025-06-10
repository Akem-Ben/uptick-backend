import Books from "./bookManagement.models";
import Users from "./users.models";

Users.hasMany(Books, { foreignKey: 'userId', as: 'books' });
Books.belongsTo(Users, { foreignKey: 'userId', as: 'user' });