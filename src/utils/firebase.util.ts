import {
    QueryDocumentSnapshot
} from '@firebase/firestore';

export function docsToData<T>(docs: Array<QueryDocumentSnapshot>): T[] {
    return (docs?.map((item) => item.data()) as T[]) || [];
}