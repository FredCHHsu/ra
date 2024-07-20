# 前測專案

您好，歡迎來到本專案，本文件將針對這次的實作內容做簡短的說明。

#### 如何開始

```bash
  pnpm intsall
  pnpm dev
```

伺服器將啟動於 [localhost:3000](http://localhost:3000)

在 [/example](http://localhost:3000/example) 展示了前測文件所要求的房間人數分配元件

&nbsp;  

## 測驗內容

紀錄開發流程與相關解題概念

&nbsp;  

#### 架設開發環境

以 Next.js 官方文件有紀錄的內容為主，不額外做其他設定。
使用 Next.js 14+ 搭配 sass, jest, eslint, prettier。

&nbsp;  

#### 實作 getDefaultRoomAllocation 函式

~~初步想法是實作範圍內尋找**組合**的演算法~~

1. ~~在 guest 的總數範圍內，列舉所有可能的分配方式，以 TDD 的方式開發，先建立基礎 test case，
第一步是製作找出所有可能組合的 getCombinations，通過最初的簡單條件測試。~~
2. ~~計算所有分配方式的房間價格以及總價~~
3. ~~排序後取出最低價格以及分配方式~~

在較大的人數範圍以及較多房間數的狀況下會出現嚴重的效能問題，暫作紀錄，待任務完成較高時再回來檢視如何調整與優化。

#### 重構 getDefaultRoomAllocation

重新整理問題，目標是最低的價格組合，先將所有條件列為數學條件式

![CodeCogsEqn (1)](https://github.com/user-attachments/assets/ff0f6327-c3da-491f-8205-c4bd32891524)

求最小的 $P$，推測在一般情況下可能有解，丟入 AI 找出可能的函式解，調整後可算出最小價格以及 $x_n$, $y_n$, $p_n$ 的分配紀錄，再重構 getDefaultRoomAllocation
順利解決原本的效能瓶頸
> getDefaultRoomAllocation 測試案例 "example 2" 的運算時間從 5xx 秒提升至 10ms 秒內

&nbsp;  

#### 實作 CustomInputNumber 元件

* 主要顏色取材自官網的 logo 與 search button
* 為保留原生 input 的行為，以 useRef 來紀錄處理數值
* 由 input 外部透過 triggerInputEvent 觸發 input 的輸入事件
* 長按按鈕觸發連續點擊的功能以滑鼠的 onMouseDown 與 onMouseUp 來設置長按計時器，在長按的條件達成時會觸發間隔計時器以短間隔連續觸發加減事件

&nbsp;  

#### 實作房間人數分配

* 加減按鈕需可個別進入 disabled 狀態，新增相關 props 到 CustomInputNumber
* 具備各種達到上限的限制情況，並且額外限制當房間內有小孩時不可將成人減少至少於 1 ，但可以在沒有成人的情況新增小孩，這是考量過度干涉順序造成使用者操作不便(UX)。
