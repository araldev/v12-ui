import { Ref, ComponentPropsWithRef, ElementType, ReactElement, ReactNode } from '../../node_modules/react';
import { WithoutAs } from '../utils/polymorphicTypes';
import { VariantProps } from 'class-variance-authority';
declare const text: (props?: ({
    variant?: "error" | "default" | "primary" | "secondary" | "muted" | "accent" | "success" | "warning" | "info" | null | undefined;
    hover?: boolean | null | undefined;
    textShadow?: "none" | "black_p" | "black_title" | "success_p" | "success_title" | "warning_p" | "warning_title" | "error_p" | "error_title" | "info_p" | "info_title" | null | undefined;
    fontSize?: "small_responsive" | "paragraph_responsive" | "subtitle_responsive" | "title_responsive" | null | undefined;
    fontWeight?: "small" | "title" | "auto" | "paragraph" | "subtitle" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
type AllowedTags = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'strong' | 'small' | 'em' | 'b' | 'i' | 'u' | 'mark' | 'del' | 'ins' | 'code' | 'kbd' | 'samp' | 'var' | 'cite' | 'q' | 'pre' | 'blockquote';
type PolymorphicProps<T extends ElementType> = {
    as?: T;
    children?: ReactNode;
    className?: string;
} & WithoutAs<ComponentPropsWithRef<T>> & VariantProps<typeof text>;
export declare const Text: <T extends AllowedTags = "p">(props: PolymorphicProps<T> & {
    ref?: Ref<T>;
}) => ReactElement;
export {};
