import { connect } from 'react-redux'
import Numeral from 'numeral';

function Transaction(props) {
    const order = props.store.order
    let total = order.reduce((value, e) => value += e.price * e.quantity, 0);
    let quantity = order.reduce((value, e) => value += e.quantity, 0);
    return (
        <div className="mt-3">
            <span className="sub-title bold">Transaction</span>
            <div className="py-2 menu-list">
                {order.map((o, index) => {
                    return (
                        <div className="justify-between" key={index}>
                            <p>{index + 1}. {o.name} ({Numeral(o.quantity).format('0,0')} items)</p>
                            <p>({Numeral(o.price).format('0,0')} * {Numeral(o.quantity).format('0,0')}) {'=>'} {Numeral(o.price * o.quantity).format('0,0')} ฿</p>
                        </div>
                    )
                })}
            </div>
            <div className="justify-between ft-32 bold">
                <span>Total: {Numeral(total).format('0,0.00')} ฿</span>
                <span>Quantity: {Numeral(quantity).format('0,0')} items</span>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        store: state
    }
}
export default connect(mapStateToProps)(Transaction);