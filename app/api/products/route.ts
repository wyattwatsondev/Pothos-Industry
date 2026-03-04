import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const skip = parseInt(searchParams.get("skip") || "0");
    const limit = parseInt(searchParams.get("limit") || "20");
    const full = searchParams.get("full") === "true";

    const where = search 
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { category: { contains: search, mode: 'insensitive' } },
          ],
        }
      : {};

    const products = await prisma.product.findMany({
      where: where as any,
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

    const total = await prisma.product.count({ where: where as any });

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
