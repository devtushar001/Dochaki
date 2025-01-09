import mongoose from 'mongoose';

// Define the schema for Category
const nestedCtgSchema = new mongoose.Schema({
    menu_name: {
        type: String,
        required: true
    },
    menu_image: {
        type: String,
        required: true
    },
    menu_sub: {
        type: [String],
        default: []
    }
});

// Create the model
const nestedCtgModel = mongoose.models.Category || mongoose.model('Category', nestedCtgSchema);

export default nestedCtgModel;
