'use client';

import Image from 'next/image';
import { getStorageImageSrc } from '@/utils/firebase.util';
import { StorageReference } from '@firebase/storage';
import { useEffect, useState } from 'react';
import { CTRL_CODE } from '@/constants/common.constant';
import { useTranslations } from 'next-intl';
import { ICounterBlock } from '@/models/common.model';
import { ListViewer } from '@/components/ListViewer';

interface ImagesViewerProps {
  deleteAvailable?: boolean;
  multiple?: boolean;
  selectedImages?: StorageReference[];
  deleteImageClick?: (image: StorageReference) => void;
  selectImageClick?: (images: StorageReference[]) => void;
  images?: StorageReference[];
}

export function ImagesViewer({
                               deleteAvailable,
                               images,
                               deleteImageClick,
                               selectImageClick,
                               multiple,
                               selectedImages,
                             }: ImagesViewerProps) {
  const t = useTranslations();
  const [chosenImages, setChosenImages] = useState<
    Record<string, StorageReference>
  >({});
  const [lastSelectedImage, setLastSelectedImage] =
    useState<StorageReference>(undefined);
  const [tabPressed, setTabPressed] = useState<boolean>();
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const newData: Record<string, StorageReference> = {};
    selectedImages?.forEach((img) => {
      newData[img.name] = img;
    });
    setChosenImages(newData);
    setLastSelectedImage(selectedImages?.at(-1));
  }, [selectedImages]);

  useEffect(() => {
    document.body.addEventListener('keydown', (event) => {
      if (event.keyCode === CTRL_CODE) {
        setTabPressed(true);
      }
    });
    document.body.addEventListener('keyup', (event) => {
      if (event.keyCode === CTRL_CODE) {
        setTabPressed(false);
      }
    });
  }, []);

  const selectImage = (image: StorageReference) => {
    setChosenImages((prev) => {
      let newImages;

      if (multiple && tabPressed) {
        newImages = {...prev};
        if (newImages[image.name]) {
          delete newImages[image.name];
        } else {
          newImages[image.name] = image;
        }
      } else {
        newImages = {
          [image.name]: image,
        };
      }

      selectImageClick?.(Object.values(newImages));
      return newImages;
    });
    setLastSelectedImage(image);
  };

  return (
    <div className="flex justify-between gap-2">
      {images?.length ? (
        <>
          <ListViewer
            editAvailable={deleteAvailable}
            items={images}
            itemTitle={{transformFunction: (item: ICounterBlock) => (`${item.number}${item.numberPostfix || ''} ${item.text}`)}}
            deleteItemClick={deleteImageClick}
            selectItemClick={selectImage}
          />
          <div className="w-6/12 flex items-center justify-center text-center rounded-md border-custom-red-1 border-2">
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
        </>
      ) : (
        <div className="w-full text-center rounded-md border-custom-red-1 border-2 px-2 py-1">
          {t('noImages')}
        </div>
      )}
    </div>
  );
}
