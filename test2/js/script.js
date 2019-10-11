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
	y,
	m=0,
	distance = [];


	//이동하는게 이상함 교체하는 부분

	distance.push(0);
	for(let i=0; i<=$("#wrap section").length; i++){ // 시작 위치 맞추고 위치 저장
		m = m == 0? 8 : m+$(".box"+i).height()+16;
		distance.push(m);
		$(".box"+(i+1)).css('top',m);
	}
	distance.map(v=>{
		console.log(v);
	})

	$(document).on("mousedown","#wrap section",function(e){
		thisbox = $(this).attr('class');
		selectbox = thisbox;
		startnum = Number(thisbox.split("x")[1]);

		list = [];
		let divlist = Array.from(document.querySelectorAll("#wrap section"));
		for(let i=0; i<divlist.length; i++){
			list.push(divlist[i].className);
		}
		// console.log(list);
		let startX = e.offsetX;
		let startY = e.offsetY;
		console.log(startX + " , " + startY);
		console.log(e.clientX + " , " + e.clientY);

		thisX = e.clientX - startX - 2;
		console.log(thisX);
		thisY = e.clientY -	startY - 2;
		// console.log(thisX);
		mouseup = false;
		document.querySelector("#wrap").style.position = "";
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
			$("."+thisbox).css({left : thisX+"px" , "top" : distance[boxnum]+"px","transition" : "0.1s","z-index" : "0"}); // position을 계속 지정하면 left 지정 필요 X
			// document.querySelector("."+thisbox).style.left = "";
			Run = true;
			onmove();
		})
	})

	function check(){ // 현재 위치가 어디 방향인지를 체크함
		let boxnum = Number(thisbox.split("x")[1]);
		let btmhei = ($(".box"+(boxnum+1)).height() + 8)/2;
		let tophei = ($(".box"+(boxnum-1)).height() + 8)/2;
		let direct = new Array();
		if(thisX - x > 125)
			direct.push("left");
		if(thisX - x < -125)
			direct.push("right");
		if(thisY - y > tophei)
			direct.push("top");
		if(thisY - y < -btmhei)
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
			$(".box"+startnum).animate({left : thisX+"px","top" : distance[startnum]+"px"},100);
		}
		let boxnum = Number(thisbox.split("x")[1]);

		for(let i = boxnum+1; i<=$("#wrap div").length; i++){
			if(array.length != 0 && i == startnum)
				continue;
			if(check != "")
				$(".box"+i).animate({"top" : distance[i]+"px"},100);
			else 
				$(".box"+i).css({"top" : distance[i]+"px", "transition" : "0.1s"});
		}
	}

	function bottomMove(){
		let heiarr = [];
		for(let i=1; i<=$("#wrap section").length; i++){
			heiarr.push(($(".box"+i).height()+8));
		}
		let plusnum = 0;
		let boxnum = Number(thisbox.split("x")[1]);
		let moveleng = y-thisY;
		let idx = boxnum;
		while(moveleng>0){
			moveleng -= (heiarr[idx]/2); 
			plusnum++;
			if(moveleng<=0) return;
			moveleng -= (heiarr[idx]/2);
			plusnum++;
			idx++;
		}
		if(plusnum>=3){
			plusnum = plusnum%2 == 0 ? plusnum/2 : ~~(plusnum/2)+1;
		}
		// console.log(plusnum);
		let movenum = boxnum+plusnum;

		if(mouseup){
			savenum = savenum > $("#wrap div").length? $("#wrap div").length : savenum;
			return;
		}
		if((!Run&&savenum == movenum) || movenum > $("#wrap div").length)
			return;

		savenum = movenum;

		for(let i=movenum+1; i<=$("#wrap div").length; i++){
			$(".box"+i).css({"top" : distance[i]+"px","transition" : "0.1s"})
		}

		if(plusnum == 1){
			$(".box"+movenum).css({"top" : distance[movenum]+"px","transition" : "0.1s"})
			$(".box"+movenum).attr('class',"cbox");

			thisbox = "box"+movenum;

			$(".box"+boxnum).attr('class',"box"+movenum);
			$(".cbox").attr("class","box"+boxnum);
		}else{ // 한번에 많이 이동할경우
			$(".box"+boxnum).attr('class','cbox');

			for(let i=movenum+1; i<=$("#wrap div").length; i++){
				$(".box"+i).css({"top" : distance[i]+"px","transition" : "0.1s"});
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
		let heiarr = [];
		for(let i=1; i<$("#wrap section").length; i++){
			heiarr.push(($(".box"+i).height()+8));
		}
		let plusnum = 0;
		let moveleng = thisY-y;
		let boxnum = Number(thisbox.split("x")[1]);
		let idx = boxnum;
		while(moveleng>0){
			moveleng -= (heiarr[idx]/2);
			plusnum++;
			if(moveleng<=0) return;
			moveleng -= (heiarr[idx]/2);
			plusnum++;
			idx--;
		}
		if(plusnum>=3){
			plusnum = plusnum%2 == 0 ? plusnum/2 : ~~(plusnum/2)+1;
		}
		
		let movenum = boxnum-plusnum;
		// console.log(plusnum);
		if(mouseup){
			savenum = savenum < 1? 1 : savenum;
			return;
		}
		if((!Run&&savenum == movenum) || movenum < 1)
			return;

		savenum = movenum;
		
		for(let i=boxnum+1; i<=$("#wrap div").length; i++){
			$(".box"+i).css({"top" : distance[i]+"px","transition" : "0.1s"})
		}

		if(plusnum == 1){
			$(".box"+movenum).css({"top" : distance[movenum]+"px","transition" : "0.1s"})
			$(".box"+movenum).attr('class',"cbox");

			thisbox = "box"+movenum;

			$(".box"+boxnum).attr('class',"box"+movenum);
			$(".cbox").attr("class","box"+(movenum+plusnum));
		}else{ // 한번에 많이 이동할경우
			$(".box"+boxnum).attr('class','cbox');

			for(let i=movenum; i<=$("#wrap div").length; i++){
				let minus = i>=boxnum? 50 : 0;
				$(".box"+i).css({"top" : distance[i]+"px","transition" : "0.1s"});
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