'use client';

import { useState } from 'react';
import { ICounterBlock } from '@/models/common.model';
import { InputFormField } from '@/UI/form-fields/InputFormField';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { YupUtil } from '@/utils/yup.util';
import { Button } from '@/UI/banner/Button';
import { ButtonTypes, FirestoreCollections } from '@/models/enums';
import { ListViewer } from '@/components/ListViewer';
import { deleteDoc, doc, setDoc, updateDoc } from '@firebase/firestore';
import { db } from '@/lib/firebase-config';
import { showNotification } from '@/UI/notification/notification.controller';
import { uuidv4 } from '@firebase/util';

interface ICounterBlocksEditorProps {
  counterBlocks: ICounterBlock[],
  refreshCallback?: () => void;
}

export function CounterBlocksEditorForm({counterBlocks, refreshCallback}: ICounterBlocksEditorProps) {
  const [isLoading, setIsLoading] = useState(false);
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

  const selectCounterBlock = (newItem?: ICounterBlock) => {
    setValue('id', newItem?.id);
    setValue('order', newItem?.order);
    setValue('number', newItem?.number);
    setValue('text', newItem?.text);
    setValue('numberPostfix', newItem?.numberPostfix);
  };

  const submitForm = async (formData: {
    id: string;
    number: number;
    text: string;
    numberPostfix?: string;
  }) => {
    setIsLoading(true);

    const data: ICounterBlock = { ...formData } as ICounterBlock;

    if (!formData.id) {
      data.id = uuidv4();
      data.order = counterBlocks.length + 1;
    }

    try {
      await setDoc(doc(db, FirestoreCollections.COUNTER_BLOCKS, data.id), data);
      selectCounterBlock();
      reset();
      showNotification(t("infoSaved"));
      refreshCallback?.();
    } catch {
      showNotification(t("somethingWentWrong"));
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCounterBlocks = async (deleteItem: ICounterBlock) => {
    setIsLoading(true);

    try {
      await deleteDoc(
        doc(db, FirestoreCollections.COUNTER_BLOCKS, deleteItem.id),
      );
      selectCounterBlock(null);
      showNotification(t('deletedSuccessfully'));
      reset();
      refreshCallback?.();
    } catch (e) {
      console.error('Delete error: ', e);
      showNotification(t('somethingWentWrong'));
    } finally {
      setIsLoading(false);
    }
  };

  const changeCounterBlocksPosition = async (fromIndex: number, toIndex: number) => {
    setIsLoading(true);

    try {
      const blockFrom: ICounterBlock = counterBlocks[fromIndex - 1];
      const blockTo: ICounterBlock = counterBlocks[toIndex - 1];

      await setDoc(
        doc(db, FirestoreCollections.COUNTER_BLOCKS, blockFrom.id),
        { ...blockFrom, order: blockTo.order });
      await updateDoc(
        doc(db, FirestoreCollections.COUNTER_BLOCKS, blockTo.id),
        { ...blockTo, order: blockFrom.order }
      );

      selectCounterBlock(null);
      showNotification(t('infoSaved'));
      reset();
      refreshCallback?.();
    } catch {
      showNotification(t('somethingWentWrong'));
    } finally {
      setIsLoading(false);
    }
  };

  return <form className="flex flex-col" onSubmit={handleSubmit(submitForm)}>
    <ListViewer
      editAvailable
      newItemText={t('newBlock')}
      items={counterBlocks}
      itemTitle={{transformFunction: (item: ICounterBlock) => (`${item.number}${item.numberPostfix || ''} ${item.text}`)}}
      deleteItemClick={deleteCounterBlocks}
      selectItemClick={selectCounterBlock}
      changeItemsPosition={changeCounterBlocksPosition}
    />
    <InputFormField
      required
      placeholder={t('enterNumber')}
      label={t('number')}
      name="number"
      type="number"
      error={errors?.number?.message ? t(errors.number.message) : ''}
      register={register}
    />
    <InputFormField
      required
      placeholder={t('enterText')}
      label={t('text')}
      name="text"
      type="text"
      error={errors?.text?.message ? t(errors.text.message) : ''}
      register={register}
    />
    <InputFormField
      placeholder={t('enterPostfix')}
      label={t('postfix')}
      name="numberPostfix"
      type="text"
      error={errors?.numberPostfix?.message ? t(errors.numberPostfix.message) : ''}
      register={register}
    />
    <Button
      className="text-amber-50 w-full py-2"
      disabled={isLoading}
      loading={isLoading}
      type={ButtonTypes.SUBMIT}
    >
      {t('save')}
    </Button>
  </form>;
}
