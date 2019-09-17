(()=>{
	let count = 0;

	$(document)
	.on("keydown",".input input",function(e){
		if(e.keyCode != 13) return;
		let inputval = $(this).val().trim();
		if(inputval == "") return;
		$(".list").append(`<li><label class="checkbox"></label><div></div><label class="del">x</label></li>`);
		$(".list li").last().find("div").text(inputval);
		$(".footer").css({"display" : "block"});
		$(this).val("");
		$(".count span").text(++count);
		$(".allcheck").text("√");
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
			$(".allcheck").text("");
			$(".allcheck").css({"color" : "lightgray"});
			$(".footer").css({"display" : "none"});
		}
		$(this).css({"display" : "none"});
	})
	.on("click",".allcheck",function(e){
		let check = e.target.style.color=='black'? true : false;
		e.target.style.color = check? 'lightgray' : 'black';
		check? $(".complete").removeClass("complete") : $(".list li").addClass("complete");
		check? $(".checkbox").text("") : $(".checkbox").text("√");
		check? $(".count span").text($(".list li").length.toString()) : $(".count span").text('0');
		check? $(".clear_btn").css({"display" : "none"}) : $(".clear_btn").css({"display" : "block"});
		console.log($(".selected").attr('class'));
	})

})();