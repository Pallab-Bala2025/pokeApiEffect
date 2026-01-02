import { Context, Effect, Layer } from "effect";
import { PokeApiUrl } from "./PokeApiUrl";

export class BuildPokeApiUrl extends Context.Tag("BuildPokeApiUrl")<
    BuildPokeApiUrl,
    (props: {name: string}) => string
>() {}


// 
export const BuildPokeApiUrlLive = Layer.effect(

    BuildPokeApiUrl, 
    
    Effect.gen(function* () {
      const pokeApiUrl = yield* PokeApiUrl;
      return ({ name }) => `${pokeApiUrl}/${name}`; 
    })
)


// export const BuildPokeApiUrlWithPokeApi = Layer.provide(BuildPokeApiUrl.Live, PokeApiUrl.Live);

