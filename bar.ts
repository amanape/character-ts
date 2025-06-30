/**
 * Bar class representing a progress or status bar
 */
export class Bar {
    private current: number;
    private maximum: number;

    constructor(maximum: number = 100) {
        this.current = maximum;
        this.maximum = maximum;
    }

    /**
     * Get the current value
     */
    getCurrent(): number {
        return this.current;
    }

    /**
     * Get the maximum value
     */
    getMaximum(): number {
        return this.maximum;
    }

    /**
     * Set the current value, clamped between 0 and maximum
     */
    setCurrent(value: number): void {
        this.current = Math.max(0, Math.min(value, this.maximum));
    }

    /**
     * Get the percentage filled (0-100)
     */
    getPercentage(): number {
        return (this.current / this.maximum) * 100;
    }
}