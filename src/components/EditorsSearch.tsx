import { SearchInput } from '@/UI/SearchInput';

export interface IEditorsSearchProps {
  onChange: (searchValue: string) => void;
}

export function EditorsSearch({ onChange }: IEditorsSearchProps) {
  return (
    <div className="sticky top-0 p-2 bg-custom-red-1">
      <SearchInput onChange={onChange} />
    </div>
  );
}
