'use client';

import { useEffect, useState } from 'react';
import { IConfig, ICounterBlock, ICustomersBlock, IVacancy } from '@/models/common.model';
import { collection, getDocs } from '@firebase/firestore';
import { db, storage } from '@/lib/firebaseClient';
import { ButtonColorOptions, ButtonTypes, EditGroup, FirestoreCollections } from '@/models/enums';
import { Loader } from '@/UI/loader/Loader';
import { ContentContainer } from '@/UI/ContentContainer';
import { Button } from '@/UI/banner/Button';
import { GeneralEditorForm } from '@/components/GeneralEditorForm';
import { useTranslations } from 'next-intl';
import { VacanciesEditorForm } from '@/components/VacanciesEditorForm';
import { docsToData } from '@/utils/firebase.util';
import { CounterBlocksEditorForm } from '@/components/CounterBlocksEditorForm';
import { listAll, ref, StorageReference } from '@firebase/storage';
import { ImagesEditorForm } from '@/components/ImagesEditorForm';
import { CustomersBlockEditorForm } from '@/components/CustomersBlockEditorForm';

export function AdminEditor() {
  const t = useTranslations();
  const [config, setConfig] = useState<IConfig>();
  const [customersBlock, setCustomersBlock] = useState<ICustomersBlock>();
  const [vacancies, setVacancies] = useState<IVacancy[]>([]);
  const [counterBlocks, setCounterBlocks] = useState<ICounterBlock[]>([]);
  const [images, setImages] = useState<StorageReference[]>();
  const [selectedGroup, setSelectedGroup] = useState<EditGroup | string>(
    EditGroup.GENERAL
  );
  const [isDataLoading, setIsDataLoading] = useState(true);

  useEffect(() => {
    setIsDataLoading(true);
    loadData().then(() => setIsDataLoading(false));
  }, []);

  const loadData = async () => {
    const [
      settingsQuerySnapshot,
      counterBlocksQuerySnapshot,
      customersBlockQuerySnapshot,
      vacanciesQuerySnapshot,
    ] = await Promise.all([
      getDocs(collection(db, FirestoreCollections.SETTINGS)),
      getDocs(collection(db, FirestoreCollections.COUNTER_BLOCKS)),
      getDocs(collection(db, FirestoreCollections.CUSTOMERS_BLOCK)),
      getDocs(collection(db, FirestoreCollections.VACANCIES)),
    ]);

    const images = await listAll(ref(storage));

    const counterBlocks: ICounterBlock[] = docsToData<ICounterBlock>(counterBlocksQuerySnapshot.docs)
      ?.sort((a, b) => (a.order - b.order));
    const vacancies: IVacancy[] = docsToData<IVacancy>(vacanciesQuerySnapshot.docs)
      ?.sort((a, b) => (a.order - b.order));

    console.log(images.items);
    setImages(images.items);
    setConfig(settingsQuerySnapshot.docs[0].data() as IConfig);
    setCustomersBlock(customersBlockQuerySnapshot.docs[0].data() as ICustomersBlock);
    setCounterBlocks(counterBlocks);
    setVacancies(vacancies);
  };

  return (
      <ContentContainer className="py-4 flex flex-col items-center">
        {isDataLoading ? (
          <div className="w-full flex justify-center mt-4 overflow-hidden">
            <Loader className="min-h-[250px]" />
          </div>
        ) : (
          <>
            <div className="w-full mt-2 mb-4 flex gap-x-3">
              {Object.values(EditGroup).map((v: string) => {
                return (
                  <Button
                    key={v}
                    color={
                      selectedGroup === v
                        ? ButtonColorOptions.RED
                        : ButtonColorOptions.GRAY
                    }
                    className="w-full text-amber-50 px-4 py-2"
                    type={ButtonTypes.BUTTON}
                    callback={() => setSelectedGroup(v)}
                  >
                    {t(v)}
                  </Button>
                );
              })}
            </div>
            <div className="w-full">
              {selectedGroup === EditGroup.GENERAL ? (
                <GeneralEditorForm config={config} refreshCallback={loadData} />
              ) : (
                <></>
              )}
              {selectedGroup === EditGroup.VACANCIES ? (
                <VacanciesEditorForm vacancies={vacancies} config={config} refreshCallback={loadData} />
              ) : (
                <></>
              )}
              {selectedGroup === EditGroup.COUNTER_BLOCKS ? (
                <CounterBlocksEditorForm counterBlocks={counterBlocks} refreshCallback={loadData}/>
              ) : (
                <></>
              )}
              {selectedGroup === EditGroup.CUSTOMERS_BLOCK ? (
                <CustomersBlockEditorForm customersBlock={customersBlock} images={images} refreshCallback={loadData}/>
              ) : (
                <></>
              )}
              {selectedGroup === EditGroup.IMAGES ? (
                <ImagesEditorForm images={images} refreshCallback={loadData} />
              ) : (
                <></>
              )}
            </div>
          </>
        )}
      </ContentContainer>
  );
}
