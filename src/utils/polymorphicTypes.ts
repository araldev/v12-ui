export type WithoutAs<T> = 'as' extends keyof T ? Omit<T, 'as'> : T
