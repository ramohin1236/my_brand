'use client';

import { useEffect } from 'react';
import { useAppSelector } from '@/store';
import { selectTheme } from '@/store/themeSlice';

export function ThemeApplier() {
    const mode = useAppSelector(selectTheme);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', mode === 'dark');
    }, [mode]);

    return null;
}
