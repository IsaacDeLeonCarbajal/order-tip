export type MenuItem = {
    id: number;
    name: string;
    price: number;
};

export type Order = Record<MenuItem['id'], MenuItem & { quantity: number }>;
