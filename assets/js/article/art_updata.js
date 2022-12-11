/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: 暴虐的小金
 * @Date: 2022-12-10 21:36:56
 * @LastEditors: 暴虐的小金
 * @LastEditTime: 2022-12-11 10:49:21
 */
$(function() {
    const Id = window.location.search.split('=')
    const layer = layui.layer;
    const form = layui.form;
    getOldInfo(Id[1]);
    initEditor();
    getCateList();

    function getOldInfo(Id) {
        $.ajax(({
            url: '/my/article/' + Id,
            success: res => {
                console.log(res.data);
                $("#form-pub [name=title]").val(res.data.title)
                $('textarea').val(res.data.content)
                $image
                    .cropper("destroy") // 销毁旧的裁剪区域
                    .attr("src", 'http://api-breakingnews-web.itheima.net' + res.data.cover_img)
                    .cropper(options); // 重新初始化裁剪区域
            }
        }))
    }

    function getCateList() {
        $.ajax({
            url: "/my/article/cates",
            success: (res) => {
                if (res.status !== 0) {
                    return layer.msg("获取文章类别失败");
                }
                $("#cate_id").html(template("tpl-cate", res));
                form.render();
            },
        });
    }
    const $image = $("#image");
    const options = {
        aspectRatio: 160 / 90,
        preview: ".img-preview",
    };
    $image.cropper(options);
    $("#btnChooseImage").click(function() {
        $("#coverFile").click();
    });
    $("#coverFile").change(function(e) {
        const files = e.target.files;
        if (files.length === 0) {
            return layer.msg("请选中图片作为封面");
        }
        const newImages = URL.createObjectURL(files[0]);
        $image
            .cropper("destroy") // 销毁旧的裁剪区域
            .attr("src", newImages) // 重新设置图片路径
            .cropper(options); // 重新初始化裁剪区域
    });
    let art_state = "已发布";
    $("#btnSave2").click(function() {
        art_state = "草稿";
    });
    $("#form-pub").submit(function(e) {
        e.preventDefault();
        const formData = new FormData($(this)[0]);
        formData.append("Id", Id[1]);

        formData.append("state", art_state);
        $image
            .cropper("getCroppedCanvas", {
                // 创建一个 Canvas 画布
                width: 160,
                height: 90,
            })
            .toBlob(function(blob) {
                formData.append("cover_img", blob);
                formData.forEach((v, k) => {
                    console.log(k, v);
                })
                setArtic(formData)
            });
    });

    function setArtic(formData) {
        $.ajax({
            type: "POST",
            url: "/my/article/edit",
            data: formData,
            contentType: false,
            processData: false,
            success: (res) => {
                if (res.status !== 0) {
                    return layer.msg("修改文章失败");
                }
                layer.msg("修改文章成功");
                setTimeout(() => {
                    location.href = "./art_list.html";
                }, 600)
            },
        });
    }
    $('#goback').click(function() {
        history.go(-1)
    })
})