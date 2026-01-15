import type { MenuItem } from "../Types/models"

export type OrderState = {
    items: Record<MenuItem['id'], MenuItem & { quantity: number }>;
    tip: number;
}

export type OrderAction =
    { type: 'add-item', payload: { item: MenuItem } } |
    { type: 'remove-item', payload: { id: MenuItem['id'] } } |
    { type: 'update-quantity', payload: { id: MenuItem['id'], amount: number } } |
    { type: 'set-tip', payload: { tip: number } } |
    { type: 'reset' };


export const orderReducer = (state: OrderState, action: OrderAction) => {
    switch (action.type) {
        case 'add-item':
            if (Object.hasOwn(state.items, action.payload.item.id))
                break;

            return {
                ...state,
                items: {
                    ...state.items,
                    [action.payload.item.id]: {
                        ...action.payload.item,
                        quantity: 1,
                    },
                }
            };
        case 'remove-item': {
            if (!Object.hasOwn(state.items, action.payload.id))
                break;

            const updatedItems = { ...state.items };

            delete updatedItems[action.payload.id];

            return {
                ...state,
                items: updatedItems,
            };
        }
        case 'update-quantity': {
            if (!Object.hasOwn(state.items, action.payload.id))
                break;

            const item = { ...state.items[action.payload.id] };

            item.quantity += action.payload.amount;

            if (item.quantity < 1 || item.quantity > 15)
                break;

            return {
                ...state,
                items: {
                    ...state.items,
                    [item.id]: item,
                },
            };
        }
        case 'set-tip':
            return {
                ...state,
                tip: action.payload.tip,
            };
        case 'reset':
            return {
                items: {},
                tip: 0,
            };
    }

    return state;
}
