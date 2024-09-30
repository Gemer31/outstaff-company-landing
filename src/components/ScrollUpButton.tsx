import Image from "next/image";
import Link from "next/link";

interface IScrollUpButtonProps {
    isScrollTop: boolean;
}

export function ScrollUpButton({ isScrollTop }: IScrollUpButtonProps) {
    return <Link
        href="#page"
        className={
            'size-10 rounded-full shadow-custom-red fixed max-w-fit bottom-6 left-6 duration-500 scale-0 z-40 bg-custom-black-2 ' +
            (isScrollTop ? '' : 'scale-100')
        }
    >
        <Image width={80} height={80} src="/icons/arrow-up.svg" alt="Scroll top" />
    </Link>
}