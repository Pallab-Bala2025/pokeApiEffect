import { Schema } from "effect";



class Pokemon extends Schema.Class<Pokemon>("Pokemon")({
  id: Schema.Number,
  order: Schema.Number,
  name: Schema.String,
  height: Schema.Number,
  weight: Schema.Number,
}) {}



const decodePokemon = Schema.decodeUnknown(Pokemon);

export { Pokemon, decodePokemon };

