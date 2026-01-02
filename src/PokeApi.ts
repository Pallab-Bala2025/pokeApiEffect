import {
  Config,
  Context,
  Effect,
  Layer,
  Schema,
  type ParseResult,
} from "effect";
import type { ConfigError } from "effect/ConfigError";
import { FetchError, JsonError } from "./errors";
import { Pokemon, decodePokemon } from "./schema";
import { PokemonCollection } from "./PokemonCollection";
import { BuildPokeApiUrl } from "./BuildPokeApiUrl";

interface PokeApiShape {
  readonly getPokemon: Effect.Effect<
    Pokemon,
    FetchError | JsonError | ParseResult.ParseError | ConfigError
  >;
}

const make = Effect.gen(function* () {
  /// 1️⃣ Extract `PokemonCollection` and `BuildPokeApiUrl` outside of `getPokemon`
  const pokemonCollection = yield* PokemonCollection;
  const buildPokeApiUrl = yield* BuildPokeApiUrl;

  return {
    getPokemon: Effect.gen(function* () {
      const requestUrl = buildPokeApiUrl({ name: pokemonCollection[0] });

      const response = yield* Effect.tryPromise({
        try: () => fetch(requestUrl),
        catch: () => new FetchError(),
      });

      if (!response.ok) {
        return yield* new FetchError();
      }

      const json = yield* Effect.tryPromise({
        try: () => response.json(),
        catch: () => new JsonError(),
      });

      return yield* Schema.decodeUnknown(Pokemon)(json);
    }),
  };
});

export class PokeApi extends Context.Tag("PokeApi")<
  PokeApi,
  /// 2️⃣ Change the definition of the service to `Effect.Effect.Success<typeof make>`
  Effect.Effect.Success<typeof make>
>() {
  /// 3️⃣ Use `Layer.effect` instead of `Layer.succeed`
}

export const PokeApiLive = Layer.effect(PokeApi, make);
