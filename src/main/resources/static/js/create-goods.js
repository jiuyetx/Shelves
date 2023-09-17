// 获取模态框和触发按钮
var createModal = document.getElementById("createModal");
var openModalBtn = document.getElementById("openModalBtn");

// 获取输入字段元素
var productNameInput = document.getElementById("productName");
var stockQuantityInput = document.getElementById("stockQuantity");
var unitInput = document.getElementById("unit");
var shelfNumberInput = document.getElementById("shelfNumber");
var floorNumberInput = document.getElementById("floorNumber");

// 获取保存按钮
var saveBtn = document.getElementById("saveBtn");

// 点击关闭按钮或模态框外部时关闭模态框
window.onclick = function(event) {
    if (event.target === createModal) {
        createModal.style.display = "none";
    }
}

// 点击保存按钮时获取输入字段的值并保存
saveBtn.onclick = function() {
    const productName = productNameInput.value;
    const stockQuantity = stockQuantityInput.value;
    const unit = unitInput.value;
    const shelfNumber = shelfNumberInput.value;
    const floorNumber = floorNumberInput.value;

    // 在这里可以将获取的信息保存到数据库或执行其他操作
    console.log("商品名称:", productName);
    console.log("库存数量:", stockQuantity);
    console.log("单位:", unit);
    console.log("货架编号:", shelfNumber);
    console.log("层数:", floorNumber);

    fetch("/goods/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name:productName,
            number: stockQuantity,
            unit: unit,
            shelvesNo: shelfNumber,
            floor:floorNumber
        })
    })
        .then(response => {
            if (response) {
                // 更新成功，刷新页面或执行其他操作
                location.reload(); // 刷新页面
            } else {
                // 处理更新失败的情况
                alert("更新失败");
            }
            modal.style.display = "none"; // 关闭模态框
        })
        .catch(error => {
            console.error("发生错误: ", error);
            modal.style.display = "none"; // 关闭模态框
        });

    createModal.style.display = "none"; // 关闭模态框
}
