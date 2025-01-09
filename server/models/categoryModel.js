import mongoose, { model } from "mongoose";
// import AccessoryModel from "./accessoryModel";

const categorySchema = new mongoose.Schema({
    menu_name: {
        type: String,
        required: true
    },
    menu_image: {
        type: String,
        required: true
    }
})

const categoryModel = mongoose.models.category || mongoose.model("category", categorySchema);

export default categoryModel;