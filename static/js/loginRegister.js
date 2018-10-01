
$(document).ready(function () {
    //注册
    $("#register-form").validate({
        rules: {
            username: {
                required: true,
                rangelength: [11, 11],
            },
            password: {
                required: true,
                rangelength: [5, 10]
            },
            repassword: {
                required: true,
                rangelength: [5, 10],
                equalTo: "#register-password"
            }
        },
        messages: {
            username: {
                required: "请输入用户名",
                rangelength: "用户名必须是11位",
            },
            password: {
                required: "请输入密码",
                rangelength: "密码必须是5-10位",
            },
            repassword: {
                required: "请确认密码",
                rangelength: "密码必须是5-10位",
                equalTo: "两次输入的密码必须相等"
            },
        },
        submitHandler: function (form) {
            var urlStr = "/register"
            alert("urlStr:" + urlStr)
            $(form).ajaxSubmit({
                url: urlStr,
                type: "post",
                dataType: "json",
                success: function (data, status) {
                    console.log(status + JSON.stringify(data))
                    if (data.code == 0) {
                        setTimeout(function () {
                            window.location.href = "/login.html"
                        }, 1000)
                    } else {
                        alert(data.msg)
                    }
                },
                error: function (data, status) {
                    console.log(status + JSON.stringify(data))
                }
            });
        }
    })

    //登录
    $("#login-form").validate({
        rules: {
            username: {
                required: true,
                rangelength: [11, 11],
            },
            password: {
                required: true,
                rangelength: [5, 10]
            },
        },
        messages: {
            username: {
                required: "请输入用户名",
                rangelength: "用户名必须是11位",
            },
            password: {
                required: "请输入密码",
                rangelength: "密码必须是5-10位",
            },
        },
        submitHandler: function (form) {
            var urlStr = "/login"
            $(form).ajaxSubmit({
                url: urlStr,
                type: "post",
                dataType: "json",
                success: function (data, status) {
                    console.log(status + JSON.stringify(data))
                    if (data.code == 0) {
                        document.cookie = "token="+data.data
                        setTimeout(function () {
                            window.location.href = "#"
                        }, 1000)
                    } else {
                        alert(data.msg)
                    }
                },
                error: function (data, status) {
                    console.log(status + JSON.stringify(data))
                }
            });
        }
    })
})