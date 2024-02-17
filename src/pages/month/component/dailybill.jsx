import classNames from "classnames";
import {useState} from "react";
import {billTypeToName} from "../../../contants/contants";
import Icon from "../../../contants/icon";

import './dailybill.scss'
import OneLineOverview from "../../../components/OneLineOverview";

function DailyBill({dateText, overview, billList}) {

    const [expand, setExpand] = useState(true)

    return (
            <div className={classNames('dailyBill', expand && 'expand')}>
            <div className="header">
                <div className="dateIcon" onClick={() => setExpand(!expand)}>
                    <span className="date">{dateText}</span>
                    {/* expand 有这个类名 展开箭头朝上 */}
                    <span className={classNames('arrow', expand && 'expand')}/>
                </div>
                <OneLineOverview pay={overview.pay} income={overview.income}/>
            </div>
                {/* 单日列表 */}
            <div className="billList">
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
