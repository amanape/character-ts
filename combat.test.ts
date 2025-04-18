import { Character } from './character';
import { CombatSystem } from './combat';
import { SkillSystem } from './skills';

describe('CombatSystem', () => {
    let attacker: Character;
    let defender: Character;

    beforeEach(() => {
        // Set up fresh characters before each test
        attacker = new Character('Attacker', {
            strength: 10,
            agility: 5,
            health: 100
        });

        defender = new Character('Defender', {
            strength: 5,
            agility: 8,
            health: 100
        });
    });

    test('basic damage calculation', () => {
        const result = CombatSystem.calculateDamage(attacker, defender);
        
        // Base damage should be strength * 2 (20) minus defense reduction (agility / 2 = 4)
        // So expected damage is around 16 (if not critical)
        expect(result.damage).toBeGreaterThanOrEqual(1); // Minimum damage
        expect(result.remainingHealth).toBeLessThan(100); // Should deal some damage
        expect(result.remainingHealth).toBeGreaterThanOrEqual(0); // Should not go below 0
    });

    test('critical hit multiplies damage', () => {
        // Mock Math.random to force a critical hit
        const mockMath = Object.create(global.Math);
        mockMath.random = () => 0.05; // Below 0.1 crit chance
        global.Math = mockMath;

        const result = CombatSystem.calculateDamage(attacker, defender);
        
        expect(result.isCritical).toBe(true);
        // Base damage (20) * 2 for crit - defense reduction (4) ≈ 36
        expect(result.damage).toBeGreaterThan(30);

        // Restore original Math
        global.Math = Object.create(global.Math);
    });

    test('defense reduces damage', () => {
        // Create a highly defensive character
        const tankDefender = new Character('Tank', {
            strength: 5,
            agility: 20, // High agility for more defense
            health: 100
        });

        const result = CombatSystem.calculateDamage(attacker, tankDefender);
        
        // Base damage (20) - defense reduction (20/2 = 10) ≈ 10
        expect(result.damage).toBeLessThan(20); // Should be reduced by defense
        expect(result.damage).toBeGreaterThanOrEqual(1); // But never below 1
    });

    test('isDefeated returns correct state', () => {
        expect(CombatSystem.isDefeated(defender)).toBe(false);
        
        // Create a defeated character
        const defeatedChar = new Character('Defeated', {
            strength: 5,
            agility: 5,
            health: 0
        });
        
        expect(CombatSystem.isDefeated(defeatedChar)).toBe(true);
    });

    test('skill damage calculation', () => {
        const skillSystem = new SkillSystem();
        const skillName = 'Fireball';
        
        // Add a test skill
        skillSystem.addSkill(skillName, {
            damage: 25,
            manaCost: 10
        });

        const result = CombatSystem.calculateSkillDamage(attacker, defender, skillSystem, skillName);
        
        expect(result).not.toBeNull();
        if (result) {
            expect(result.damage).toBe(25);
            expect(result.isCritical).toBe(false);
            expect(result.remainingHealth).toBe(75); // 100 - 25
        }
    });

    test('invalid skill returns null', () => {
        const skillSystem = new SkillSystem();
        const result = CombatSystem.calculateSkillDamage(attacker, defender, skillSystem, 'NonExistentSkill');
        
        expect(result).toBeNull();
    });
});