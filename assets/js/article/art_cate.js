/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: 暴虐的小金
 * @Date: 2022-11-29 19:01:06
 * @LastEditors: 暴虐的小金
 * @LastEditTime: 2022-12-10 11:17:05
 */
$(function() {
    const layer = layui.layer;
    const form = layui.form;
    getArtCateList();

    function getArtCateList() {
        $.ajax({
            url: "/my/article/cates",
            success: (res) => {
                $("tbody").html(template("tpl-table", res));
            },
        });
    }
    let insexAdd = null;
    $("#btnAddCate").click(function() {
        insexAdd = layer.open({
            type: 1,
            area: ["500px", "250px"],
            title: "添加文章类别",
            content: $("#dialog-add").html(),
        });
    });
    // 新增的需要用on添加
    $("body").on("submit", "#form-add", function(e) {
        e.preventDefault();
        $.ajax({
            type: "post",
            url: "/my/article/addcates",
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) {
                    return layer.msg("添加分类失败");
                }
                getArtCateList();
                layer.msg("添加分类成功");
                layer.close(insexAdd);
            },
        });
    });
    $("body").on("click", ".btn-edit", function() {
        insexAdd = layer.open({
            type: 1,
            area: ["500px", "250px"],
            title: "修改文章类别",
            content: $("#dialog-edit").html(),
        });
        const id = $(this).data("id");
        $.ajax({
            type: "get",
            url: "/my/article/cates/" + id,
            success: (res) => {
                form.val("form-edit", res.data);
            },
        });
    });
    $("body").on("submit", "#form-edit", function(e) {
        e.preventDefault();

        $.ajax({
            type: "post",
            url: "/my/article/updatecate",
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) {
                    return layer.msg("修改分类失败");
                }
                getArtCateList();
                layer.msg("修改分类成功");
                layer.close(insexAdd);
            },
        });
    });
    $("body").on("click", ".btn-delete", function() {
        const id = $(this).data("id");
        layer.confirm(
            "确定要删除吗？", {
                icon: 3,
                title: "提示",
            },
            function(index) {
                $.ajax({
                    type: "get",
                    url: "/my/article/deletecate/" + id,
                    success: (res) => {
                        if (res.status !== 0) {
                            return layer.msg("删除类别失败");
                        }
                        layer.msg("删除类型成功");
                        getArtCateList();
                    },
                });
                layer.close(index);
            }
        );
    });
});