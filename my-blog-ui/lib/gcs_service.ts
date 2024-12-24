import { Storage } from "@google-cloud/storage";

const storage = new Storage();
const bucketName = process.env.NEXT_GCS_BUCKET_NAME;

export async function uploadFile(file: File, folderName: string = "images/") {
  if (!bucketName) {
    throw new Error("GCS設定が見つかりません");
  }
  const bucket = storage.bucket(bucketName);
  const fileName = `${folderName}${file.name}`;
  const blob = bucket.file(fileName);
  const blobStream = blob.createWriteStream({
    metadata: {
      contentType: file.type || "application/octet-stream",
      contentLength: file.size,
    },
  });

  const buffer = Buffer.from(await file.arrayBuffer());
  return new Promise((resolve, rejects) => {
    blobStream.on("error", (error) => {
      rejects(error);
    });

    blobStream.on("finish", () => {
      resolve(`https://storage.googleapis.com/${bucketName}/${fileName}`);
    });
    blobStream.end(buffer);
  });
}

export async function deleteFile(
  fileName: string,
  folderName: string = "images/"
) {
  if (!bucketName) {
    throw new Error("GCS設定が見つかりません");
  }
  const bucket = storage.bucket(bucketName);
  const blob = bucket.file(`${folderName}${fileName}`);
  return blob.delete();
}
