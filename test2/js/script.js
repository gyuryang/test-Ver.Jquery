(()=>{
	let thisbox,
	thisX,
	thisY,
	selectbox,
	mouseup,
	Run = true;
	$("#wrap>div").mousedown(function(e){
		console.log($(this).attr('class'));
		thisbox = $(this).attr('class');
		selectbox = thisbox;
		
		let startX = e.offsetX;
		let startY = e.offsetY;

		thisX = e.clientX - startX - 2;
		thisY = e.clientY -	startY - 2;

		mouseup = false;

		$(window).mousemove(function(e){
			if(mouseup) return;

			x = e.clientX - startX - 2;
			y = e.clientY - startY - 2;

			$("."+thisbox).css({"left" : x+"px","top" : y+"px","z-index" : "1"});

			if(!mouseup)
				onmove();
		})	

		$(document).mouseup(function(e){
			// if(mouseup) return;

			mouseup = true;

			let boxnum = Number(thisbox.split("x")[1]);
			$("."+thisbox).animate({"top" : boxnum*50-50+"px"},100);
			// Run = true;
			onmove();
		})

	})

	function check(){ // 현재 위치가 어디 방향인지를 체크함
		let direct = new Array();
		if(thisX - x > 75)
			direct.push("left");
		if(thisX-x < -75)
			direct.push("right");
		if(thisY-y > 25)
			direct.push("top");
		if(thisY-y < -25)
			direct.push("bottom");
		return direct;
	}

	function onmove(){ // 방향을 확인하고 어떤 함수를 호출 할 지 정함
		let arr = [];
		arr = check();

		console.log(arr);

		let direct = arr[0];
		let secondDe = arr[1];

		if((direct == "left"&&Run)||(direct=="right"&&Run)){
			Run = mouseup;
			upOrDown();
		}
	}

	function upOrDown(check = ""){ // thisbox가 아닌 박스들을 위나 아래로 댕기는거
		let boxnum = Number(thisbox.split("x")[1]);
		let minus = mouseup ? 50 : 100;

		if(check == "up"){
			for(let i = boxnum-1; i>0; i--){
				$(".box"+i).animate({"top" : i*50-minus+"px"},100);
			}
		}else{
			for(let i = boxnum+1; i<=$("#wrap div").length; i++){
				$(".box"+i).animate({"top" : i*50-minus+"px"},100);
			}
		}
	}
})();