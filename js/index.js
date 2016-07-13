$(function(){
	audio = $('audio').get(0);
///点击播放按钮	
	// $('.play_bt').on('click',function(){
	// 	$(this).toggleClass('play_bt').toggleClass('pause_bt');
	// 	if($(this).hasClass('pause_bt')){
	// 		currentSong=0;
	// 		audio.src =database[0].filename;
	// 		onsongchange();
	// 		audio.play();
	// 	}else{
	// 		audio.pause();
	// 	}
	// })
	$('.play_bt').on('click',function(){
		if(audio.src.length===22){
			currentSong=0;
			audio.src = database[0].filename;
		}

		if(audio.paused){
			onsongchange();
		}else{
			audio.pause();
		}
	})
	$(audio).on('play',function(){
		$('.play_bt').removeClass('play_bt').addClass('pause_bt');
		var width_current = (audio.currentTime/audio.duration).toFixed(2)*100+'%';
		console.log(width_current);
		$('.play_current_bar').css({width: width_current +'%'});
		
	///点击小喇叭
		$('.volume_icon').on('click',function(){
			$(this).toggleClass('.volume_icon').toggleClass('volume_mute');
			//静音
			if($('.volume_icon').hasClass('volume_mute')){
				audio.volume=0;
			}else{
				var bian = $('.volume_op').position().left/$('.volume_regulate').width();
				audio.volume = bian;
			}
		})
	//点击音量条
		$('.volume_regulate').on('click',function(e){
			var volumeStrong = e.offsetX/$(this).width();
			audio.volume = volumeStrong;
			$('.volume_op').css('left',volumeStrong*100+'%');
			$('.volume_bar').css('width',volumeStrong*100+'%');
		})
	})
	$(audio).on('pause',function(){
		$('.pause_bt').removeClass('pause_bt').addClass('play_bt');

	})
	$(audio).on('timeupdate',function(){
		var width_current = (audio.currentTime/audio.duration).toFixed(2)*100;
		$('.play_current_bar').css({width: width_current +'%'});
		$('.progress_op').css({left: width_current +'%'});
	})

	//获取歌曲并添加到列表中
	var database = [];
	var makelist = function (){
		$('.play_list ul').empty();
		$.each(database,function(k,v){
			$('<li><strong class="music_name" title="'+v.title+'">'+v.title+'</strong><strong class="singer_name" title="'+v.artist+'">'+v.artist+'</strong><strong class="play_time">'+v.duration+'</strong></li>').appendTo('.play_list ul');
			//做删除用的数据<div class="list_cp"><strong class="btn_like" title="喜欢" name=""><span>我喜欢</span></strong><strong class="btn_share" title="分享"><span>分享</span></strong><strong class="btn_fav" title="收藏到歌单"><span>收藏</span></strong><strong class="btn_del" title="从列表中删除"><span>删除</span></strong></div>
		})
		$('.open_list span').text(database.length);//修改那个提示的歌曲数量
		
	}
	$.getJSON('./database.json')
	.done(function(data){
		database = data;
		makelist();
	})
////////////////////////////////////////////////////////////////////////////////


// 换歌
	var currentSong = null;
	var onsongchange = function () {
		audio.play();
		$('.play_list ul li').removeClass('play_current');
		$('.play_list ul li:eq('+currentSong+')').addClass('play_current');
		$('#music_name').text(database[currentSong].title);
		$('#singer_name').text(database[currentSong].artist);
		$('#play_date').text(database[currentSong].duration);
		$('.play_bt').toggleClass('pause_bt');
	}
/// 点击列表里面的歌曲	
	$('.play_list').on('click','li',function(){
		currentSong = $(this).index();
		audio.src=database[currentSong].filename;
		onsongchange();
	})
	$('.play_list').on('onmouseenter mouseleave','li',function(){
		$(this).toggleClass('play_hover');
	})

/// 点击上一首下一首	
	$('.next_bt').on('click',function(){
		currentSong += 1;
		if(currentSong === database.index){
			audio.play();
		}
		audio.src = database[currentSong].filename;
		onsongchange();
	})
	$('.prev_bt').on('click',function(){
		currentSong -= 1;
		if(currentSong ===database.index){
			audio.play();
		}
		audio.src = database[currentSong].filename;
		onsongchange();
	})
/// 控制播放进度
	$('.player_bar').on('click',function(){
		
	})
/// 点击收起播放列表
	$('.close_list').on('click',function(){
		$('.play_list_frame').css({opacity:'0'});
	})
/// 点击收起播放器
	$('#player_right').on('click',function(){
		if($('.player').position().left===0){
			$('.player').css({left:'-541px'});
		}else{
			$('.player').css({left:'0'});
		}
	})
/// 点击显示播放列表
	$('.open_list').on('click',function(){
		$('.play_list_frame').toggle('slow');
		// if($('.play_list_frame').css('opacity')!=0){
		// 	$('.play_list_frame').css({opacity:'0',display:'none'});
		// 	console.log($('.play_list_frame').css('opacity'))
		// }else if($('.play_list_frame').css('opacity')==0){
		// 	$('.play_list_frame').css({opacity:'1',display:'block'});
		// }
	})	

})