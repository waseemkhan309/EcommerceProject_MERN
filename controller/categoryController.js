import slugify from "slugify";
import categoryModel from "../model/categoryModel.js";

// create category || POST
const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    } 
    const existingcategory = await categoryModel.findOne({ name });
    if (existingcategory) {
      res.status(200).send({
        success: true,
        message: "Category is already exist",
      });
    }

    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "New category created",
      category,
    });
  } catch (err) {
    res.status(500).send({
      success: true,
      message: "Error in Category",
      err,
    });
  }
};

// update category || PUT
const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    // console.log(id);
    const updatecategory = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: false,
      message: "successfully data updated",
      updatecategory,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in category update",
      error,
    });
  }
};

// All category list || GET
const categoryController = async (req, res) => {
  try {
    const category = await categoryModel.find({});
    res.status(201).send({
      success: true,
      message: "All Category list",
      category,
    });
  } catch (err) {
    res.status(201).send({
      success: true,
      message: "Error in display Categories ",
      err,
    });
  }
};

// get single category  || GET
const singlecategoryController = async (req, res) => {
  try {
    const slug =  req.params.slug
    const category = await categoryModel.findOne({slug});
    res.status(200).send({
      success: true,
      message: "Category Found",
      category,
    });

  } catch (err) {
    res.status(500).send({
      success: false,
      message: "single Category error",
      err,
    });
  }
};

// delete categoory by id || delete
const deleteCategory = async(req,res)=>{
    try{
        const {id} = req.params;
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message:" Successfully Deleted "
        })

    }catch(err){
        res.status(500).send({
            success:false,
            message:"Error in delete category",
            err
        })
    }
}

export {
  createCategoryController,
  updateCategoryController,
  categoryController,
  singlecategoryController,
  deleteCategory
};
