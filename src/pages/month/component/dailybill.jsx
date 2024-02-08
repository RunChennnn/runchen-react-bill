import classNames from "classnames";
import {useMemo, useState} from "react";
import {billTypeToName} from "../../../contants/contants";
import Icon from "../../../contants/icon";

import './dailybill.scss'

function DailyBill({date, billList}) {
    const dayRes = useMemo(() => {
        // 计算单日统计
        // 支出/收入/结余
        const pay = billList.filter(item => item.type === 'pay').reduce((a, c) => a+c.money, 0)
        const income = billList.filter(item => item.type === 'income').reduce((a, c) => a+c.money, 0)
        return {
            pay,
            income,
            total: pay+income
        }
    }, [billList])

    const [visible, setVisible] = useState(false)

    return (
            <div className={classNames('dailybill')}>
            <div className="header">
                <div className="dateIcon">
                    <span className="date">{date}</span>
                    {/* expand 有这个类名 展开箭头朝上 */}
                    <span className={classNames('arrow', visible && 'expand')} onClick={() => setVisible(!visible)}></span>
                </div>
                <div className="oneLineOverview">
                    <div className="pay">
                        <span className="type">支出</span>
                        <span className="money">{dayRes.pay.toFixed(2)}</span>
                    </div>
                    <div className="income">
                        <span className="type">收入</span>
                        <span className="money">{dayRes.income.toFixed(2)}</span>
                    </div>
                    <div className="balance">
                        <span className="money">{dayRes.total.toFixed(2)}</span>
                        <span className="type">结余</span>
                    </div>
                </div>
            </div>
            {/* 单日列表 */}
            <div className="billList" style={{display: visible ? 'block' : 'none'}}>
                {
                    billList.map(item => {
                        return (
                            <div className="bill" key={item.id}>
                                {/* 图标 */}
                                <Icon type={item.useFor}/>
                                <div className="detail">
                                    <div className="billType">{billTypeToName[item.useFor]}</div>
                                </div>
                                <div className={classNames('money', item.type)}>
                                    {item.money.toFixed(2)}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default DailyBill
