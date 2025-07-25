export type WithoutSharedProperties<C> = 'as' extends keyof C ? Omit<C, 'as' | 'children' | 'className'> : Omit<C, 'className'>

export type PropsOf<C extends React.ElementType> = React.ComponentPropsWithRef<C>

interface AsProp<C extends React.ElementType> {
  /**
   * An override of the default HTML tag.
   * Can also be another React component.
   */
  as?: C
}

/**
 * Allows for extending a set of props (`ExtendedProps`) by an overriding set of props
 * (`OverrideProps`), ensuring that any duplicates are overridden by the overriding
 * set of props.
 */
export type ExtendableProps<ExtendedProps = {}, OverrideProps = {}> = OverrideProps & Omit<ExtendedProps, keyof OverrideProps>

/**
 * Allows for inheriting the props from the specified element type so that
 * props like children, className & style work, as well as element-specific
 * attributes like aria roles. The component (`C`) must be passed in.
 */
export type InheritableElementProps<C extends React.ElementType, Props = {}> = ExtendableProps<PropsOf<C>, Props>

/**
 * A more sophisticated version of `InheritableElementProps` where
 * the passed in `as` prop will determine which props can be included
 */
export type PolymorphicComponentProps<C extends React.ElementType, Props = {}> = InheritableElementProps<C, Props & AsProp<C>>

export type PolymorphicRef<C extends React.ElementType> = React.ComponentPropsWithRef<C>['ref']

export type PolymorphicComponentPropsWithRef<C extends React.ElementType, Props = {}> = PolymorphicComponentProps<C, Props> & {
  ref?: PolymorphicRef<C>
}
