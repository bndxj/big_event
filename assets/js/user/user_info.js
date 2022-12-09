/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: 暴虐的小金
 * @Date: 2022-11-29 19:01:06
 * @LastEditors: 暴虐的小金
 * @LastEditTime: 2022-12-09 19:48:38
 */
$(function() {
    const form = layui.form;
    const layer = layui.layer;
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return "昵称的长度在1~6个字符之间";
            }
        },
    });
    initUserInfo();

    function initUserInfo() {
        $.ajax({
            type: "get",
            url: "/my/userinfo",
            success: (res) => {
                if (res.status !== 0) {
                    return layer.msg("获取用户信息失败");
                }
                form.val("formUserInfo", res.data);
            },
        });
    }
    $("#btnReset").click(function(e) {
        e.preventDefault();
        initUserInfo();
    });
    $(".layui-form").submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) {
                    return layer.msg("更新用户信息失败");
                }
                layer.msg("更新用户信息成功");

                window.parent.getUserInfo();
            },
            error: function(res) {
                console.log(res);
            },
        });
    });
});