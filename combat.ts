import { Character, CharacterStats } from './character';
import { SkillSystem } from './skills';

interface CombatResult {
    damage: number;
    isCritical: boolean;
    remainingHealth: number;
}

class CombatSystem {
    private static CRIT_CHANCE = 0.1;
    private static CRIT_MULTIPLIER = 2;

    static calculateDamage(attacker: Character, defender: Character): CombatResult {
        const attackerStats = attacker.getStats();
        const defenderStats = defender.getStats();
        
        // Base damage calculation
        let damage = attackerStats.strength * 2;
        
        // Critical hit calculation
        const isCritical = Math.random() < CombatSystem.CRIT_CHANCE;
        if (isCritical) {
            damage *= CombatSystem.CRIT_MULTIPLIER;
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