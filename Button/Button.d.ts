import { Ref, ComponentPropsWithRef, ElementType, ReactElement, ReactNode } from '../../node_modules/react';
import { WithoutAs } from '../utils/polymorphicTypes';
import { VariantProps } from 'class-variance-authority';
declare const button: (props?: ({
    variant?: "error" | "primary" | "secondary" | "muted" | "accent" | "success" | "warning" | "info" | "ghost" | null | undefined;
    border?: boolean | null | undefined;
    shadow?: "error" | "default" | "success" | "warning" | "info" | null | undefined;
    rounded?: "circle" | "none" | "sm" | "md" | "lg" | "pill" | null | undefined;
    size?: "sm" | "md" | "lg" | "fit" | "full" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
type AllowedTags = 'button' | 'a';
type PolymorphicProps<T extends ElementType = 'button'> = {
    as?: T;
    disabled?: boolean;
    children?: ReactNode;
    className?: string;
} & WithoutAs<ComponentPropsWithRef<T>> & VariantProps<typeof button>;
export declare const Button: <T extends AllowedTags = "button">(props: PolymorphicProps<T> & {
    ref?: Ref<T>;
}) => ReactElement;
export {};
