export class Bar {
    private current: number;
    private maximum: number;

    constructor(maximum: number) {
        this.maximum = maximum;
        this.current = maximum;
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
     * Set the current value, ensuring it doesn't exceed maximum
     */
    setCurrent(value: number): void {
        this.current = Math.min(Math.max(0, value), this.maximum);
    }

    /**
     * Set the maximum value and adjust current if needed
     */
    setMaximum(value: number): void {
        this.maximum = Math.max(0, value);
        this.current = Math.min(this.current, this.maximum);
    }

    /**
     * Get the percentage of current value relative to maximum
     */
    getPercentage(): number {
        return (this.current / this.maximum) * 100;
    }
}