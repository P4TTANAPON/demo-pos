const express = require("express");
const router = express.Router();
const Products = require("./models/product_schema");
const formidable = require("formidable");
const path = require("path");
const fs = require("fs-extra");
const jwt = require("./jwt");
const { verify1, verify2 } = require("./interceptor");

// Upload Image
uploadImage = async (files, doc) => {
  if (files.image != null) {
    var fileExtention = files.image.originalFilename.split(".")[1];
    doc.image = `${doc.product_id}.${fileExtention}`;
    var newpath =
      path.resolve(__dirname + "/uploaded/images/") + "/" + doc.image;

    if (fs.existsSync(newpath)) {
      await fs.remove(newpath);
    }
    await fs.move(files.image.filepath, newpath);

    // Update database
    await Products.findOneAndUpdate({ product_id: doc.product_id }, doc);
  }
};

router.get("/product", async (req, res) => {
  const doc = await Products.find().sort({ created: -1 });
  res.json(doc);
});

// Add Product
router.post("/product", (req, res) => {
  try {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      const doc = await Products.create(fields);
      await uploadImage(files, doc);
      res.json({ result: "ok", err, fields, files });
    });
  } catch (err) {
    res.json({ result: "nok", message: JSON.stringify(err) });
  }
});

// Delete Product
router.delete("/product/id/:id", async (req, res) => {
  let doc = await Products.findOneAndDelete({ product_id: req.params.id });
  res.json({ result: "ok", message: JSON.stringify(doc) });
});

// Update Product
router.put("/product", (req, res) => {
  try {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      const doc = await Products.findOneAndUpdate(
        { product_id: fields.product_id },
        fields
      );
      await uploadImage(files, fields);
      res.json({ result: "ok11", err, fields, files, doc });
    });
  } catch (err) {
    res.json({ result: "nok", message: JSON.stringify(err) });
  }
});

// Get single
router.get("/product/id/:id", async (req, res) => {
  let doc = await Products.findOne({ product_id: req.params.id });
  res.json(doc);
});

// Get product by keyword
router.get("/product/name/:keyword", async (req, res) => {
  console.log("get products by keyword");
  var query = { name: new RegExp("^.*" + req.params.keyword + ".*$", "i") };
  let doc = await Products.find(query);
  res.json(doc);
});

module.exports = router;
