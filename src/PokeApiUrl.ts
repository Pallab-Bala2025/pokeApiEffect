import { Config, Context, Effect, Layer } from "effect";
import { cons } from "effect/List";
import { BuildPokeApiUrlLive } from "./BuildPokeApiUrl";

export class PokeApiUrl extends Context.Tag("PokeApiUrl")<
  PokeApiUrl,
  // 👇 Even a single `string` works
  string
>() {}

export const PokeApiUrlLive = Layer.effect(PokeApiUrl, Effect.gen(function* () {
  const baseUrl = yield* Config.string("BASE_URL");
  return `${baseUrl}/api/v2/pokemon`;        
}));



