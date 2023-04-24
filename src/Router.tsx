
import { createBrowserRouter } from "react-router-dom";
import StyledComponentPart from "./Styled Component/part_4";
import TypescriptPart from "./Typescript/part2-4";
import App from "./App";
import NotFound from "./NotFound";
import UserHome from "./screens/UserHome";
import User from "./screens/users/Users";
import Followers from "./screens/users/Followers";
import CoinTrackerHome from "./CoinTracker/CoinTrackerHome";
import Coin from "./CoinTracker/Coin";

// router 를 array 로 표현할 수 있게 해줌.
const router = createBrowserRouter([
    {
        // 모든 router 들의 root
        path: "/",
        element: <App />,
        children: [
            {
                path:"styled-component",
                element: <StyledComponentPart />,
            },
            {
                path:"typescript",
                element: <TypescriptPart />,
            }
            ,
            {
                path: "users",
                element: <UserHome />
            }
            ,
            {
                path: "users/:userId",
                element: <User />,
                children: [
                    {
                        path: "followers",
                        element: <Followers />
                    }
                ]
            }
            ,
            {
                path: "coin-tracker",
                element: <CoinTrackerHome />,
            }
            ,
            {
                path: "coin-tracker/:coinId",
                element: <Coin />,
            }
        ],
        // 작성한 path에 맞는 component가 없거나 component 내에서 충돌이 발생하면 랜더링됨
        errorElement: <NotFound />
    }
])

// 반드시 index.tsx 에 <RouterProvider router={router}/> 추가해야 적용됨
export default router;