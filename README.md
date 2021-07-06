# Restaurant List
利用Node.js + Express 建立餐廳網站，可以瀏覽所有餐廳、搜尋特定餐廳、查看餐廳詳細資訊，還可以新增、修改、刪除餐廳資料。
* 功能列表
1. 使用者可以瀏覽目前的餐廳照片、名稱、分類及評分
2. 使用者點擊可以查看詳細餐廳資訊
3. 使用者可以用中英文名稱及類別搜尋餐廳
4. 使用者可以新增餐廳和其相關資訊
5. 使用者可以修改餐廳的資訊
6. 使用者可以刪除餐廳

---

# 專案畫面
![](https://i.imgur.com/m6DUCo7.jpg)
![](https://i.imgur.com/Ff8xdOi.png)

---

# 環境建置
* Visual Studio Code
* Express 4.17.1
* Node.js
* BootStrap v4.3
* JQuery v3.3.1
* popper.js
* restaurant.json
* express-handlebars 5.3.2
* MongoDb

---

# 安裝流程
1. 開啟終端機，並cd 要放專案的位置並執行:
```git clone https://github.com/ioriayaka/Restaurant_List.git```
2. 進入專案資料夾
```cd Restaurant_List-v2```
3. 安裝 npm 套件
```npm install```
4. 安裝 nodemon 套件 (若未安裝)
```npm install -g nodemon```
5. 新增種子資料
```npm run seed```
6. 啟動伺服器，執行 app.js 檔案
```npm run dev```
7. 當終端機出現以下字樣，表示啟動完成
```The Express server is running on http://localhost:3000```