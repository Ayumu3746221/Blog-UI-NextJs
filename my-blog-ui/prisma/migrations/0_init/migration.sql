-- CreateTable
CREATE TABLE "admin_users" (
    "user_id" BIGSERIAL NOT NULL,
    "user_name" VARCHAR(100) NOT NULL,

    CONSTRAINT "admin_users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "content_user_failes" (
    "id" BIGSERIAL NOT NULL,
    "content_id" BIGINT NOT NULL,
    "user_id" BIGINT NOT NULL,
    "filename" VARCHAR(255) NOT NULL,

    CONSTRAINT "content_user_failes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contents" (
    "content_id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "image_url" TEXT,
    "content_url" TEXT,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "is_published" BOOLEAN NOT NULL DEFAULT false,
    "excerpt" TEXT,

    CONSTRAINT "contents_pkey" PRIMARY KEY ("content_id")
);

-- CreateTable
CREATE TABLE "images" (
    "id" SERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "title" VARCHAR(255),
    "image_url" VARCHAR(255),

    CONSTRAINT "images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_users_user_name_key" ON "admin_users"("user_name");

-- AddForeignKey
ALTER TABLE "content_user_failes" ADD CONSTRAINT "content_user_failes_content_id_fkey" FOREIGN KEY ("content_id") REFERENCES "contents"("content_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "content_user_failes" ADD CONSTRAINT "content_user_failes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "admin_users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "contents" ADD CONSTRAINT "contents_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "admin_users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "admin_users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

