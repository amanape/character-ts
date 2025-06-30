/**
 * Foo Module
 * 
 * This module provides utility functions for character management and game mechanics.
 */

import { Character, CharacterStats } from './character';

/**
 * Generates a random character with balanced stats
 * @param name The name of the character
 * @returns A new Character instance with random stats
 */
export function generateRandomCharacter(name: string): Character {
  const stats: CharacterStats = {
    health: Math.floor(Math.random() * 50) + 50, // 50-100
    strength: Math.floor(Math.random() * 10) + 5, // 5-15
    agility: Math.floor(Math.random() * 10) + 5, // 5-15
    level: 1
  };
  
  return new Character(name, stats);
}

/**
 * Calculates the power level of a character based on their stats
 * @param character The character to evaluate
 * @returns A numeric power level
 */
export function calculatePowerLevel(character: Character): number {
  const stats = character.getStats();
  return stats.health * 0.5 + stats.strength * 2 + stats.agility * 1.5 + (stats.level * 10);
}

/**
 * Determines if a character is ready for the next level challenge
 * @param character The character to evaluate
 * @param challengeRating The difficulty rating of the challenge
 * @returns Boolean indicating if the character is ready
 */
export function isReadyForChallenge(character: Character, challengeRating: number): boolean {
  const powerLevel = calculatePowerLevel(character);
  return powerLevel >= challengeRating;
}