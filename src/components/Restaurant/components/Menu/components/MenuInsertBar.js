import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

function MenuInsertBar(props) {
    const menu = props.store.menu;
    const [menuName, setMenuName] = useState('');
    const [menuPrice, setMenuPrice] = useState(0);
    const [disabledInsert, setDisabledInsert] = useState(true);

    useEffect(() => {
        setDisabledInsert(menuName && menuPrice >= 0 ? false : true)
    }, [menuName, menuPrice])

    const InsertMenu = () => {
        let checkIsNew = true;
        menu.forEach((e) => {
            if (e.name === menuName) {
                checkIsNew = false;
            }
        })
        if (checkIsNew) {
            props.dispatch({
                type: 'ADD_MENU',
                payload: {
                    id: uuidv4(),
                    name: menuName,
                    price: menuPrice,
                    recommend: false
                }
            });
            setMenuName('');
            setMenuPrice(0);
        } else {
            alert('This menu is available.');
        }
    }
    
    return (
        <div className="insert-menu-bar">
            <div className="align-center">
                <label>Name: </label>
                <div className="input-container">
                    <input type="text" value={menuName} onChange={(e) => setMenuName(e.target.value)} />
                </div>
                <label>Price: </label>
                <div className="input-container">
                    <input type="number" value={menuPrice} onChange={(e) => setMenuPrice(parseInt(e.target.value))} />
                </div>
                <button className="btn-main" disabled={disabledInsert} onClick={InsertMenu}>Insert Menu</button>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        store: state
    }
}

export default connect(mapStateToProps)(MenuInsertBar);