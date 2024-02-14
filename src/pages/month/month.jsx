import {DatePicker, NavBar} from "antd-mobile";
import './month.scss'
import {useEffect, useMemo, useState} from "react";
import classNames from "classnames";
import dayjs from "dayjs";
import {useSelector} from "react-redux";
import _ from 'lodash'

import DailyBill from './component/dailybill'

function Month() {
    // 按月做数据分组
    const billList = useSelector(state => state.bill.billList)
    const monthGroup = useMemo(() => {
        // return 计算之后的值
        return _.groupBy(billList, (item)=> dayjs(item.date).format('YYYY | MM'))
    }, [billList])
    // console.log(monthGroup)

    const [selectedMonthList, setSelectedMonthList] = useState([])

    // 按月分组
    const monthRes = useMemo(() => {
        // 支出 / 收入 / 结余
        const pay = selectedMonthList.filter(item => item.type === 'pay').reduce((a, c) => a+c.money, 0)
        const income = selectedMonthList.filter(item => item.type === 'income').reduce((a, c) => a+c.money, 0)
        return {
            pay,
            income,
            total: pay+income
        }
    }, [selectedMonthList])

    // 当前月按日分组
    const dayGroup = useMemo(() => {
        const groupData =  _.groupBy(selectedMonthList, (item)=> dayjs(item.date).format('YYYY-MM-DD'))
        const keys = Object.keys(groupData)
        return {
            groupData,
            keys
        }
    }, [selectedMonthList])

    // 初始化时显示当前月的统计数据
    useEffect(() => {
        const nowDate = dayjs().format('YYYY | MM')
        if(monthGroup[nowDate]) {
            setSelectedMonthList(monthGroup[nowDate])
        }
    }, [monthGroup]);

    // 控制弹框的弹出与隐藏
    const [dateVisible, setDateVisible] = useState(false)

    // 时间选择
    const [selectedDate, setSelectedDate] = useState(() => {
        return dayjs(new Date()).format('YYYY | MM')
    })
    // 回调确认
    const onConfirm = (date) => {
        setDateVisible(false)
        const dateFormat = dayjs(date).format('YYYY | MM')
        setSelectedMonthList(monthGroup[dateFormat])
        setSelectedDate(dateFormat)
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
                           {selectedDate+ ' '}月账单
                        </span>
                        {/* 思路: 根据弹框打开状态控制expand类名是否存在 */}
                        <span className={classNames('arrow', dateVisible && 'expand')} ></span>
                    </div>
                    {/* 统计区域 */}
                    <div className='twoLineOverview'>
                        <div className="item">
                            <span className="money">{monthRes.pay.toFixed(2)}</span>
                            <span className="type">支出</span>
                        </div>
                        <div className="item">
                            <span className="money">{monthRes.income.toFixed(2)}</span>
                            <span className="type">收入</span>
                        </div>
                        <div className="item">
                            <span className="money">{monthRes.total.toFixed(2)}</span>
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
                {
                    dayGroup.keys.map(key => {
                        return <DailyBill key={key} date={key} billList={dayGroup.groupData[key]} />
                    })
                }
            </div>
        </div>
    )
}

export default Month