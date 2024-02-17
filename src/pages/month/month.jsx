import {DatePicker, NavBar} from "antd-mobile";
import './month.scss'
import {useEffect, useMemo} from "react";
import classNames from "classnames";
import dayjs from "dayjs";
import groupBy from "lodash/groupBy";
import {orderBy} from 'lodash'

import DailyBill from './component/dailybill'
import {useLocation} from "react-router-dom";
import useDate from "../../hooks/useDate";
import {useMonthBillList} from "../../hooks/useBillList";
import {getOverview} from "../../contants/contants";
import TwoLineOverview from "../../components/TwoLineOverview";

function Month() {
    // 本地状态
    const { state } = useLocation()
    const { date, visible, onShowDate, onHideDate, onDateChange } = useDate()

    const selectedYear = date.get('year')
    const selectedMonth = date.get('month')
    // 获取月度账单
    const selectedMonthList = useMonthBillList(selectedYear, selectedMonth)

    // 获取该月单日账单数据
    const overview = getOverview(selectedMonthList)

    const monthBills = useMemo(() => {
        const billGroup = groupBy(selectedMonthList, item =>
            dayjs(item.date).format('YYYY-MM-DD')
        )
        const sortedKeys = orderBy(
            Object.keys(billGroup),
            // 转成日期数字，在进行比较
            item => +new Date(item),
            'desc'
        )
        return {
            keys: sortedKeys,
            billGroup,
        }
    }, [selectedMonthList])

    useEffect(() => {
        if (state === null) return
        onDateChange(state.date)
    }, [state, onDateChange])

    function dailyBillsRender() {
       const { keys, billGroup } = monthBills
       return keys.map (key => {
           const dateText = dayjs(key).format('MM月DD日')
           const overview = getOverview(billGroup[key])
           return (
               <DailyBill
                   key={key}
                   overview={overview}
                   dateText={dateText}
                   billList={billGroup[key]}
               />
           )
       })
    }

    return (
        <div className="monthlyBill">
            <NavBar className="nav" backArrow={false}>
                月度收支
            </NavBar>
            <div className="content">
                <div className="header" >
                    {/* 时间切换区域 */}
                    <div className="date" onClick={onShowDate}>
                        <span className="text">
                           {selectedYear} | {selectedMonth + 1}月账单
                        </span>
                        {/* 思路: 根据弹框打开状态控制expand类名是否存在 */}
                        <span className={classNames('arrow', visible && 'expand')} ></span>
                    </div>
                    {/* 统计区域 */}
                    <TwoLineOverview
                        pay={overview.pay}
                        income={overview.income}
                        type="month"
                    />
                    {/* 时间选择器 */}
                    <DatePicker
                        className="kaDate"
                        tilte="记账日期"
                        precision="month"
                        onCancel={onHideDate}
                        onClose={onHideDate}
                        visible={visible}
                        max={new Date()}
                    />
                </div>
                {/* 单日列表统计 */}
                {
                    dailyBillsRender()
                }
            </div>
        </div>
    )
}

export default Month