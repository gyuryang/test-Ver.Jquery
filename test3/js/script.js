(()=>{
	let count = 0;

	$(document)
	.on("keydown",".input input",function(e){
		if(e.keyCode != 13) return;
		let inputval = $(this).val().trim();
		if(inputval == "") return;
		$(".list").append(`<li><label class="checkbox"></label><div></div><label class="del">x</label></li>`);
		$(".list li").last().find("div").text(inputval);
		$(".footer").css("display" , "block");
		$(this).val("");
		$(".count span").text(++count);
		$(".allcheck").text("√").css("color","lightgray");
		btn_check(false);
		// if(only(".selected").classList[0]=='comple_btn') comple_btn();
		// liData.push(`<li><label class="checkbox"></label><p>${inputval}</p><label class="del">x</label></li>`);
		// setData();
	})
	.on("keydown","li input",function(){
		if(e.keyCode != 13) return;
		console.log($(this).find("p"));
	})
	.on("click",".del",function(){
		if($(this).parent().attr('class') != 'complete') 
			$(".count span").text(--count);
		$(this).parent().remove();
	})
	.on("click",".clear_btn",function(){
		$(".complete").remove();
		if($(".list li").length == 0){
			$(".allcheck").text("").css("color" , "lightgray");
			$(".footer").css("display" , "none");
		}
		$(this).css("display" , "none");
	})
	.on("click",".allcheck",function(e){
		let check = e.target.style.color=='black'? true : false;
		e.target.style.color = check? 'lightgray' : 'black';
		check? $(".complete").removeClass("complete") : $(".list li").addClass("complete");
		check? $(".checkbox").text("") : $(".checkbox").text("√");
		check? $(".count span").text($(".list li").length.toString()) : $(".count span").text('0');
		check? $(".clear_btn").css("display" , "none") : $(".clear_btn").css("display" , "block");
		btn_check();
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
	})
	.on("click",".btns li",function(){
		btn_check(true,$(this).attr('class').split(" ")[0]);
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

})();
