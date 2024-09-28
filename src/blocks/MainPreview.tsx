import { ContentContainer } from '@/UI/ContentContainer';
import Image from 'next/image';

export function MainPreview() {
    return <article className="w-full flex justify-center bg-custom-black-1 pt-4 pb-10 relative">
        <ContentContainer className='flex justify-between bg-shadow relative'>
            <Image className="rotate-180" src="/images/background.png" width={500} height={500} alt="Preview" />
            <Image src="/images/background.png" width={500} height={500} alt="Preview" />
        </ContentContainer>
    </article>
}