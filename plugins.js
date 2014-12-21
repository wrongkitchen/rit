$(document).ready(function(){
	var directoy = [];	
	$("#sortableList").find(".level1").each(function(){
		var level_1 = $(this).children("a").html();
		var level_1_href = $(this).children("a").attr("href");
		var level_2 = [];
		$(this).find(".level2.page-item1 a").each(function(){
			level_2.push({ name: $(this).html(), href: $(this).attr("href") });
		});
		directoy.push({ 
			mainHref: level_1_href, 
			mainName : level_1, 
			sub : level_2 
		});
	});
	var mobileNav = $("<div class=\"mobileNav\"></div>");
	var dropdownMenu = $("<div class=\"dropBownMenu\"></div>");
	var level_1_menu = $("<div class=\"level_1_menu\"></div>");
	var level_2_menu = $("<div class=\"level_2_menu\"><a class=\"backBtn\" href=\"javascript:void(0)\">BACK</a></div>");

	$.each(directoy, function(pIndex, pVal){
		var ahref = null;
		if(pVal.sub.length > 0){
			var subMenuName = "subMenu_" + pIndex;
			var subMenuInstance = $("<div class='subMenu "+subMenuName+"'></div>");
			ahref = $('<a class="hasSubLevel" data-menu="'+ subMenuName +'" href="javascript:void(0)">'+ pVal.mainName +'</a>')
			$.each(pVal.sub, function(pSubIndex, pSubMenu){
				subMenuInstance.append("<a href=\""+ pSubMenu.href +"\">"+ pSubMenu.name +"</a>");
			});
			level_2_menu.append(subMenuInstance);
		} else {
			ahref = $('<a href="'+ pVal.mainHref +'">'+ pVal.mainName +'</a>')
		}

		level_1_menu.append(ahref);
	});

	dropdownMenu.append(level_1_menu);
	dropdownMenu.append(level_2_menu);
	mobileNav.append("<div class=\"menuBtn\"></div>");
	mobileNav.append("<div class=\"searchBtn\"></div>");
	mobileNav.append(dropdownMenu);

	$(".pageContainer").prepend(mobileNav);


	var backToLevel_1 = function(){
		$(".mobileNav .level_1_menu").show();
		$(".mobileNav .level_2_menu").hide();
	};
	$(".mobileNav .level_2_menu .backBtn").on("click", function(){
		backToLevel_1();
	});
	$(".mobileNav .level_1_menu .hasSubLevel").on("click", function(){
		var subMenuName = $(this).data("menu");
		$(".mobileNav .level_1_menu").hide();
		$(".mobileNav .level_2_menu .subMenu").hide();
		$(".mobileNav .level_2_menu").show();
		$(".mobileNav .level_2_menu ." + subMenuName).show();
	});
	$(".mobileNav .searchBtn").on("click", function(){
		if($(".pageContainer").hasClass("search")){
			$(".pageContainer").removeClass("search");
		} else {
			$(".pageContainer").addClass("search");
		}
	});
	$(".mobileNav .menuBtn").on("click", function(){
		backToLevel_1();
		$(".mobileNav .dropBownMenu").slideToggle();
	});
	var closeBtn = $("<div class=\"closeBtn\"></div>");
		closeBtn.on("click", function(){
			$(".pageContainer").removeClass("search");
		});
	$("#searchContainer").append(closeBtn);
});