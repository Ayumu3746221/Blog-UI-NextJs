export const handlePostToDatabase = async (
  userId: number,
  objectName: string,
  imageUrl: string
) => {
  const baseUrl = process.env.NEXT_API_BASE_URL;
  try {
    const response = await fetch(
      `${baseUrl}/api/auth/v1/authencated/upload/image`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          title: objectName,
          imageUrl: imageUrl,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        "ファイルアップロードの際にDBデータの登録に失敗しました",
        errorData
      );
    }
  } catch (error) {
    console.error("function error:", error);
    throw error;
  }
};

export const handleDeleteForDatabase = async (id: number) => {
  const baseUrl = process.env.NEXT_API_BASE_URL;
  try {
    const response = await fetch(
      `${baseUrl}/api/auth/v1/authencated/delete/image`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("DB削除エラーの詳細:", errorData);
      throw new Error("ファイル削除の際にDBデータの削除に失敗しました");
    }
  } catch (error) {
    console.error("削除エラー:", error);
    throw error;
  }
};
