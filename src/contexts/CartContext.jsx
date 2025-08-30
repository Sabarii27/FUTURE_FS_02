import { createContext, useContext, useMemo, useReducer } from 'react'

const CartContext = createContext(null)

const reducer = (state, action) => {
  switch(action.type){
    case 'ADD': {
      const existing = state.items.find(i => i.id === action.item.id)
      let items
      if(existing){
        items = state.items.map(i => i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i)
      }else{
        items = [...state.items, { ...action.item, qty: 1 }]
      }
      return { ...state, items }
    }
    case 'INC': {
      const items = state.items.map(i => i.id === action.id ? { ...i, qty: i.qty + 1 } : i)
      return { ...state, items }
    }
    case 'DEC': {
      const items = state.items.map(i => i.id === action.id ? { ...i, qty: Math.max(1, i.qty - 1) } : i)
      return { ...state, items }
    }
    case 'REMOVE': {
      const items = state.items.filter(i => i.id !== action.id)
      return { ...state, items }
    }
    case 'CLEAR': return { items: [] }
    default: return state
  }
}

export function CartProvider({ children }){
  const [state, dispatch] = useReducer(reducer, { items: [] })
  const total = useMemo(() => state.items.reduce((sum, i) => sum + i.price * i.qty, 0), [state.items])
  return (
    <CartContext.Provider value={{ ...state, total, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
