'use strict';
$(function (){
    // Test for placeholder support
    $.support.placeholder = (function(){
        var i = document.createElement('input');
        return 'placeholder' in i;
    })();

    // Hide labels by default if placeholders are supported
    if($.support.placeholder) {
        $('.form-label').each(function(){
            $(this).addClass('js-hide-label');
        });

        // Code for adding/removing classes here
        $('.form-group').find('input, textarea').on('keyup blur focus', function(e){

            // Cache our selectors
            var $this = $(this),
                $parent = $this.parent().find("label");

            if (e.type == 'keyup') {
                if( $this.val() == '' ) {
                    $parent.addClass('js-hide-label');
                } else {
                    $parent.removeClass('js-hide-label');
                }
            }
            else if (e.type == 'blur') {
                if( $this.val() == '' ) {
                    $parent.addClass('js-hide-label');
                }
                else {
                    $parent.removeClass('js-hide-label').addClass('js-unhighlight-label');
                }
            }
            else if (e.type == 'focus') {
                if( $this.val() !== '' ) {
                    $parent.removeClass('js-unhighlight-label');
                }
            }
        });
    }

    var Utils = {
        init: function () {
            this.cacheElements();
            this.bindEvents();
        },
        cacheElements: function () {
            this.$inpName = $("#inp-name");
            this.$inpNameLast = $("#inp-name-last");
            this.$btnSave = $("#btn-save");
            this.$btnView = $("#btn-view");
            this.$btnClear = $("#btn-clear");
            this.$listData = $("#list-data");
            this.$alert = $("#alert");
            this.$alertSuccess = $("#alert-success");
            this.$alertClean = $("#alert-clean");
            this.$cnvGeometry = document.getElementById("cnv-geometry");
            this.count = 0;
        },
        bindEvents: function () {
            Utils.$inpName.on("keyup", Utils.action.validateInputName);
            Utils.$inpNameLast.on("keydown", Utils.action.enterEvent);
            Utils.$btnSave.on("click", Utils.action.saveLocalStorage);
            Utils.$btnView.on("click", Utils.action.viewContentLocalStorage);
            Utils.$btnClear.on("click", Utils.action.clean);
        },
        action: {
            validateInputName: function (e) {
                Utils.$alertSuccess.hide();
                Utils.$alertClean.hide();
				if (Utils.$inpName.val().length == 0) {
                    Utils.$alert.show();
				} else {
                    Utils.$alert.hide();
				}
			},
            enterEvent: function (e) {
                if(e.keyCode == 13){
                    Utils.action.saveLocalStorage();
                    return;
                }
			},
            saveLocalStorage: function () {
                Utils.$alert.hide();
                Utils.$alertSuccess.hide();
                Utils.$alertClean.hide();
            	if (Utils.$inpName.val().length == 0) {
            		Utils.$alert.show();
            		return;
				}
                var data = {
                    id:(localStorage.length + 1),
                    name: Utils.$inpName.val(),
                    lastName: Utils.$inpNameLast.val()
                };

                localStorage.setItem(localStorage.length + 1, JSON.stringify(data));
                Utils.$inpName.val("");
                Utils.$inpNameLast.val("");
                Utils.$alertSuccess.show();
            },
            viewContentLocalStorage: function () {
                Utils.$listData.empty();
                for (var i = 0;  i < localStorage.length ; i++) {
                    var data = jQuery.parseJSON(localStorage.getItem(i+1));
                    Utils.$listData.append( "<a class='list-group-item'>" + data.name + " " + data.lastName + "</a>" );
                }
            },
            clean: function () {
                localStorage.clear();
                Utils.$alert.hide();
                Utils.$alertSuccess.hide();
                Utils.$inpName.val("");
                Utils.$inpNameLast.val("");
                Utils.$alertClean.show();
            },
            simpleCanvas: function () {
                if (Utils.$cnvGeometry.getContext) {

                    /* Obtenemos el contexto plano (2d) */
                    var ctx1 = (Utils.$cnvGeometry.getContext("2d"));

                    /* Cuadrado */
                    ctx1.fillStyle = "rgb(41,155,243)";
                    ctx1.fillRect (10, 10, 180, 180);

                    /* Circulo */
                    var cxt2=(Utils.$cnvGeometry.getContext("2d"));

                    cxt2.fillStyle ="red";
                    cxt2.beginPath();
                    cxt2.arc(60,60,50,0,Math.PI*2,true);
                    cxt2.closePath();
                    cxt2.fill();

                    /* Triangulo */
                    var ctx3=(Utils.$cnvGeometry.getContext("2d"));
                    ctx3.fillStyle ="green";
                    ctx3.beginPath();
                    ctx3.moveTo(75,50);
                    ctx3.lineTo(100,75);
                    ctx3.lineTo(100,25);
                    ctx3.fill();


                }
            }
        }
    }

    Utils.init();
    Utils.action.simpleCanvas();
});








