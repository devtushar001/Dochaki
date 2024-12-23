import mongoose from "mongoose";

// Define schema for the product
const accessorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    subcategory: {
        type: String,
        default: [],
    },
    reviews: {
        type: Number,
        min: 0,
        max: 5,
        default: 0,
    },
    reviewCount: {
        type: Number,
        default: 0,
    },
    price: {
        oldPrice: {
            type: Number,
            required: true,
        },
        newPrice: {
            type: Number,
            required: true,
        },
        currency: {
            type: String,
            default: 'INR',
        },
    },
    description: {
        type: String,
        required: true,
    },
    images: {
        mainImage: {
            type: String,
            required: true,
        },
        secondImage: {
            type: String,
        },
        thirdImage: {
            type: String,
        },
        fourthImage: {
            type: String,
        },
    },
    additionalInfo: {
        material: {
            type: String,
            required: true,
        },
        compatibility: {
            type: [String], // Array of strings
            required: true,
        },
    },

})




// Create model from the schema
const AccessoryModel = mongoose.models.accessory || mongoose.model('accessory', accessorySchema);
// Export the model for use in other files
export default AccessoryModel;