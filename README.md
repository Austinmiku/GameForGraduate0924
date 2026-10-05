# 歷史文物守護行動

以國小五、六年級學生為主要玩家的網頁社會科冒險遊戲，內容涵蓋康軒版國小五年級上學期社會科的重要知識點。

## 開始遊玩

線上版：<https://gameforgraduate0924.web.app>

也可以在自己的電腦上玩：下載 repository 後，以瀏覽器開啟 `index.html`，或直接開啟 `歷史文物守護行動完整版.html`。

遊戲不需要安裝套件或連線到伺服器。

請保留 `question-bank.js` 與完整版 HTML 在同一資料夾；遊戲開啟時會先載入這份題庫。

若要從 Excel 重新產生題庫，使用安裝了 `openpyxl` 的 Python 執行：

```powershell
python tools/export-question-bank.py "../歷史文物守護行動_完整題庫.xlsm"
```

轉換工具會檢查八關各十題、正確選項及答案內容，再更新 `question-bank.js`。遊戲不會直接讀取 Excel 檔。

## 部署到線上

線上版放在 Firebase Hosting，專案 ID 是 `gameforgraduate0924`（記錄在 `.firebaserc`）。

第一次在一台電腦上部署前，先安裝 Firebase CLI 並登入管理這個專案的 Google 帳號：

```powershell
npm install -g firebase-tools
firebase.cmd login
```

之後每次改完檔案，在專案資料夾執行下面這行就會更新線上版本：

```powershell
firebase.cmd deploy --only hosting
```

在 PowerShell 裡請用 `firebase.cmd`；直接打 `firebase` 可能會被系統的指令碼執行原則擋下。改用命令提示字元（cmd）則可以直接打 `firebase`。

上傳的範圍由 `firebase.json` 決定，只包含遊戲執行需要的檔案：兩個 HTML、`question-bank.js`、`assets` 裡的 webp 圖片與字型。企劃文件、PNG 原圖、`tools`、`docs`、`openspec`、檢查腳本與美術提示詞檔都不會上傳。新增遊戲會用到的其他類型檔案時，記得確認它沒有被 `firebase.json` 的 `ignore` 排除。

部署的是資料夾裡目前的檔案，不是 git 上的版本，所以部署前後記得 commit，讓線上版和 repository 保持一致。

## 內容

- 八個完整關卡與連續劇情
- 每次進關隨機排列探索點、題目及答案
- 逐關提升的敵人血量與攻擊力
- 五種可選擇並隨關卡強化的道具
- 最終 Boss 可攜帶兩件道具
- 文物圖鑑、知識卡及最終試玩回饋

## 檔案

- `歷史文物守護行動完整版.html`：目前的完整遊戲
- `question-bank.js`：由 Excel 匯出的八關題目、選項、答案、提示與解析
- `tools/export-question-bank.py`：將 Excel 題庫重新轉成 JS 的工具
- `歷史文物守護行動第一小關.html`：第一小關原型
- `國小生版畢業專題遊戲構想.docx`：調整後的遊戲企劃文件
