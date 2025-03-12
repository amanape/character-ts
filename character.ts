interface CharacterStats {
    health: number;
    strength: number;
    agility: number;
    level: number;
}

class Character {
    private name: string;
    private stats: CharacterStats;

    constructor(name: string, initialStats: CharacterStats) {
        this.name = name;
        this.stats = initialStats;
    }

    getName(): string {
        return this.name;
    }

    getStats(): CharacterStats {
        return { ...this.stats };
    }

    levelUp(): void {
        this.stats.level++;
        this.stats.health += 10;
        this.stats.strength += 2;
        this.stats.agility += 2;
    }
}

export { Character, CharacterStats };