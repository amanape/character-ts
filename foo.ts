// Foo module - Basic TypeScript interface and utility functions
interface Foo {
    name: string;
    value: number;
    isActive?: boolean;
}

interface FooConfig {
    defaultValue: number;
    prefix: string;
}

class FooManager {
    private items: Foo[] = [];
    private config: FooConfig;

    constructor(config: FooConfig) {
        this.config = config;
    }

    createFoo(name: string, value?: number): Foo {
        return {
            name: this.config.prefix + name,
            value: value ?? this.config.defaultValue,
            isActive: true
        };
    }

    addFoo(foo: Foo): void {
        this.items.push(foo);
    }

    getFooByName(name: string): Foo | undefined {
        return this.items.find(item => item.name === name);
    }

    getActiveFoos(): Foo[] {
        return this.items.filter(item => item.isActive !== false);
    }

    getTotalValue(): number {
        return this.items.reduce((sum, item) => sum + item.value, 0);
    }
}

// Utility functions
export function createFoo(name: string, value: number): Foo {
    return { name, value };
}

export function createFooWithDefaults(name: string): Foo {
    return { name, value: 0, isActive: true };
}

export { Foo, FooConfig, FooManager };