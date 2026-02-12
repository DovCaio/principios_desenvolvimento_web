-- DropForeignKey
ALTER TABLE "AuditLog" DROP CONSTRAINT "AuditLog_userCpf_fkey";

-- AlterTable
ALTER TABLE "AuditLog" ALTER COLUMN "userCpf" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_userCpf_fkey" FOREIGN KEY ("userCpf") REFERENCES "User"("cpf") ON DELETE SET NULL ON UPDATE CASCADE;
