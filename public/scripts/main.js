(function () {
    SystemJS.config({
        baseURL: '/public/scripts',
        map:{
            vue: "vue.js",
            moment: "moment.js",
            text: "text.js",
            vueResource: "vueResourceConfig.js"
        },
        packages:{
            "components/posts":{
                  main:"main.js"
            },
            "components/post":{
                  main:"main.js"
            },
            "components/comments":{
                  main:"main.js"
            },
            "components/likes":{
                main:"main.js"
            },
            "components/passengers":{
                main:"main.js"
            },
            "components/planes":{
                main:"main.js"
            },
           "components/schedules":{
                main:"main.js"
            },
            "components/tickets":{
                main:"main.js"
            }



        }
    });

})();