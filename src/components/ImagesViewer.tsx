'use client';

import Image from 'next/image';
import { getStorageImageSrc } from '@/utils/firebase.util';
import { StorageReference } from '@firebase/storage';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ListViewer } from '@/components/ListViewer';

interface ImagesViewerProps {
  deleteAvailable?: boolean;
  multiSelect?: boolean;
  selectedItemsCounterVisible?: boolean;
  selectedImages?: StorageReference[];
  deleteImageClick?: (image: StorageReference) => void;
  selectImageClick?: (images: StorageReference[]) => void;
  images?: StorageReference[];
}

export function ImagesViewer(
  {
    deleteAvailable,
    images,
    deleteImageClick,
    selectImageClick,
    multiSelect,
    selectedImages,
    selectedItemsCounterVisible,
  }: ImagesViewerProps,
) {
  const t = useTranslations();
  const [chosenImages, setChosenImages] = useState<StorageReference[]>([]);
  const [lastSelectedImage, setLastSelectedImage] = useState<StorageReference>(undefined);

  useEffect(() => {
    setChosenImages(selectedImages);
    setLastSelectedImage(selectedImages?.at(-1));
  }, [selectedImages]);

  const selectImage = (newImages: StorageReference[], lastSelectedImage: StorageReference) => {
    setChosenImages(newImages);
    setLastSelectedImage(lastSelectedImage);
    selectImageClick?.(newImages);
  };

  return (
    <div>
      {images?.length ? (
        <>
          <div className="flex justify-between gap-2">
            <ListViewer
              multiSelect={multiSelect}
              editAvailable={deleteAvailable}
              items={images}
              deleteItemClick={deleteImageClick}
              selectItemClick={selectImage}
              propsMapper={{idProp: 'fullPath', itemTitle: {prop: 'name'}}}
            />
            <div
              className="w-6/12 flex items-center justify-center text-center rounded-md border-custom-red-1 border-2">
              {lastSelectedImage ? (
                <Image
                  width={200}
                  height={200}
                  src={getStorageImageSrc(lastSelectedImage)}
                  alt={lastSelectedImage.name}
                />
              ) : (
                <>{t('selectImage')}</>
              )}
            </div>
          </div>
          {
            selectedItemsCounterVisible
              ? <span>{chosenImages?.length || 0} {t('selectedItems')}</span>
              : <></>
          }

        </>
      ) : (
        <div className="w-full text-center rounded-md border-custom-red-1 border-2 px-2 py-1">
          {t('noImages')}
        </div>
      )}
    </div>
  );
}
