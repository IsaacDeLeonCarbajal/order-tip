import type { MenuItem, Order as OrderType } from "../Types/models";
import { formatCurrency } from "../utils/numbers";

type OrderProps = {
    order: OrderType;
    onItemRemoved: (id: MenuItem['id']) => void;
}

export default function Order({ order, onItemRemoved }: OrderProps) {
    return (
        <>
            <h2 className="text-2xl font-bold mb-4">Orden</h2>

            <div>
                {Object.values(order).map((item) => (
                    <div className="flex justify-between items-center border-t border-dotted last-of-type:border-b py-3 px-5" key={item.id}>
                        <div className="grow">
                            <span className="font-medium block">
                                {item.name}
                            </span>
                            <span className="font-bold block">
                                {item.quantity} × {formatCurrency(item.price)}
                            </span>
                        </div>

                        <div className="text-lg font-extrabold shrink mx-3">
                            {formatCurrency(item.price * item.quantity)}
                        </div>

                        <span onClick={() => onItemRemoved(item.id)} className="flex items-center justify-center bg-red-400 hover:cursor-pointer rounded-full w-8 h-8">
                            X
                        </span>
                    </div>
                ))}
            </div>
        </>
    );
}
