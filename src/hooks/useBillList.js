import {useDispatch, useSelector} from "react-redux";
import {useEffect, useMemo} from "react";
import dayjs from "dayjs";
import {fetchBillList} from "../store/modules/billStore";


export function _useBillList(){
    const dispatch = useDispatch()
    const billList = useSelector(state => state.bill.billList)

    useEffect(() => {
        dispatch(fetchBillList())
    }, [dispatch]);

    return billList
}

export const useYearBillList = selectedYear => {
    const billList = _useBillList()
    return useMemo(
        () =>
            billList.filter(item => selectedYear === dayjs(item.date).get('year')),
        [billList, selectedYear]
    )
}

export const useMonthBillList = (selectedYear, selectedMonth) => {
    const selectedYearBills = useYearBillList(selectedYear)
    return useMemo(
        () =>
            selectedYearBills.filter(item => {
                return selectedMonth === dayjs(item.date).get('month')
            }),
        [selectedYearBills, selectedMonth]
    )
}
