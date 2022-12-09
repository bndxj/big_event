/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: 暴虐的小金
 * @Date: 2022-12-09 21:29:54
 * @LastEditors: 暴虐的小金
 * @LastEditTime: 2022-12-09 21:35:16
 */
$(function() {
    const layer = layui.layer;

    // 1.1 获取裁剪区域的 DOM 元素
    const $image = $("#image");
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: ".img-preview",
    };

    // 1.3 创建裁剪区域
    $image.cropper(options);

    $("#btnChooseImage").on("click", function() {
        $("#file").click();
    });
    $("#file").change(function(e) {
        const files = e.target.files;
        if (files.length === 0) return layer.msg("请先选中图片");
        const file = e.target.files[0];
        const imgUrl = URL.createObjectURL(file);
        $image
            .cropper("destroy") // 销毁旧的裁剪区域
            .attr("src", imgUrl) // 重新设置图片路径
            .cropper(options); // 重新初始化裁剪区域
    });
    $("#btnUpload").click(function() {
        // 1. 要拿到用户裁剪之后的头像
        const dataURL = $image
            .cropper("getCroppedCanvas", {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100,
            })
            .toDataURL("image/png"); // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        // 2. 调用接口，把头像上传到服务器
        $.ajax({
            type: "post",
            url: "/my/update/avatar",
            data: {
                avatar: dataURL,
            },
            success: (res) => {
                if (res.status !== 0) {
                    return layer.msg("更换头像失败！");
                }
                layer.msg("更换头像成功！");
                window.parent.getUserInfo();
            },
        });
    });
});