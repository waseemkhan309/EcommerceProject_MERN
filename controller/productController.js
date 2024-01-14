import slugify from "slugify";
import productModel from "../model/productModel.js";
import fs from "fs";

// create products || POST method
const createProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields; // contains non-file fields
    const { photo } = req.files; // contains files
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is required" });
      // case !slug:
      // return res.status(500).send({error:"Slug is required"})
      case !category:
        return res.status(500).send({ error: "category is required" });
      case !description:
        return res.status(500).send({ error: "Description is required" });
      case !price:
        return res.status(500).send({ error: "Price is required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "Photo is required and should be less then 1md" });
    }

    const products = new productModel({ ...req.fields, slug: slugify(name) });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(200).send({
      success: true,
      message: "Products created successfully",
      products,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in creating product",
      err,
    });
  }
};
// update products || POST method
const updateProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields; // contains non-file fields
    const { photo } = req.files; // contains files
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is required" });
      // case !slug:
      // return res.status(500).send({error:"Slug is required"})
      case !category:
        return res.status(500).send({ error: "category is required" });
      case !description:
        return res.status(500).send({ error: "Description is required" });
      case !price:
        return res.status(500).send({ error: "Price is required" });
      case !quantity:
        return res.status(500).send({ error: "Quantity is required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "Photo is required and should be less then 1md" });
    }

    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );

    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }
    await products.save();
    res.status(200).send({
      success: true,
      message: "Products updated successfully",
      products,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in creating product",
      err,
    });
  }
};

// get products
const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "All Products",
      totalProducts: products.length,
      products,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: true,
      message: "Error in get Products",
    });
  }
};

const getSingleProductController = async (req, res) => {
  try {
    const slug = req.params.slug;
    const products = await productModel
      .findOne({ slug })
      .select("-photo")
      .populate("category");
    res.status(200).send({
      success: true,
      message: "Get a Products",
      products,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in getsingle product",
      err,
    });
  }
};

// photo
const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      res.status(200).send(product.photo.data);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: true,
      message: "Error in get photo",
      err,
    });
  }
};

// delete product
const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid);
    res.status(200).send({
      success: true,
      message: " Successfully Deleted ",
    });
  } catch (err) {
    res.status(500).send({
      success: true,
      message: "Error in deleting product",
      err,
    });
  }
};
// product filtration
const filterProductController = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked.length > 0) {
      args.category = checked;
    }
    if (radio.length) {
      args.price = { $gte: radio[0], $lte: radio[1] };
    }
    const products = await productModel.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in filtration product",
      err,
    });
  }
};

// product count || GET Method
const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      message: "Successfully Count products ",
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Page Count ",
      error,
    });
  }
};

// product list based on per page
const productListController = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      message: "Products Show on pages",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: true,
      message: " Error in products on per page",
      error,
    });
  }
};

export {
  createProductController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  deleteProductController,
  updateProductController,
  filterProductController,
  productCountController,
  productListController,
};
