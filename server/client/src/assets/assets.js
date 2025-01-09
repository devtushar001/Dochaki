import benelli from "./benelli.png";
import bmw from "./bmw.png";
import harley_davidson from "./harley_davidson.png";
import hero from "./hero.png";
import honda from "./honda.png";
import kawasaki from "./kawasaki.png";
import keeway from "./keeway.png";
import ktm from "./ktm.png";
import triumph from "./triumph.png";
import royal_enfield from "./royal_enfield.png";
import universal from "./universal.png";
import logo from "./web_logo.png";
import logo_blur from "./f11.png";
import whatsapp from "./whatsapp.png";
import facebook_icon from "./communication.png";
import instagram_icon from "./social.png"

export const assets = {
    whatsapp,
    facebook_icon,
    instagram_icon,
    logo_blur,
    logo,
    benelli,
    bmw,
    harley_davidson,
    hero,
    honda,
    kawasaki,
    keeway,
    ktm,
    triumph,
    royal_enfield,
    universal
}

export const menu_list = [
    {
        menu_name: "Benelli",
        menu_image: benelli
    },
    {
        menu_name: "BMW",
        menu_image: bmw
    },
    {
        menu_name: "H-Davidson",
        menu_image: harley_davidson
    },
    {
        menu_name: "Hero",
        menu_image: hero
    },
    {
        menu_name: "Honda",
        menu_image: honda
    },
    {
        menu_name: "Kawasaki",
        menu_image: kawasaki
    },
    {
        menu_name: "Keeway",
        menu_image: keeway
    },
    {
        menu_name: "KTM",
        menu_image: ktm
    },
    {
        menu_name: "R-Enfield",
        menu_image: royal_enfield
    },
    {
        menu_name: "Triumph",
        menu_image: triumph
    },
    {
        menu_name: "Universal",
        menu_image: universal
    }]

export const bikeAccessories = [
    // Benelli Accessories
    {
        _id: 1,
        name: "Benelli Crash Guard",
        category: "Benelli",
        reviews: 4.3,
        reviewCount: 158,
        price: { oldPrice: 5500, newPrice: 5000, currency: "INR" },
        description: "Heavy-duty crash guard for Benelli bikes with powder-coated finish for durability.",
        images: {
            mainImage: "https://cdn.pixabay.com/photo/2016/04/07/06/53/bmw-1313343_960_720.jpg",
            secondImage: "https://cdn.pixabay.com/photo/2022/03/20/17/03/motorcycle-7081404_960_720.jpg",
            thirdImage: "https://cdn.pixabay.com/photo/2021/01/01/21/09/challenger-5880009_1280.jpg",
            fourthImage: "https://cdn.pixabay.com/photo/2015/01/19/13/51/car-604019_960_720.jpg"
        },
        additionalInfo: { material: "Steel", compatibility: ["Benelli 600i", "Benelli TRK 502"] }
    },
    {
        _id: 2,
        name: "Benelli LED Headlight",
        category: "Benelli",
        reviews: 4.8,
        reviewCount: 88,
        price: { oldPrice: 4500, newPrice: 4000, currency: "INR" },
        description: "High-performance LED headlight for clear visibility during night rides.",
        images: {
            mainImage: "https://cdn.pixabay.com/photo/2022/03/20/17/03/motorcycle-7081404_960_720.jpg",
            secondImage: "https://images.unsplash.com/photo-1414518876340-9c8737380507?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            thirdImage: "https://images.unsplash.com/photo-1414518876340-9c8737380507?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            fourthImage: "https://images.unsplash.com/photo-1414518876340-9c8737380507?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        additionalInfo: { wattage: "60W", compatibility: ["All Benelli models"] }
    },
    {
        _id: 3,
        name: "Benelli Bike Cover",
        category: "Benelli",
        reviews: 4.9,
        reviewCount: 187,
        price: { oldPrice: 1500, newPrice: 1200, currency: "INR" },
        description: "Waterproof bike cover designed for Benelli models.",
        images: {
            mainImage: "https://cdn.pixabay.com/photo/2021/01/01/21/09/challenger-5880009_1280.jpg",
            secondImage: "https://images.unsplash.com/photo-1414518876340-9c8737380507?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        additionalInfo: { material: "Polyester", compatibility: ["All Benelli models"] }
    },

    // BMW Accessories
    {
        _id: 4,
        name: "BMW Touring Box",
        category: "BMW",
        reviews: 4.1,
        reviewCount: 78,
        price: { oldPrice: 20000, newPrice: 18000, currency: "INR" },
        description: "Premium touring box for BMW bikes, ideal for long-distance riders.",
        images: {
            mainImage: "https://cdn.pixabay.com/photo/2021/02/06/19/15/tail-light-5989090_960_720.jpg",
            secondImage: "https://images.unsplash.com/photo-1414518876340-9c8737380507?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        additionalInfo: { material: "Aluminum", capacity: "45L", compatibility: ["BMW GS series"] }
    },
    {
        _id: 5,
        name: "BMW Handlebar Risers",
        category: "BMW",
        reviews: 4.7,
        reviewCount: 107,
        price: { oldPrice: 3500, newPrice: 3000, currency: "INR" },
        description: "Ergonomic handlebar risers for better posture while riding BMW bikes.",
        images: {
            mainImage: "https://cdn.pixabay.com/photo/2020/02/03/10/02/sports-car-4815234_960_720.jpg",
            secondImage: "https://images.unsplash.com/photo-1414518876340-9c8737380507?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        additionalInfo: { material: "Aluminum", compatibility: ["BMW R 1250 GS"] }
    },

    // Harley-Davidson Accessories
    {
        _id: 6,
        name: "Harley Davidson Saddle Bag",
        category: "H-Davidson",
        reviews: 4.7,
        reviewCount: 147,
        price: { oldPrice: 12000, newPrice: 11000, currency: "INR" },
        description: "Leather saddlebag for Harley-Davidson bikes with ample storage.",
        images: {
            mainImage: "https://cdn.pixabay.com/photo/2021/02/01/21/26/car-5972023_960_720.jpg",
            secondImage: "https://images.unsplash.com/photo-1414518876340-9c8737380507?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        additionalInfo: { material: "Leather", compatibility: ["All Harley-Davidson models"] }
    },
    {
        _id: 7,
        name: "Harley Davidson Exhaust Shield",
        category: "H-Davidson",
        reviews: 4.6,
        reviewCount: 122,
        price: { oldPrice: 7000, newPrice: 6500, currency: "INR" },
        description: "Chrome-plated exhaust shield for Harley bikes.",
        images: {
            mainImage: "https://cdn.pixabay.com/photo/2021/02/06/19/15/tail-light-5989090_1280.jpg",
            secondImage: "https://images.unsplash.com/photo-1414518876340-9c8737380507?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        additionalInfo: { material: "Chrome Steel", compatibility: ["Sportster", "Softail"] }
    },

    // Hero Accessories
    {
        _id: 8,
        name: "Hero Bike Cover",
        category: "Hero",
        reviews: 4.1,
        reviewCount: 941,
        price: { oldPrice: 1000, newPrice: 800, currency: "INR" },
        description: "Dust and waterproof bike cover for Hero models.",
        images: {
            mainImage: "https://cdn.pixabay.com/photo/2021/01/01/21/09/car-5880013_1280.jpg"
        },
        additionalInfo: { material: "Polyester", compatibility: ["Hero Splendor", "Hero Xpulse"] }
    },
    {
        _id: 9,
        name: "Hero Alloy Wheels",
        category: "Hero",
        reviews: 3.5,
        reviewCount: 107,
        price: { oldPrice: 8000, newPrice: 7500, currency: "INR" },
        description: "Stylish alloy wheels designed for Hero bikes.",
        images: {
            mainImage: "https://cdn.pixabay.com/photo/2016/11/20/12/00/thunderbird-1842600_1280.jpg",
            secondImage: "https://images.unsplash.com/photo-1414518876340-9c8737380507?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        additionalInfo: { material: "Aluminum", compatibility: ["Hero Glamour"] }
    },

    // Honda Accessories
    {
        _id: 10,
        name: "Honda Windshield",
        category: "Honda",
        reviews: 4.2,
        reviewCount: 105,
        price: { oldPrice: 3500, newPrice: 3000, currency: "INR" },
        description: "Aerodynamic windshield for improved wind protection on Honda bikes.",
        images: {
            mainImage: "https://cdn.pixabay.com/photo/2016/11/18/12/53/automobile-1834281_1280.jpg",
            secondImage: "https://images.unsplash.com/photo-1414518876340-9c8737380507?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        additionalInfo: { material: "Acrylic", compatibility: ["Honda CBR 250R", "Honda Hornet 2.0"] }
    },

    // Kawasaki Accessories
    {
        _id: 11,
        name: "Kawasaki Pannier Kit",
        category: "Kawasaki",
        reviews: 4.3,
        reviewCount: 10,
        price: { oldPrice: 25000, newPrice: 23000, currency: "INR" },
        description: "Pannier kit for extra storage on Kawasaki touring bikes.",
        images: {
            mainImage: "https://cdn.pixabay.com/photo/2016/11/19/16/45/car-1840259_960_720.jpg",
            secondImage: "https://images.unsplash.com/photo-1414518876340-9c8737380507?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        additionalInfo: { material: "Plastic", compatibility: ["Kawasaki Versys 650"] }
    },

    // Keeway Accessories
    {
        _id: 12,
        name: "Keeway LED Indicators",
        category: "Keeway",
        reviews: 2.5,
        reviewCount: 4,
        price: { oldPrice: 1500, newPrice: 1300, currency: "INR" },
        description: "High-quality LED indicators for enhanced visibility and style.",
        images: {
            mainImage: "https://cdn.pixabay.com/photo/2019/07/12/20/46/car-4333567_1280.jpg",
            secondImage: "https://images.unsplash.com/photo-1414518876340-9c8737380507?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        additionalInfo: { material: "Plastic", compatibility: ["Keeway RKV 125", "Keeway Superlight 200"] }
    },

    // KTM Accessories
    {
        _id: 13,
        name: "KTM Handguards",
        category: "KTM",
        reviews: 1.2,
        reviewCount: 78,
        price: { oldPrice: 4500, newPrice: 4000, currency: "INR" },
        description: "Durable handguards designed for off-road KTM bikes.",
        images: {
            mainImage: "https://cdn.pixabay.com/photo/2023/10/26/04/53/car-8341712_1280.jpg",
            secondImage: "https://images.unsplash.com/photo-1414518876340-9c8737380507?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        additionalInfo: { material: "Plastic & Aluminum", compatibility: ["KTM Duke 390", "KTM Adventure 390"] }
    },

    // Royal Enfield Accessories
    {
        _id: 14,
        name: "Royal Enfield Exhaust Pipe",
        category: "R-Enfield",
        reviews: 3.2,
        reviewCount: 97,
        price: { oldPrice: 8000, newPrice: 7000, currency: "INR" },
        description: "Custom exhaust pipe for Royal Enfield motorcycles, offering a deep, throaty sound.",
        images: {
            mainImage: "https://cdn.pixabay.com/photo/2023/03/03/23/20/car-7828554_960_720.jpg",
            secondImage: "https://images.unsplash.com/photo-1414518876340-9c8737380507?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        additionalInfo: { material: "Stainless Steel", compatibility: ["Royal Enfield Classic 350", "Royal Enfield Meteor 350"] }
    },

    // Triumph Accessories
    {
        _id: 15,
        name: "Triumph Leather Seat",
        category: "Triumph",
        reviews: 3.7,
        reviewCount: 37,
        price: { oldPrice: 15000, newPrice: 14000, currency: "INR" },
        description: "High-quality leather seat designed for superior comfort and style on Triumph motorcycles.",
        images: {
            mainImage: "https://cdn.pixabay.com/photo/2019/08/08/23/33/car-4393990_1280.jpg",
            secondImage: "https://images.unsplash.com/photo-1414518876340-9c8737380507?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        additionalInfo: { material: "Genuine Leather", compatibility: ["Triumph Bonneville T120", "Triumph Street Twin"] }
    },

    // Universal Accessories
    {
        _id: 16,
        name: "Universal Bike Phone Mount",
        category: "Universal",
        reviews: 5,
        reviewCount: 2,
        price: { oldPrice: 1200, newPrice: 1000, currency: "INR" },
        description: "Universal phone mount for all bikes, perfect for hands-free navigation.",
        images: {
            mainImage: "https://cdn.pixabay.com/photo/2015/05/28/23/12/auto-788747_1280.jpg",
            secondImage: "https://images.unsplash.com/photo-1414518876340-9c8737380507?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        additionalInfo: { material: "Plastic & Rubber", compatibility: ["All motorcycles"] }
    },
    {
        _id: 17,
        name: "Universal LED Tail Light",
        category: "Universal",
        reviews: 4.8,
        reviewCount: 700,
        price: { oldPrice: 2500, newPrice: 2200, currency: "INR" },
        description: "Bright LED tail light with modern design, suitable for all motorcycle models.",
        images: {
            mainImage: "https://cdn.pixabay.com/photo/2019/05/23/02/45/cadillac-4223048_960_720.jpg",
            secondImage: "https://images.unsplash.com/photo-1414518876340-9c8737380507?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        additionalInfo: { material: "Aluminum & LED", compatibility: ["All motorcycles"] }
    }
];

