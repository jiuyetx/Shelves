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
        fetch(`http://localhost:8090/goods/list?page=${page}&size=${itemsPerPage}`)
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
                    button.innerHTML = "入库"; // 设置按钮文本
                    button.onclick = function() {
                        const stockTitle = document.getElementById("stockTitle");
                        stockTitle.innerHTML = "入库";
                        const stockGoodsId = document.getElementById("stockGoodsId");
                        stockGoodsId.value = item.id;
                        const stockType = document.getElementById("stockType");
                        stockType.value = "in";
                        modal.style.display = "block";
                    };

                    cell.appendChild(button);

                    const outBt = document.createElement("button");
                    outBt.innerHTML = "出库"; // 设置按钮文本
                    outBt.onclick = function() {
                        const stockTitle = document.getElementById("stockTitle");
                        stockTitle.innerHTML = "出库";
                        const stockGoodsId = document.getElementById("stockGoodsId");
                        stockGoodsId.value = item.id;
                        const stockType = document.getElementById("stockType");
                        stockType.value = "out";
                        modal.style.display = "block";
                    };
                    cell.appendChild(outBt);

                    const locationBt = document.createElement("button");
                    locationBt.innerHTML = "变更货架/层"; // 设置按钮文本
                    locationBt.onclick = function() {
                        document.getElementById("locationGoodsId").value = item.id;
                        locationModal.style.display = "block";
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

$(document).ready(function () {
    // 默认加载第一个页面
    loadPage("page1.html");

    // 菜单项点击事件
    $(".nav-link").click(function () {
        var pageUrl = $(this).attr("href");
        loadPage(pageUrl);
        return false; // 防止默认跳转
    });

    // 加载页面内容的函数
    function loadPage(url) {
        $(".nav-link").removeClass("active"); // 移除所有菜单项的激活状态
        $(".nav-link[href='" + url + "']").addClass("active"); // 激活当前菜单项
        $("main").load(url); // 加载页面内容
    }
});

