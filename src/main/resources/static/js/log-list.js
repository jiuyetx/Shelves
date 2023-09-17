// script.js
document.addEventListener("DOMContentLoaded", function () {
    const goodsTable = document.getElementById("logTable");
    const pageInfo = document.getElementById("pageInfo");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    let currentPage = 1;
    const itemsPerPage = 10; // 每页显示的商品数量

    // 获取商品数据并更新页面
    function fetchAndRenderGoods(page) {
        // 向后端发起HTTP请求获取商品数据
        fetch(`/log/list?page=${page}&size=${itemsPerPage}`)
            .then((response) => response.json())
            .then((data) => {
                // 清空商品表格
                goodsTable.querySelector("tbody").innerHTML = "";

                // 填充商品表格
                data.data.forEach((item) => {
                    const row = goodsTable.querySelector("tbody").insertRow();
                    row.insertCell(0).textContent = item.id;
                    let textContent;
                    if (item.operate === 'in') {
                        textContent = "入库";
                    } else if (item.operate === "out") {
                        textContent = "出库";
                    } else if (item.operate === "update") {
                        textContent = "变更货架层";
                    }

                    row.insertCell(1).textContent = textContent;
                    row.insertCell(2).textContent = item.number;
                    row.insertCell(3).textContent = item.context;
                    row.insertCell(4).textContent = new Date(item.createTime).toLocaleString();
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
    loadPage("../html/goods-list.html");

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

