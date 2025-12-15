-- CreateTable
CREATE TABLE "owner" (
    "owner_id" SERIAL NOT NULL,
    "UUID" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "phone" INTEGER NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "adress" VARCHAR(255) NOT NULL,

    CONSTRAINT "owner_pkey" PRIMARY KEY ("owner_id")
);

-- CreateTable
CREATE TABLE "animal" (
    "animal_id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "sex" CHAR(1) NOT NULL,
    "date_of_birth" DATE NOT NULL,
    "species" VARCHAR(50) NOT NULL,
    "race" VARCHAR(50) NOT NULL,
    "weight_kg" INTEGER NOT NULL,
    "color" VARCHAR(50) NOT NULL,
    "sterilizes" BOOLEAN NOT NULL,
    "chip_number" INTEGER NOT NULL,
    "photo" VARCHAR(255) NOT NULL,
    "owner_id" INTEGER NOT NULL,

    CONSTRAINT "animal_pkey" PRIMARY KEY ("animal_id")
);

-- CreateTable
CREATE TABLE "visit" (
    "visit_id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "reason" VARCHAR(200) NOT NULL,
    "comments" TEXT NOT NULL,
    "animal_id" INTEGER NOT NULL,
    "medical_team_id" INTEGER NOT NULL,
    "treatment_id" INTEGER NOT NULL,

    CONSTRAINT "visit_pkey" PRIMARY KEY ("visit_id")
);

-- CreateTable
CREATE TABLE "treatment" (
    "treatment_id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "date_start" DATE NOT NULL,
    "date_end" DATE NOT NULL,
    "reason" TEXT NOT NULL,
    "comments" TEXT NOT NULL,

    CONSTRAINT "treatment_pkey" PRIMARY KEY ("treatment_id")
);

-- CreateTable
CREATE TABLE "medical_team" (
    "medical_team_id" SERIAL NOT NULL,
    "UUID" INTEGER NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "phone" INTEGER NOT NULL,
    "role" VARCHAR(100) NOT NULL,

    CONSTRAINT "medical_team_pkey" PRIMARY KEY ("medical_team_id")
);

-- CreateTable
CREATE TABLE "include" (
    "include_id" SERIAL NOT NULL,
    "visit_id" INTEGER NOT NULL,
    "treatment_id" INTEGER NOT NULL,

    CONSTRAINT "include_pkey" PRIMARY KEY ("include_id")
);

-- AddForeignKey
ALTER TABLE "animal" ADD CONSTRAINT "animal_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "owner"("owner_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visit" ADD CONSTRAINT "visit_animal_id_fkey" FOREIGN KEY ("animal_id") REFERENCES "animal"("animal_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visit" ADD CONSTRAINT "visit_medical_team_id_fkey" FOREIGN KEY ("medical_team_id") REFERENCES "medical_team"("medical_team_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "visit" ADD CONSTRAINT "visit_treatment_id_fkey" FOREIGN KEY ("treatment_id") REFERENCES "treatment"("treatment_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "include" ADD CONSTRAINT "include_visit_id_fkey" FOREIGN KEY ("visit_id") REFERENCES "visit"("visit_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "include" ADD CONSTRAINT "include_treatment_id_fkey" FOREIGN KEY ("treatment_id") REFERENCES "treatment"("treatment_id") ON DELETE RESTRICT ON UPDATE CASCADE;
