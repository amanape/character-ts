import { Character, CharacterStats } from './character';
import { Inventory, Item } from './inventory';
import { SkillSystem, Skill } from './skills';
import { CombatSystem } from './combat';

// Create characters
const heroStats: CharacterStats = {
    health: 100,
    strength: 15,
    agility: 10,
    level: 1
};

const enemyStats: CharacterStats = {
    health: 80,
    strength: 12,
    agility: 8,
    level: 1
};

const hero = new Character("Hero", heroStats);
const enemy = new Character("Enemy", enemyStats);

// Setup inventory
const heroInventory = new Inventory(150);
const sword: Item = {
    id: "sword1",
    name: "Steel Sword",
    type: "weapon",
    value: 100,
    weight: 5
};

console.log("\n=== Inventory Demo ===");
console.log("Adding sword to inventory:", heroInventory.addItem(sword));
console.log("Inventory items:", heroInventory.getAllItems());

// Setup skills
const skillSystem = new SkillSystem();
const fireballSkill: Skill = {
    name: "Fireball",
    damage: 25,
    manaCost: 10,
    cooldown: 2,
    type: "magical"
};

console.log("\n=== Skills Demo ===");
skillSystem.learnSkill(fireballSkill);
console.log("Available skills:", skillSystem.getSkills());

// Combat demo
console.log("\n=== Combat Demo ===");
console.log("Hero:", hero.getStats());
console.log("Enemy:", enemy.getStats());

const combatResult = CombatSystem.calculateDamage(hero, enemy);
console.log("Combat result:", combatResult);

const skillResult = CombatSystem.calculateSkillDamage(hero, enemy, skillSystem, "Fireball");
console.log("Skill attack result:", skillResult);

// Level up demo
console.log("\n=== Level Up Demo ===");
console.log("Before level up:", hero.getStats());
hero.levelUp();
console.log("After level up:", hero.getStats());