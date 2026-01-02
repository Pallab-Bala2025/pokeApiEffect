import { Context, Effect, Layer, type Array } from "effect";

export class PokemonCollection extends Context.Tag("PokemonCollection")<
    PokemonCollection,
    Array.NonEmptyArray<string>
>() {

}

export const PokemonCollectionLive = Layer.succeed(PokemonCollection, [
    "staryu",
    "perrserker",
    "flaaffy",
])

