import { StoryObj } from '@storybook/react-vite';
import { Stack } from './Stack';
import { ComponentPropsWithRef } from '../../node_modules/react';
declare const meta: {
    title: string;
    tags: string[];
    parameters: {
        layout: string;
    };
    component: <T extends "div" | "article" | "aside" | "nav" | "section" | "span" = "div">(props: ({
        as?: T | undefined;
        children?: import('../../node_modules/react').ReactElement | import('../../node_modules/react').ReactElement[];
        direction?: "row" | "col" | "row-reverse" | "col-reverse";
        spacing?: number | "none";
        className?: string;
    } & import('../utils/polymorphicTypes').WithoutAs<ComponentPropsWithRef<T>>) & {
        ref?: import('../../node_modules/react').Ref<T>;
    }) => import('../../node_modules/react').ReactElement;
    argTypes: {
        childrenQuantity: {
            type: "number";
            description: string;
            control: "number";
        };
        children: {
            type: "symbol";
            description: string;
            control: false;
        };
        as: {
            type: "string";
            description: string;
            options: string[];
            control: "select";
        };
        direction: {
            type: "string";
            description: string;
            options: string[];
            control: "select";
        };
        spacing: {
            type: "number";
            description: string;
            control: "number";
        };
        className: {
            type: "string";
            description: string;
            control: false;
        };
    };
};
type InnerComponentAndStackProps = ComponentPropsWithRef<typeof Stack> & {
    childrenQuantity?: number;
};
export default meta;
type Story = StoryObj<InnerComponentAndStackProps>;
export declare const Default: Story;
