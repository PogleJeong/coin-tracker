import { Link, useSearchParams } from "react-router-dom";
import { users } from "../db";

function UserHome() {
    const [ readSearchParams, setSearchParams ] = useSearchParams(); // url 의 query string 부분을 받음
    console.log(readSearchParams);

    return (
        <div>
            <h1>Users</h1>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <Link to={`/users/${user.id}`}>{user.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

// useSearchParams 는 URLSearchParams 객체를 반환함(JS)

export default UserHome;