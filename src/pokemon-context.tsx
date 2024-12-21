import React, { createContext, useState, ReactNode } from "react";
import {
  movesDataType,
  objectsDataType,
  trainersDataType,
} from "./data/dataTypes";

export interface DificultyMoves {
  default: movesDataType[];
  easy: movesDataType[];
  normal: movesDataType[];
  hard: movesDataType[];
  absolution: movesDataType[];
}

export interface Pokemon {
  id: string;
  name: string;
  moves: DificultyMoves;
  object: objectsDataType | null;
}

interface PokemonContextBase {
  trainerName: string;
  setTrainerName: React.Dispatch<React.SetStateAction<string>>;
  startText: string;
  setStartText: React.Dispatch<React.SetStateAction<string>>;
  endText: string;
  setEndText: React.Dispatch<React.SetStateAction<string>>;
  pokemons: Pokemon[];
  difficultType: typeDifficultyType;
  setDifficultType: React.Dispatch<React.SetStateAction<typeDifficultyType>>;
}

interface PokemonContextType extends PokemonContextBase {
  selectedTrainer: trainersDataType | null;
  setSelectedTrainer: (trainer: trainersDataType | null) => void;
  addPokemon: (pokemon: Pokemon) => void;
  removePokemon: (pokemonId: string) => void;
  updatePokemon: (updatedPokemon: Pokemon) => void;
}

export type typeDifficultyType =
  | "default"
  | "easy"
  | "normal"
  | "hard"
  | "absolution";
interface PokemonProviderProps extends PokemonContextBase {
  children: ReactNode;
  setPokemons: React.Dispatch<React.SetStateAction<Pokemon[]>>;
}
// eslint-disable-next-line react-refresh/only-export-components
export const PokemonContext = createContext<PokemonContextType | undefined>(
  undefined
);

export const PokemonProvider: React.FC<PokemonProviderProps> = ({
  children,
  pokemons,
  setPokemons,
  setTrainerName,
  trainerName,
  endText,
  setEndText,
  startText,
  setStartText,
  difficultType,
  setDifficultType,
}) => {
  const [selectedTrainer, setSelectedTrainer] =
    useState<trainersDataType | null>(null);

  const addPokemon = (pokemon: Pokemon) => {
    setPokemons((prev) => [...prev, pokemon]);
  };

  const removePokemon = (pokemonId: string) => {
    setPokemons((prev) => prev.filter((pokemon) => pokemon.id !== pokemonId));
  };

  const updatePokemon = (updatedPokemon: Pokemon) => {
    setPokemons((prev) =>
      prev.map((pokemon) =>
        pokemon.id === updatedPokemon.id ? updatedPokemon : pokemon
      )
    );
  };

  return (
    <PokemonContext.Provider
      value={{
        trainerName,
        setTrainerName,
        selectedTrainer,
        setSelectedTrainer,
        pokemons,
        addPokemon,
        removePokemon,
        updatePokemon,
        endText,
        setEndText,
        startText,
        setStartText,
        difficultType,
        setDifficultType,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
