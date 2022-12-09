/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: 暴虐的小金
 * @Date: 2022-11-29 19:01:06
 * @LastEditors: 暴虐的小金
 * @LastEditTime: 2022-12-09 16:39:43
 */
$(function() {
    getUserInfo();
    $("#btnLogout").click(function() {
        layer.confirm(
            "是否要退出登录？", {
                icon: 3,
                title: "提示",
            },
            function(index) {
                localStorage.removeItem("token");
                location.href = "./login.html";
                layer.close(index);
            }
        );
    });
});



function renderAvatar(user) {
    const name = user.nickname || user.username;
    $("#welcome").html("欢迎&nbsp;&nbsp:" + name);
    if (user.user_pic !== null) {
        $(".layui-nav-img").attr("src", user.user_pic).show();
        $(".text-avatar").hide();
    } else {
        $(".layui-nav-img").hide();
        const first = name[0].toUpperCase();
        $(".text-avatar").html(first).show();
    }
}