import bcrypt from "bcryptjs";

const password = process.argv[2];
if (!password) {
  console.error("Kullanım: npx tsx scripts/set-admin-password.ts <yeni-sifre>");
  process.exit(1);
}

const hash = bcrypt.hashSync(password, 10);
const escaped = hash.replace(/\$/g, "\\$");
console.log("\nBunu .env dosyanızdaki ADMIN_PASSWORD_HASH değeriyle değiştirin:\n");
console.log(`ADMIN_PASSWORD_HASH="${escaped}"\n`);
