import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import fs from "fs";
import path from "path";

async function main() {
    console.log("Starting product image update...");
    
    // Get all image filenames from public/Photos Industry
    const imagesDir = path.join(process.cwd(), "public", "Photos Industry");
    const imageFiles = fs.readdirSync(imagesDir).filter(file => 
        file.endsWith(".jpeg") || file.endsWith(".jpg") || file.endsWith(".png")
    );
    
    if (imageFiles.length === 0) {
        console.error("No images found in public/Photos Industry");
        return;
    }

    const products = await prisma.product.findMany();
    console.log(`Found ${products.length} products total.`);

    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        // Cycle through image files
        const imageFile = imageFiles[i % imageFiles.length];
        const imagePath = `/Photos Industry/${imageFile}`;
        
        await prisma.product.update({
            where: { id: product.id },
            data: { image: imagePath }
        });
        
        console.log(`Updated product ${product.id} (${product.name}) with image ${imagePath}`);
    }

    console.log("Done updating product images.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
