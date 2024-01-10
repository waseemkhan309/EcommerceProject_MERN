// create products || POST method
const createProductController=async(req,res)=>{
    try{
        const {name,slug,description,price,quantity,shipping} = req.body


    }catch(err){
        console.log(err)
        res.status(500).send({
            success:false,
            message:"Error in creating product",
            err
        })
    }
}
export {createProductController}