'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { YupUtil } from '@/utils/yup.util';
import { Button } from '@/UI/banner/Button';
import { ButtonTypes, FirestoreCollections, FirestoreDocuments } from '@/models/enums';
import { showNotification } from '@/UI/notification/notification.controller';
import { ImagesViewer } from '@/components/ImagesViewer';
import { StorageReference } from '@firebase/storage';
import { doc, setDoc } from '@firebase/firestore';
import { db } from '@/lib/firebaseClient';
import { InputFormField } from '@/UI/form-fields/InputFormField';
import { ICustomersBlock } from '@/models/common.model';

interface ICounterBlocksEditorProps {
  customersBlock: ICustomersBlock;
  images?: StorageReference[];
  refreshCallback?: () => void;
}

export function CustomersBlockEditorForm({images, customersBlock, refreshCallback}: ICounterBlocksEditorProps) {
  const t = useTranslations();
  const [isLoading, setIsLoading] = useState(false);
  const {
    setValue,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(YupUtil.customersBlockSchema),
  });

  useEffect(() => {
    if (customersBlock) {
      setValue('itemsAmountOnPage', customersBlock.itemsAmountOnPage);
      setValue('autoplay', customersBlock.autoplay);
      setValue('images', customersBlock.images?.map((item) => images.find((img) => img.fullPath === item)) || []);
    }
  }, [customersBlock, images]);

  const submitForm = async (
    formData: {
      images: StorageReference[];
      itemsAmountOnPage: number;
      autoplay: boolean;
    },
  ) => {
    setIsLoading(true);

    try {
      await setDoc(
        doc(db, FirestoreCollections.CUSTOMERS_BLOCK, FirestoreDocuments.CONFIG),
        {
          ...formData,
          images: formData.images.map((item) => item.fullPath),
        },
      );
      showNotification(t('infoSaved'));
      refreshCallback?.();
    } catch {
      showNotification(t('somethingWentWrong'));
    } finally {
      setIsLoading(false);
    }
  };

  const selectImages = (selectedImages: StorageReference[]) => {
    setValue('images', selectedImages);
  };

  return <form className="flex flex-col" onSubmit={handleSubmit(submitForm)}>
    <ImagesViewer
      multiSelect
      images={images}
      deleteAvailable={false}
      selectedImages={customersBlock?.images.map((item) => images.find((img) => img.fullPath === item))}
      selectImageClick={selectImages}
    />
    <InputFormField
      className="mt-4"
      required={true}
      placeholder={t('enterItemsAmountOnPage')}
      label={t('itemsAmountOnPage')}
      name="itemsAmountOnPage"
      type="number"
      error={errors?.itemsAmountOnPage?.message ? t(errors.itemsAmountOnPage.message) : ''}
      register={register as unknown}
    />
    <InputFormField
      inLine
      label={t("autoplay")}
      name="autoplay"
      type="checkbox"
      error={errors?.autoplay?.message ? t(errors.autoplay.message) : ''}
      register={register}
    />
    <Button
      className="text-amber-50 w-full py-2 mt-4"
      disabled={isLoading}
      loading={isLoading}
      type={ButtonTypes.SUBMIT}
    >
      {t('save')}
    </Button>
  </form>;
}
