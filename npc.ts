import { Character, CharacterStats } from './character';
import { Interactable } from './interaction';
import { Item } from './inventory';

interface DialogOption {
    id: string;
    text: string;
    condition?: () => boolean;
    action: () => void;
}

interface Dialog {
    id: string;
    text: string;
    options: DialogOption[];
}

class NPC implements Interactable {
    readonly id: string;
    readonly name: string;
    readonly type: 'npc' = 'npc';
    
    private character: Character;
    private dialogs: Map<string, Dialog>;
    private currentDialog: Dialog | null;
    private inventory: Item[];
    isActive: boolean;

    constructor(id: string, name: string, stats: CharacterStats) {
        this.id = id;
        this.name = name;
        this.character = new Character(name, stats);
        this.dialogs = new Map();
        this.currentDialog = null;
        this.inventory = [];
        this.isActive = true;
    }

    addDialog(dialog: Dialog): void {
        this.dialogs.set(dialog.id, dialog);
    }

    startDialog(dialogId: string): Dialog | null {
        const dialog = this.dialogs.get(dialogId);
        if (dialog) {
            this.currentDialog = dialog;
            return dialog;
        }
        return null;
    }

    getCurrentDialog(): Dialog | null {
        return this.currentDialog;
    }

    selectOption(optionId: string): boolean {
        if (!this.currentDialog) return false;

        const option = this.currentDialog.options.find(opt => opt.id === optionId);
        if (!option) return false;

        if (option.condition && !option.condition()) {
            return false;
        }

        option.action();
        return true;
    }

    addItem(item: Item): void {
        this.inventory.push(item);
    }

    getInventory(): Item[] {
        return [...this.inventory];
    }

    getStats(): CharacterStats {
        return this.character.getStats();
    }

    setActive(active: boolean): void {
        this.isActive = active;
    }
}

// Example dialog creation helper
function createDialog(
    id: string,
    text: string,
    options: Array<{
        id: string,
        text: string,
        condition?: () => boolean,
        action: () => void
    }>
): Dialog {
    return {
        id,
        text,
        options: options.map(opt => ({
            id: opt.id,
            text: opt.text,
            condition: opt.condition,
            action: opt.action
        }))
    };
}

export { NPC, Dialog, DialogOption, createDialog };