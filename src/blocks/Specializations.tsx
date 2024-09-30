import { SpecializationCard } from "@/components/SpecializationCard";
import { ISpecializationCard } from "@/models/common.model";
import { ContentContainer } from "@/UI/ContentContainer";
import { TitleContainer } from "@/UI/TitleContainer";
import { useTranslations } from "next-intl";
import Image from "next/image";

const SPECIALIZATIONS: ISpecializationCard[] = [
    {
        title: 'frontend',
        description: 'Порталы, панели управления, spa/ssr/pwa приложения',
        icons: [
            {
                path: '/icons/specializations/angular.svg',
                alt: 'Angular'
            },
            {
                path: '/icons/specializations/java.svg',
                alt: 'Java'
            },
            {
                path: '/icons/specializations/javascript.svg',
                alt: 'Javascript'
            },
            {
                path: '/icons/specializations/python.svg',
                alt: 'Python'
            },
            {
                path: '/icons/specializations/react.svg',
                alt: 'React'
            },
            {
                path: '/icons/specializations/svelte.svg',
                alt: 'Svelte'
            },
            {
                path: '/icons/specializations/typescript.svg',
                alt: 'Typescript'
            },
            {
                path: '/icons/specializations/vue.svg',
                alt: 'Vue'
            },
        ],
    },
    {
        title: 'backend',
        description: 'High Load, микросервисная архитектура, монолитные приложения',
        icons: [
            {
                path: '/icons/specializations/php.svg',
                alt: 'PHP'
            },
            {
                path: '/icons/specializations/laravel.svg',
                alt: 'Laravel'
            },
            {
                path: '/icons/specializations/mysql.svg',
                alt: 'Mysql'
            },
            {
                path: '/icons/specializations/postgresql.svg',
                alt: 'Postgresql'
            },
        ]
    },
    {
        title: 'mobile',
        description: 'Нативные и кроссплатформенные приложения',
        icons: [
            {
                path: '/icons/specializations/swift.svg',
                alt: 'Swift'
            },
            {
                path: '/icons/specializations/kotlin.svg',
                alt: 'Kotlin'
            },
        ]
    }
]

export function Specializations() {
    const t = useTranslations();

    return <article className="w-full flex justify-center bg-custom-black-1 py-10">
        <ContentContainer className="relative">
            <TitleContainer title={t('specialization')}>
                <div className="flex gap-x-4">
                    {
                        SPECIALIZATIONS.map((item) => {
                            return <SpecializationCard data={item} />
                        })
                    }
                </div>
            </TitleContainer>
        </ContentContainer>
    </article>
}