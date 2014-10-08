	_WXShare('http://10.158.204.160:8080/mobilePic/pages/images/face01-4.gif', '100', '100', '我的唇萌表情？', '我制作了专属的唇萌表情，快来围观么么哒~', '10.158.204.160:8080/mobilePic/pages/lip.html');
	
	var is_IOS = false, is_ANDROID = false;
	var text = {'face1':{'text1':'原来这就是传说中的 <span class="font-big">“白素”唇！</span><br/>泛白黯淡，谁想要这么又白又素！','text2':'整日涂唇腾不开手，<br/>打不开伞遇不见爱。','text3':'做回官人的娘子，<br/>这酸爽让人不敢相信！'},
				'face2':{'text1':'原来这就是传说中的 <span class="font-big">“翘皮”唇！</span><br/>让我看起来一点都不俏皮！','text2':'涂了又干，干了又涂，<br/>根本就停不下来','text3':'就是如此美丽不羁，<br/>性感得停不下来。'},
				'face3':{'text1':'原来这就是传说中的 <span class="font-big">“贫壤”唇！</span><br/>干燥缺水多裂纹，未免太贫了点儿！','text2':'管不好嘴迈不开腿，<br/>康庄大道找不着北。','text3':'天天歌顿顿舞，<br/>这才是我要的幸福。'}
				};
	if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
	　　is_IOS = true;
		}
		if (navigator.userAgent.match(/Android/i)) {
		　　is_ANDROID = true;
		}		

			var initFacelist = true;
			var MAX_HEIGHT = $(document).height(), MAX_WIDTH=screen.width;
			
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
        		/* -- max height-- 
        		$('.mainbody, #imgfixed,.page').height(MAX_HEIGHT);
        		//$('.facegif').css('margin-top', (MAX_HEIGHT - 300*MAX_HEIGHT/504)/2 + 'px');
        		//$('#swipetoproduct').css('bottom', MAX_HEIGHT * 220/504 - MAX_HEIGHT + 'px')
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
        		*/
        		/* -----scaled -----*/
        		$('.mainbody, #imgfixed, .page').height(MAX_HEIGHT);
        		$('#swipetoproduct').css('bottom', MAX_HEIGHT * 220/504 - MAX_HEIGHT + 'px');
        		$('.facegif').css('margin-top', (MAX_HEIGHT - 300*MAX_HEIGHT/504)/2 + 'px');
        		//if(640/MAX_WIDTH > 1008/MAX_HEIGHT){ 
        		if(MAX_HEIGHT > 504){ 
        			//$('.mainbody, .page, #imgfixed').width(MAX_WIDTH)
        			//var imgH = Math.floor(MAX_WIDTH*504/320)
        			//$('.body').width(MAX_WIDTH)
        		}else{
        			
        			var _imgScale = MAX_HEIGHT/504;
        			if(_imgScale < 1){
        				$('.body,#chosenFaceWrapper').css('-webkit-transform','scale('+_imgScale+','+_imgScale+')')
    				}else{
    					var imgWidth = Math.floor(MAX_HEIGHT*640/1008);
	        			//$('.mainbody').css('padding-left', (MAX_WIDTH - imgWidth)/2+'px');
	        			$('.body').width(imgWidth)
	        			/*
	        			$('.absimgs,.guidelayer').height(MAX_HEIGHT).width(imgWidth).css('left', (MAX_WIDTH - imgWidth)/2+'px');
	        			$('#face-controller,#face-wrapper,#swipeguide,#logo,#btnbox-final').width(imgWidth);
	        			$('#face-controller,#face-wrapper,#swipeguide,#btnbox-final').css('left', (MAX_WIDTH - imgWidth)/2+'px');
	        			*/
    				}
        		}
        		
        		//end of page init

        		$('#topNav a').on('click', function(e){
        			
        			$('#popup-content, #popup-bg, '+ $(this).attr('href')).removeClass('hide');
        		})
        		$('#popup-bg, #popup-content').on('click', function(){
        			$('#popup-content,#popup-bg, .topnav-popups').addClass('hide')
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

        		$('.btn_reload').on('click', function(){
        			backCtx.clearRect(0,0,999,999);
        			$('backcanvas').removeClass('style');
        			$('#btn_retake').text($('#btn_retake').data('orignaltext'))
        			$('#savedata').attr('src','images/transparent.png').show();
        			$('.product-imgs').show().removeClass('hide').removeAttr('style')
        			$('#btnbox-final, #engageNext, #finalImgs, #chosenface,#finalTextDownload,#productText,#faceGif2,#face-text').addClass('hide');
        			$('#homeBtn').trigger('click');
        			$('#face-controller').css('height','auto');
        			$('#btn_choose').addClass('unable')
        			$('#face-wrapper, #face-controller, #btnbox,#changeface,#essence,#faceGif1').removeClass("hide")
        			$('#swipetoproduct').css('bottom', MAX_HEIGHT * 280/504 - MAX_HEIGHT + 'px');
        			$('.facegif').attr('src','images/loading.gif');

        			backCanvas.width = Face.width = MAX_WIDTH;
					backCanvas.height = Face.height = MAX_HEIGHT;
					$('#takePicture').val('')
        			
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
        		$('#landingpage').on('click', function(){
        			$('#landingpage').css('-webkit-transform', 'translate3d(0,' + MAX_HEIGHT + 'px,0)');
    				$('#homepage').css('-webkit-transform', 'translate3d(0,-' + MAX_HEIGHT + 'px,0)');

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

        			var hammerProduct = Hammer(document.getElementById('swipeguide')),
        				_firstPan = true;
        				console.log(_firstPan);
		        		hammerProduct.get('pan').set({ direction: Hammer.DIRECTION_VERTICAL });
		        		hammerProduct.on('panend', function(ev){
		        			//console.log(ev);
		        			if(ev.direction == 8 && _firstPan){
		        				//$('.page').addClass('hide')
		        				$('.facegif,#swipeguide,#face-text').addClass('hide');
		        				$('#essence').css({'top':0});
		        				$('#productText').fadeIn(1300).delay(2000).fadeOut(500);
		        				setTimeout(function(){		        					
		        					$('.mainbody').removeClass('bg2');
		        				},300)		
		        				$('#swipeguide').fadeOut(100);        				
		        				$('#swipetoproduct').fadeIn(50).css({'bottom':0}).delay(3000).fadeOut(500,function(){
		        					$('#faceGif2, #finalImgs, #btnbox-final,#finalTextDownload').removeClass('hide');		        					
		        					$('#essence,#face-text').addClass('hide').removeAttr('style');
		        					$('#swipeguide').removeAttr('style')
		        				});
		        				_firstPan = false;
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
					//$('#mask').css('bottom','-97px');

					//upload img
					var _transData = $backcanvas.data(), 
						_width = backcanvas.width, _height = backcanvas.height,
						_MASKscale = $('#mask').width()/320,
						_faceW = 290*_MASKscale, _faceH = 247*_MASKscale;
					FaceContext.clearRect(0,0,999,999);

					//FaceContext.rect(17*_MASKscaleX,$('#mask').offset().top + 65*_MASKscaleY,_faceW,_faceH);
					//FaceContext.stroke();
					//FaceContext.clip();

					FaceContext.translate(_width/2 + _transData.x, _height/2 + _transData.y);
					FaceContext.scale( _transData.scale , _transData.scale );
					FaceContext.rotate( _transData.rotation * Math.PI/180);
					FaceContext.translate(-_width/2, -_height/2 );
	
					FaceContext.drawImage(savedata,0,0,_width,_height);

					var imgData=FaceContext.getImageData(17*_MASKscale,65*_MASKscale,_faceW,_faceH);
						FaceContext.clearRect(0,0,999,999);
						Face.width = _faceW;
						Face.height = _faceH;
						FaceContext.putImageData(imgData,0,0);

					setTimeout(function(){
						savedata.width = _faceW;
						savedata.height = _faceH;
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
						//$('#face-text').html(text['face'+_n].text2);
						$('#engageText').attr('src','images/004-0'+_n+'.png');
						$('#face-text').attr('src','images/005-0'+_n+'.png');
						$('#finalText').attr('src','images/007-0'+_n+'.png');
						//console.log(text['face'+_n].text2)
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
			    if($('#takePicture').val() != ''){	
			    	$('#btn_choose').removeClass('unable');
			    	$('#btn_retake').text($('#btn_retake').data('replacetext'));			    	

					var fo = this.files[0];
			        //adjust rotate
			    	var FR_rotate = new FileReader();
			    	FR_rotate.onload = function(e){
			    		var exif = EXIF.readFromBinaryFile(new BinaryFile(this.result));
			    		var _x =0, _y = 0, _rotate = 0,_scale = 1;
			    		var _width = backCanvas.width, _height = backCanvas.height;
			    		//console.log(exif);

					    // MegaPixImage constructor accepts File/Blob object.
					    var mpImg = new MegaPixImage(fo);
					    
					    backCtx.clearRect(0,0,999,999);
					    FaceContext.clearRect(0,0,999,999);
					    
					    var picX = exif.PixelXDimension;
					    var picY = exif.PixelYDimension;
					        if (picX>picY){
					            mpImg.render(backCanvas, { 'maxWidth': _width, 'maxHeight': _height, 'orientation': 6 });
					        }else{
					            mpImg.render(backCanvas, { 'maxWidth': _width, 'maxHeight': _height, 'orientation': 0 });
					        }
					    
			           	 //adjust if image is too big

			             if(is_ANDROID){
			             	$('#mask').css('z-index','999');
				            $('#backcanvas').css('z-index','996');
			    			$('#logo').css('z-index','1000'); 
			    			$('#face-controller,#engageText').css('z-index','999')
			             }
			            
			            hammerInit(_x,_y,_rotate);

			    	}
			    	FR_rotate.readAsBinaryString( fo );

			        $('#faceGuide').removeClass('hide').on('click',function(){
			        	$(this).hide()
			        })
			        setTimeout(function(){
			        	$('#faceGuide').hide()
			        },3000)
			    }
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
			      rotation= rotation, last_rotation=rotation,
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
			   
			  //var canvasData = Face.toDataURL("image/png")
			  var canvasData = savedata.src
			  ,   facetype   = $('#face_type').val();
        
        var canvasDataPost = canvasData;
        canvasDataPost=canvasDataPost.replace(/\&/g,"%26");
        canvasDataPost=canvasDataPost.replace(/\+/g,"%2B");


			  //uid and sex need be update;
			  var postData = '&tmpl='+facetype+'&image='+ canvasDataPost,
			  	  url = 'http://115.29.237.61/pr/p2/test/imgGif.php';

			  $.ajax({type:'POST',url:url,data:postData,
			    success:function(json){
			      
			      var jsdata = eval('('+json+')');  
			      console.log(json);
			      //success
			      $('#faceGif1').attr('src',jsdata.gif2);
			      $('#faceGif2').attr('src',jsdata.gif1);
			      $('#face-text').removeClass('hide');
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