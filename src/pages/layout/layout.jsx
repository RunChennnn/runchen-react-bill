import {Outlet, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import { fetchBillList } from "../../store/modules/billStore";
import './layout.scss'
import {
    BillOutline,
    AddCircleOutline,
    CalculatorOutline
} from 'antd-mobile-icons'
import {TabBar} from "antd-mobile";

const tabIcons = [
    {
        key:  '/month',
        title: '月度账单',
        icon: <BillOutline/>
    },
    {
        key: '/new',
        title: '记账账单',
        icon: <AddCircleOutline/>
    },
    {
        key: '/year',
        title: '年度账单',
        icon: <CalculatorOutline/>
    }
]

function Layout() {
    const dispatch = useDispatch()
    useEffect(()=> {
        dispatch(fetchBillList())
    }, [dispatch])

    const navigate = useNavigate()
    const switchRoute = (path) => {
        navigate(path)
    }

    return (
        <div className="layout">
            <div className="contianer">
               <Outlet/>
            </div>
            <div className="footer">
                <TabBar onChange={switchRoute}>
                    {tabIcons.map(item => (
                        <TabBar.Item key={item.key} icon={item.icon} title={item.title}/>
                    ))}
                </TabBar>
            </div>
        </div>
    )
}
export default Layout