import { useState } from 'react'

import type { Order as OrderType, MenuItem } from './Types/models';
import { menuData } from './data/menu';
import { useOrder } from './Hooks/useOrder';

import Header from './Components/Layout/Header'
import Menu from './Components/Menu'
import Order from './Components/Order';
import TipForm from './Components/TipForm';
import Summary from './Components/Summary';

function App() {
  const [menu] = useState<MenuItem[]>(menuData);
  const [order, setOrder] = useState<OrderType>({});
  const [tip, setTip] = useState<number>(0);

  const { isEmpty } = useOrder(order, setOrder);

  const resetOrder = () => {
    setOrder({});
    setTip(0);
  }

  return (
    <>
      <Header />

      <div className="flex justify-center">
        <div className="w-full grid grid-cols-2 max-w-6xl py-10">
          <div className="py-4 px-3">
            <Menu menu={menu} order={order} setOrder={setOrder} />
          </div>

          <div className="border border-dashed rounded-xl py-4 px-3 space-y-8">
            <Order order={order} setOrder={setOrder} />

            <TipForm tip={tip} setTip={setTip} />

            <Summary order={order} setOrder={setOrder} tip={tip} />

            <div>
              <button onClick={resetOrder} className="bg-teal-500 w-full text-xl font-bold hover:cursor-pointer disabled:text-gray-400 disabled:bg-gray-600 disabled:cursor-auto py-4" disabled={isEmpty || !tip}>Completar Orden</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
