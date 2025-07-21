import { StoryObj } from '@storybook/react-vite';
declare const meta: {
    title: string;
    tags: string[];
    parameters: {
        layout: string;
    };
    component: <T extends "a" | "button" = "button">(props: ({
        as?: T | undefined;
        disabled?: boolean;
        children?: import('../../node_modules/react').ReactNode;
        className?: string;
    } & import('../utils/polymorphicTypes').WithoutAs<import('../../node_modules/react').ComponentPropsWithRef<T>> & import('class-variance-authority').VariantProps<(props?: ({
        variant?: "error" | "primary" | "secondary" | "muted" | "accent" | "success" | "warning" | "info" | "ghost" | null | undefined;
        border?: boolean | null | undefined;
        shadow?: "error" | "default" | "success" | "warning" | "info" | null | undefined;
        rounded?: "circle" | "none" | "sm" | "md" | "lg" | "pill" | null | undefined;
        size?: "sm" | "md" | "lg" | "fit" | "full" | null | undefined;
    } & import('class-variance-authority/types').ClassProp) | undefined) => string>) & {
        ref?: import('../../node_modules/react').Ref<T>;
    }) => import('../../node_modules/react').ReactElement;
    argTypes: {
        as: {
            type: "string";
            description: string;
            options: string[];
            control: "select";
        };
        children: {
            description: string;
            control: "text";
        };
        variant: {
            type: "string";
            options: string[];
            control: "select";
            description: string;
        };
        border: {
            type: "boolean";
            description: string;
            control: "boolean";
        };
        shadow: {
            type: "string";
            description: string;
            options: string[];
            control: "select";
        };
        rounded: {
            type: "string";
            description: string;
            options: string[];
            control: "select";
        };
        size: {
            type: "string";
            description: string;
            options: string[];
            control: "select";
        };
        disabled: {
            type: "boolean";
            description: string;
            control: "boolean";
        };
        className: {
            type: "string";
            description: string;
            control: "text";
        };
    };
};
export default meta;
type Story = StoryObj<typeof meta>;
export declare const Default: Story;
export declare const Primary: Story;
export declare const Secondary: Story;
export declare const Muted: Story;
export declare const Accent: Story;
export declare const Success: Story;
export declare const Warning: Story;
export declare const Error: Story;
export declare const Info: Story;
export declare const Ghost: Story;
export declare const Border: Story;
export declare const ShadowDefault: Story;
export declare const ShadowSuccess: Story;
export declare const ShadowWarning: Story;
export declare const ShadowError: Story;
export declare const ShadowInfo: Story;
export declare const SizeSm: Story;
export declare const SizeMd: Story;
export declare const SizeLg: Story;
export declare const SizeFit: Story;
export declare const SizeFull: Story;
export declare const Disabled: Story;
export declare const RoundedNone: Story;
export declare const RoundedSm: Story;
export declare const RoundedMd: Story;
export declare const RoundedLg: Story;
export declare const RoundedPill: Story;
export declare const RoundedCircle: Story;
