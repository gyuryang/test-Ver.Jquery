(()=>{
	const only = v => document.querySelector(v);
	const all = v => Array.from(document.querySelectorAll(v));
	let thisbox,	// mouse down한 타겟
		x,
		y,
		thisX,
		thisY,
		mouseup,
		Run=true,
		savenum,
		selectbox,
		startX,
		startY,
		cliX,
		cliY;
	document.addEventListener("mousedown",e =>{
		move = $("."+thisbox).attr('move');
		if(e.target.tagName != "DIV") return;
		else if(move == '0') return;
		thisbox = e.target.className;
		selectbox = thisbox;

		$("."+thisbox).attr('move','0');

		let startX = e.offsetX;
		let startY = e.offsetY;

		thisX = e.clientX-startX-2;
		thisY = e.clientY-startY-2;

		mouseup = false;

		window.onmousemove = e =>{
			if(mouseup) return;
			x = e.clientX-startX-2;
			y = e.clientY-startY-2;
			// console.log(x+" , "+y)
			if(thisbox != "")
				only("."+thisbox).style = `left:${x}px; top:${y}px; z-index:1`;
			if(!mouseup){
				onmove();
			}
		}
	});
	document.addEventListener("mouseup",e =>{
		if(mouseup) return;

		mouseup = true;
		if(thisbox != ""){
			let boxnum = Number(thisbox.split("x")[1]);
			only("."+thisbox).style = `top:${boxnum*50-50}px; transition:0.1s`;
			setTimeout(function(){
				$("."+thisbox).attr('move','1');
			},100)
		}
		Run = true;
		onmove();
	});
	function check(){
		let derect = new Array();
		if(thisX-x > 75)
			derect.push("left");
		if(thisX-x < -75)
			derect.push("right");
		if(thisY-y > 25)
			derect.push("top");
		if(thisY-y < -25)
			derect.push("bottom");
		return derect;
	}
	// thisbox가 움직이는거
	function onmove(){
		let arr = [];
		arr = check();
		console.log(arr);
		let derect = arr[0];
		let secondDe = arr[1];
		// 어디에도 속하지 않을  떄 다른 박스들 위치 유지
		if((derect=="left"||derect=="right")&&secondDe=="bottom"){
			secondDe = arr[0];
			pullUp();
		}else if((derect=="left"&&Run)||(derect=="right"&&Run)){
			Run = mouseup;
			pullUp();
		}else if(derect=="bottom"){
			down(secondDe);
		}else if(derect=="top"){
			up();
		}
	}
	// thisbox아닌 다른 박스들을 위로 땅기는거
	function pullUp(){
		let boxnum = Number(thisbox.split("x")[1]);
		console.log("pullup");
		minus = mouseup ? 100 : 50;
		minus2 = !mouseup ? 100 : 50;

		for(let i = boxnum+1; i<=all("#wrap div").length; i++){
			only(".box"+i).style = `top:${i*50-minus2}px; transition:0.2s`;
		}
	}

	function down(second,Exist = false){
		// if(second=="right"||second=="left"){
		// 	pullUp();
		// }
		let plusnum = 1;

		if(((y-thisY)/25)>=3){
			plusnum = ((y-thisY)/25)%2 == 0 ? ~~((y-thisY)/25/2) : ~~((y-thisY)/25/2)+1;
		}
		// let direct = second == "left"? (thisX-x)/75 : (x-thisX)/75;

		let boxnum = Number(thisbox.split("x")[1]);
		let movenum = Number(selectbox.split("x")[1])+plusnum;

		if(mouseup){
			savenum = savenum > all("#wrap div").length ? all("#wrap div").length : savenum;
			return;
		}
		if((!Run&&savenum == movenum)||movenum>all("#wrap div").length)
			return;

		savenum = movenum;
		only(".box"+movenum).style = ` top:${movenum*50-100}px; transition:0.2s`;
		only(".box"+movenum).className = "box"+(movenum-1);
		thisbox = "box"+movenum;
		all(".box"+boxnum)[0].className = "box"+movenum;

		Run = mouseup;

		// if(Exist){
		// 	for(let i = boxnum+1; i<=all("#wrap div").length; i++){
		// 		only(".box"+i).style = ` top:${i*50-50}px; transition:0.2s`;
		// 	}
		// 	only(".box"+boxnum).style = ` top:${i*50-50}px; transition:0.2s`;
		// 	thisbox = "box"+movenum;
		// 	all(".box"+boxnum)[0].className = "box"+movenum;
		// }
		
	}


	function up(){
		let minusnum = 1;

		if(((thisY-y)/25)>=3){
			minusnum = ((thisY-y)/25)%2 == 0 ? ~~((thisY-y)/25/2) : ~~((thisY-y)/25/2)+1;
		}

		let boxnum = Number(thisbox.split("x")[1]);
		let movenum = Number(selectbox.split("x")[1])-minusnum;
		console.log(minusnum+" , movenum = "+movenum+" , boxnum = "+boxnum);

		if(mouseup) return;
		if((!Run&&savenum == movenum)) return;

		savenum = movenum;
		only(".box"+movenum).style = ` top:${movenum*50}px; transition:0.2s`;
		only(".box"+movenum).className = "box"+(movenum+1);
		all(".box"+boxnum)[1].className = "box"+movenum;
		thisbox = "box"+movenum;

		Run = mouseup;
	}

})();