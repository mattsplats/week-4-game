// Game object
let game = {
	// Button enablers
	attackButtonEnabled: false,
	pickCharEnabled: false,
	pickDefenderEnabled: false,

	// Sound effect settings
	currentSfx: false,
	sfxOn: true,
	
	// Character vars
	characterArray: [],
	currentAttackPower: 0,
	defender: {},
	enemiesDefeated: 0,
	player: {},
	
	// General methods
	initialize: function(data) {
		// Store sheets data in local array
		this.characterArray = data.slice();

		// Update character names and stats, convert all attack values to int
		for (let i = 0; i < data.length; i++) {
			$("#name_" + i).html(data[i].name);
			$("#hp_" + i).html(data[i].HP);
			this.characterArray[i].attack = parseInt(this.characterArray[i].attack);
		}
		this.pickCharEnabled = true;
	}
};

$(function() {
	// Load music on start
	// $("#music").trigger("load");
	// $("#music").prop("volume", 0.05);
	// $("#music").trigger("play");

	// Character buttons
	$(".char-box").on("click", function(event){
		if (game.pickCharEnabled) {
			
			// Store player stats (uses jQuery .extend to copy by value)
			let playerRef = game.characterArray[$(this).attr("value")];
			game.player = $.extend(true, {}, playerRef);
			game.currentAttackPower = game.player.attack;

			// Move all characters to enemies div, change background and border colors
			$(".char-box").appendTo($("#enemies"));
			$(".char-box").css({"background-color": "red", "border-color": "white"});

			// Move this character to player div, change background and border colors
			$(this).appendTo($("#player"));
			$(this).css({"background-color": "white", "border-color": "green"});

			// Enable picking the enemy to fight
			game.pickDefenderEnabled = true;

			// Disable picking again
			game.pickCharEnabled = false;

		} else if (game.pickDefenderEnabled) {
			
			// Store this enemy (defender) stats (uses jQuery .extend to copy by value)
			let defenderRef = game.characterArray[$(this).attr("value")];
			game.defender = $.extend(true, {}, defenderRef);

			// Move this character to defender div, change background and text colors, remove existing battle text
			$(this).prependTo($("#defender"));
			$(this).css("background-color", "black");
			$("div", this).css("color", "white");
			$("#battle_text").html("");

			// Enable attacking
			game.attackButtonEnabled = true;

			// Disable picking again
			game.pickDefenderEnabled = false;
		}
	});

	// Attack button
	$("#attack").on("click", function(event){
		if (game.attackButtonEnabled) {
			let playerAttack

			// Reduce defender HP by currentAttackPower, update defender visible HP
			game.defender.HP -= game.currentAttackPower;
			$("#hp_" + game.defender.index).html(game.defender.HP);
			
			// If defender dead: hide defender, show appropriate text, increment enemiesDefeated 
			if (game.defender.HP <= 0) {
				$("#char_" + game.defender.index).css("visibility", "hidden");
				$("#battle_text").html("You have defeated " + game.defender.name + ", you can choose to fight another enemy.");
				game.enemiesDefeated++;
				
				// If all enemies defeated: show appropriate text, show restart button
				if (game.enemiesDefeated > 2) {
					$("#battle_text").html("You Won!! GAME OVER!!");
					$("#restart").css("visibility", "visible");
				} else { // Else: disable attacking, enable picking new defender
					game.attackButtonEnabled = false;
					game.pickDefenderEnabled = true;
				}
			} else {

				// Reduce player HP by defender.counter, update player visible HP
				game.player.HP -= game.defender.counter;
				if (game.player.HP <= 0) { game.player.HP = 0; }
				$("#hp_" + game.player.index).html(game.player.HP);

				// If player dead: show appropriate text, show restart button, disable attacking
				if (game.player.HP <= 0) {
					$("#battle_text").html("You have been defeated ... GAME OVER!");
					$("#restart").css("visibility", "visible");
					game.attackButtonEnabled = false;
				} // Else: Display both damage values
				else {
					$("#battle_text").html("You attacked " + game.defender.name + " for " + game.currentAttackPower + " damage.");
					$("#battle_text").append("<br/>" + game.defender.name + " attacked you back for " + game.defender.counter + " damage.");
				}
			}

			// Add base attack power to currentAttackPower
			game.currentAttackPower += game.player.attack;
			
		} else if (!game.attackButtonEnabled && game.pickDefenderEnabled){
			$("#battle_text").html("Nothing to attack.");
		}
	});

	// Restart button
	$("#restart").on("click", function(event){
		$("#restart").css("visibility", "hidden");
		$(".char-box").appendTo($("#choose_char"));
		$(".char-box").css({"background-color": "white",
			"border-color": "green",
			"visibility": "visible"});
		$(".char-text").css("color", "black");
		for (let i = 0; i < game.characterArray.length; i++) {
			$("#hp_" + i).html(game.characterArray[i].HP);
		}
		$("#battle_text").html("");
		game.attackButtonEnabled = false;
		game.pickCharEnabled = true;
		game.pickDefenderEnabled = false;
	});

    // Music toggle button
	$("#musicToggle").on("click", function(event){
		// Play if paused, pause if playing
		if ($("#music").prop("paused")) {
			$("#music").trigger("play");
			$("#musicPlaying").html("Playing");
		} else {
			$("#music").trigger("pause");
			$("#musicPlaying").html("Paused");
		}
	});

	// Sfx toggle button
	$("#sfxToggle").on("click", function(event){

		// Toggle sound effects on/off
		if (game.sfxOn) {
			game.sfxOn = false;
			$("#sfxOn").html = "Off";
		} else {
			game.sfxOn = true;
			$("#sfxOn").html = "On";
		}
	});
});

