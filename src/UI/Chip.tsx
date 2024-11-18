interface IChipProps {
    value: string;
}

export function Chip({ value }: IChipProps) {
    return <div className="w-max flex justify-center items-center rounded-xl font-bold bg-custom-red-1 px-3 py-0.5">{value}</div>
}
