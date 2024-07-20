import { render, screen, waitFor } from "@testing-library/react";
import CustomInputNumber from "./index";

it("App Router: Works with Server Components", () => {
  render(<CustomInputNumber name="name" />);
  waitFor(() => expect(screen.getAllByRole("button")).toBeInTheDocument());
});

// 點擊加號使 value 等於 max 時繼續點擊,確認 onChange 無後續觸發
// 點擊減號使 value 等於 min 時繼續點擊,確認 onChange 無後續觸發
// onBlur 時驗證是否為正確 Event.target.name 跟 Event.target.value,觸
// 發時機點為整組元件的 onBlur,包含 Button
// onChange 時驗證是否為正確 Event.target.name 跟 Event.target.value
// disabled 等於 true 時,應無法改變或是輸入 value,且需有 disabled 樣
// 式
// 調整 min 或 max 確認加減變化是否在範圍內
// 調整 step 確認加減變化是否符合 step 間隔
// 點擊加減號按鈕請觸發 <input> 的 InputEvent
