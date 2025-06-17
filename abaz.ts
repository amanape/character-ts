/**
 * abaz.ts - Basic TypeScript module
 */

export interface ABaz {
  id: string;
  name: string;
  value: number;
}

export class ABazImplementation implements ABaz {
  constructor(
    public id: string,
    public name: string,
    public value: number
  ) {}

  toString(): string {
    return `ABaz(id=${this.id}, name=${this.name}, value=${this.value})`;
  }
}

export function createABaz(id: string, name: string, value: number): ABaz {
  return new ABazImplementation(id, name, value);
}