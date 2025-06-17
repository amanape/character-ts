// Basic TypeScript interface and function example
interface Foo {
  name: string;
  value: number;
}

export function createFoo(name: string, value: number): Foo {
  return { name, value };
}