	_WXShare('http://10.158.204.160:8080/mobilePic/pages/images/face01-4.gif', '100', '100', '我的唇萌表情？', '我制作了专属的唇萌表情，快来围观么么哒~', '10.158.204.160:8080/mobilePic/pages/lip.html');
	
	var is_IOS = false, is_ANDROID = false;
	if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
	　　is_IOS = true;
		}
		if (navigator.userAgent.match(/Android/i)) {
		　　is_ANDROID = true;
		}		

			var initFacelist = true;
			var MAX_HEIGHT = $(document).height(), MAX_WIDTH=$(document).width();
			var Face = document.getElementById('canvasFace'),
    			FaceContext = Face.getContext('2d');

			var backCanvas = document.getElementById('backcanvas');
			var backCtx = backCanvas.getContext('2d');
				backCanvas.width = Face.width = MAX_WIDTH;
				backCanvas.height = Face.height = MAX_HEIGHT;
			var $backcanvas = $('#backcanvas'),
				savedata = document.getElementById('savedata');
        	$(document).ready(function(){

        		//page init 640*1008
        		/* -- max height-- */
        		$('.mainbody, #imgfixed,.page').height(MAX_HEIGHT);
        		$('.facegif').css('margin-top', (MAX_HEIGHT - 300)/2 + 'px');
        		$('#swipetoproduct').css('bottom', MAX_HEIGHT * 220/504 - MAX_HEIGHT + 'px')
        		if(640/MAX_WIDTH > 1038/MAX_HEIGHT){        			
        			//$('.mainbody, .page, #imgfixed').width(MAX_WIDTH).height(MAX_WIDTH*1008/640);
        			$('#face-controller').width(MAX_WIDTH);
        		}else{
        			//$('.page,.absimgs').height(MAX_HEIGHT).width(MAX_HEIGHT*640/1008);
        			var imgWidth = Math.floor(MAX_HEIGHT*640/1008);
        			//$('.mainbody').css('padding-left', (MAX_WIDTH - imgWidth)/2+'px');
        			$('.absimgs,.guidelayer').height(MAX_HEIGHT).width(imgWidth).css('left', (MAX_WIDTH - imgWidth)/2+'px');
        			$('#face-controller,#face-wrapper,#swipeguide,#logo,#btnbox-final').width(imgWidth);
        			$('#face-controller,#face-wrapper,#swipeguide,#btnbox-final').css('left', (MAX_WIDTH - imgWidth)/2+'px');
        		}
        		
        		/* -----full screen -----
        		$('.mainbody, #imgfixed, .page').height(MAX_HEIGHT);
        		if(640/MAX_WIDTH > 1038/MAX_HEIGHT){ 

        		}else{
        			var imgHeight = Math.floor(MAX_WIDTH*1008/640);
        			$('.absimgs').css({'top': (MAX_HEIGHT - imgHeight)/2 + 'px'})
        		}
        		*/
        		//end of page init

        		$('#topNav a').on('click', function(e){
        			
        			$('#popup-bg, '+ $(this).attr('href')).removeClass('hide');
        		})
        		$('#popup-bg, #popup-content').on('click', function(){
        			$('#popup-bg, .topnav-popups').addClass('hide')
        		})

        		$('#homeBtn').on('click', function(){
        			if(initFacelist){
			    		$('.page').addClass('hide');
        				$('#engage').removeClass('hide');
        				$('#topNav').addClass('hide');
        				$('#face-wrapper').height($('#mask').height() - 148).css('margin-top', MAX_HEIGHT - $('#mask').height() + 'px');
			    		changefaceInit();
			    		initFacelist = false;
			    	}
        		})
				

        		$('#takePicture').on('change',drawface);

        		$('#btn_retake').on('click', function(){
        			$('#takePicture').click()
        		})

        		$('#btn_reload').on('click', function(){
        			backCtx.clearRect(0,0,999,999);
        			$('backcanvas').removeClass('style');
        			$('#btn_retake').text($('#btn_retake').data('orignaltext'))
        			$('#savedata').attr('src','images/transparent.png').show();
        			$('.product-imgs').show().removeClass('hide').removeAttr('style')
        			$('#btnbox-final, #engageNext, #finalImgs, #chosenface,#finalTextDownload,#productText').addClass('hide');
        			$('#homeBtn').trigger('click');
        			$('#face-controller').css('height','auto');
        			$('#btn_choose').addClass('unable')
        			$('#face-wrapper, #face-controller, #btnbox,#changeface').removeClass("hide")
        			$('#swipetoproduct').css('bottom', MAX_HEIGHT * 220/504 - MAX_HEIGHT + 'px')
        			
        		})

        		$('#btn_share,btn_tellfirends').on('click', function(){
        			$('#shareguide').fadeIn(1).delay(4000).fadeOut(1);
        		})
        		$('#shareguide').on('click', function(){
        			$(this).hide()
        		})
        		$('#btn_lucky').on('click', function(){
        			$('#popup-luckydraw').removeClass('hide');
        			$('.popup_icon').css('top',0- $('.popup_icon').height()+ 'px')
        		})
        		$('.btn_close').on('click', function(){
        			$('#popup-luckydraw').addClass('hide')
        		})

        		//landingpage swipe
        		$('#homepage').css('-webkit-transform', 'translate3d(0,-' + MAX_HEIGHT + 'px,0)');
        		$('#landingpage').on('click', function(){
        			$('#landingpage').css('-webkit-transform', 'translate3d(0,' + MAX_HEIGHT + 'px,0)');
    				

        		})
        		/*
        		var hammerLanding = Hammer(document.getElementById('landingpage'));
        		hammerLanding.get('pan').set({ direction: Hammer.DIRECTION_VERTICAL });
        		hammerLanding.on('panend', function(ev){
        			console.log(ev);
        			if(ev.direction == 16){
        				
        				$('#landingpage').css('-webkit-transform', 'translate3d(0,' + MAX_HEIGHT + 'px,0)');
        				setTimeout(function(){
        					$('#homepage').css('-webkit-transform', 'translate3d(0,-' + MAX_HEIGHT + 'px,0)');
        				},300)
        			}
        		})
				*/
        		//end of landingpage swipe

        		$('#finalTextDownload').on('click', function(e){
        			e.preventDefault()
        			alert('will goto download page~')
        		})

        		$('#btn_choose').on('click', chooseFace)

        		$('#btn_togif').on('click', function(){
        			$('#engageText, #face-wrapper, #face-controller').addClass('hide');
        			$('#engageNext,#swipeguide').removeClass('hide');
        			$('.mainbody').addClass('bg2');
        			$('#engageText').hide()
        			//$('#faceGif1').css('left', (MAX_WIDTH - 240)/2 + 'px');

        			//scale face
        			//var $facecanvas = $('#backcanvas');
        			//$facecanvas.css('transform','translate3d('$facecanvas')')
        			//$('#face-wrapper').css({'transform':'scale(0.5,0.5)','margin-top':'30px'});

        			var hammerProduct = Hammer(document.getElementById('swipetoproduct'));
		        		hammerProduct.get('pan').set({ direction: Hammer.DIRECTION_VERTICAL });
		        		hammerProduct.on('panend', function(ev){
		        			console.log(ev);
		        			if(ev.direction == 8){
		        				//$('.page').addClass('hide')
		        				$('.facegif,#swipeguide').addClass('hide');
		        				//setTimeout(function(){
		        					$('#essence').css({'top':0});
		        					$('#productText').fadeIn(800).delay(2000).fadeOut(800)
		        				//},300)		        				
		        				$('#swipetoproduct').css({'bottom':0}).delay(3000).fadeOut(500,function(){
		        					$('#faceGif2, #finalImgs, #btnbox-final,#finalTextDownload').removeClass('hide');
		        					$('.mainbody').removeClass('bg2');
		        					$('#essence').removeAttr('style')
		        				});
		        				
		        			}
		        		})
        		})


        	})

			//choose face & upload canvas
			function chooseFace(){
				if ($('#btn_choose').hasClass('unable')){
					//alert('take photo first')
				}else{
					$('#changeface, #btnbox').addClass('hide');
					$('#face-controller').height(97);
					$('#chosenface').removeClass('hide');
					$('#engageText').fadeIn(500);
					$('#face-wrapper').height($('#mask').height() - 97).css('margin-top', MAX_HEIGHT - $('#mask').height() + 'px');
					$('#mask').css('bottom','-97px');

					//upload img
					var _transData = $backcanvas.data(), 
						_width = backcanvas.width, _height = backcanvas.height,
						_MASKscaleX = $('#mask').width()/320, _MASKscaleY = $('#mask').height()/505;
					FaceContext.clearRect(0,0,999,999);

					FaceContext.rect(17*_MASKscaleX,$('#mask').offset().top + 65*_MASKscaleY,290*_MASKscaleX,247*_MASKscaleY);
					FaceContext.stroke();
					FaceContext.clip();

					FaceContext.translate(_width/2 + _transData.x, _height/2 + _transData.y);
					FaceContext.scale( _transData.scale , _transData.scale );
					FaceContext.rotate( _transData.rotation * Math.PI/180);
					FaceContext.translate(-_width/2, -_height/2 );
	
					FaceContext.drawImage(savedata,0,0,_width,_height);

					setTimeout(function(){
						savedata.src = Face.toDataURL("image/png");
						postThePic()
					},500)
				}
				
			}

			//change face/mouth
			function changefaceInit(){

				var unitWidth = $('#faceList li').outerWidth(), 
        			totalWidth = unitWidth * $('#faceList li').size(),
        			minX = 0 - (totalWidth - 240),
        			stopX=0, mouthX = 0;
        		$('#faceList').width(totalWidth);

        		var hammerMouth = Hammer(document.getElementById('faceList'));
        		hammerMouth.on('pan', function(ev){
        			//console.log(ev.type);
        			mouthX = Math.max(minX, Math.min(stopX + ev.deltaX, 0));
        			$('#faceList').css('-webkit-transform','translate3d(' + mouthX + 'px,0,0)');
        		}).on('panend', function(ev){
        			stopX = mouthX;
        		})

        		$('#faceList li').on('click', function(event){
        			event.stopPropagation(); event.preventDefault();
        			$('#faceList li').removeClass('active');
					$(this).addClass('active');
					var _n = $('.faceList-item').index($('.active')) + 1;
					if (_n != 1 && _n != $('#faceList li').size()) {
						stopX = (2 - _n) * unitWidth;
						$('#faceList').css('-webkit-transform','translate3d(' + stopX + 'px,0,0)');
					};
					if( _n < 4 ){
						$('#mask').attr('src','images/lip-0' + _n + '.gif');
						$('#face_type').val(_n);
					}

        		})

        		
        		$('#prevFace').on('click', function(event){
        			event.stopPropagation(); event.preventDefault();
        			stopX = Math.min(Math.floor(stopX/unitWidth) * unitWidth + unitWidth, 0);
        			$('#faceList').css('-webkit-transform','translate3d(' + stopX + 'px,0,0)');
        		})
        		$('#nextFace').on('click', function(event){
        			event.stopPropagation(); event.preventDefault();
        			stopX = Math.max(Math.floor(stopX/unitWidth) * unitWidth - unitWidth, minX);
        			$('#faceList').css('-webkit-transform','translate3d(' + stopX + 'px,0,0)');
        		})
				

			}
			//end of change face/mouth

        	//draw face
        	function drawface() {
			    //if ( event.target.files.length == 1 && event.target.files[0].type.indexOf("image/") == 0 ) {
			    	
			    	$('#btn_choose').removeClass('unable');
			    	$('#btn_retake').text($('#btn_retake').data('replacetext'));

					var fo = this.files[0];
			        //adjust rotate
			    	var FR_rotate = new FileReader();
			    	FR_rotate.onload = function(e){
			    		var exif = EXIF.readFromBinaryFile(new BinaryFile(this.result));
			    		var _x =0, _y = 0, _rotate = 0;
			    		var _width = $('#mask').width();
			    		//console.log(exif);
						   
						
						var b64imgData=btoa(e.target.result); //Binary to ASCII, where it probably stands for
					    var img=new Image();
					    //console.log(b64imgData);
					    img.src="data:image/jpeg;base64,"+b64imgData;
					    //img.width = MAX_WIDTH;
					    //img.height = exif.PixelXDimension * MAX_HEIGHT/MAX_WIDTH;
					    
					    img.onload = function() {
			           	 //adjust if image is too big
			           	 FaceContext.clearRect(0,0,999,999);	
						 backCtx.clearRect(0,0,999,999);
						 
						 //$('#mask').hide();
						if(img.width > MAX_WIDTH) {
								img.height *= MAX_WIDTH / img.width;
								img.width = MAX_WIDTH;
							}

							switch(exif.Orientation){

						       case 8:
						           //backCtx.rotate(90*Math.PI/180);
						           _rotate = -90;
						           if(is_IOS){
						           	_x = _width/2;
						       		}
						           break;
						       case 3:
						           //backCtx.rotate(180*Math.PI/180);
						           _rotate = 180;
						           break;
						       case 6:
						           //backCtx.rotate(-90*Math.PI/180);
						           if(is_IOS){
						           	_x = 0 - (_width/2);
						           }						           
						           _rotate = 90;
						           
						           break;
							} 	
						 					 
			             //FaceContext.drawImage(img, 0, 0,img.width,img.height);
			             backCtx.drawImage(img, 0, 0,img.width,img.height);
			             if(is_ANDROID){
			             	$('#mask').css('z-index','999');
				            $('#backcanvas').css('z-index','996');
			    			$('#logo').css('z-index','999'); 
			    			$('#face-controller,#engageText').css('z-index','999')
			             }
			            
						//$('#backcanvas').css('transform','translate3d(' + _x + 'px,' + _y + 'px,0) rotate(' + _rotate + 'deg)' )
						//console.log(img.src);
						backcvsTrans(_x,_y,1,_rotate)
			             hammerInit(_x,_y,_rotate);
			           };

			    	}
			    	FR_rotate.readAsBinaryString( fo );

			        $('#faceGuide').removeClass('hide').on('click',function(){
			        	$(this).hide()
			        })
			        setTimeout(function(){
			        	$('#faceGuide').hide()
			        },3000)
			    //}
			}
        	//end of draw face
        	
        	

			//hammer time: resize and reposition canvas by customer
			function hammerInit(posX, posY, rotation) {
			// create backing canvas
			  
			  var savedData = document.getElementById('savedata');
			  
			  setTimeout(function(){
			    savedData.src = backcanvas.toDataURL("image/png");
			    $('#savedata').hide();
			  },500);
			  
			  var hammertime = Hammer(document.getElementById("face-wrapper"), {
			    transform_always_block: true,
			    drag_block_horizontal: true,
			    drag_block_vertical: true,
			    drag_min_distance: 10
			  });
			  var posX=posX, posY=posY,last_posX=posX,last_posY=posY, startX = posX, startY = posY,
			      scale=1, last_scale=1,
			      rotation= rotation, last_rotation=rotation
			      _width = backcanvas.width, _height = backcanvas.height;
			  var touchEd = false;			     
			  
			  
			  hammertime.get('pinch').set({ enable: true });
		      hammertime.get('rotate').set({ enable: true });
			  hammertime.on("tap pan rotate pinch", function(ev) {

			  	
			  	//console.log(ev);
			    switch(ev.type) {
			      case 'tap':
			      	console.log($('#backcanvas'));
			        last_scale = scale;
			        last_rotation = rotation;
			        last_posX = posX;
			        last_posY = posY;
			        //$("#backcanvas").hide();
			        touchEd = true;
			        break;
			      case 'pan':
			      	
			        posX = Math.abs(ev.deltaX) > 10 ? ev.deltaX+last_posX : last_posX;
			        posY = Math.abs(ev.deltaY) > 10 ? ev.deltaY+last_posY : last_posY;
			        //posX = Math.min( 80, Math.max(posX, _width - 30 - ((1-last_scale)*_width/2) ) );
			    	//posY = Math.min(100 + startY, Math.max(posY, -125 + startY) );
			    	//console.log(posX)
			        backcvsTrans(posX,posY,last_scale,last_rotation);
			        break;
			        
			      case 'rotate':
			      	//console.log(posX);
			        rotation = Math.abs(ev.rotation)<120 ? ev.rotation + last_rotation : last_rotation;
			        //console.log(rotation);
			        backcvsTrans(posX,posY,last_scale,rotation);			    
			        break;
			        
			      case 'pinch':
			      	//console.log(ev.rotation);
			      	scale = Math.max(0.6, Math.min(last_scale * ev.scale, 2));
			      	
			      	backcvsTrans(posX,posY,scale,rotation);
			      	break;
			    }
			    

			    hammertime.on('panend pinchend rotateend', function(){
			    	last_scale = scale;
			        last_rotation = rotation;
			        last_posX = posX;
			        last_posY = posY;
			        //$("#backcanvas").hide();
			        touchEd = true;
			    })
			    

			  });

			}
			//end of hammer time
			function backcvsTrans(posX,posY,scale,rotation){			    	
		    	var transform =
			      "translate3d("+posX+"px,"+posY+"px, 0) " +
			      //"scale3d("+scale+","+scale+", 0) " +
			      "scale("+scale+","+scale+") " +
			      "rotate("+rotation+"deg) ";
			    //console.log(transform)
			    $('#backcanvas').css('-webkit-transform',transform).data({
			    	'x':posX,
			    	'y':posY,
			    	'scale':scale,
			    	'rotation':rotation
			    }) 
		    }
 
 var shareImg = '';

			function postThePic(event) {
			   
			  var canvasData = Face.toDataURL("image/png")
			  ,   facetype   = $('#face_type').val();
			  //uid and sex need be update;
			  var postData = '&facetype='+facetype+'&image='+ canvasData,
			  	  url = 'http://115.29.237.61/pr/p2/test/imgGif.php';

			  $.ajax({type:'POST',url:url,data:postData,
			    success:function(json){
			      
			      var jsdata = eval('('+json+')');  
			      console.log(json);
			      //success
			      $('#faceGif1').attr('src',jsdata.gif1);
			      $('#faceGif2').attr('src',jsdata.gif2);
			      shareImg = jsdata.jpg;
			    },
			    error: function(xhr, type){
			      console.log('Ajax error!')
			    }
			  })
			  //drowMout(2);
			  //console.log('postThePic OK!');
			}// end of function postThePic(event)

			//wexin share 
			WeixinApi.ready(function(Api) {
                
                // 微信分享的数据
                var wxData = {
                    "appId": "", // 服务号可以填写appId
                    "imgUrl" : shareImg,
                    "link" : "",
                    "desc" : "我制作了专属的唇萌表情，快来围观么么哒~",
                    "title" : "我的唇萌表情？"
                };


                // 分享的回调
                var wxCallbacks = {
                    // 分享操作开始之前
                    ready : function() {},
                    cancel : function(resp) {},
                    fail : function(resp) {},
                    confirm : function(resp) {},
                    all : function(resp) {
                        location.href=location.href
                    }
                };

                // 用户点开右上角popup菜单后，点击分享给好友，会执行下面这个代码
                Api.shareToFriend(wxData, wxCallbacks);
                // 点击分享到朋友圈，会执行下面这个代码
                Api.shareToTimeline(wxData, wxCallbacks);
                // 点击分享到腾讯微博，会执行下面这个代码
                Api.shareToWeibo(wxData, wxCallbacks);
            });
			//end of wexin share