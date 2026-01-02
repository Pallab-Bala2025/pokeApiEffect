import { Effect, Layer } from "effect";

import { PokeApi, PokeApiLive } from "./PokeApi";
import { PokemonCollection, PokemonCollectionLive } from "./PokemonCollection";
import { BuildPokeApiUrl, BuildPokeApiUrlLive } from "./BuildPokeApiUrl";
import { PokeApiUrl, PokeApiUrlLive } from "./PokeApiUrl";

// requirements
const MainLayer = Layer.mergeAll(
    PokeApiLive.pipe(
        Layer.provide(BuildPokeApiUrlLive),
        Layer.provide(PokeApiUrlLive),
        Layer.provide(PokemonCollectionLive)
    )
    
)



// core logic
const program = Effect.gen(function* () {
    const pokeApi = yield* PokeApi;

    return yield* pokeApi.getPokemon;
});

// adding services
const runnable = program.pipe(
    Effect.provide(MainLayer)
);

// Error handling
const main = runnable.pipe(
    Effect.catchTags({
        JsonError: () => Effect.succeed("JsonError"),
        FetchError: () => Effect.succeed("FetchError"),
        ParseError: () => Effect.succeed("ParseError"),
    })

);



Effect.runPromise(main).then(console.log);

