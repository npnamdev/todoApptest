const socket = io("http://localhost:3000/")

socket.on("server-send-data", function (data) {
    $("#list-task").html("");
    data.map(function (task) {
        $("#list-task").append(`
            <li>${task}</li>
        `)
    })
})

$(document).ready(function () {
    $("#btn-add").click(function () {
        var inputValue = $("#input-add").val();
        if (inputValue.trim() !== "") {
            socket.emit("add-task", inputValue);
            $("#input-add").val("");
        }
    });



    $("#input-add").on("keydown", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            $("#btn-add").click();
        }
    });
})