import MenuInsertBar from './components/MenuInsertBar';
import MenuList from './components/MenuList';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
function MenuManage(props) {
    const menu = props.store.menu;
    return (
        <div className="mt-3">
            <span className="sub-title bold">Menu Manage</span>
            <div>
                <MenuInsertBar />
                <div className="menu-list-panel menu-list">
                    {menu.map((m, index) => {
                        return (
                            <MenuList key={uuidv4()} detail={m} index={index} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        store: state
    }
}

export default connect(mapStateToProps)(MenuManage);