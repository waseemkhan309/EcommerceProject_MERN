import mongoose from "mongoose";
const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.ObjectId,
        ref: "product",
      },
    ],
    payment: {}, 
    buyers: {
      type: mongoose.ObjectId,
      ref: "user",
    },
    status: {
      type: String,
      default: "Not Process",
      enum: ["Not Process", "Processing", "Shipped", "delivered", "cancel"],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("order", orderSchema);
