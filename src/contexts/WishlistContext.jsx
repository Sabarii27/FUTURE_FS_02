import { createContext, useContext, useReducer } from 'react';

const WishlistContext = createContext();

function wishlistReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      if (state.find(item => item.id === action.item.id)) return state;
      return [...state, action.item];
    case 'REMOVE':
      return state.filter(item => item.id !== action.id);
    default:
      return state;
  }
}

export function WishlistProvider({ children }) {
  const [wishlist, dispatch] = useReducer(wishlistReducer, []);
  return (
    <WishlistContext.Provider value={{ wishlist, dispatch }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  return useContext(WishlistContext);
}
