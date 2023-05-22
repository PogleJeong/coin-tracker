import { atom } from "recoil";

// value 값만을 감지할때 useRecoilValue
// atom 안의 value 수정이 필요할때 useSetRecoilState

export const isDarkAtom = atom({
    key: "isDark",
    default: false,
})