import { useOutletContext } from "react-router-dom";
// Outlet context 로 부모컴포넌트로부터 데이터 받기

interface IFollowerContext {
  nameOfMyUser: string;
}

function Followers() {
  const { nameOfMyUser } = useOutletContext<IFollowerContext>();
  
  return <h1>Here are {nameOfMyUser}'s Followers</h1>;
  }
  export default Followers