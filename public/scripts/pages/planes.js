System.import("vue").then(function (Vue) {
    System.import("components/planes").then(function (PlaneComponent) {
           new Vue({
            el: '#app',
               components:{
                   "Planes":PlaneComponent
               }
        })
    })
});