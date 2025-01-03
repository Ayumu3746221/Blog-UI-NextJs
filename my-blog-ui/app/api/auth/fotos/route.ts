import { NextResponse } from "next/server";
import { FotosList } from "@/types/fotosList";
import {
  handleDeleteForStorage,
  handleUploadToStorage,
} from "@/lib/gcs_service";
import {
  handleDeleteForDatabase,
  handlePostToDatabase,
} from "@/lib/database_service";
import { fetchWithAuth } from "@/lib/fetchWithAuth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const baseUrl = process.env.NEXT_API_BASE_URL;
    const response = await fetchWithAuth(
      `${baseUrl}/api/auth/v1/authencated/get/images`
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Fetching error for API route", errorData);
      return NextResponse.json(
        { error: "画像の取得に失敗しました" },
        { status: 500 }
      );
    }
    const data: FotosList = await response.json();

    return NextResponse.json(data);
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
    const formData = await request.formData();
    const userId = formData.get("userId") as string;
    const file = formData.get("file") as File;
    const objectName = formData.get("objectName") as string;

    const imageUrl = await handleUploadToStorage(file, objectName);
    await handlePostToDatabase(Number(userId), objectName, imageUrl);

    return NextResponse.json({ message: "画像を登録しました" });
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
    const { id, objectName } = await request.json();
    await handleDeleteForDatabase(id);
    await handleDeleteForStorage(objectName);

    return NextResponse.json({ message: "画像を削除しました" });
  } catch (error) {
    console.log("Deleting error for API route", error);
    return NextResponse.json(
      { error: "画像の削除に失敗しました" },
      { status: 500 }
    );
  }
}
