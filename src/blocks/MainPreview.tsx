import { ContentContainer } from "@/UI/ContentContainer";
import Image from 'next/image';

export function MainPreview() {
    return <article className="flex justify-center">
        <ContentContainer>
            <div>
                <Image src="/images/main-preview.jpg" width={1000} height={1000} alt="Preview"/>
            </div>
        </ContentContainer>
    </article>
}