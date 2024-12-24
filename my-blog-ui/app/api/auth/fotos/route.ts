import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { FotosList } from "@/types/fotosList";

export async function GET() {
  try {
    const images: FotosList = await prisma.images.findMany({
      select: {
        id: true,
        title: true,
        image_url: true,
      },
    });

    return NextResponse.json(images);
  } catch (error) {
    console.log("Fetching error for API route", error);
    return NextResponse.json(
      { error: "画像の取得に失敗しました" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { user_id, title, image_url } = await request.json();

    const image = await prisma.images.create({
      data: {
        user_id,
        title,
        image_url,
      },
    });
    return NextResponse.json({
      title: image.title,
      image_url: image.image_url,
    });
  } catch (error) {
    console.log("Posting error for API route", error);
    return NextResponse.json(
      { error: "画像の登録に失敗しました" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    await prisma.images.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({ message: "画像を削除しました" });
  } catch (error) {
    console.log("Deleting error for API route", error);
    return NextResponse.json(
      { error: "画像の削除に失敗しました" },
      { status: 500 }
    );
  }
}
