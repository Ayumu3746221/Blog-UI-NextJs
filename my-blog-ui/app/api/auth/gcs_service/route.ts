import { NextResponse } from "next/server";
import { deleteFile, uploadFile } from "@/lib/gcs_service";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file || !file.type.startsWith("image/")) {
      throw new Error("有効な画像ファイルをアップロードしてください");
    }

    const fileUrl = await uploadFile(file);

    return NextResponse.json({ url: fileUrl });
  } catch (error) {
    console.error("Error uploading to GCS", error);
    return NextResponse.json(
      { error: "ファイルのアップロードに失敗しました" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { fileName } = await request.json();
    await deleteFile(fileName);

    return NextResponse.json({ message: "ファイルを削除しました" });
  } catch (error) {
    console.error("Error deleting file", error);
    return NextResponse.json(
      { error: "ファイルの削除に失敗しました" },
      { status: 500 }
    );
  }
}
