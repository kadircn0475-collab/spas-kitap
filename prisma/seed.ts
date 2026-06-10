// prisma/seed.ts
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Kategoriler sıfırdan kuruluyor...');

  // 1. Ana Kategoriler
  const tytMain = await prisma.mainCategory.upsert({
    where: { name: 'TYT Kitapları' },
    update: {},
    create: { name: 'TYT Kitapları' },
  });

 
  const aytMain = await prisma.mainCategory.upsert({
    where: { name: 'AYT Kitapları' },
    update: {},
    create: { name: 'AYT Kitapları' },
  });

  const cocukMain = await prisma.mainCategory.upsert({
    where: { name: 'Çocuk Kitapları' },
    update: {},
    create: { name: 'Çocuk Kitapları' },
  });

  // 2. Alt Kategoriler (String ID düzeninde)
  await prisma.subCategory.upsert({
    where: { id: '1' },
    update: {},
    create: { id: '1', name: 'TYT SORU BANKALARI', mainCategoryId: tytMain.id },
  });

  await prisma.subCategory.upsert({
    where: { id: '2' },
    update: {},
    create: { id: '2', name: 'TYT DENEME', mainCategoryId: tytMain.id },
  });

  await prisma.subCategory.upsert({
    where: { id: '3' },
    update: {},
    create: { id: '3', name: 'AYT SORU BANKALARI', mainCategoryId: aytMain.id },
  });

  await prisma.subCategory.upsert({
    where: { id: '4' },
    update: {},
    create: { id: '4', name: 'AYT DENEME', mainCategoryId: aytMain.id },
  });

  await prisma.subCategory.upsert({
    where: { id: '5' },
    update: {},
    create: { id: '5', name: 'HİKAYE', mainCategoryId: cocukMain.id },
  });

  console.log('✅ Kategoriler başarıyla veritabanına enjekte edildi!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });