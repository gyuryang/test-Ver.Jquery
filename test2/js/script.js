
	const only = v => document.querySelector(v);
	const all = v => Array.from(document.querySelectorAll(v));
	let thisbox,	// mouse down한 타겟
		mousedown = true,
		x,
		y,
		thisX,
		thisY,
		mouseup,
		Run=true,
		savenum;
	document.addEventListener("mousedown",e =>{
		if(e.target.tagName != "DIV") return;
		thisbox = e.target.className;

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
				only("."+thisbox).style = `position:absolute; left:${x}px; top:${y}px; z-index:1`;
			if(!mouseup){
				onemove();
			}
		}
	});
	document.addEventListener("mouseup",e =>{
		if(mouseup) return;

		mouseup = true;
		if(thisbox != "")
			only("."+thisbox).style = `position:absolute; left:${thisX}px; top:${thisY}px; transition:0.5s`;
		Run = true;
		onemove();
	});
	function check(){
		let derect = new Array();
		if(thisX-x > 75)
			derect.push("left");
		if(thisX-x < -75)
			derect.push("right")
		if(thisY-y > 25)
			derect.push("top");
		if(thisY-y < -25)
			derect.push("bottom");
		return derect;
	}
	// thisbox가 움직이는거
	function onemove(){
		let arr = new Array();
		arr = check();
		let derect = arr[0];
		// let secondDe = arr[1];
		// 어디에도 속하지 않을  떄 다른 박스들 위치 유지
		if(!derect){
			let boxnum = Number(thisbox.split("x")[1]);
			for(let i=boxnum+1; i<=all("#wrap div").length; i++){
				only(".box"+i).style = `position:absolute; top:${i*50-50}px;`;
			}
		}
		if((derect=="left"&&Run)||(derect=="right"&&Run)){
			Run = mouseup;
			pullUp();
		}else if(derect=="bottom"){
			down(!mouseup);
		}/*else if(derect=="top"&&thisY-y > 25){
			mouseup != true? up() : up(false);
		}*/
	}
	// thisbox아닌 다른 박스들을 위로 땅기는거
	function pullUp(){
		let boxnum = Number(thisbox.split("x")[1]);

		minus = mouseup ? 100 : 50;
		minus2 = !mouseup ? 100 : 50;

		for(let i = boxnum+1; i<=all("#wrap div").length; i++){
			only(".box"+i).style = `position:absolute; top:${i*50-minus}px;`;
		}
		setTimeout(function(){
			for(let i=boxnum+1; i<=all("#wrap div").length; i++){
				only(".box"+i).style = `position:absolute; top:${i*50-minus2}px; transition:0.3s`;
			}
		},100);
	}

	function down(t = true){
		let plusnum = 1;
		if(((y-thisY)/25)>=3){
			plusnum = ((y-thisY)/25)%2 == 0 ? ~~((y-thisY)/25/2) : ~~((y-thisY)/25/2)+1
		}
		let boxnum = Number(thisbox.split("x")[1]);
		let movenum = boxnum+plusnum;
		if(!t){
			savenum = savenum > all("#wrap div").length ? all("#wrap div").length : savenum;
			only(".box"+boxnum).style = `position:absolute; top:${savenum*50-50}px;`;
			only(".box"+boxnum).className = "box"+savenum;
			return;
		}
		if((!Run&&savenum == movenum)||movenum>all("#wrap div").length)
			return;
		Run = mouseup == true ? true : false;
		savenum = movenum;
		only(".box"+movenum).style = `position:absolute; top:${movenum*50-50}px;`;
		setTimeout(function(){
			only(".box"+movenum).style = `position:absolute; top:${movenum*50-100}px; transition:0.3s`;
			only(".box"+movenum).className = "box"+(movenum-1);
		},100)
	}
