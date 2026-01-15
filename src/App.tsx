import { useMemo, useReducer, useState } from 'react'

import type { MenuItem } from './Types/models';
import { menuData } from './data/menu';

import Header from './Components/Layout/Header'
import Menu from './Components/Menu'
import Order from './Components/Order';
import TipForm from './Components/TipForm';
import Summary from './Components/Summary';
import { orderReducer } from './reducers/orderReducer';

function App() {
  const [menu] = useState<MenuItem[]>(menuData);

  const [orderState, orderDispatch] = useReducer(orderReducer, { items: {}, tip: 0 });

  const handleItemAdded = (item: MenuItem) => {
    orderDispatch({
      type: 'add-item',
      payload: { item },
    });
  }

  const handleItemUpdated = (id: MenuItem['id'], amount: number) => {
    orderDispatch({
      type: 'update-quantity',
      payload: { id, amount },
    });
  }

  const handleItemRemoved = (id: MenuItem['id']) => {
    orderDispatch({
      type: 'remove-item',
      payload: { id },
    });
  }

  const handleTipSet = (tip: number) => {
    orderDispatch({
      type: 'set-tip',
      payload: { tip },
    });
  }

  const resetOrder = () => {
    orderDispatch({
      type: 'reset',
    });
  }

  const isEmpty = useMemo(() => {
    return Object.keys(orderState.items).length == 0;
  }, [orderState.items]);

  return (
    <>
      <Header />

      <div className="flex justify-center">
        <div className="w-full grid grid-cols-2 max-w-6xl py-10">
          <div className="py-4 px-3">
            <Menu menu={menu} order={orderState.items} onItemAdded={handleItemAdded} onItemUpdated={handleItemUpdated} />
          </div>

          <div className="border border-dashed rounded-xl py-4 px-3 space-y-8">
            <Order order={orderState.items} onItemRemoved={handleItemRemoved} />

            <TipForm tip={orderState.tip} onTipSet={handleTipSet} />

            <Summary order={orderState.items} tip={orderState.tip} />

            <div>
              <button onClick={resetOrder} className="bg-teal-500 w-full text-xl font-bold hover:cursor-pointer disabled:text-gray-400 disabled:bg-gray-600 disabled:cursor-auto py-4" disabled={isEmpty || !orderState.tip}>
                Completar Orden
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
