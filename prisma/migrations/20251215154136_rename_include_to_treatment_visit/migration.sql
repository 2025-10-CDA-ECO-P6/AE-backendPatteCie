/*
  Warnings:

  - You are about to drop the `include` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "include" DROP CONSTRAINT "include_treatment_id_fkey";

-- DropForeignKey
ALTER TABLE "include" DROP CONSTRAINT "include_visit_id_fkey";

-- DropTable
DROP TABLE "include";

-- CreateTable
CREATE TABLE "treatmentVisite" (
    "include_id" SERIAL NOT NULL,
    "visit_id" INTEGER NOT NULL,
    "treatment_id" INTEGER NOT NULL,

    CONSTRAINT "treatmentVisite_pkey" PRIMARY KEY ("include_id")
);

-- AddForeignKey
ALTER TABLE "treatmentVisite" ADD CONSTRAINT "treatmentVisite_visit_id_fkey" FOREIGN KEY ("visit_id") REFERENCES "visit"("visit_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "treatmentVisite" ADD CONSTRAINT "treatmentVisite_treatment_id_fkey" FOREIGN KEY ("treatment_id") REFERENCES "treatment"("treatment_id") ON DELETE RESTRICT ON UPDATE CASCADE;
