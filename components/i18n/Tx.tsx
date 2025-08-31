'use client';
import React from 'react';
import { useI18n } from './I18nProvider';

type Intrinsic = keyof JSX.IntrinsicElements;
type Props<E extends Intrinsic = 'span'> = {
  as?: E;
  className?: string;
  children: string; // English text is the key
} & Omit<JSX.IntrinsicElements[E], 'children'>;

export default function Tx<E extends Intrinsic = 'span'>({ as, className, children, ...rest }: Props<E>) {
  const { t } = useI18n();
  const Tag: any = as ?? 'span';
  return <Tag className={className} {...rest}>{t(children)}</Tag>;
}
