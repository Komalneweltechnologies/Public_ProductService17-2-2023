var datamodel = require("../Data/DataModel");
var dataaccess = require("../Data/DataAccess");
var connect = require("../Data/Connect");
var express = require("express");
var dataconn = require("../Data/DataConnection");
var router = express.Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op;


var routes = function () {

router.route("/Create").post(function (req, res) {
    console.log(`req.body`,req.body );
    const product = datamodel.tbl_product();
    var values = {
                // productID : req.body.productID,     
                productName : req.body.productName,
                description : req.body.description,
                price : req.body.price,
                category_id : req.body.category_id ,
                product_image : req.body.product_image,
                stock_available : req.body.stock_available

    };
    console.log(`values`, values);
    dataaccess.Create(product, values)
    .then(
      function (result) {
        console.log(`result`, result);

        if (result != null) {
            // console.log(`Success`, Success);
          res
            .status(200)
            .json({
              Success: true,
              Message: "product saved successfully",
              Data: result,
            });
        }
        else {
        //   dataconn.errorlogger("ProductAPI", "Createproduct",
        //     {
        //       message: "No object found",
        //       stack: "",
        //     });
          res
            .status(200)
            .json({
              Success: false,
              Message: "Error occurred while saving record",
              Data: null,
            });
        }
      },
      function (err) {
        // dataconn.errorlogger("ProductAPI", "Createproduct", err);
        res
          .status(200)
          .json({
            Success: false,
            Message: "Error occurred while saving record",
            Data: null,
          });
      }
    );
  });

  router.route("/GetAllproductDetails").get(function (req, res) {
    const productDetails = datamodel.tbl_product();
    var param = {
      attributes: ["productID", "productName", "description","product_image","price","category_id","stock_available"]
    };
    dataaccess.FindAll(productDetails, param).then(
      function (result) {
        if (result != null) {
          res.status(200)
            .json({
              Success: true,
              Message: "OrganizationDetails Access",
              Data: result,
            });
        }
        else {
          res.status(200)
            .json({
              Success: false,
              Message: "User has no access of OrganizationDetails",
              Data: null,
            });
        }
      },
      function (err) {
        // dataconn.errorlogger("TransactionService", "GetAllOrganization", err);
        res.status(200)
          .json({
            Success: false,
            Message: "user has no access of OrganizationDetails",
            Data: null,
          });
      }
    );
  });

  router.route("/UpdateproductDetails").post(function (req, res) {
    const productDetails = datamodel.tbl_product();
    var values = {
        productName : req.body.productName,
        description : req.body.description
      
    };
    var param = { productID : req.body.productID };
    dataaccess.Update(productDetails, values, param).then(
      function (result) {
        if (result != null) {
          res.status(200).json({ Success: true, Message: "productDetails updated successfully", Data: result, });
        }
        else {
          dataconn.errorlogger("productDetails", "productDetails",
            { message: "No object found", stack: "", });
          res.status(200).json({ Success: false, Message: "Error occurred while updating record", Data: null, });
        }

      },

      function (err) {
        dataconn.errorlogger("productDetails", "productDetails", err);
        res.status(200).json({ Success: false, Message: "Error occurred while updating record", Data: null, });
      });
  });



  return router;
};
module.exports = routes;