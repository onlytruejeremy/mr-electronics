export const firebaseReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", JSON.stringify(action.payload));
      return { ...state, user: action.payload };
    case "LOGOUT":
      localStorage.setItem("user", JSON.stringify(null));
      return { ...state, user: null };
    default:
      return state;
  }
};

export const shoppingCartReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      let newState = [...state.cart];
      if (newState.find((item) => item.id === action.payload.id)) {
        let index = newState.findIndex((item) => item.id === action.payload.id);
        newState[index].count++;
        console.log(newState);
        localStorage.setItem("cart", JSON.stringify(newState));
        return { ...state, cart: newState };
      }
      localStorage.setItem(
        "cart",
        JSON.stringify([...state.cart, action.payload])
      );
      return { ...state, cart: [...state.cart, action.payload] };
    case "REMOVE":
      let removeState = [...state.cart];
      let index = removeState.findIndex(
        (item) => item.id === action.payload.id
      );
      if (removeState[index].count === 1) {
        let newState = removeState.filter(
          (item) => item.id !== action.payload.id
        );
        localStorage.setItem("cart", JSON.stringify(newState));
        return { ...state, cart: newState };
      } else {
        removeState[index].count--;
      }
      localStorage.setItem("cart", JSON.stringify(removeState));
      return { ...state, cart: removeState };
    case "LOAD":
      return { ...state, cart: action.payload };
    case "EMPTY":
      localStorage.setItem("cart", JSON.stringify([]));
      return { ...state, cart: [] };
    default:
      return state;
  }
};

export default { firebaseReducer, shoppingCartReducer };
