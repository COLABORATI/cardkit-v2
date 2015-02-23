'use strict';

/**
 * @ngdoc function
 * @name cardkitApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the cardkitApp
 */
angular.module('cardkitApp')
  .controller('MainCtrl', function ($scope, saveSvgAsPng, themeConfig) {
    
    $scope.config = {
      sizes: [
        {
          name: 'Facebook',
          width: 800,
          height: 370,
        },
        {
          name: 'Twitter',
          width: 650,
          height: 320,
        },
      ],
      themes: themeConfig,
      svg: {
    		canvas: {
    			height: function() {
            return $scope.size.height;
          },
    			width: function() {
            return $scope.size.width;
          },
    			fill: function() {
            return $scope.theme.background;
          },
    		},
    		elements: [
          {
            name: 'Image',
            type: 'image',
            width: 200,
            height: function() {
              return this.width;
            },
            src: '',
            opacity: 1,
            x: '50%',
            y: '50%',
            preserveAspectRatio: 'xMinYMin meet',
            draggable: true,
            editable: {
              src: true,
              width: true,
              opacity: true
            }
          },
          {
            name: 'Logo',
            type: 'image',
            width: 250,
            height: function() {
              return this.width;
            },
            src: function() {
              return $scope.theme.logoSrc;
            },
            opacity: 1,
            x: '330',
            y: '300',
            textAnchor: 'end',
            preserveAspectRatio: 'xMinYMin meet',
            editable: false,
            draggable: true
          },
          {
            name: 'Credit',
            type: 'text',
            text: 'Credit: Insert name here',
            fill: function() {
              return $scope.theme.quote;
            },
            fontSize: 12,
            fontFamily: function() {
              return $scope.theme.headlineFont;
            },
            textAnchor: 'end',
            x: 580,
            y: 250,
            draggable: true,
            editable: {
              text: true,
              fontSize: {
                'Small': 12,
                'Medium': 18,
                'Large': 22,
                'Extra Large': 36,
              },
              fill: 'picker',
            },
          },
          {
            type: 'group',
            name: 'Title',
            x: 30,
            y: 90,
            editable: true,
            draggable: true,
            elements: [
              {
                name: 'Logo',
                type: 'image',
                width: 30,
                height: function() {
                  return this.width;
                },
                src: function() {
                  return $scope.theme.logoSecondarySrc;
                },
                opacity: 1,
                x: 20,
                y: 37,
                preserveAspectRatio: 'xMinYMin meet',
                editable: false
              },
              {
                name: 'Headline',
                type: 'text',
                text: 'I\'m attached to the image on the left. \nEdit me and drag me around',
                fill: function() {
                  return $scope.theme.quote;
                },
                fontSize: '26',
                fontFamily: function() {
                  return $scope.theme.headlineFont;
                },
                textAnchor: 'left',
                x: 55,
                y: 55,
                editable: {
                  text: true,
                },
              },
            ],
          },
    		],
      }
  	};

    $scope.theme = null;

    $scope.size = null;

    $scope.$watch('theme', function() {
      $scope.$broadcast('changeTheme');
    });

    $scope.$watch('size', function() {
      $scope.$broadcast('changeSize');
    });

    // Drop handler.
    $scope.onDrop = function (data, event, key) {
      var dataTransfer = getDataTransfer(event);
      readFile(dataTransfer.files[0], key);
    };

    // Read the supplied file (from DataTransfer API)
    function readFile(file, key) {
      var reader = new FileReader();

      reader.onload = function() { 
        $scope.config.svg.elements[key].src = reader.result;
        $scope.$apply();
      };

      reader.readAsDataURL(file);
    }

    // Get the data transfer
    function getDataTransfer(event) {
      event.stopPropagation();
      event.preventDefault();
      return event.dataTransfer || null;
    }

    $scope.removeImage = function(key) {
      $scope.config.svg.elements[key].src = '';
    };


    $scope.downloadSvg = function() {
      saveSvgAsPng(document.getElementById('snap-svg'), 'image.png');
    };
  });
