/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: 暴虐的小金
 * @Date: 2022-11-29 19:01:06
 * @LastEditors: 暴虐的小金
 * @LastEditTime: 2022-12-07 21:39:11
 */
$.ajaxPrefilter(function(options) {
    options.url = "http://api-breakingnews-web.itheima.net" + options.url;
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem("token") || "",
        }
    }
});