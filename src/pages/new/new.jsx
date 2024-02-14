import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {Button, NavBar, DatePicker, Input } from "antd-mobile";
import classNames from "classnames";
import dayjs from "dayjs";
import { billListData } from "../../contants/contants";
import { addBillList } from "../../store/modules/billStore";
import Icon from "../../contants/icon";

import './new.scss'
import useDate from "../../hooks/useDate";


function New() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    // 控制收入支出切换的state
    const [billType, setBillType] = useState('pay') // pay-支出 income-收入

    //收集金额
    const [money, setMoney] = useState('')

    // 收集账单类型
    const [useFor, setUseFor] = useState('')

    const { visible, dateText, onShowDate, onHideDate, onDateChange } = useDate()

    //保存账单
    async function saveBill () {
        // 收集账单数据
        const bill = {
            type: billType,
            money: billType === 'pay' ? 0-money : money,
            date: dateText === '今天'
                ? dayjs()
                : dayjs(`${dateText} ${dayjs().format('HH:mm:ss')}`),
            useFor: useFor
        }
        await dispatch(addBillList(bill))
        navigate('/')
    }

    return (
        <div className="keepAccounts">
            <NavBar className="nav" onBack={() => navigate(-1)}>
                记一笔
            </NavBar>

            <div className="header">
                <div className="kaType">
                    <Button
                        shape="rounded"
                        className={classNames(billType === 'pay' ? 'selected' : '')}
                        onClick={() => setBillType('pay')}
                    >
                        支出
                    </Button>
                    <Button
                        className={classNames(billType === 'income' ? 'selected' : '')}
                        shape="rounded"
                        onClick={() => setBillType('income')}
                    >
                        收入
                    </Button>
                </div>

                <div className="kaFormWrapper">
                    <div className="kaForm">
                        <div className="date">
                            <Icon type="calendar" className="icon"/>
                            <span className="text" onClick={onShowDate}>{dateText}</span>
                            {/* 时间选择器 */}
                            <DatePicker
                                className="kaDate"
                                title="记账日期"
                                max={new Date()}
                                visible={visible}
                                onClose={onHideDate}
                                onConfirm={onDateChange}
                            />
                        </div>
                        <div className="kaInput">
                            <Input
                                className="input"
                                placeholder="0.00"
                                type="number"
                                value={money}
                                onChange={setMoney}
                            />
                            <span className="iconYuan">¥</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="kaTypeList">
                {/* 数据区域 */}
                {billListData[billType].map(item => {
                    return (
                        <div className="kaType" key={item.type}>
                            <div className="title">{item.name}</div>
                            <div className="list">
                                {item.list.map(item => {
                                    return (
                                        // selected
                                        <div
                                            className={classNames(
                                                'item',
                                                useFor === item.type ? 'selected' : ''
                                            )}
                                            key={item.type}
                                            onClick={() => setUseFor(item.type)}
                                        >
                                            <div className="icon">
                                                <Icon type={item.type}/>
                                            </div>
                                            <div className="text">{item.name}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="btns">
                <Button className="btn save" onClick={saveBill}>
                    保 存
                </Button>
            </div>
        </div>
    )
}

export default New