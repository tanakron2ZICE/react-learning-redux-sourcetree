import { useState } from "react";
import { connect } from "react-redux";
import Numeral from "numeral";
import { v4 as uuidv4 } from "uuid";
// import Axios from "axios";

function Order(props) {
  const menu = props.store.menu;
  const order = props.store.order;
  const [orderName, setOrderName] = useState(menu.length ? menu[0].name : "");
  const [orderQuantity, setOrderQuantity] = useState(0);

  //   useEffect(() => {
  //     Axios.get(`https://jsonplaceholder.typicode.com/users`).then((res) => {
  //       console.log("res.data :>> ", res.data);
  //     });
  //   }, []);

  const InsertOrder = () => {
    let oldQuantity = 0;
    let oldIndex = -1;
    order.forEach((o, index) => {
      if (o.name === orderName) {
        oldQuantity = o.quantity;
        oldIndex = index;
      }
    });
    let newData = {};
    if (oldIndex >= 0) {
      newData = { ...order[oldIndex], quantity: orderQuantity + oldQuantity };
    } else {
      newData = {
        id: uuidv4(),
        name: orderName,
        quantity: orderQuantity + oldQuantity,
        price: getPrice(),
      };
    }
    props.dispatch({
      type: "ADD_ORDER",
      payload: {
        oldIndex,
        newData,
      },
    });
  };

  const getPrice = () => {
    let price = 0;
    menu.forEach((m) => {
      if (m.name === orderName) {
        price = m.price;
      }
    });
    return price;
  };

  const deleteOrder = (id) => {
    props.dispatch({
      type: "DELETE_ORDER",
      payload: id,
    });
  };

  return (
    <div className="mt-3">
      <span className="sub-title bold">Order</span>
      {menu.length > 0 ? (
        <>
          <div className="mt-2 align-center">
            <label>Menu: </label>
            <div className="select-panel">
              <select
                id="order-name"
                className="select-input"
                value={orderName}
                onChange={(e) => setOrderName(e.target.value)}
              >
                {menu.map((m, index) => {
                  return (
                    <option key={index} value={m.name}>
                      {`${m.name}(${Numeral(m.price).format("0,0.00")}฿) ${
                        m.recommend ? "recommend!" : ""
                      }`}
                    </option>
                  );
                })}
              </select>
            </div>
            <label>Quantity: </label>
            <div className="input-container">
              <input
                type="number"
                value={orderQuantity}
                onChange={(e) => setOrderQuantity(parseInt(e.target.value))}
              />
            </div>
            <button
              className="btn-main"
              onClick={InsertOrder}
              disabled={!orderName || orderQuantity <= 0}
            >
              Select Menu
            </button>
          </div>
          <div className="mt-4">
            {order.map((o, index) => {
              return (
                <div className="mt-3 justify-between" key={index}>
                  <span>{o.name}</span>
                  <span className="align-center">
                    {o.quantity} items{" "}
                    <span
                      className="text-red pointer"
                      onClick={() => deleteOrder(o.id)}
                    >
                      ㅤDELETE
                    </span>
                  </span>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="justify-center">
          <h1>No menu</h1>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    store: state,
  };
};

export default connect(mapStateToProps)(Order);
