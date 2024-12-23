import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { fileURLToPath } from 'url';

// Resolve paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Folder containing images
const imageFolder = path.join(__dirname, './');

// Function to get image objects
function getAllImages() {
    try {
        const files = fs.readdirSync(imageFolder);
        const imageFiles = files.filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file));
        const imageObjects = imageFiles.map((file) => ({
            id: uuidv4(),
            name: path.parse(file).name,
            path: `/images/${file}`
        }));
        console.log(imageObjects)

        return imageObjects;
    } catch (err) {
        console.error('Error reading image folder:', err);
        return [];
    }
}

export default getAllImages;
