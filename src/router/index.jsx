// 创建路由实例 绑定path element
import Layout from "../pages/layout/layout";
import New from "../pages/new/new";
import Month from "../pages/month/month";
import Year from "../pages/year/year";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter(
    [
        {
            path: '/',
            element: <Layout/>,
            children: [
                {
                    path: 'month',
                    element: <Month/>
                },
                {
                    path: 'year',
                    element: <Year />
                }
            ]
        },
        {
            path: 'new',
            element: <New/>
        }
    ]
)
export default router