'use client';

import { useEffect, useState } from 'react';
import { IConfig, IVacancy } from '@/models/common.model';
import { collection, getDocs } from '@firebase/firestore';
import { db } from '@/lib/firebase-config';
import { ButtonColorOptions, ButtonTypes, EditGroup, FirestoreCollections } from '@/models/enums';
import { Loader } from '@/UI/loader/Loader';
import { ContentContainer } from '@/UI/ContentContainer';
import { Button } from '@/UI/banner/Button';
import { GeneralEditorForm } from '@/components/GeneralEditorForm';
import { useTranslations } from 'next-intl';
import { VacanciesEditorForm } from '@/components/VacanciesEditorForm';

export function AdminEditor() {
  const t = useTranslations();
  const [config, setConfig] = useState<IConfig>();
  const [vacancies, setVacancies] = useState<IVacancy[]>([]);
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
      vacanciesQuerySnapshot,
    ] = await Promise.all([
      getDocs(collection(db, FirestoreCollections.SETTINGS)),
      getDocs(collection(db, FirestoreCollections.VACANCIES)),
    ]);

    setConfig(settingsQuerySnapshot.docs[0].data() as IConfig);
    setVacancies(vacanciesQuerySnapshot.docs[0].data() as IVacancy[]);
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
                        ? ButtonColorOptions.PINK
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
            </div>
          </>
        )}
      </ContentContainer>
  );
}
