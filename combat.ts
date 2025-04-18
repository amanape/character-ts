import { Character, CharacterStats } from './character';
import { SkillSystem } from './skills';

interface CombatResult {
    damage: number;
    isCritical: boolean;
    remainingHealth: number;
}

class CombatSystem {
    static readonly DEFAULT_CRIT_CHANCE = 0.1;
    static readonly DEFAULT_CRIT_MULTIPLIER = 2;
    private static critChance = CombatSystem.DEFAULT_CRIT_CHANCE;
    private static critMultiplier = CombatSystem.DEFAULT_CRIT_MULTIPLIER;
    private static randomGenerator: () => number = Math.random;

    // For testing purposes only
    static setRandomGenerator(generator: () => number) {
        this.randomGenerator = generator;
    }

    // For testing purposes only
    static resetRandomGenerator() {
        this.randomGenerator = Math.random;
    }

    // For testing purposes only
    static setCriticalHitChance(chance: number) {
        this.critChance = chance;
    }

    // For testing purposes only
    static setCriticalHitMultiplier(multiplier: number) {
        this.critMultiplier = multiplier;
    }

    // For testing purposes only
    static resetCriticalHitValues() {
        this.critChance = this.DEFAULT_CRIT_CHANCE;
        this.critMultiplier = this.DEFAULT_CRIT_MULTIPLIER;
    }

    static calculateDamage(attacker: Character, defender: Character): CombatResult {
        const attackerStats = attacker.getStats();
        const defenderStats = defender.getStats();
        
        // Base damage calculation
        let damage = attackerStats.strength * 2;
        
        // Critical hit calculation
        const isCritical = this.randomGenerator() < this.critChance;
        if (isCritical) {
            damage *= this.critMultiplier;
        }
        
        // Defense reduction
        const defenseReduction = defenderStats.agility / 2;
        damage = Math.max(1, damage - defenseReduction);
        
        // Round damage to nearest integer
        damage = Math.round(damage);
        
        return {
            damage,
            isCritical,
            remainingHealth: Math.max(0, defenderStats.health - damage)
        };
    }

    static isDefeated(character: Character): boolean {
        return character.getStats().health <= 0;
    }

    static calculateSkillDamage(
        attacker: Character,
        defender: Character,
        skillSystem: SkillSystem,
        skillName: string
    ): CombatResult | null {
        const attackerStats = attacker.getStats();
        const result = skillSystem.useSkill(skillName, attackerStats.health); // Using health as mana for simplicity

        if (!result.success) {
            return null;
        }

        return {
            damage: result.damage,
            isCritical: false,
            remainingHealth: Math.max(0, defender.getStats().health - result.damage)
        };
    }
}

export { CombatSystem, CombatResult };