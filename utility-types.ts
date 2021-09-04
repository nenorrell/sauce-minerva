type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export interface ObjectOfAnything{
    [key :string] :any
}