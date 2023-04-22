/*
    form 에 대한 typescript 문법작성하기
    form 에서 일어나는 다양한 이벤트에 대해서 명시하고 사용하는 방법
*/

import { useState } from "react";

const Styled_App = () => {
    const [ value, setValue ] = useState("");

    // event 는 'any' 로 설정되있음 하지만 명시해주는게 좋음
    // React.FromEvent : 리액트에서 발생하는 Form event
    // <HTMLInputElement> : 해당 onChange 함수가 Input 에 의해서 발생함을 알려줌
    const onChange = (event: React.FormEvent<HTMLInputElement>) => {
        // typescript 에서는 target 이 아닌 currentTarget 으로 정함.
        const {currentTarget: { value }} = event;
        setValue(value);
    };

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("hello", value);
    }
    return(
        <div>
            <form onSubmit={onSubmit}>
                <input 
                    type="text" 
                    placeholder="username"
                    value={value}
                    onChange={onChange}
                    />
                <button>Login</button>
            </form>
        </div>
    )
}
export default Styled_App;