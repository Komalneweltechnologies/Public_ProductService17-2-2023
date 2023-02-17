var connect = require("./Connect");

var sequelize = connect.sequelize;
var Sequelize = connect.Sequelize;
const Model = connect.Sequelize.Model;




class tbl_product extends Model { }

module.exports.tbl_product = function () {
    tbl_product.init({
        productID: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        productName: { type: Sequelize.STRING, allowNull: true },
        description: { type: Sequelize.STRING, allowNull: true },
        price: { type: Sequelize.INTEGER, allowNull: true },
        category_id: { type: Sequelize.INTEGER, allowNull: true },
        product_image: { type: Sequelize.STRING,allowNull: true,defaultValue: Sequelize.NOW,},
        stock_available: { type: Sequelize.INTEGER, allowNull: true },
      
    }, {
        sequelize,
        modelName: "tbl_product",
        tableName: "tbl_product",
    });
    return tbl_product;
};




////#endregion