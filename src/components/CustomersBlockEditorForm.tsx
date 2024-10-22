'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { YupUtil } from '@/utils/yup.util';
import { Button } from '@/UI/banner/Button';
import { ButtonTypes } from '@/models/enums';
import { showNotification } from '@/UI/notification/notification.controller';
import { ImagesViewer } from '@/components/ImagesViewer';
import { StorageReference } from '@firebase/storage';

interface ICounterBlocksEditorProps {
  images?: StorageReference[];
  refreshCallback?: () => void;
}

export function CustomersBlockEditorForm({images, refreshCallback}: ICounterBlocksEditorProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);

  const t = useTranslations();
  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(YupUtil.CounterBlockSchema),
  });

  const submitForm = async (formData: {
    id: string;
    number: number;
    text: string;
    numberPostfix?: string;
  }) => {
    setIsLoading(true);
    try {
      refreshCallback?.();
    } catch {
      showNotification(t("somethingWentWrong"));
    } finally {
      setIsLoading(false);
    }
  };

  return <form className="flex flex-col" onSubmit={handleSubmit(submitForm)}>
    <ImagesViewer
      multiSelect
      selectedItemsCounterVisible
      images={images}
      deleteAvailable={false}
      selectImageClick={setSelectedImages}
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
