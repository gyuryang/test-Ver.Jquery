(()=>{
	let thisbox,
	thisX,
	thisY,
	selectbox,
	mouseup,
	Run = true,
	savenum,
	startnum,
	direc,
	arr,
	list,
	x,
	y;
	$(document).on("mousedown","#wrap div",function(e){
		thisbox = $(this).attr('class');
		selectbox = thisbox;
		startnum = Number(thisbox.split("x")[1]);

		list = [];
		let divlist = Array.from(document.querySelectorAll("#wrap div"));
		for(let i=0; i<divlist.length; i++){
			list.push(divlist[i].className);
		}
		console.log(list);
		let startX = e.offsetX;
		let startY = e.offsetY;

		thisX = e.clientX - startX - 2;
		thisY = e.clientY -	startY - 2;

		mouseup = false;

		$(window).mousemove(function(e){
			if(mouseup) return;

			x = e.clientX - startX - 2;
			y = e.clientY - startY - 2;

			$("."+thisbox).css({"left" : x+"px","top" : y+"px","z-index" : "1","transition" : "0s"});

			if(!mouseup)
				onmove();
		})	

		$(document).mouseup(function(e){
			if(mouseup) return;

			mouseup = true;

			let boxnum = Number(thisbox.split("x")[1]);
			pullUp("mouse",arr);
			$("."+thisbox).css({"left" : "592px", "top" : boxnum*50-50+"px","transition" : "0.1s","z-index" : "0"}); // position을 계속 지정하면 left 지정 필요 X
			Run = true;
			onmove();
		})
	})

	function check(){ // 현재 위치가 어디 방향인지를 체크함
		let direct = new Array();
		if(thisX - x > 75)
			direct.push("left");
		if(thisX - x < -75)
			direct.push("right");
		if(thisY - y > 25)
			direct.push("top");
		if(thisY - y < -25)
			direct.push("bottom");
		return direct;
	}

	function onmove(){ // 방향을 확인하고 어떤 함수를 호출 할 지 정함
		arr = [];
		arr = check();

		direc = arr[0];
		let secondDe = arr[1];

		if(secondDe == "bottom" || secondDe == "top"){
			pullUp();
		}else if((direc == "left"&&Run)||(direc=="right"&&Run)){
			Run = mouseup;
			pullUp();
		}else if(direc == "bottom"){
			bottomMove();
		}else if(direc == "top"){
			topMove();
		}
	}

	function pullUp(check = "",array = ""){ // thisbox가 아닌 박스들을 위나 아래로 댕기는거
		if(array.length != 0){
			list.map((v,idx)=>{
				$("#wrap div").eq(idx).attr("class",list[idx]);
			})
			$(".box"+startnum).animate({"left" : "592px","top" : startnum*50-50+"px"},100);
		}
		let boxnum = Number(thisbox.split("x")[1]);

		for(let i = boxnum+1; i<=$("#wrap div").length; i++){
			if(array.length != 0 && i == startnum)
				continue;
			if(check != "")
				$(".box"+i).animate({"top" : i*50-50+"px"},100);
			else 
				$(".box"+i).css({"top" : i*50-100+"px", "transition" : "0.1s"});
		}
	}

	function bottomMove(){
		console.log(direc);
		let plusnum = 1;
		if(~~((y-thisY)/25)>=3){
			plusnum = ~~((y-thisY)/25)%2 == 0 ? ~~((y-thisY)/25/2) : ~~((y-thisY)/25/2)+1;
		}
		console.log(plusnum);
		let boxnum = Number(thisbox.split("x")[1]);
		let movenum = boxnum+plusnum;

		if(mouseup){
			savenum = savenum > $("#wrap div").length? $("#wrap div").length : savenum;
			return;
		}
		if((!Run&&savenum == movenum) || movenum > $("#wrap div").length)
			return;

		savenum = movenum;

		for(let i=movenum+1; i<=$("#wrap div").length; i++){
			$(".box"+i).css({"top" : i*50-50+"px","transition" : "0.1s"})
		}

		if(plusnum == 1){
			$(".box"+movenum).css({"top" : movenum*50-100+"px","transition" : "0.1s"})
			$(".box"+movenum).attr('class',"cbox");

			thisbox = "box"+movenum;

			$(".box"+boxnum).attr('class',"box"+movenum);
			$(".cbox").attr("class","box"+(movenum-plusnum));
		}else{ // 한번에 많이 이동할경우
			$(".box"+boxnum).attr('class','cbox');

			for(let i=movenum+1; i<=$("#wrap div").length; i++){
				$(".box"+i).css({"top" : i*50-50+"px","transition" : "0.1s"});
			}
			for(let i=boxnum; i<=movenum; i++)
				$(".box"+i).attr('class','box'+(i-1));

			thisbox = "box"+movenum;
			$(".cbox").attr('class',"box"+movenum);
		}

		boxnum = Number(thisbox.split("x")[1]);
		thisY = boxnum*50-50; // 위치를 갱신함

		Run = mouseup;
	}

	function topMove(){
		let plusnum = 1;
		if(~~((thisY-y)/25)>=3){
			plusnum = ~~((thisY-y)/25)%2 == 0 ? ~~((thisY-y)/25/2) : ~~((thisY-y)/25/2)+1;
		}
		let boxnum = Number(thisbox.split("x")[1]);
		let movenum = boxnum-plusnum;
		console.log(plusnum);
		if(mouseup){
			savenum = savenum < 1? 1 : savenum;
			return;
		}
		if((!Run&&savenum == movenum) || movenum < 1)
			return;

		savenum = movenum;
		
		for(let i=boxnum+1; i<=$("#wrap div").length; i++){
			$(".box"+i).css({"top" : i*50-50+"px","transition" : "0.1s"})
		}

		if(plusnum == 1){
			$(".box"+movenum).css({"top" : movenum*50+"px","transition" : "0.1s"})
			$(".box"+movenum).attr('class',"cbox");

			thisbox = "box"+movenum;

			$(".box"+boxnum).attr('class',"box"+movenum);
			$(".cbox").attr("class","box"+(movenum+plusnum));
		}else{ // 한번에 많이 이동할경우
			$(".box"+boxnum).attr('class','cbox');

			for(let i=movenum; i<=$("#wrap div").length; i++){
				let minus = i>=boxnum? 50 : 0;
				$(".box"+i).css({"top" : i*50-minus+"px","transition" : "0.1s"});
			}	
			for(let i=boxnum; i>=movenum; i--)
				$(".box"+i).attr('class','box'+(i+1));

			thisbox = "box"+movenum;
			$(".cbox").attr('class',"box"+movenum);
		}

		boxnum = Number(thisbox.split("x")[1]);
		thisY = boxnum*50-50;

		Run = mouseup;
	}
})();