import { deleteObject, ref, StorageReference, uploadBytes } from '@firebase/storage';
import { useState } from 'react';
import { storage } from '@/lib/firebase-config';
import { ImagesViewer } from '@/components/ImagesViewer';
import { ButtonTypes } from '@/models/enums';
import { Button } from '@/UI/banner/Button';
import { useTranslations } from 'next-intl';
import { showNotification } from '@/UI/notification/notification.controller';

interface ImagesEditorFormProps {
  images?: StorageReference[];
  refreshCallback?: () => void;
}

export function ImagesEditorForm({
  images,
  refreshCallback,
}: ImagesEditorFormProps) {
  const t = useTranslations();
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<StorageReference>();
  const [files, setFiles] = useState<FileList>();

  const uploadFiles = async () => {
    setLoading(true);
    try {
      if (files) {
        await Promise.all(
          Object.values(files).map(async (file) => {
            const arrBuffer = await file.arrayBuffer();
            return uploadBytes(ref(storage, file.name), new Blob([arrBuffer]));
          })
        );
        showNotification(t("imagesUploaded"));
        refreshCallback?.();
      }
    } catch {
      showNotification(t("somethingWentWrong"));
    } finally {
      setLoading(false);
    }
  };

  const deleteImg = async (image: StorageReference) => {
    try {
      const desertRef = ref(storage, image.fullPath);
      await deleteObject(desertRef);
      showNotification(t("imageDeleted"));
      if (image.name === selectedImage?.name) {
        setSelectedImage(null);
      }
      refreshCallback?.();
    } catch {
      showNotification(t("somethingWentWrong"));
    }
  };

  return (
    <>
      <ImagesViewer
        deleteAvailable={true}
        images={images}
        deleteImageClick={deleteImg}
      />

      <label className="flex flex-col justify-center items-center border-dashed w-full rounded-md border-custom-red-1 border-2 mt-2 mb-2 p-6 cursor-pointer">
        <input
          className="invisible h-0"
          type="file"
          multiple={true}
          onChange={(event) => setFiles(event?.target?.files)}
        />
        {files ? (
          Object.values(files).map((file) => (
            <div key={file.name}>{file.name}</div>
          ))
        ) : (
          <span>{t('chooseFiles')}</span>
        )}
      </label>

      <Button
        styleClass="text-amber-50 w-full py-2"
        disabled={loading}
        loading={loading}
        type={ButtonTypes.SUBMIT}
        callback={uploadFiles}
      >
        {t('save')}
      </Button>
    </>
  );
}
