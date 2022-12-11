/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: 暴虐的小金
 * @Date: 2022-11-29 19:01:06
 * @LastEditors: 暴虐的小金
 * @LastEditTime: 2022-12-10 18:18:34
 */
$(function() {
    const form = layui.form;
    form.verify({
        pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        samePwd: function(value) {
            const pwd = $("[name=oldPwd]").val();
            if (pwd === value) {
                return "新旧密码不能相同";
            }
        },
        rePwd: function(value) {
            const pwd = $("[name=newPwd]").val();
            if (pwd !== value) {
                return "两次的密码不一致";
            }
        },
    });
    $(".layui-form").submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) {
                    return layer.msg("更换密码失败");
                }
                layer.msg(res.message);
                $(this)[0].reset();
            },
        });
    });
});