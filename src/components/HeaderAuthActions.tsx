import { RouterLinks } from '@/models/enums';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Link } from '@/i18n/routing';
import { auth } from "@/lib/firebaseClient";

export function HeaderAuthActions() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                setVisible(true);
            }
        })
    }, []);

    return visible ?
        <Link className="ml-2" href={RouterLinks.EDITOR}>
            <Image src="/icons/edit.svg" width={45} height={45} alt="Edit"/>
        </Link> : <></>;
}
