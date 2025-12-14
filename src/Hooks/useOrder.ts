import type { Dispatch, SetStateAction } from "react";
import { useMemo } from "react";

import type { Order, MenuItem } from "../Types/models";

export const useOrder = (order: Order, setOrder: Dispatch<SetStateAction<Order>>) => {
    const addItemToOrder = (item: MenuItem) => {
        if (Object.hasOwn(order, item.id))
            return;

        setOrder(() => ({
            ...order,
            [item.id]: {
                ...item,
                quantity: 1,
            },
        }));
    }

    const removeItemFromOrder = (id: MenuItem['id']) => {
        if (!Object.hasOwn(order, id))
            return;

        const updatedOrder = { ...order };

        delete updatedOrder[id];

        setOrder(() => updatedOrder);
    }

    const updateQuantityBy = (id: MenuItem['id'], amount: number) => {
        if (!Object.hasOwn(order, id))
            return;

        const item = { ...order[id] };

        item.quantity += amount;

        if (item.quantity < 1 || item.quantity > 15)
            return;

        setOrder(() => ({
            ...order,
            [item.id]: item,
        }));
    }

    const clearOrder = () => {
        setOrder([]);
    }

    const orderSubtotal = useMemo(() => {
        return Object.values(order).reduce((prev, curr) => prev += (curr.price * curr.quantity), 0);
    }, [order]);

    const isEmpty = useMemo(() => {
        return Object.keys(order).length == 0;
    }, [order]);

    return {
        addItemToOrder,
        removeItemFromOrder,
        updateQuantityBy,
        clearOrder,
        orderSubtotal,
        isEmpty,
    };
}
