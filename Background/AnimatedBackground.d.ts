import { ComponentPropsWithRef } from '../../node_modules/react';
import { VariantProps } from 'class-variance-authority';
type ThemeProps = {} & VariantProps<typeof div>['theme'];
declare const div: (props?: ({
    theme?: "dark" | "light" | "transparent" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
declare const canvas: (props?: ({
    theme?: "dark" | "light" | "transparent" | null | undefined;
} & import('class-variance-authority/types').ClassProp) | undefined) => string;
type HexColor = `#${string}`;
interface PropsAnimatedBackground extends ComponentPropsWithRef<'div'>, VariantProps<typeof div>, VariantProps<typeof canvas> {
    theme?: ThemeProps;
    bubbleGradiant1?: [HexColor, HexColor];
    bubbleGradiant2?: [HexColor, HexColor];
    bubbleGradiant3?: [HexColor, HexColor];
    zIndex?: number;
}
export declare const AnimatedBackground: import('../../node_modules/react').ForwardRefExoticComponent<Omit<PropsAnimatedBackground, "ref"> & import('../../node_modules/react').RefAttributes<HTMLDivElement>>;
export {};
