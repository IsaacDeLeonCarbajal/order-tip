import type { Dispatch, SetStateAction } from "react";

import type { MenuItem, Order } from "../Types/models";
import { useOrder } from "../Hooks/useOrder";
import { formatCurrency } from "../utils/numbers";

type MenuProps = {
    menu: MenuItem[];
    order: Order;
    setOrder: Dispatch<SetStateAction<Order>>;
};

export default function Menu({ menu, order, setOrder }: MenuProps) {
    const { addItemToOrder, updateQuantityBy } = useOrder(order, setOrder);

    const handleItemClicked = (item: MenuItem) => {
        if (Object.hasOwn(order, item.id))
            updateQuantityBy(item.id, 1);
        else
            addItemToOrder(item);
    }

    return (
        <>
            <h2 className="text-2xl font-bold mb-4">Menú</h2>

            <section className="space-y-3">
                {menu.map((item) => (
                    <button onClick={() => handleItemClicked(item)} className="w-full flex justify-between items-center border-2 border-teal-500 hover:bg-teal-300 hover:text-black hover:cursor-pointer rounded-lg py-3 px-5" key={item.id}>
                        <span className="text-start grow">
                            {item.name}
                        </span>

                        <span className="text-lg font-bold mx-3">
                            {formatCurrency(item.price)}
                        </span>

                        <span className="text-lg font-bold">
                            &#10095;
                        </span>
                    </button>
                ))}
            </section>
        </>
    );
}
