import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MenuManage from './components/Menu/MenuManage';
import Order from './components/Order/Order';
import Transaction from './components/Transaction/Transaction';

function Restaurant() {
    return (
        <div>
            <Router>
                <span className="title bold">JobJab Fever Restaurant</span>
                <div className="menu-panel">
                    <div className="menu-bar">
                        <Link to="/">เมนูอาหาร</Link> | <Link to="/order">สั่งอาหาร</Link> | <Link to="/transaction">บิลค่าอาหาร</Link>
                    </div>
                    <Routes>
                        <Route path='/' element={<MenuManage />}></Route>
                        <Route path='/order' element={<Order />}></Route>
                        <Route path='/transaction' element={<Transaction />}></Route>
                    </Routes>
                </div>
            </Router>
        </div>
    )
}

export default Restaurant;