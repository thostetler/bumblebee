/**
 * Created by alex on 7/24/14.
 */

define(['marionette','backbone',
      'js/widgets/base/base_widget',
    'hbs!js/widgets/loading/loading-template',
    'bootstrap'],
  function(Marionette, Backbone, BaseWidget, loadingTemplate){

 var LoadingModel = Backbone.Model.extend({

 })


  var LoadingView = Marionette.ItemView.extend({

    initialize : function(options){

      options = options || {};

      this.model = new LoadingModel();

    },

     template : loadingTemplate,

    onRender: function(){

      this.$(".modal").modal("show");

      setTimeout(function(){
        this.$(".modal").modal("hide");
      }, 1000)
    }

  })


  var LoadingWidget = BaseWidget.extend({



  })

  console.log(new LoadingView(), "loadingView")

    return LoadingView

})