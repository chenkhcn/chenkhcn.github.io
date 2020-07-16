window.addEventListener('load', function() {
	// 图片懒加载
	// 获取图片列表，即img标签列表
		var imgs = document.querySelectorAll('img');
	
		// 获取到浏览器顶部的距离
		function getTop(e){
			return e.offsetTop;
		}
	
		// 懒加载实现
		function lazyload(imgs){
			// 可视区域高度
			var h = window.innerHeight;
			//滚动区域高度
			var s = document.documentElement.scrollTop || document.body.scrollTop;
			for(var i=0;i<imgs.length;i++){
				//图片距离顶部的距离大于可视区域和滚动区域之和时懒加载
				if ((h+s)>getTop(imgs[i])) {
					// 真实情况是页面开始有2秒空白，所以使用setTimeout定时2s
					(function(i){
						setTimeout(function(){
							// 不加立即执行函数i会等于9
							// 隐形加载图片或其他资源，
							//创建一个临时图片，这个图片在内存中不会到页面上去。实现隐形加载
							var temp = new Image();
							temp.src = imgs[i].getAttribute('data-src');//只会请求一次
							// onload判断图片加载完毕，真是图片加载完毕，再赋值给dom节点
							temp.onload = function(){
								// 获取自定义属性data-src，用真图片替换假图片
								imgs[i].src = imgs[i].getAttribute('data-src')
							}
						},2000)
					})(i)
				}
			}
		}
		lazyload(imgs);
	
		// 滚屏函数
		window.onscroll =function(){
			lazyload(imgs);
		}
	
	// 图片懒加载end
	
	
    // 主轮播图
    var swiper = new Swiper('.swiper1', {
        // direction：Slides的滑动方向，可设置水平(horizontal)或垂直(vertical)。
        direction: 'vertical',
        // slidesPerView：设置slider容器能够同时显示的slides数量(carousel模式)。
        slidesPerView: 1,
        // spaceBetween：slide之间的距离（单位px）。
        spaceBetween: 0,
        // mousewheel：设置为true时，能使用鼠标滚轮控制slide滑动。
        mousewheel: true,
        noSwiping: true,
        // pagination: 分页器容器的css选择器或HTML标签
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        on: {
            slideChangeTransitionEnd: function() {
                if (swiper.realIndex == 1) {
                    var about_content = document.querySelector('.about-content');
                    about_content.className = 'about-content appear-active';
                } else if (swiper.realIndex == 2) {
                    var fontEnd = document.querySelector('.fontEnd');
                    fontEnd.className = 'fontEnd appear-active';
                } else if (swiper.realIndex == 3) {
                    var wechat = document.querySelector('.wechat');
                    wechat.className = 'wechat appear-active';
                } else if (swiper.realIndex == 4) {
                    var callMe = document.querySelector('.callMe');
                    callMe.className = 'callMe appear-active';
                }
            }
        }
    });
    var items = document.querySelectorAll('.items');
    items[2].addEventListener('click', function() {
        swiper.slideTo(3, 1000, true);
    });
    var hello_h1 = document.querySelector('.hello-h1');
    var hello_h2 = document.querySelector('.hello-h3');
    //var button = document.querySelector('.button');
    // hello回到原位
    var timer_1 = setTimeout(function() {
        animate(hello_h1, 0);
    }, 1000);
    var timer_2 = setTimeout(function() {
        animate(hello_h2, -0);
    }, 1700);
    // var timer_3 = setTimeout(function() {
    //     animate(button, 0);
    // }, 2100);


    //返回顶部
    var returnTop = document.querySelector('.returnTop');
    document.addEventListener('mousemove', function() {
        if (swiper.realIndex == 0) {
            returnTop.style.display = 'none';
        } else {
            returnTop.style.display = 'block';
        }
    });
    // 回去
    returnTop.addEventListener('click', function() {
        swiper.slideTo(0, 1000, false);
    })




    //music时间
    var musicImg = document.querySelector('.musicImg');
    var audio = document.querySelector('audio');
    //设置背景音乐音量0.0-1.0
    audio.volume = 0.3;
    musicImg.addEventListener('click', function() {
        //判断音乐是否暂停，是的话播放，否的话暂停，
        if (audio.paused) {
            audio.play();
            musicImg.className = 'musicImg imgMove';
        } else {
            audio.pause();
            musicImg.className = 'musicImg';
        }
    })

    // 导航图标事件
    var icon = document.querySelector('.icon');
    var talkbubble = document.querySelector('.talkbubble');
    icon.addEventListener('mouseover', function() {
        talkbubble.style.display = 'block';
    });
    icon.addEventListener('mouseout', function() {
        talkbubble.style.display = '';
    });

    var navigetor = document.querySelector('.navigetor');
    var navigetor_black = document.querySelector('.navigetor-black');
    var nav_flag = 0;
    // 获取ul事件
    var navigetor_ul = document.querySelector('.navigetor-ul');

    icon.addEventListener('click', function() {
        for (var i = 0; i < navigetor_ul.children.length; i++) {
            if (i == swiper.realIndex) {
                navigetor_ul.children[i].className = 'navigetor-li';
            } else {
                navigetor_ul.children[i].className = '';
            }

        }

        if (nav_flag == 0) {
            icon.children[0].src = 'images/close.png';
            //navigetor.style.display = 'block';
            navigetor_black.style.display = 'block';
            // 动画
            animate(navigetor, 0);
            // 动画end
            nav_flag = 1;
        } else {
            icon.children[0].src = 'images/nav.png';
            //navigetor.style.display = 'none';
            navigetor_black.style.display = 'none';
            animate(navigetor, 2000);
            nav_flag = 0;
        }

    });
    // 导航li事件
    for (var i = 0; i < navigetor_ul.children.length; i++) {
        navigetor_ul.children[i].addEventListener('click', function() {
            // 获得li的自定义属性
            var index = this.getAttribute('data-index');
            // 清除li删除线
            for (var i = 0; i < navigetor_ul.children.length; i++) {
                navigetor_ul.children[i].className = '';
            }
            // 给点击的li加删除线
            this.className = 'navigetor-li';
            swiper.slideTo(index, 1000, true);
            // 清除菜单栏
            icon.children[0].src = 'images/nav.png';
            animate(navigetor, 2000);
            navigetor_black.style.display = 'none';
            nav_flag = 0;
        });

    }
})