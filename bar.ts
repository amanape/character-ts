interface Drink {
    id: string;
    name: string;
    price: number;
    healthEffect: number;
    strengthEffect: number;
}

class Bar {
    private name: string;
    private drinks: Map<string, Drink>;
    private patrons: string[];

    constructor(name: string) {
        this.name = name;
        this.drinks = new Map();
        this.patrons = [];
    }

    getName(): string {
        return this.name;
    }

    addDrink(drink: Drink): void {
        this.drinks.set(drink.id, drink);
    }

    removeDrink(drinkId: string): boolean {
        return this.drinks.delete(drinkId);
    }

    getDrink(drinkId: string): Drink | undefined {
        return this.drinks.get(drinkId);
    }

    getAllDrinks(): Drink[] {
        return Array.from(this.drinks.values());
    }

    addPatron(characterName: string): void {
        if (!this.patrons.includes(characterName)) {
            this.patrons.push(characterName);
        }
    }

    removePatron(characterName: string): boolean {
        const index = this.patrons.indexOf(characterName);
        if (index !== -1) {
            this.patrons.splice(index, 1);
            return true;
        }
        return false;
    }

    getPatrons(): string[] {
        return [...this.patrons];
    }

    serveDrink(characterName: string, drinkId: string): { success: boolean; effects?: { health: number; strength: number } } {
        const drink = this.drinks.get(drinkId);
        
        if (!drink || !this.patrons.includes(characterName)) {
            return { success: false };
        }

        return {
            success: true,
            effects: {
                health: drink.healthEffect,
                strength: drink.strengthEffect
            }
        };
    }
}

export { Bar, Drink };