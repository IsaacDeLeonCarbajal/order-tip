import { useMemo } from "react";

import type { Order as OrderType } from "../Types/models";
import { formatCurrency } from "../utils/numbers";

type SummaryProps = {
    order: OrderType;
    tip: number;
}

export default function Summary({ order, tip }: SummaryProps) {
    const orderSubtotal = useMemo(() => {
        return Object.values(order).reduce((prev, curr) => prev += (curr.price * curr.quantity), 0);
    }, [order]);

    const tipTotal = useMemo(() => {
        return orderSubtotal * tip / 100;
    }, [orderSubtotal, tip]);

    const orderTotal = useMemo(() => {
        return orderSubtotal + tipTotal;
    }, [orderSubtotal, tipTotal]);

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Resumen de la Orden</h2>

            <div className="space-y-2">
                <div>
                    Subtotal: <span className="text-lg font-bold">{formatCurrency(orderSubtotal)}</span>
                </div>

                <div>
                    Propina: <span className="text-lg font-bold">{formatCurrency(tipTotal)}</span>
                </div>

                <div>
                    Total a pagar: <span className="text-lg font-bold">{formatCurrency(orderTotal)}</span>
                </div>
            </div>
        </div>
    );
}
