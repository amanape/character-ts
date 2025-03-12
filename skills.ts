interface Skill {
    name: string;
    damage: number;
    manaCost: number;
    cooldown: number;
    type: 'physical' | 'magical' | 'healing';
}

class SkillSystem {
    private skills: Map<string, Skill>;
    private cooldowns: Map<string, number>;

    constructor() {
        this.skills = new Map();
        this.cooldowns = new Map();
    }

    learnSkill(skill: Skill): void {
        this.skills.set(skill.name, skill);
        this.cooldowns.set(skill.name, 0);
    }

    useSkill(skillName: string, currentMana: number): { success: boolean; cost: number; damage: number } {
        const skill = this.skills.get(skillName);
        if (!skill) {
            return { success: false, cost: 0, damage: 0 };
        }

        const cooldown = this.cooldowns.get(skillName) || 0;
        if (cooldown > 0) {
            return { success: false, cost: 0, damage: 0 };
        }

        if (currentMana < skill.manaCost) {
            return { success: false, cost: 0, damage: 0 };
        }

        this.cooldowns.set(skillName, skill.cooldown);
        return {
            success: true,
            cost: skill.manaCost,
            damage: skill.damage
        };
    }

    updateCooldowns(): void {
        for (const [skillName, cooldown] of this.cooldowns.entries()) {
            if (cooldown > 0) {
                this.cooldowns.set(skillName, cooldown - 1);
            }
        }
    }

    getSkills(): Skill[] {
        return Array.from(this.skills.values());
    }

    getSkillCooldown(skillName: string): number {
        return this.cooldowns.get(skillName) || 0;
    }
}

export { SkillSystem, Skill };