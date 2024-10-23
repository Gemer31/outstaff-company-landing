import {
  QueryDocumentSnapshot,
} from '@firebase/firestore';
import { StorageReference } from '@firebase/storage';
import { PlainStorageReference } from '@/models/common.model';

export function docsToData<T>(docs: Array<QueryDocumentSnapshot>): T[] {
  return (docs?.map((item) => item.data()) as T[]) || [];
}

export function getStorageImageSrc(image: StorageReference | PlainStorageReference): string {
  return image
    ? `https://firebasestorage.googleapis.com/v0/b/${image.bucket}/o/${image.fullPath}?alt=media`
    : '';
}

export function getPlainStorageReferences(images: StorageReference[]): PlainStorageReference[] {
  return images.map((image) => ({
    name: image.name,
    bucket: image.bucket,
    fullPath: image.fullPath,
  }));
}
