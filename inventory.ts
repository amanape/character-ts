interface Item {
    id: string;
    name: string;
    type: 'weapon' | 'armor' | 'consumable' | 'quest';
    value: number;
    weight: number;
}

class Inventory {
    private items: Map<string, Item>;
    private maxWeight: number;
    private currentWeight: number;

    constructor(maxWeight: number = 100) {
        this.items = new Map();
        this.maxWeight = maxWeight;
        this.currentWeight = 0;
    }

    addItem(item: Item): boolean {
        if (this.currentWeight + item.weight > this.maxWeight) {
            return false;
        }

        this.items.set(item.id, item);
        this.currentWeight += item.weight;
        return true;
    }

    removeItem(itemId: string): boolean {
        const item = this.items.get(itemId);
        if (!item) return false;

        this.items.delete(itemId);
        this.currentWeight -= item.weight;
        return true;
    }

    getItem(itemId: string): Item | undefined {
        return this.items.get(itemId);
    }

    getAllItems(): Item[] {
        return Array.from(this.items.values());
    }

    getCurrentWeight(): number {
        return this.currentWeight;
    }

    getMaxWeight(): number {
        return this.maxWeight;
    }
}

export { Inventory, Item };