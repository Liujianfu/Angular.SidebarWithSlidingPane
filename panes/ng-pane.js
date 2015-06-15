(function () {
    'use strict';
    angular.module('ui.panes', []);
}());
(function () {

    'use strict';
    var mainModule = angular.module('ui.panes');

     mainModule.controller('panesController', ['$scope', function ($scope) {

        this.scope = $scope;
        this.dockSide = "right";
        $scope.options = {};//minWidth maxWidth ...
        $scope.multiplePaneStyle="padding-right:30px;float: right; top:0; bottom:0; right:0;  width: 300px;" + 
                                "background-color:#64646c;position:fixed;z-index: 10000; display:none; border: solid 1px darkgrey; box-shadow: rgba(0, 0, 0, 0.7) 0 1px 10px 0;";
        $scope.spliterBarStyle = " margin-left:-3px;background-color:darkgrey; height:100%;  float: left; width: 3px;  cursor: col-resize;";
        $scope.paneContainerStyle = "float: left; margin:2px;width: 100%;  height:100%; ";
        $scope.paneselectBarStyle = "padding-top:15px; right: 0; top:0; bottom:0;float: right; width: 35px; height: auto;" +
                                        " background-color: #3b3b49;position:fixed;z-index: 20001;";
        $scope.paneActive = null;
        $scope.panes = [{
                            hidden: false,
                            helpText: "Add new question",
                            helpTextPlacement: "left",
                            className: "pane-new-question",
                            contentTemplate:"modules/assessmentTemplate/assessmentTemplate.newQuestion.tpl.html"

                        },
                        {
                            hidden: false,
                            helpText: "Add bank question",
                            helpTextPlacement: "left",
                            className: "pane-new-question",
                            contentTemplate: "modules/assessmentTemplate/assessmentTemplate.bankQuestion.tpl.html"

                        },
                        {
                            hidden: false,
                            helpText: "Add new question",
                            helpTextPlacement: "left",
                            className: "pane-new-question",
                            contentTemplate: "modules/assessmentTemplate/assessmentTemplate.newQuestion.tpl.html"
                        }
                    ];
        $scope.toggle = function (pane) {
            var prePane = $scope.paneActive;
            $scope.paneActive = pane;
            if (prePane === null || prePane === pane || $("#ui-multiplepane-pane").is(":hidden"))
            {
                if ($scope.dockSide === "left")
                { $("#ui-multiplepane-pane").toggle("slide", { direction: "left" }, 500); }
                else
                { $("#ui-multiplepane-pane").toggle("slide", { direction: "right" }, 500); }
            }
            $(document).mouseup(function (e) {
                $(document).unbind('mousemove');
            });
            $('#pane-split-bar').mousedown(function (e) {
                e.preventDefault();
                $(document).mousemove(function (e) {
                    e.preventDefault();
                    var newWidth = $(window).width() - e.pageX;
                    if ($scope.dockSide === "left")
                    {
                        newWidth = e.pageX;
                    }
                    var minWidth = 100, maxWidth = 800;
                    if ($scope.options.minWidth)
                    { minWidth = $scope.options.minWidth; }
                    if ($scope.options.maxWidth)
                    { maxWidth = $scope.options.maxWidth; }

                    if (newWidth >= minWidth && newWidth <= maxWidth) {
                        $('#ui-multiplepane-pane').css("width", newWidth);
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
                          if (ngModel.$modelValue && angular.isArray(ngModel.$modelValue)) {
                              scope.panes = ngModel.$modelValue;
                          }                          
                      };
                  }
                  //Set the Options.
                  scope.$watch(attrs.asPane, function (newVal, oldVal) {
                      angular.forEach(newVal, function (value, key) {
                          scope.options[key] = value;
                      });
                  }, true);

                  if (angular.isDefined(attrs.dockSide)) {
                      scope.dockSide = attrs["dockSide"];
                      if(scope.dockSide ==="left")
                      {
                          //need to change styles 
                          scope.multiplePaneStyle = "padding-left:30px;float: left; top:0; bottom:0; left:0;  width: 300px;" +
                                                  "background-color:#64646c;position:fixed;z-index: 10000; display:none; border: solid 1px darkgrey; box-shadow: rgba(0, 0, 0, 0.7) 0 1px 10px 0;";
                          scope.spliterBarStyle = " margin-right:-3px;background-color:darkgrey; height:100%;  float: right; width: 3px;  cursor: col-resize;";
                          scope.paneContainerStyle = "float: right; margin:2px;width: 100%;  height:100%; ";
                          scope.paneselectBarStyle = "padding-top:15px; left: 0; top:0; bottom:0;float: left; width: 35px; height: auto;" +
                                                          " background-color: #3b3b49;position:fixed;z-index: 20001;";
                      }
                  }
              },
              template: "<div class='ui-multiplepane'  id='ui-multiplepane-pane' style='{{multiplePaneStyle}}' >" +
                            "<div id='pane-split-bar' style='{{spliterBarStyle}}'></div>" +
                            "<div id ='pane-container' style='{{paneContainerStyle}}'>" +
                                "<div class='ui-pane' ng-show='pane==paneActive' ng-repeat='pane in panes'>"+
                                    "<div> <ng-include src=\"pane.contentTemplate\"/></div>" +
                                "</div>" +
                            "</div>" +
                        "</div>" +
                        "<div clase ='paneselect-bar' style='{{paneselectBarStyle}}'>" +

                             "<div class='ui-paneselector' ng-repeat='pane in panes' tooltip='{{pane.helpText}}' tooltip-placement='{{pane.helpTextPlacement}}'"+
                                  "ng-hide='pane.hidden' ng-class='{active:pane=== paneActive}'>" +
                                 "<a ng-click='toggle(pane)' > <i class='{{pane.className}}' style='margin: 2px; line-height: 35px;' ></i> </a>" +
                             "</div>"+
                        "</div>"
          };
      });

}());

