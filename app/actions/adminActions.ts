'use server';

import { db } from '../lib/db';
import { revalidatePath } from 'next/cache';

// 1. Ana Kategori Ekleme 
export async function createMainCategory(formData: FormData) {
    const name = formData.get('name') as string;

    if (!name) return { error: 'Kategori adı boş olamaz!' };

    try {
        await db.mainCategory.create({
            data: { name },
        });

        revalidatePath('/'); 
        return { success: 'Ana kategori başarıyla eklendi!' };
    } catch (error) {
        return { error: 'Bu kategori zaten mevcut veya bir hata oluştu.' };
    }
}

// 2. Alt Kategori Ekleme 
export async function createSubCategory(formData: FormData) {
    const name = formData.get('name') as string;
    const mainCategoryId = Number(formData.get('mainCategoryId'));

    if (!name || !mainCategoryId) return { error: 'Tüm alanları doldurun!' };

    try {
        await db.subCategory.create({
            data: {
                name,
                mainCategoryId,
            },
        });
        return { success: 'Alt kategori başarıyla eklendi!' };
    } catch (error) {
        return { error: 'Alt kategori eklenirken bir hata oluştu.' };
    }
}

// 3. Ürün (Kitap) Ekleme
export async function createProduct(formData: FormData) {
    const title = formData.get('title') as string;
    const author = formData.get('author') as string;
    const price = Number(formData.get('price'));
    const imageUrl = formData.get('imageUrl') as string;
    const subCategoryId = Number(formData.get('subCategoryId'));

    if (!title || !author || !price || !imageUrl || !subCategoryId) {
        return { error: 'Lütfen kitap bilgilerini eksiksiz doldurun!' };
    }

    try {
        await db.product.create({
            data: {
                title,
                author,
                price,
                imageUrl,
                subCategoryId,
            },
        });
        revalidatePath('/');
        return { success: 'Kitap başarıyla vitrine eklendi!' };
    } catch (error) {
        return { error: 'Ürün eklenirken bir hata oluştu.' };
    }
}