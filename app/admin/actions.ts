'use server';
import { db } from '@/app/lib/db';
import { revalidatePath } from 'next/cache';

export async function createProduct(formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const price = parseFloat(formData.get('price') as string);
  const stock = parseInt(formData.get('stock') as string, 10);
  const showcase = formData.get('showcase') as string;
  const imageUrl = formData.get('imageUrl') as string;
  
  const subCategoryId = formData.get('subCategoryId') as string;

  if (!title || isNaN(price) || !subCategoryId) {
    throw new Error('Lütfen zorunlu alanları doldurun.');
  }

  const insertData: any = {
    title: title,
    price: price,
    stock: isNaN(stock) ? 0 : stock,
    showcase: showcase || 'normal',
    subCategoryId: subCategoryId,
   // Eğer URL girildiyse kaydet, girilmediyse boş bırak
    imageUrl: imageUrl || null, 
  };

  if (description) {
    insertData.description = description;
  }

  await (db.product as any).create({
    data: insertData,
  });

  revalidatePath('/');
  revalidatePath('/admin');
}

export async function deleteProduct(formData: FormData) {
  const id = formData.get('id') as string;

  if (!id) {
    throw new Error('Geçersiz ürün ID\'si.');
  }

  // Prisma ile veri tabanından o ID'ye sahip kitabı siliyoruz
  await (db.product as any).delete({
    where: { id: id },
  });

  // Değişikliklerin anında yansıması için sayfaları tazele
  revalidatePath('/');
  revalidatePath('/admin');
}