import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category");
    const subCategory = searchParams.get("subCategory");
    const itemType = searchParams.get("itemType");
    const skip = parseInt(searchParams.get("skip") || "0");
    const limit = parseInt(searchParams.get("limit") || "20");
    const full = searchParams.get("full") === "true";

    // Build filters using AND array to avoid OR clause conflicts
    const andConditions: any[] = [];

    if (search) {
      andConditions.push({
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { category: { contains: search, mode: 'insensitive' } },
          { subCategory: { contains: search, mode: 'insensitive' } },
        ]
      });
    }

    if (category) {
      // When browsing Mens or Women, also include products tagged 'Mens & Women'
      // (shared categories like Accessories and Gloves Collection)
      if (category.toLowerCase() === 'mens' || category.toLowerCase() === 'women') {
        andConditions.push({
          OR: [
            { category: { equals: category, mode: 'insensitive' } },
            { category: { equals: 'Mens & Women', mode: 'insensitive' } },
          ]
        });
      } else {
        andConditions.push({ category: { equals: category, mode: 'insensitive' } });
      }
    }

    if (subCategory) {
      andConditions.push({ subCategory: { equals: subCategory, mode: 'insensitive' } });
    }

    if (itemType) {
      andConditions.push({ itemType: { equals: itemType, mode: 'insensitive' } });
    }

    const where: any = andConditions.length > 0 ? { AND: andConditions } : {};

    const products = await prisma.product.findMany({
      where: where,
      orderBy: { createdAt: "desc" },
      skip: skip,
      take: limit,
      select: full ? undefined : {
        id: true,
        name: true,
        price: true,
        image: true,
        category: true,
        subCategory: true,
        itemType: true,
        sizes: true,
        createdAt: true,
      } as any
    });

    const total = await prisma.product.count({ where: where });

    return NextResponse.json({ products, total, skip, limit });
  } catch (error) {
    console.error("GET Products Error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, price, image, description, category, subCategory, itemType, sizes } = body;

    if (!name || !price || !image || !description || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const product = await prisma.product.create({
      data: {
        name,
        price: parseFloat(price.toString()),
        image,
        description,
        category,
        subCategory,
        itemType,
        sizes: Array.isArray(sizes) ? sizes : [],
      } as any,
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("POST Product Error:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}
