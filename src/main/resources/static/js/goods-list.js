// script.js
document.addEventListener("DOMContentLoaded", function () {
    const goodsTable = document.getElementById("goodsTable");
    const pageInfo = document.getElementById("pageInfo");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    let currentPage = 1;
    const itemsPerPage = 10; // 每页显示的商品数量

    // 获取商品数据并更新页面
    function fetchAndRenderGoods(page) {
        // 向后端发起HTTP请求获取商品数据
        fetch(`/goods/list?page=${page}&size=${itemsPerPage}`)
            .then((response) => response.json())
            .then((data) => {
                // 清空商品表格
                goodsTable.querySelector("tbody").innerHTML = "";

                // 填充商品表格
                data.data.forEach((item) => {
                    const row = goodsTable.querySelector("tbody").insertRow();
                    row.insertCell(0).textContent = item.id;
                    row.insertCell(1).textContent = item.name;
                    row.insertCell(2).textContent = item.number;
                    row.insertCell(3).textContent = item.unit;
                    row.insertCell(4).textContent = item.shelvesNo;
                    row.insertCell(5).textContent = item.floor;
                    row.insertCell(6).textContent = new Date(item.createTime).toLocaleString();
                    row.insertCell(7).textContent = new Date(item.updateTime).toLocaleString();
                    const cell = row.insertCell(8);

                    // 创建操作按钮元素
                    const button = document.createElement("button");
                    button.className = "btn btn-link";
                    button.innerHTML = "入库"; // 设置按钮文本
                    button.setAttribute("data-toggle", "modal");
                    button.setAttribute("data-target", "#myModal");
                    button.onclick = function() {
                        const stockTitle = document.getElementById("stockTitle");
                        stockTitle.innerHTML = "入库";
                        const stockGoodsId = document.getElementById("stockGoodsId");
                        stockGoodsId.value = item.id;
                        const stockType = document.getElementById("stockType");
                        stockType.value = "in";
                    };

                    cell.appendChild(button);

                    const outBt = document.createElement("button");
                    outBt.className = "btn btn-link";
                    outBt.innerHTML = "出库"; // 设置按钮文本
                    outBt.setAttribute("data-toggle", "modal");
                    outBt.setAttribute("data-target", "#myModal");
                    outBt.onclick = function() {
                        const stockTitle = document.getElementById("stockTitle");
                        stockTitle.innerHTML = "出库";
                        const stockGoodsId = document.getElementById("stockGoodsId");
                        stockGoodsId.value = item.id;
                        const stockType = document.getElementById("stockType");
                        stockType.value = "out";
                    };
                    cell.appendChild(outBt);

                    const locationBt = document.createElement("button");
                    locationBt.className = "btn btn-link";
                    locationBt.innerHTML = "变更货架/层"; // 设置按钮文本
                    locationBt.setAttribute("data-toggle", "modal");
                    locationBt.setAttribute("data-target", "#locationModal");
                    locationBt.onclick = function() {
                        document.getElementById("locationGoodsId").value = item.id;
                    };

                    cell.appendChild(locationBt);

                });

                // 更新分页信息
                pageInfo.textContent = `Page ${currentPage} of ${Math.ceil(data.total / itemsPerPage)}`;
            });
    }

    // 上一页按钮点击事件
    prevBtn.addEventListener("click", function () {
        if (currentPage > 1) {
            currentPage--;
            fetchAndRenderGoods(currentPage);
        }
    });

    // 下一页按钮点击事件
    nextBtn.addEventListener("click", function () {
        currentPage++;
        fetchAndRenderGoods(currentPage);
    });

    // 初始化页面
    fetchAndRenderGoods(currentPage);
});

