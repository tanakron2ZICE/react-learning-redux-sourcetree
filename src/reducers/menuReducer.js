const initialState = {
  menu: [],
  order: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_MENU":
      return { ...state, menu: state.menu.concat([action.payload]) };
    case "TOGGLE_MENU_RECOMMEND":
      return {
        ...state,
        menu: state.menu.map((menu) => {
          if (menu.id === action.payload) {
            return { ...menu, recommend: !menu.recommend };
          } else {
            return menu;
          }
        }),
      };
    case "UPDATE_MENU":
      return {
        ...state,
        menu: state.menu.map((menu) => {
          if (menu.id === action.payload.id) {
            return action.payload.newData;
          } else {
            return menu;
          }
        }),
      };
    case "DELETE_MENU":
      return {
        ...state,
        menu: state.menu.filter((m) => m.id !== action.payload),
      };
    case "ADD_ORDER":
      return {
        ...state,
        order:
          action.payload.oldIndex >= 0
            ? state.order.map((order, index) => {
                if (action.payload.oldIndex === index) {
                  return {
                    ...order,
                    quantity: action.payload.newData.quantity,
                  };
                } else {
                  return order;
                }
              })
            : state.order.concat([action.payload.newData]),
      };
    case "DELETE_ORDER":
      return {
        ...state,
        order: state.order.filter((o) => o.id !== action.payload),
      };
    default:
      return state;
  }
};

export default reducer;
