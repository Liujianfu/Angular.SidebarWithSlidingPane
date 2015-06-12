(function () {
    'use strict';
    angular.module('ui.panes', []);
}());
(function () {

    'use strict';
    var mainModule = angular.module('ui.panes');

     mainModule.controller('panesController', ['$scope', function ($scope) {

        this.scope = $scope;
        $scope.dockSide = "right"; 
        $scope.paneActive = null;
        $scope.panes = [{
                            hidden: false,
                            helpText: "Add new question",
                            helpTextPlacement: "left",
                            className: "eltss-pane-new-question"

                        },
                        {
                            hidden: false,
                            helpText: "Add new question",
                            helpTextPlacement: "left",
                            className: "eltss-pane-new-question"

                        },
                        {
                            hidden: false,
                            helpText: "Add new question",
                            helpTextPlacement: "left",
                            className: "eltss-pane-new-question"
                        }
                    ];
        $scope.toggle = function (pane) {
            $scope.paneActive = pane;
            $("#ui-multiplepane-pane").toggle("slide", { direction: "right" }, 500);
           /* $("#ui-multiplepane-pane").resizable({
                handles: 'w',
                minWidth: 200,
                maxWidth: 500,
                resize  : function (event,ui){
                    ui.position.left = ui.originalPosition.left;
                    ui.size.width += (ui.size.width - ui.originalSize.width);
                    alert(ui.originalPosition.left);
                    alert(ui.originalSize.width);
                    alert(ui.originalPosition.right);
                }
            });*/
            $(document).mouseup(function (e) {
                $(document).unbind('mousemove');
            });
            $('#pane-split-bar').mousedown(function (e) {
                e.preventDefault();
                $(document).mousemove(function (e) {
                    e.preventDefault();
                    var x = e.pageX - $('#ui-multiplepane-pane').offset().left;
                    if (e.pageX < ($(window).width())) {
                        $('#ui-multiplepane-pane').css("width", $(window).width() - e.pageX);
                    }
                });
            });

        };
        
    }]);

    /**
     *  directive.
     */
    mainModule.directive('asPane',  function () {
          return {
              require: ['?ngModel'],
              restrict: 'A',
              controller: 'panesController',
              link: function (scope, element, attrs, ngModelController) {
                  var ngModel = ngModelController;
                  if (ngModel)
                  {
                      ngModel.$render = function () {
                          //in case if none is provided.
                          if (ngModel.$modelValue && angular.isArray(ngModel.$modelValue)) {
                              scope.panes = ngModel.$modelValue;
                          }                          
                      };
                  }

              },
              templateUrl: 'panes/ngPaneTemplate.tpl.html'
          };
      });

}());

