var game = {
	// Sound effect settings
	currentSfx: false,
	sfxOn: true,
	
	// Players
	staticPlayers: [],

	// General methods
	initialize: function(data) {
		staticPlayers = data;
	}
};

// Run when document is ready
$(function() {
	// Initialize game

    // Music toggle button
	$("#musicToggle").on("click", function(event){
		let music = $("#music");

		// Play if paused, pause if playing
		if (music.paused) {
			music.play();
			$("#musicPlaying").html = "Playing";
		} else {
			music.pause();
			$("#musicPlaying").html = "Paused";
		}
	}

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
	}
});

