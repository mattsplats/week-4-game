# RPG Game

### UT Coding Bootcamp Week 4 Homework - RPG Game

Main game pseudocode:
* Show list of players to choose
 * Initial positions, images, stats etc in html

* When player char is selected (onclick):
 * Move other chars (enemies) to enemies section
 * Change enemy backgrounds to red

* When defender is selected (onclick):
 * Move to defender section
 * Change defender background to black
 * Enable attack button
 * Disable defender select onclick

* When attack is pressed:
 * Reduce enemy HP by current attack power
 * Add base attack power to current attack power
 * If enemy HP <= 0:
 * > Remove defender from screen
 * > Game text: "choose another defender"
 * > Disable attack button (game text: "nothing to attack")
 * > Enable defender select onclick
 * Else:
 * > Reduce player HP by enemy counter attack power
 * > If player HP <= 0:
 * > > Game text: "Game over!"
 * > > Show restart button
 * > > (BREAK)
 * > Game text: both damage values

* On restart:
 * Reset all characters to initial positions
 * Reset all character HP and current attack power to starting values
 * Disable attack button
 * Hide restart button
