/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: 暴虐的小金
 * @Date: 2022-11-29 19:01:06
 * @LastEditors: 暴虐的小金
 * @LastEditTime: 2022-12-10 21:42:24
 */
$(function() {
    const layer = layui.layer;
    const form = layui.form;
    const laypage = layui.laypage;
    template.defaults.imports.dataFormat = function(date) {
        const dt = new Date(date);
        let y = dt.getFullYear();
        let m = addZero(dt.getMonth() + 1);
        let d = addZero(dt.getDate());

        let hh = addZero(dt.getHours());
        let mm = addZero(dt.getMinutes());
        let ss = addZero(dt.getSeconds());
        return [y, m, d].join("-") + " " + [hh, mm, ss].join(":");
    };

    function addZero(number) {
        return number > 9 ? number : "0" + number;
    }
    const req = {
        pagenum: 1, // 页码值，默认请求第一页的数据
        pagesize: 3, // 每页显示几条数据，默认每页显示2条
        cate_id: "", // 文章分类的 Id
        state: "", // 文章的发布状态
    };

    getArticleList();

    function getArticleList() {
        $.ajax({
            url: "/my/article/list",
            data: req,
            success: (res) => {
                if (res.status !== 0) {
                    return layer.msg("获取文章列表失败");
                }
                $("tbody").html(template("tpl-table", res));
                renderPage(res.total);
            },
        });
    }
    getArtCateList();

    function getArtCateList() {
        $.ajax({
            url: "/my/article/cates",
            success: (res) => {
                $("#cateList").html(template("tpl-cate", res));
                form.render();
            },
        });
    }
    $("#form-search").submit(function(e) {
        e.preventDefault();
        req.cate_id = $("#cateList").val();
        req.state = $("[name=state]").val();
        getArticleList();
    });

    function renderPage(total) {
        laypage.render({
            elem: "pageBox",
            count: total,
            limit: req.pagesize,
            curr: req.pagenum,
            layout: ["count", "limit", "prev", "page", "next"],
            limits: [1, 3, 5, 10, 12],
            jump: function(obj, first) {
                req.pagenum = obj.curr;
                req.pagesize = obj.limit;
                if (!first) {
                    getArticleList();
                }
            },
        });
    }
    $("tbody").on("click", ".btn-delete", function() {
        const id = $(this).data("id");
        let len = $(".btn-delete").length;
        layer.confirm(
            "是否要删除该文章？", {
                icon: 3,
            },
            function(index) {
                $.ajax({
                    url: "/my/article/delete/" + id,
                    success: (res) => {
                        if (res.status !== 0) {
                            return layer.msg("删除文章失败");
                        }
                        layer.msg("删除文章成功");
                        if (len === 1) {
                            req.pagenum = req.pagenum === 1 ? 1 : req.pagenum - 1;
                        }
                        getArticleList();
                    },
                });
                layer.close(index);
            }
        );
    });

    //编辑文章
    $('tbody').on('click', '#layui_updata', function() {
        const Id = $(this).parent().siblings('#id').html()
        location.href = './art_updata.html?Id=' + Id
    })
});