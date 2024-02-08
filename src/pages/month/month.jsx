import {DatePicker, NavBar} from "antd-mobile";
import './month.scss'
import {useState} from "react";
import classNames from "classnames";

function Month() {

    // 控制弹框的弹出与隐藏
    const [dateVisible, setDateVisible] = useState(false)

    const onConfirm = () => {
        setDateVisible(false)
    }

    return (
        <div className="monthlyBill">
            <NavBar className="nav" backArrow={false}>
                月度收支
            </NavBar>
            <div className="content">
                <div className="header" >
                    {/* 时间切换区域 */}
                    <div className="date" onClick={()=>setDateVisible(true)}>
                        <span className="text">
                            2024 | 2月账单
                        </span>
                        {/* 思路: 根据弹框打开状态控制expand类名是否存在 */}
                        <span className={classNames('arrow', dateVisible && 'expand')} ></span>
                    </div>
                    {/* 统计区域 */}
                    <div className='twoLineOverview'>
                        <div className="item">
                            <span className="money">{100.00}</span>
                            <span className="type">支出</span>
                        </div>
                        <div className="item">
                            <span className="money">{100.00}</span>
                            <span className="type">收入</span>
                        </div>
                        <div className="item">
                            <span className="money">{200.00}</span>
                            <span className="type">结余</span>
                        </div>
                    </div>
                    {/* 时间选择器 */}
                    <DatePicker
                        className="kaDate"
                        tilte="记账日期"
                        precision="month"
                        onCancel={()=>setDateVisible(false)}
                        onConfirm={onConfirm}
                        onClose={() => setDateVisible(false)}
                        visible={dateVisible}
                        max={new Date()}
                    />
                </div>
                {/* 单日列表统计 */}

            </div>
        </div>
    )
}

export default Month