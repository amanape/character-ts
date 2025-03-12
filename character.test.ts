import { Character, CharacterStats } from './character';

describe('Character', () => {
    let initialStats: CharacterStats;
    let character: Character;

    beforeEach(() => {
        initialStats = {
            health: 100,
            strength: 15,
            agility: 10,
            level: 1
        };
        character = new Character("TestHero", initialStats);
    });

    test('should create character with correct initial stats', () => {
        expect(character.getName()).toBe("TestHero");
        expect(character.getStats()).toEqual(initialStats);
    });

    test('should level up correctly', () => {
        character.levelUp();
        const newStats = character.getStats();
        
        expect(newStats.level).toBe(2);
        expect(newStats.health).toBe(110);  // +10 health
        expect(newStats.strength).toBe(17); // +2 strength
        expect(newStats.agility).toBe(12);  // +2 agility
    });

    test('should not modify original stats object', () => {
        const stats = character.getStats();
        stats.health = 50;
        
        expect(character.getStats().health).toBe(100);
    });
});