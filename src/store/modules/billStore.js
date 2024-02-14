import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const billStore = createSlice({
    name: 'bill',
    // 数据状态定义
    initialState: {
        billList: []
    },
    reducers: {
        // 同步修改方法
        setBillList(state, action) {
            state.billList = action.payload
        },
        // 同步添加方法
        addBill(state, action) {
            state.billList.push(action.payload)
        }
    }
})

// 解构actionCreator函数
const { setBillList, addBill } =  billStore.actions
// 异步编写
const fetchBillList = () => {
    return async (dispatch) => {
        // 编写异步请求
        const res = await axios.get('http://localhost:8888/ka')
        dispatch(setBillList(res.data))
    }
}

// 异步添加
const addBillList = (data) => {
    return async (dispatch) => {
        const res = await axios.post('http://localhost:8888/ka', data)
        dispatch(addBill(res.data))
    }
}

export { fetchBillList, addBillList }
// export reducer
const reducer = billStore.reducer

export default reducer
