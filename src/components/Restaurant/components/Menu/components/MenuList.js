import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Numeral from 'numeral';
function MenuList(props) {
    const detail = props.detail;
    const isReccomendColor = { color: '#FF9500', cursor: 'pointer' };
    const isNotReccomendColor = { color: '#6E6E6E', textDecoration: 'line-through', cursor: 'pointer' };
    const [colorRecommend, setColorRecommend] = useState(detail.recommend ? isReccomendColor : isNotReccomendColor);
    const [isEdit, setIsEdit] = useState(false);
    const [newName, setNewName] = useState('');
    const [newPrice, setNewPrice] = useState(0);
    const [disabledEdit, setDisabledEdit] = useState(false);

    const setRecommend = () => {
        props.dispatch({
            type: 'TOGGLE_MENU_RECOMMEND',
            payload: detail.id
        })
        toggleColor();
    };

    const toggleColor = () => {
        setColorRecommend(detail.recommend ? isReccomendColor : isNotReccomendColor)
    }

    const EditMenu = () => {
        setNewName(detail.name);
        setNewPrice(detail.price);
        setIsEdit(true)
    }

    const SubmitEditMenu = () => {
        if (!disabledEdit) {
            props.dispatch({
                type: 'UPDATE_MENU',
                payload: {
                    id: detail.id,
                    newData: {
                        ...detail, name: newName, price: newPrice
                    }
                }
            })
            setIsEdit(false);
        }
    }

    const deleteMenu = () => {
        props.dispatch({
            type: 'DELETE_MENU',
            payload: detail.id
        })
    }

    useEffect(() => {
        setDisabledEdit(newName && newPrice >= 0 ? false : true);
    }, [newName, newPrice]);

    return (
        <div className="menu-box">
            <div className="menu-border-wrap">
                {!isEdit &&
                    <div className="menu bold">
                        <span>{detail.name} <span style={colorRecommend} onClick={() => { setRecommend() }}>(recommend!)</span></span>
                        <div className="justify-end">
                            <span className={detail.price > 300 ? 'text-red' : 'text-green'}>{Numeral(detail.price).format('0,0.00')} ฿ㅤ</span>
                            <span className="text-orange pointer" onClick={() => EditMenu()}>EDITㅤ</span>
                            <span className="text-red pointer" onClick={deleteMenu}>DELETE</span>
                        </div>
                    </div>
                }
                {isEdit &&
                    <div className="menu bold justify-between">
                        <div>
                            <div className="input-container">
                                <input type="text" defaultValue={newName} onChange={(e) => setNewName(e.target.value)} />
                            </div>
                        </div>
                        <div className="align-center">
                            <div className="input-container">
                                <input type="number" defaultValue={newPrice} onChange={(e) => setNewPrice(parseInt(e.target.value))} />
                            </div>
                            <span className={`${disabledEdit ? 'text-grey' : 'text-green'} pointer`} onClick={SubmitEditMenu}>ㅤUPDATEㅤ</span>
                            <span className="text-red pointer" onClick={() => setIsEdit(false)}>CANCEL</span>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        store: state
    }
}

export default connect(mapStateToProps)(MenuList);

MenuList.propTypes = {
    detail: PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        recommend: PropTypes.bool.isRequired,
    }),
    index: PropTypes.number.isRequired
}