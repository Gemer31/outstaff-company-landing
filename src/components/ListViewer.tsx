import Image from 'next/image';
import { useEffect, useState } from 'react';
import { convertToClass } from '@/utils/convert-to-class.util';
import { EditorsSearch } from '@/components/EditorsSearch';
import DragListView from 'react-drag-listview';

interface IVacanciesViewerProps {
  selectedItem?: unknown;
  items: unknown[];
  editAvailable?: boolean;
  emptyText?: string;
  newItemText?: string;
  itemTitle: {
    prop?: string;
    transformFunction?: (item: unknown) => string;
  };
  deleteItemClick?: (item: unknown) => void;
  selectItemClick?: (item: unknown) => void;
  // changeItemsPosition?: (items: unknown[]) => void;
  changeItemsPosition?: (fromIndex: number, toIndex: number) => void;
}

const itemClass = convertToClass([
  'cursor-pointer',
  'flex',
  'justify-between',
  'items-center',
  'px-2',
  'py-1',
]);

export function ListViewer(
  {
    selectedItem,
    items,
    editAvailable,
    deleteItemClick,
    selectItemClick,
    changeItemsPosition,
    emptyText,
    newItemText,
    itemTitle: {prop, transformFunction},
  }: IVacanciesViewerProps,
) {
  const [chosenItem, setChosenItem] = useState<unknown>();
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => setChosenItem(selectedItem), [selectedItem]);

  const selectItem = (category: unknown) => {
    setChosenItem(category);
    selectItemClick?.(category);
  };

  // const onDragEnd = (fromIndex, toIndex) => {
  //   const itemFromChange = {...items[fromIndex]};
  //   const itemToChange = {...items[toIndex]};
  //   const newItems = items.map((item, index) => {
  //     if (index === fromIndex) {
  //       return itemToChange;
  //     }
  //     if (index === toIndex) {
  //       return itemFromChange;
  //     }
  //     return item;
  //   });
  //
  //   changeItemsPosition(newItems);
  // };

  return (
    <>
      {!items?.length && !editAvailable ? (
        <div className="w-full text-center rounded-md border-custom-red-1 border-2 px-2 py-1">
          {emptyText}
        </div>
      ) : (
        <div className="overflow-auto max-h-48 w-full rounded-md border-custom-red-1 border-2">
          <EditorsSearch onChange={setSearchValue}/>
          <div className="px-2 py-1">
            <DragListView onDragEnd={changeItemsPosition} nodeSelector="li">
              {editAvailable ? (
                <div
                  onClick={() => selectItem(undefined)}
                  key="new"
                  className={`cursor-pointer flex justify-between items-center px-2 py-1 ${!chosenItem ? 'rounded-md bg-custom-red-1' : ''}`}
                >
                  <span>{newItemText}</span>
                </div>
              ) : (
                <></>
              )}
              {(searchValue
                ? items.filter((item) => (prop ? item[prop]
                  : transformFunction(item)).toLowerCase().includes(searchValue.toLowerCase())) : items)?.map((item) => (
                <li
                  onClick={() => selectItem(item)}
                  key={item.id}
                  className={`${itemClass} ${chosenItem?.id === item.id ? 'rounded-md bg-custom-red-1' : ''}`}
                >
                  <span>{(prop ? item[prop] : transformFunction(item))}</span>
                  {editAvailable ? (
                    <Image
                      onClick={() => deleteItemClick?.(item)}
                      width={30}
                      height={30}
                      src="/icons/close.svg"
                      alt="Close"
                    />
                  ) : (
                    <></>
                  )}
                </li>
              ))}
            </DragListView>
          </div>
        </div>
      )}
    </>
  );
}
