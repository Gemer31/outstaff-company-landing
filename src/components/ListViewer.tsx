import Image from 'next/image';
import { useEffect, useState } from 'react';
import { convertToClass } from '@/utils/convert-to-class.util';
import { EditorsSearch } from '@/components/EditorsSearch';
import DragListView from 'react-drag-listview';
import { CTRL_CODE } from '@/constants/common.constant';

interface IVacanciesViewerProps {
  className?: string;
  selectedItem?: unknown;
  items: unknown[];
  editAvailable?: boolean;
  multiSelect?: boolean;
  emptyText?: string;
  newItemText?: string;
  propsMapper?: {
    idProp: string;
    itemTitle: {
      prop?: string;
      transformFunction?: (item: unknown) => string;
    };
  };
  deleteItemClick?: (item: unknown) => void;
  selectItemClick?: (items: unknown[], lastSelectedItem: unknown) => void;
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
    multiSelect,
    className,
    items,
    editAvailable,
    deleteItemClick,
    selectItemClick,
    changeItemsPosition,
    emptyText,
    newItemText,
    propsMapper,
  }: IVacanciesViewerProps,
) {
  const [tabPressed, setTabPressed] = useState<boolean>();
  const [chosenItems, setChosenItems] = useState<Record<string, unknown>>({});
  const [searchValue, setSearchValue] = useState('');

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

  const selectItem = (newItem: unknown) => {
    setChosenItems((prev) => {
      let newItems;

      if (multiSelect && tabPressed) {
        newItems = {...prev};
        if (newItems[newItem[propsMapper.idProp]]) {
          delete newItems[newItem[propsMapper.idProp]];
        } else {
          newItems[newItem[propsMapper.idProp]] = newItem;
        }
      } else {
        newItems = {
          [newItem[propsMapper.idProp]]: newItem,
        };
      }

      selectItemClick?.(Object.values(newItems), newItem);
      return newItems;
    });
  };

  return (<div className={'w-full' + (className || '')}>
      {!items?.length && !editAvailable ? (
        <div className="w-full text-center rounded-md border-custom-red-1 border-2 px-2 py-1">
          {emptyText}
        </div>
      ) : (
        <div className="overflow-auto max-h-48 w-full rounded-md border-custom-red-1 border-2">
          <EditorsSearch onChange={setSearchValue}/>
          <div className="px-2 py-1">
            <DragListView onDragEnd={changeItemsPosition} nodeSelector="li">
              {newItemText ? (
                <div
                  onClick={() => selectItem(undefined)}
                  key="new"
                  className={`cursor-pointer flex justify-between items-center px-2 py-1 ${!Object.values(chosenItems)?.length ? 'rounded-md bg-custom-red-1' : ''}`}
                >
                  <span>{newItemText}</span>
                </div>
              ) : (
                <></>
              )}
              {(searchValue
                ? items.filter((item) => (propsMapper.itemTitle.prop ? item[propsMapper.itemTitle.prop]
                  : propsMapper.itemTitle.transformFunction(item)).toLowerCase().includes(searchValue.toLowerCase())) : items)?.map((item, index) => (
                <li
                  onClick={() => selectItem(item)}
                  key={item[propsMapper.idProp || 'id'] || index}
                  className={`mb-1 ${itemClass} ${chosenItems?.[item[propsMapper.idProp || 'id']] ? 'rounded-md bg-custom-red-1' : ''}`}
                >
                  <span>{(propsMapper.itemTitle.prop ? item[propsMapper.itemTitle.prop] : propsMapper.itemTitle.transformFunction(item))}</span>
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
    </div>
  );
}
