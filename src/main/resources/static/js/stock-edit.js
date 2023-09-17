var modal = document.getElementById("myModal");
var locationModal = document.getElementById("locationModal");
var stockInput = document.getElementById("stockInput");
var confirmBtn = document.getElementById("confirmBtn");
var cancelBtn = document.getElementById("cancelBtn");
var localCancelBtn = document.getElementById("localCancelBtn");

// 点击关闭按钮或模态框外部时关闭模态框
window.onclick = function(event) {
    if (event.target === modal) {
        modal.style.display = "none";
    }

    if (event.target === locationModal) {
        locationModal.style.display = "none";
    }
}

// 点击取消按钮时关闭模态框
cancelBtn.onclick = function() {
    modal.style.display = "none";
}

localCancelBtn.onclick = function() {
    locationModal.style.display = "none";
}

// 在窗口大小变化时重新计算模态框位置
window.onresize = function() {
    if (modal.style.display === "block" || locationModal.style.display === "block") {
        centerModal();
    }
}

// 居中显示模态框
function centerModal() {
    var modalContent = document.querySelector(".modal-content");
    var windowHeight = window.innerHeight;
    var modalHeight = modalContent.clientHeight;

    var topMargin = (windowHeight - modalHeight) / 2;
    modalContent.style.marginTop = topMargin + "px";
}

// 点击确认按钮时处理库存更新和刷新操作
confirmBtn.onclick = function() {
    var newStock = stockInput.value; // 获取数量
    var stockGoodsId =  document.getElementById("stockGoodsId").value; // 获取数量
    var stockType =  document.getElementById("stockType").value; // 获取数量

    // 调用 POST 接口来更新数据，这里使用 fetch API 作为示例
    fetch("/goods/updateStock", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ id:stockGoodsId, number: newStock, type:stockType}) // 传递新库存数据
    })
        .then(response => {
            if (response) {
                // 更新成功，刷新页面或执行其他操作
                location.reload(); // 刷新页面
            } else {
                // 处理更新失败的情况
                alert("更新库存失败");
            }
            modal.style.display = "none"; // 关闭模态框
        })
        .catch(error => {
            console.error("发生错误: ", error);
            modal.style.display = "none"; // 关闭模态框
        });
}

localConfirmBtn.onclick = function() {
    var stockGoodsId =  document.getElementById("locationGoodsId").value; // 获取数量
    var locationShelvesNo =  document.getElementById("locationShelvesNo").value; // 获取数量
    var locationFloor =  document.getElementById("locationFloor").value; // 获取数量

    // 调用 POST 接口来更新数据，这里使用 fetch API 作为示例
    fetch("/goods/updateFloor", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ id:stockGoodsId, shelvesNo: locationShelvesNo, floor:locationFloor}) // 传递新库存数据
    })
        .then(response => {
            if (response) {
                // 更新成功，刷新页面或执行其他操作
                location.reload(); // 刷新页面
            } else {
                // 处理更新失败的情况
                alert("更新库存失败");
            }
            modal.style.display = "none"; // 关闭模态框
        })
        .catch(error => {
            console.error("发生错误: ", error);
            modal.style.display = "none"; // 关闭模态框
        });
}
