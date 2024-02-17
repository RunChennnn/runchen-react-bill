import { useState } from "react";
import dayjs from "dayjs";
import isToday from 'dayjs/plugin/isToday'
dayjs.extend(isToday)

const useDate = () => {
    // 日期设置状态
    const [date, setDate] = useState(new Date())
    // 日期选择器是否可见状态
    const [visible, setVisible] = useState(false)
    const dayjsDate = dayjs(date)
    const dateText = dayjsDate.isToday() ? '今天' : dayjsDate.format('YYYY/MM/DD')

    // 日期选择器显示隐藏钩子
    const onShowDate = () => setVisible(true)
    const onHideDate = () => setVisible(false)
    const onDateChange = val => setDate(val)

    return {
        date: dayjsDate,
        dateText,
        visible,
        onShowDate,
        onHideDate,
        onDateChange
    }
}
export default useDate