/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: 暴虐的小金
 * @Date: 2022-11-29 19:01:06
 * @LastEditors: 暴虐的小金
 * @LastEditTime: 2022-12-07 21:39:48
 */

$(function() {
    $('#link_reg').click(function() {
        $('.login-box').hide();
        $('.reg-box').show()
    })
    $('#link_login').click(function() {
        $('.login-box').show();
        $('.reg-box').hide()
    })

    const form = layui.form
    const layer = layui.layer

    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function(value) {
            const pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次的密码不一致'
            }
        }
    })
    $("#form_reg").submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "/api/reguser",
            data: {
                username: $(".reg-box [name=username]").val(),
                password: $(".reg-box [name=password]").val(),
            },
            success: (res) => {
                if (res.status !== 0) return layer.msg(res.message);
                layer.msg(res.message);
                $("#link_login").click();
            },
        });
    });
    $("#form_login").submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "/api/login",
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) return layer.msg("登录失败");
                layer.msg("登录成功");
                localStorage.setItem("token", res.token);
                location.href = "./index.html";
            },
        });
    });
})