declare module 'convex-helpers' {
  export function asyncMap<FromType, ToType>(
    list: Iterable<FromType> | AsyncIterable<FromType>,
    asyncTransform: (item: FromType, index: number) => Promise<ToType>
  ): Promise<ToType[]>;

  // Add other function declarations as needed
}