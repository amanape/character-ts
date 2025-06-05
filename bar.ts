import { Character } from './character';
import { NPC } from './npc';

interface BarMenu {
    drinks: { name: string; price: number; healthEffect: number }[];
    food: { name: string; price: number; healthEffect: number }[];
}

class Bar {
    private name: string;
    private menu: BarMenu;
    private patrons: (Character | NPC)[];
    private bartender: NPC;

    constructor(name: string) {
        this.name = name;
        this.patrons = [];
        this.menu = {
            drinks: [
                { name: "Healing Potion", price: 10, healthEffect: 20 },
                { name: "Strength Ale", price: 5, healthEffect: 5 }
            ],
            food: [
                { name: "Hearty Stew", price: 8, healthEffect: 15 },
                { name: "Adventurer's Bread", price: 3, healthEffect: 8 }
            ]
        };
        this.bartender = new NPC("Bartender", {
            health: 100,
            strength: 15,
            agility: 10,
            level: 5
        });
    }

    addPatron(character: Character | NPC): void {
        this.patrons.push(character);
    }

    removePatron(character: Character | NPC): void {
        this.patrons = this.patrons.filter(patron => patron !== character);
    }

    getPatrons(): (Character | NPC)[] {
        return [...this.patrons];
    }

    getMenu(): BarMenu {
        return { ...this.menu };
    }

    getName(): string {
        return this.name;
    }

    getBartender(): NPC {
        return this.bartender;
    }
}

export { Bar, BarMenu };