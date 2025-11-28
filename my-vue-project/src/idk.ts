const isThereAValue = <T>(x: T | null): string => {
    if (x === null){
        return 'Значения не существует'
    }
    return `Значение существует: ${x}`
}

const toTuple = <A, B>(a : A, b : B) => {
    return [a, b]
}

const double = (n: number) => n * 2
const increment = (n: number) => n + 1

import * as O from 'fp-ts/Option'

const userAge = O.fromNullable(25) // Some(25)

import {pipe, flow} from 'fp-ts/lib/function'

const pipeRes = pipe(25, double, increment)
const flowRes = flow(double, increment)

const optionalRes = pipe(
    userAge,
    O.map(flowRes),
    O.getOrElseW(() => 'Значения нет')
)
