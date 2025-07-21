import { ReactElement, ComponentPropsWithRef, ElementType, Ref } from '../../node_modules/react';
import { WithoutAs } from '../utils/polymorphicTypes';
type AllowedTags = 'div' | 'span' | 'section' | 'article' | 'nav' | 'aside';
type PolymorphicProps<T extends ElementType = 'div'> = {
    as?: T;
    children?: ReactElement | ReactElement[];
    direction?: 'row' | 'col' | 'row-reverse' | 'col-reverse';
    spacing?: number | 'none';
    className?: string;
} & WithoutAs<ComponentPropsWithRef<T>>;
export declare const Stack: <T extends AllowedTags = "div">(props: PolymorphicProps<T> & {
    ref?: Ref<T>;
}) => ReactElement;
export {};
