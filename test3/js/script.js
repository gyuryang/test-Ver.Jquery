(()=>{
	let liData = localStorage.getItem("liData")==null? [] : JSON.parse(localStorage.getItem("liData"));

	liData.map(v=>{
		let check = v.class == "complete"? "√" : "";
		$(".list").append(`<li class="${v.class}"><label class="checkbox">${check}</label><div>${v.text}</div><label class="del">x</label></li>`);
		$(".footer").css("display","block");
		if($(".complete").length) 
			$(".clear_btn").css("display","block");
		$(".allcheck").text("√");
	})
	let count = $(".list li").length - $(".complete").length;
	$("span").text(count);	
	if($(".list li").length&&$(".list li").length==$(".complete").length)
		$(".allcheck").css("color","black");	

	$(document)
	.on("click",function(e){
		if($(".change").length)
			changeText();
		createText();
		
	})
	.on("keydown",".input input",function(e){
		if(e.keyCode != 13) return;
		createText();
	})
	.on("click",".del",function(){
		if($(".input input").val().trim() != "") return;
		liData.splice($(this).parent().index(),1);
		if($(this).parent().attr('class') != 'complete') 
			$(".count span").text(--count);
		$(this).parent().remove();
		setData();
	})
	.on("click",".clear_btn",function(){
		$(".complete").remove();
		if($(".list li").length == 0){
			$(".allcheck").text("").css("color" , "lightgray");
			$(".footer").css("display" , "none");
		}
		$(this).css("display" , "none");
		for(let i=0; i<liData.length; i++){
			if(liData[i].class == "complete") {
				liData.splice(i,1);
				i=-1;
			}
		}
		setData();
	})
	.on("click",".allcheck",function(e){
		let check = e.target.style.color=='black'? true : false;
		e.target.style.color = check? 'lightgray' : 'black';
		check? $(".complete").removeClass("complete") : $(".list li").addClass("complete");
		check? $(".checkbox").text("") : $(".checkbox").text("√");
		count = check? $(".list li").length : 0
		$(".count span").text(count);
		check? $(".clear_btn").css("display" , "none") : $(".clear_btn").css("display" , "block");
		btn_check();
		liData.map(v=>{
			v.class = v.class == ""? "complete" : "";
		})
		setData();
	})
	.on("click",".checkbox",function(){
		let check = $(this).text()==""? false : true;
		check? $(this).text("") : $(this).text("√");
		check? $(this).parent().removeClass("complete") : $(this).parent().addClass("complete");
		check? count++ : count--;
		$(".count span").text(count);
		$(".list li").length == Number($(".count span").text())? $(".clear_btn").css("display" , "none") : $(".clear_btn").css("display" , "block");
		count == 0? $(".allcheck").css("color","black") : $(".allcheck").css("color","lightgray");
		btn_check();
		console.log($(this).parent().index());
		liData[$(this).parent().index()].class = liData[$(this).parent().index()].class == ""? "complete" : "";
		setData();
	})
	.on("click",".btns li",function(){
		btn_check(true,$(this).attr('class').split(" ")[0]);
	})
	.on("dblclick",".list li",function(){
		$(this).children().css("display","none");
		$(this).css("padding","0 16px 16px 60px");
		$(this).append(`<input type="text" value="" class="change">`);
		$(this).find("input").focus();
		$(this).find('input').val($(this).find("div").text());
	})
	.on("keydown",".change",function(e){
		if(e.keyCode != 13) return;
		changeText();
	})

	function btn_check(t=true,btn=""){
		let btn_name = btn==""? $(".selected").attr('class').split(" ")[0] : btn;
		if(t){
			$(".selected").removeClass("selected");
			$("."+btn_name).addClass("selected");
		}
		btn_name=="comple_btn"? $(".list li").css("display" , "none") : $(".list li").css("display" , "block");
		btn_name=="active_btn"? $(".complete").css("display" , "none") : $(".complete").css("display" , "block");
	}

	function changeText(){
		$(".list li").children().css("display","block");
		$(".del").css("display","none");
		$(".list li").css("padding","16px 16px 16px 60px");
		$(".change").parent().find("div").text($(".change").val());
		liData[$(".change").parent().index()].text = $(".change").val();
		if($(".change").val().trim()==""){
			$(".change").parent().attr('class') == "complete"? $("span").text(count) : $("span").text(--count);
			liData.splice($(".change").parent().index(),1);
			$(".change").parent().remove();
		}
		$(".change").remove();
		setData();
	}

	function setData(){
		localStorage.setItem("liData",JSON.stringify(liData));
	}

	function createText(){
		let inputval = $(".input input").val().trim();
		if(inputval == "") return;
		$(".list").append(`<li><label class="checkbox"></label><div></div><label class="del">x</label></li>`);
		$(".list li").last().find("div").text(inputval);
		$(".footer").css("display" , "block");
		$(".input input").val("");
		$(".count span").text(++count);
		$(".allcheck").text("√").css("color","lightgray");
		btn_check(false);
		liData.push({"text" : inputval, "class" : ""});
		console.log(liData);
		setData();
	}
})();