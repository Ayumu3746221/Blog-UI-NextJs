interface GcsSuccessResponse {
  message: string;
  contentUrl: string;
}

export const handleUploadToStorage = async (file: File, objectName: string) => {
  const baseUrl = process.env.NEXT_API_BASE_URL;
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

  try {
    if (file.size > MAX_FILE_SIZE) {
      throw new Error(
        `ファイルサイズが制限を超えています(上限:" ${MAX_FILE_SIZE / 1024 / 1024} MB`
      );
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("objectName", objectName);

    const response = await fetch(
      `${baseUrl}/api/auth/v1/authencated/upload/gcs/image`,
      {
        method: "POST",
        headers: {
          contentType: "multipart/form-data",
        },
        body: formData,
      }
    );

    const responseText = await response.text();
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        "ファイルアップロードの際にGCSデータの登録に失敗しました",
        errorData
      );
    }

    const data = responseText ? JSON.parse(responseText) : null;
    return data.contentUrl;
  } catch (error) {
    console.error("function error:", error);
    throw error;
  }
};

export const handleDeleteForStorage = async (objectName: string) => {
  const baseUrl = process.env.NEXT_API_BASE_URL;

  try {
    const response = await fetch(
      `${baseUrl}/api/auth/v1/authencated/delete/gcs/image`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          objectName: objectName,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      // console.error("GCS削除エラーの詳細:", errorData);
      throw new Error("ファイル削除の際にGCSデータの削除に失敗しました");
    }
  } catch (error) {
    console.error("削除エラー:", error);
    throw error;
  }
};
