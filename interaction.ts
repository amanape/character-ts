import { Character } from './character';
import { Item } from './inventory';

interface InteractionResult {
    success: boolean;
    message: string;
}

interface Interactable {
    id: string;
    name: string;
    type: 'npc' | 'object' | 'quest';
    isActive: boolean;
}

class InteractionSystem {
    private interactables: Map<string, Interactable>;
    private interactionDistance: number;

    constructor(interactionDistance: number = 5) {
        this.interactables = new Map();
        this.interactionDistance = interactionDistance;
    }

    addInteractable(interactable: Interactable): void {
        this.interactables.set(interactable.id, interactable);
    }

    removeInteractable(id: string): boolean {
        return this.interactables.delete(id);
    }

    interact(character: Character, interactableId: string): InteractionResult {
        const interactable = this.interactables.get(interactableId);
        
        if (!interactable) {
            return {
                success: false,
                message: "Nothing to interact with."
            };
        }

        if (!interactable.isActive) {
            return {
                success: false,
                message: `${interactable.name} is not currently interactable.`
            };
        }

        // Different interaction logic based on type
        switch (interactable.type) {
            case 'npc':
                return this.handleNPCInteraction(character, interactable);
            case 'object':
                return this.handleObjectInteraction(character, interactable);
            case 'quest':
                return this.handleQuestInteraction(character, interactable);
            default:
                return {
                    success: false,
                    message: "Unknown interaction type."
                };
        }
    }

    private handleNPCInteraction(character: Character, npc: Interactable): InteractionResult {
        if (npc instanceof NPC) {
            const defaultDialog = npc.getCurrentDialog() || npc.startDialog('default');
            if (defaultDialog) {
                return {
                    success: true,
                    message: `${character.getName()} is talking to ${npc.name}:\n"${defaultDialog.text}"`
                };
            }
        }
        return {
            success: true,
            message: `${character.getName()} is talking to ${npc.name}.`
        };
    }

    private handleObjectInteraction(character: Character, object: Interactable): InteractionResult {
        return {
            success: true,
            message: `${character.getName()} is examining ${object.name}.`
        };
    }

    private handleQuestInteraction(character: Character, quest: Interactable): InteractionResult {
        return {
            success: true,
            message: `${character.getName()} has started quest: ${quest.name}.`
        };
    }

    getInteractablesInRange(): Interactable[] {
        return Array.from(this.interactables.values())
            .filter(interactable => interactable.isActive);
    }
}

export { InteractionSystem, Interactable, InteractionResult };