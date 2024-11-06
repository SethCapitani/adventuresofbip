const playerAttack1 = 30; //damage done by player
const playerAttack2 = 10;
const playerHeal = 60; //The value to add back onto the player's health
const bossAttack = 20; //Boss default move
const bossAttack2 = 30;
const bossAttack3 = 80;
let turn = 0;
let luck = 0;

let healcounter = 5;
let luckcounter = 2;
let pregamedialog = 8; // When this reaches 0, their is no more pregame dialog to be show
let pretutorialdialog = 7; // When this reaches 0, their is no more pretutorial dialog to be show
let tutorialdialog = 3; // When this reaches 0, their is no more tutorial dialog to be show
let prebattledialog = 8; // When this reaches 0, their is no more prebattle dialog to be show

let tutorialCompletedText = true;
let butterflyTurn = 0;
let toadBossBattle = false;
let butterflyBossBattle = false;
let tutorialend = false;

let endgametext = false;
let finish = false;

console.log("Hi :)")

document.addEventListener("DOMContentLoaded", function() {
  const sound = document.getElementById("sound");
  const sound2 = document.getElementById("sound2");
  const loadingSound = document.getElementById("loadingSound");  // The audio element
  
  // Function to synchronize checkboxes
  function syncCheckboxes() {
    // Initially sync the checkboxes' state
    if (sound.checked !== sound2.checked) {
      sound2.checked = sound.checked;  // Mirror the state of music2 to music
    }
  }
  
  // Function to handle music muting logic
  function soundmute() {
    if (sound.checked || sound2.checked) {
      loadingSound.muted = false;
    } else {
      loadingSound.muted = true;
      loadingSound.pause();
    }
  }
  
  function syncCheckboxes(sourceCheckbox) {
    if (sourceCheckbox === sound) {
      sound2.checked = sound.checked; // Sync music2 with music
    } else {
      sound.checked = sound2.checked; // Sync music with music2
    }
  }
  
  // Event listeners for both checkboxes
  sound.addEventListener("change", function () {
    syncCheckboxes(sound); // Sync the second checkbox with the first
    soundmute(); // Adjust the music state
  });

  sound2.addEventListener("change", function () {
    syncCheckboxes(sound2); // Sync the first checkbox with the second
    soundmute(); // Adjust the music state
  });
});

document.addEventListener("DOMContentLoaded", function() {
  // Cache the checkbox elements
  const music = document.getElementById("music");
  const music2 = document.getElementById("music2");
  const gamemusic = document.getElementById("gamemusic");  // The audio element for game music
  const toadmusic = document.getElementById("toadmusic");  // The audio element for toad music

  let toadmusicplay = false;  // This will be dynamically changed based on game logic

  // Function to handle music muting/unmuting logic
  function musicmute() {
    // If either checkbox is checked, we will play the appropriate music
    if (music.checked || music2.checked) {
      if (toadmusicplay === true) {
        // Switch to toadmusic if the game is in that state
        gamemusic.pause();  // Stop game music
        gamemusic.muted = true;
        
        toadmusic.muted = false;
        toadmusic.volume = 0.2;
        toadmusic.play();
      } else {
        // Switch to game music if not playing toadmusic
        toadmusic.pause();  // Stop toad music
        toadmusic.muted = true;
        
        gamemusic.muted = false;
        gamemusic.volume = 0.2;
        gamemusic.play();
      }
    } else {
      // Mute both audios when neither checkbox is checked
      toadmusic.muted = true;
      toadmusic.pause();
      gamemusic.muted = true;
      gamemusic.pause();
    }
  }

  // Function to synchronize checkboxes
  function syncCheckboxes2(sourceCheckbox) {
    if (sourceCheckbox === music) {
      music2.checked = music.checked; // Sync music2 with music
    } else {
      music.checked = music2.checked; // Sync music with music2
    }
  }

  // Event listeners for both checkboxes
  music.addEventListener("change", function () {
    syncCheckboxes2(music); // Sync the second checkbox with the first
    musicmute(); // Adjust the music state
  });

  music2.addEventListener("change", function () {
    syncCheckboxes2(music2); // Sync the first checkbox with the second
    musicmute(); // Adjust the music state
  });

  // Function to change the state of `toadmusicplay`
  // When the game logic triggers this, it will switch the music
  function setToadMusicPlay(state) {
    toadmusicplay = state;
    musicmute();  // Call musicmute to switch music automatically
  }

  // Initial call to ensure music state is set based on checkbox states when the page loads
  musicmute();
  
  window.musicchangeon = function() {
    setToadMusicPlay(true);
  }
  
  window.musicchangeoff = function() {
    setToadMusicPlay(false);
  }
});

function startgame() {
  const play = document.getElementById("play");
  const title = document.getElementById("title");
  const button = document.getElementById("changeStyle");
  title.style.display = "none";
  document.getElementById("game").style.display = "flex";  // Show game content
  document.getElementById("div1").style.display = "none";  // Hide battlePage
  document.getElementById("div4").style.display = "inline-block";  // Show textpage
  document.getElementById("setting").style.display = "inline-block";  // Show settings
  pregametext()
}

document.addEventListener("DOMContentLoaded", function() {
  const play = document.getElementById("play");
  const title = document.getElementById("title");
  const button = document.getElementById("changeStyle");
  button.addEventListener("click", function() {
    title.classList.add("title-zoom-out");
    title.addEventListener("transitionend", function handleTransitionEnd(event) {
      if (event.propertyName === "transform" && title.classList.contains("title-zoom-out")) {
        play.classList.toggle("hidden");
        title.classList.add("title-zoom-in");
        title.removeEventListener("transitionend", handleTransitionEnd);
        setTimeout(startgame, 2000);
      }
    });
  });
});

function pregame1() {
  pregamedialog--;
	var paragraph = 'One day after school, you hear of a forest of monster and mushrooms.';
	fadeInWords(paragraph, 100);
}

function pregame2() {
  pregamedialog--;
	var paragraph = 'After a long trial of walking you find yourself at the foot of the giant woods';
	fadeInWords(paragraph, 100);
}

function pregame3() {
  pregamedialog--;
	var paragraph = 'Plants and mushrooms swarming out of its dense foliage.';
	fadeInWords(paragraph, 100);
}

function pregame4() {
  pregamedialog--;
	var paragraph = ' You stand there staring at the looming city of trees.';
	fadeInWords(paragraph, 100);
}

function pregame5() {
  pregamedialog--;
	var paragraph = 'What creatures could be inside? What battles might you face? ';
	fadeInWords(paragraph, 100);
}

function pregame6() {
  pregamedialog--;
	var paragraph = 'The next steps are unknow and yet... ';
	fadeInWords(paragraph, 100);
}

function pregame7() {
  pregamedialog--;
	var paragraph = 'You walk in.';
	fadeInWords(paragraph, 100);
}

function charactermove() {
  document.getElementById("game").style.display = "none";  // Show battlePage
  let id = null;
  const elem = document.getElementById("childsprite");
  let pos = -200;
  clearInterval(id);
  id = setInterval(frame, 4); // speed it moves, more is slower
  function frame() {
    if (pos == 400) {
      clearInterval(id);
      document.getElementById("tutorial-start").style.display = "inline-block";  // Show battlePage
    } else {
      pos++; 
      elem.style.left = pos + "px";
    }
  }
}

function toadmove() {
  document.getElementById("div4").style.display = "none";  // Hide text Page
	document.getElementById("div1").style.display = "flex";  // Show battlePage
  let id = null;
  const elem = document.getElementById("toadsprite");
  let pos = -1800;
  clearInterval(id);
  id = setInterval(frame, 2); // speed it moves, more is slower
  function frame() {
    if (pos == -900) {
      clearInterval(id);
    } else {
      pos++; 
      elem.style.right = pos + "px";
    }
  }
}

function pretutorial1() {
  pretutorialdialog--;
  document.getElementById("game").style.display = "flex";  // Show battlePage
  document.getElementById("div1").style.display = "none";  // Hide battlePage
  document.getElementById("div4").style.display = "inline-block";  // Show textpage
  document.getElementById('tutorial-start').style.display = 'none';
	var paragraph = 'After you walk into the branches of marron and ebony you spot a fallen tree.';
	fadeInWords(paragraph, 100);
}

function pretutorial2() {
  pretutorialdialog--;
	var paragraph = '-You run up to it and break off a branch- ';
	fadeInWords(paragraph, 100);
}

function pretutorial3() {
  pretutorialdialog--;
	var paragraph = 'Welding the mighty item in your hand you feel its overwhelming power flowing through you ';
	fadeInWords(paragraph, 100);
}

function pretutorial4() {
  pretutorialdialog--;
	var paragraph = 'You desperately tear your head away to catch your breath ';
	fadeInWords(paragraph, 100);
}

function pretutorial5() {
  pretutorialdialog--;
	var paragraph = 'And when you look back you see a strong and mighty wooden sword ';
	fadeInWords(paragraph, 100);
}

function pretutorial6() {
  pretutorialdialog--;
	var paragraph = 'You raise it up to the sky the light glistening on its umber, polished body ';
	fadeInWords(paragraph, 100);
}

function tutorial1() {
  tutorialdialog--;
	var paragraph = 'You have diven your mighty weapon into your first victim ';
	fadeInWords(paragraph, 100);
}

function tutorial2() {
  tutorialdialog--;
	var paragraph = 'The woods become denser after your encounter ';
	fadeInWords(paragraph, 100);
}

function prebattle1() {
  prebattledialog--;
	var paragraph = 'The leaves bristle in the wind ';
	fadeInWords(paragraph, 100);
}

function prebattle2() {
  prebattledialog--;
	var paragraph = 'birds chirps disappear into the foliage ';
	fadeInWords(paragraph, 100);
}

function prebattle3() {
  prebattledialog--;
	var paragraph = 'The mushrooms around you get bigger and bigger ';
	fadeInWords(paragraph, 100);
}

function prebattle4() {
  prebattledialog--;
	var paragraph = 'and the frogs crocking intensify...';
	fadeInWords(paragraph, 100);
}

function prebattle5() {
  prebattledialog--;
	var paragraph = 'as you enter a large clearing';
	fadeInWords(paragraph, 100);
}

function prebattle6() {
  prebattledialog--;
	var paragraph = 'in front of you is...';
	fadeInWords(paragraph, 100);
}

function prebattle7() {
  prebattledialog--;
  var paragraph = 'A HUMUNGOSE TOAD COVERED IN MUSHROOMS!!!\n-------------------------------------------\nLETS KILL IT!!!';
  fadeInWords(paragraph, 100);
}

function pregametext() {
  if (pregamedialog == 8) {
    pregame1()
  } else if (pregamedialog == 7) {
    pregame2()
  } else if (pregamedialog == 6) {
    pregame3()
  } else if (pregamedialog == 5) {
    pregame4()
  } else if (pregamedialog == 4) {
    pregame5()
  } else if (pregamedialog == 3) {
    pregame6()
  } else if (pregamedialog == 2) {
    pregame7()
  } else if (pregamedialog == 1) {
    pregamedialog--;
    charactermove();
  }
};

function pretutorialtext() {
  if (pretutorialdialog == 7) {
    pretutorial1()
  } else if (pretutorialdialog == 6) {
    pretutorial2()
  } else if (pretutorialdialog == 5) {
    pretutorial3()
  } else if (pretutorialdialog == 4) {
    pretutorial4()
  } else if (pretutorialdialog == 3) {
    pretutorial5()
  } else if (pretutorialdialog == 2) {
    pretutorial6()
  } else if (pretutorialdialog == 1) {
    pretutorialdialog--;
    move1();
  }
};

function tutorialtext() {
  tutorialend = true;
  console.log(tutorialdialog)
  if (tutorialdialog == 3) {
    tutorial1()
  } else if (tutorialdialog == 2) {
    tutorial2()
  } else if (tutorialdialog == 1) {
    tutorialdialog--;
    prebattle1();
  }
};

function prebattletext() {
  console.log(prebattledialog)
  if (prebattledialog == 8) {
    prebattle1()
  } else if (prebattledialog == 7) {
    prebattle2()
  } else if (prebattledialog == 6) {
    prebattle3()
  } else if (prebattledialog == 5) {
    prebattle4()
  } else if (prebattledialog == 4) {
    prebattle5()
  } else if (prebattledialog == 3) {
    prebattle6()
  } else if (prebattledialog == 2) {
    prebattle7()
  } else if (prebattledialog == 1) {
    prebattledialog--;
    musicchangeon();
    toadmove();
  }
};

function endgame() {
  var paragraph = `Thank you for playing Adventures of Bip: Trials of the Mushroom\n-------------------------------------------\nHope you enjoyed!`;
	fadeInWords(paragraph, 100); // Fades in each word every 100ms
  endgametext = false;
  finish = true;
}

function attacktext() {
	console.log(document.getElementById("bhp"))
	if (document.getElementById("php").innerHTML != 0 && toadBossBattle == true) {
		if (document.getElementById("bhp").innerHTML != 0 && toadBossBattle == true) {
			if (turn == 1) {
				toadBattle()
			} else {
				document.getElementById("div4").style.display = "none";  // Hide text Page
				document.getElementById("div1").style.display = "flex";  // Show battlePage
			}
		} else {
      document.getElementById("explosion").classList.replace('explosion', 'explosion2');
      document.getElementById("explosion").style.display = "inline-block";
      setTimeout(() => {
        document.getElementById("explosion").style.display = "none"; // Hide the image
        document.getElementById("toadsprite").style.display = "none";
      }, 3100); // 3100 milliseconds
			var paragraph = `You have defeated Dominus Tweedle!\nCongratulations\n-------------------------------------------\nBip Wins!!!!!`;
			fadeInWords(paragraph, 100); // Fades in each word every 100ms
      musicchangeoff();
      endgametext = true;
		}
	} else if (toadBossBattle == true) {
    document.getElementById("explosion").classList.replace('explosion', 'explosion3');
    document.getElementById("explosion").style.display = "inline-block";
    setTimeout(() => {
      document.getElementById("explosion").style.display = "none"; // Hide the image
      document.getElementById("childsprite").style.display = "none";
    }, 3100); // 3100 milliseconds
		var paragraph = `Oh No... You have run out of HP!\nTry again next time\n-------------------------------------------\nDominus Tweedle Wins!!!!!`;
		fadeInWords(paragraph, 100); // Fades in each word every 100ms
    musicchangeoff();
    endgametext = true;
	}
	
	if (document.getElementById("bhp").innerHTML != 0 && butterflyBossBattle == true) {
		document.getElementById("div4").style.display = "none";
		document.getElementById("div1").style.display = "flex";
	} else if(document.getElementById("bhp").innerHTML == 0 && butterflyBossBattle == true) {
		document.getElementById("explosion").style.display = "inline-block"
      setTimeout(() => {
        console.log("hidden")
        document.getElementById("explosion").style.display = "none"; // Hide the image
        document.getElementById("pitifulButterfly").style.display = "none"
      }, 3100); // 3100 milliseconds
		var paragraph = `You have defeared the pitiful butterfly!\nCongratulations\n-------------------------------------------\nNow for the real battle...`;
		fadeInWords(paragraph, 100); // Fades in each word every 200ms
		butterflyBossBattle = false;
		toadBossBattle = true
		setUpBattle()
	}
}

function openInventory() {
	if (tutorialCompletedText == false) {
		document.getElementById("div1").style.display = "none";  // Hide battlePage
		document.getElementById("div2").style.display = "inline-block";  // Show inventory
	} else {
		console.log("Nuh uh uh");
	};
};

function openAttacks() {
	if (tutorialCompletedText == false) {
		document.getElementById("div1").style.display = "none";  // Hide battlePage
		document.getElementById("div3").style.display = "inline-block";  // Show attacks
	} else {
		console.log("Nuh uh uh");
	};
};

function back() {
	if (tutorialCompletedText == false) {
		document.getElementById("div3").style.display = "none";  // Hide attacks
		document.getElementById("div2").style.display = "none"; // Hide inventory
		document.getElementById("div1").style.display = "flex";  // Show battlePage
	} else {
		console.log("Nuh uh uh");
	};
};

  

// ATTACKS
document.addEventListener("DOMContentLoaded", function() {
  // When the 'sword' button is hovered over
  document.getElementById("sword").onmouseover = function() {
    document.getElementById("basic").innerHTML = "<ins><em>Sword Slash</em></ins><br><br>A <b>mighty</b> sword pulled from a tree on your arrival in the woods.<br><br>Very good at hitting things with.";
  };

  // When the 'sword' button is not hovered
  document.getElementById("sword").onmouseout = function() {
    document.getElementById("basic").innerHTML = "Hover over attack to view description";
  };
  // When the 'rock' button is hovered over
  document.getElementById("rock").onmouseover = function() {
    document.getElementById("basic").innerHTML = "<ins><em>Rock Throw</em></ins><br><br>A <b>magnificent</b> array of rocks found lining the floor.<br><br>If you throw a few you might be able to do some damage.";
  };

  // When the 'rock' button is not hovered
  document.getElementById("rock").onmouseout = function() {
    document.getElementById("basic").innerHTML = "Hover over attack to view description";
  };
});

//INVENTORY
document.addEventListener("DOMContentLoaded", function() {
  // When the 'heal' button is hovered over
  document.getElementById("heal").onmouseover = function() {
	if (healcounter == 5) {
		document.getElementById("basic2").innerHTML = "<ins><em>Mom's Sandwich ( X 5 )</em></ins><br><br>A <b>delicacy</b> among many adventurers given to you by your mum before school.<br><br>Can <b>heal</b> your acing bones if needs be.";
	} else if (healcounter == 4) {
		document.getElementById("basic2").innerHTML = "<ins><em>Mom's Sandwich ( X 4 )</em></ins><br><br>A <b>delicacy</b> among many adventurers given to you by your mum before school.<br><br>Can <b>heal</b> your acing bones if needs be.";
	} else if (healcounter == 3) {
		document.getElementById("basic2").innerHTML = "<ins><em>Mom's Sandwich ( X 3 )</em></ins><br><br>A <b>delicacy</b> among many adventurers given to you by your mum before school.<br><br>Can <b>heal</b> your acing bones if needs be.";
	} else if (healcounter == 2) {
		document.getElementById("basic2").innerHTML = "<ins><em>Mom's Sandwich ( X 2 )</em></ins><br><br>A <b>delicacy</b> among many adventurers given to you by your mum before school.<br><br>Can <b>heal</b> your acing bones if needs be.";
	} else if (healcounter == 1) {
		document.getElementById("basic2").innerHTML = "<ins><em>Mom's Sandwich ( X 1 )</em></ins><br><br>A <b>delicacy</b> among many adventurers given to you by your mum before school.<br><br>Can <b>heal</b> your acing bones if needs be.";
	} else {
		document.getElementById("basic2").innerHTML = "<ins><em>Mom's Sandwich ( X 0 )</em></ins><br><br>A <b>delicacy</b> among many adventurers given to you by your mum before school.<br><br>Can <b>heal</b> your acing bones if needs be.";
	}	
		
  };

  // When the 'heal' button is not hovered
  document.getElementById("heal").onmouseout = function() {
    document.getElementById("basic2").innerHTML = "Hover over an item to viewdescription";
  };
});

document.addEventListener("DOMContentLoaded", function() {
  // When the 'luck' button is hovered over
  document.getElementById("luck").onmouseover = function() {
	if (luckcounter == 2) {
		document.getElementById("basic2").innerHTML = "<ins><em>Lucky Clover ( X 2 )</em></ins><br><br>A <b>powerful</b> 4 leaf clover you've collected on your adventure.<br><br>Can help you hit your target more <b>accurately</b> in a pinch";
	} else if (luckcounter == 1) {
		document.getElementById("basic2").innerHTML = "<ins><em>Lucky Clover ( X 1 )</em></ins><br><br>A <b>powerful</b> 4 leaf clover you've collected on your adventure.<br><br>Can help you hit your target more <b>accurately</b> in a pinch"
	} else {
		document.getElementById("basic2").innerHTML = "<ins><em>Lucky Clover ( X 0 )</em></ins><br><br>A <b>powerful</b> 4 leaf clover you've collected on your adventure.<br><br>Can help you hit your target more <b>accurately</b> in a pinch";
	}	
		
  };

  // When the 'luck' button is not hovered
  document.getElementById("luck").onmouseout = function() {
    document.getElementById("basic2").innerHTML = "Hover over an item to viewdescription";
  };
});

function CloverOn() {
  if (tutorialCompletedText == false) {
    if (luckcounter == 0) {
      document.getElementById("div2").style.display = "none";  // Hide inventory
      document.getElementById("div4").style.display = "inline-block";  // Show battlePage
      var paragraph = `You have used all of your Lucky Clovers!\nBad luck really...\n-------------------------------------------\nNo Luck boost - No turn lost`;
      fadeInWords(paragraph, 100); // Fades in each word every 200ms
    } else {
      luckcounter--;
      luck = 1;
      document.getElementById("div2").style.display = "none";  // Hide inventory
      document.getElementById("div4").style.display = "inline-block";  // Show battlePage
      if (luckcounter == 1) {
        var paragraph = `You used Lucky Clover!\nYou have 1 Clover remaining\n-------------------------------------------\nLuck boosted for 1 Rock Throw`;
      } else {
        var paragraph = `You used Lucky Clover!\nYou have 0 Clovers and now feel abnormal...\n-------------------------------------------\nLuck boosted for 1 Rock Throw`;
      }	
      fadeInWords(paragraph, 100); // Fades in each word every 100ms
    }
  } else {
		console.log("Nuh uh uh");
	}
}

function attack1 (){ //attacks the boss/oponent etc and removes health
  if (tutorialCompletedText == false) {
    let bossHP = document.getElementById("BossBar");
    bossHP.value -= playerAttack1;
    document.getElementById("bhp").innerHTML = bossHP.value;
    if (toadBossBattle) {
			turn = 1
		}
    document.getElementById("div3").style.display = "none";
    document.getElementById("div4").style.display = "inline-block";
    // Call the function with your paragraph and delay (in milliseconds)
    const paragraph = `You used Sword Slash!\nIt was very effective\n-------------------------------------------\nDamage done to opponent : 30`;
    fadeInWords(paragraph,100); // Fades in each word every 200ms
  } else {
		console.log("Nuh uh uh")
	}
} 

function attack2 (){ //attacks the boss/oponent etc and removes health
  if (tutorialCompletedText == false) {
    let bossHP = document.getElementById("BossBar")
    turn = 1;
    let rocks = Math.floor(Math.random() * 3 + 1)
    if (luck == 1) {
      for (let i = 0; i < 6; i++) {
        bossHP.value -= playerAttack2;
        document.getElementById("bhp").innerHTML = bossHP.value;
      }
      const paragraph = `You used Rock Throw!\nYou were very lucky! All the rocks hit! We love concussions.\n-------------------------------------------\nDamage done to opponent : 60`;
      var output = paragraph + "60";
      luck = 0;
      rocks = 6;
      console.log("here's the expected output");
    } else {
      rocks = Math.floor(Math.random() * 2 + 1);
      console.log("someting went wrong");
      if (rocks == 1) {
        bossHP.value -= playerAttack2;
        document.getElementById("bhp").innerHTML = bossHP.value;
      } else {
        rocks = Math.floor(Math.random() * 3 + 1);
        if (rocks == 2) {
          for (let i = 0; i < 3; i++) {
          bossHP.value -= playerAttack2;
          document.getElementById("bhp").innerHTML = bossHP.value;
          }
        } else {
          for (let i = 0; i < 5; i++) {
            bossHP.value -= playerAttack2;
            document.getElementById("bhp").innerHTML = bossHP.value;
          }
        }
      }
    }
    document.getElementById("div3").style.display = "none";
    document.getElementById("div4").style.display = "inline-block";
    let amountRocks = 0
    if (rocks == 1) {
      amountRocks = 10;
      const paragraph1 = `You used Rock Throw!\nYou were unlucky! Only one throw hit.\n-------------------------------------------\nDamage done to opponent : `;
      var output = paragraph1 + amountRocks;
    } else if (rocks == 2) {
      amountRocks = 30;
      const paragraph2 = `You used Rock Throw!\nYou were kinda lucky! Only three throws hit.\n-------------------------------------------\nDamage done to opponent : `;
      var output = paragraph2 + amountRocks;
    } else if (rocks == 3) {
      amountRocks = 50;
      const paragraph3 = `You used Rock Throw!\nYou were lucky! Five of your throws hit.\n-------------------------------------------\nDamage done to opponent : `;
      var output = paragraph3 + amountRocks;
    } else {
      amountRocks = 60;
      const paragraph4 = `You used Rock Throw!\nYou were super duper lucky! All the throws hit!\n-------------------------------------------\nDamage done to opponent : `;
      const effect = ` - Clover vanishes`;
      var output = paragraph4 + amountRocks + effect;
    }
      fadeInWords(output, 100); // Fades in each word every 200ms
  } else {
		console.log("Nuh uh uh");
	}
}

function heal (){ //attacks the boss/oponent etc and removes health
  if (tutorialCompletedText == false) {
    let playerHP = document.getElementById("PlayerBar")
    if (healcounter == 0) {
      document.getElementById("div2").style.display = "none";  // Hide inventory
      document.getElementById("div4").style.display = "inline-block";  // Show battlePage
      var paragraph = `You have used all of your sandwiches\nYou feel hungry\n-------------------------------------------\nHealth gain : 0 hp - No turn lost`;
      fadeInWords(paragraph, 100); // Fades in each word every 200ms
    } else if (playerHP.value == 200) {
      document.getElementById("div2").style.display = "none";  // Hide inventory
      document.getElementById("div4").style.display = "inline-block";  // Show battlePage
      var paragraph = `You cannot use this item at full health!\nMom's Sandwich has no effecct\n-------------------------------------------\nHealth gain : 0 hp - No turn lost`;
      fadeInWords(paragraph, 100); // Fades in each word every 200ms
    } else {
      healcounter--;
      playerHP.value += playerHeal;
      document.getElementById("php").innerHTML = playerHP.value;
      turn = 1
      document.getElementById("div2").style.display = "none";  // Hide inventory
      document.getElementById("div4").style.display = "inline-block";  // Show battlePage
      if (healcounter == 4) {
        var paragraph = `You used Mom's Sandwich!\nYou have 4 Sandwiches remaining\n-------------------------------------------\nHealth gain : 60 hp`;
      } else if (healcounter == 3) {
        var paragraph = `You used Mom's Sandwich!\nYou have 3 Sandwiches remaining\n-------------------------------------------\nHealth gain : 60 hp`;
      } else if (healcounter == 2) {
        var paragraph = `You used Mom's Sandwich!\nYou have 2 Sandwiches remaining\n-------------------------------------------\nHealth gain : 60 hp`;
      } else if (healcounter == 1) {
        var paragraph = `You used Mom's Sandwich!\nYou have 1 Sandwiches remaining\n-------------------------------------------\nHealth gain : 60 hp`;
      } else {
        var paragraph = `You used Mom's Sandwich!\nYou have 0 Sandwiches and now feel bloated\n-------------------------------------------\nHealth gain : 60 hp`;
      }
      fadeInWords(paragraph, 100); // Fades in each word every 100ms
    }
  } else {
		console.log("Nuh uh uh");
	}
}

function ToadAttack1 (){ //attacks by toad
    let playerHP = document.getElementById("PlayerBar")
    playerHP.value -= bossAttack;
	document.getElementById("php").innerHTML = playerHP.value;
    console.log("Toad 1")
    turn = 0
	var paragraph = `Dominus Tweedle licked you\nYou feel slimey\n-------------------------------------------\nHealth lost : 20 hp`;
	fadeInWords(paragraph, 100); // Fades in each word every 100ms
}

function ToadAttack2 (){ //attacks by toad
    let playerHP = document.getElementById("PlayerBar")
    playerHP.value -= bossAttack2;
	document.getElementById("php").innerHTML = playerHP.value;
    console.log("Toad 2")
    turn = 0
	var paragraph = `Dominus Tweedle kicked you\nYou feel disoriented\n-------------------------------------------\nHealth lost : 30 hp`;
	fadeInWords(paragraph, 100); // Fades in each word every 100ms
}

function ToadAttack3 (){ //attacks by toad
    let playerHP = document.getElementById("PlayerBar")
    playerHP.value -= bossAttack3;
	document.getElementById("php").innerHTML = playerHP.value;
    console.log("Toad 3")
    turn = 0
	var paragraph = `Dominus Tweedle sat on you\nYou become concussed\n-------------------------------------------\nHealth lost : 80 hp`;
	fadeInWords(paragraph, 100); // Fades in each word every 100ms
}

function ButterflyAttack1(){
	var paragraph = `The butterfly is enjoying life, fluttering around.\nSo defenselss.\n-------------------------------------------\nNothing happened`;
	fadeInWords(paragraph, 100);
}

function toadBattle(){ //Wait for player move, do the move, then run frog attack. also, only generate move 3 when desperate (if health greater or = 50, attacks 1 and 2, else attacks 1 and 3). should be on a loop until one progress bar runs out.
    if (turn == 1) {
		//toad attack chooser
		let TMove = Math.floor(Math.random() * 3 + 1);
		if (document.getElementById("BossBar").value > 50) {
			TMove = Math.floor(Math.random() * 2 + 1);
		} else {
			TMove = Math.floor(Math.random() * 3 + 1);
		} //this seems to work as expected, unlocking the third move when boss is below 50
		if (TMove == 1) {
			ToadAttack1();
		} else if (TMove == 2) {
			ToadAttack2();
		}
		else if (TMove == 3) {
			ToadAttack3();
		} else {
			window.prompt("An error occured.")
		}
	} else {
		console.log("RAHHHH THIS CONSOLE LOG WILL NEVER HAPPEN, YIPPE")
	}
}

document.addEventListener("DOMContentLoaded", function() {
  const rotateScreen = document.getElementById("rotate-screen");
  const gameContent = document.getElementById("game-content");

  function checkOrientation() {
    if (window.matchMedia("(orientation: portrait)").matches) {
      // Portrait mode
      rotateScreen.style.display = "block";
      gameContent.style.display = "none";
    } else {
      // Landscape mode
      rotateScreen.style.display = "none";
      gameContent.style.display = "block";
    }
  }

  // Check orientation on load
  checkOrientation();

  // Listen for orientation changes
  window.addEventListener("orientationchange", checkOrientation);
  window.matchMedia("(orientation: portrait)").addEventListener("change", checkOrientation);
});

function setUpBattle() {
	console.log("Boss HP has been changed");
	if (butterflyBossBattle == true) {
		document.getElementById("BossBar").value = 1;
		document.getElementById("BossBar").max = 1;
    document.getElementById("bhpn").innerText = "Defenseless Butterfly";
	} else if (toadBossBattle == true) {
		document.getElementById("BossBar").value = 200;
		document.getElementById("BossBar").max = 200;
    document.getElementById("bhpn").innerText = "Dominus Tweedle";
		document.getElementById("pitifulButterfly").style.display = "none";
	}
	document.getElementById("bhp").innerText = document.getElementById("BossBar").value;
  document.getElementById("bhpm").innerText = document.getElementById("BossBar").value;
	console.log(document.getElementById("BossBar"));
}

function moveNo() {
  document.getElementById('tutorial-start').style.display = 'none';
  document.getElementById("game").style.display = "flex";  // Show battlePage
  prebattletext();
  tutorialCompletedText = false;
	butterflyBossBattle = false;
	toadBossBattle = true;
  tutorialend = true;
	setUpBattle();
}

function move1() {
  let id = null;
  const elem = document.getElementById("animate");   
  let pos = -200;
  clearInterval(id);
  id = setInterval(frame, 3); // speed it moves, more is slower
  function frame() {
    if (pos == 390) {
      clearInterval(id);
      document.getElementById("attack").style.outline = "4px solid red";
      document.getElementById("m2").style.display = "inline-block";
    } else {
      pos++; 
      elem.style.left = pos + "px";
      document.getElementById("div1").style.display = "flex";  // Show BattablePage
      document.getElementById("div2").style.display = "none";  // Hide inventoryPage
      document.getElementById("div3").style.display = "none";  // Hide attackPage
      document.getElementById("div4").style.display = "none";  // Hide textPage
    }
  }
  document.getElementById("tutorial-start").style.display = "none";
  document.getElementById("attack-description").style.display = "inline-block";
}

function move2() {
  let id = null;
  const elem = document.getElementById("animate");   
  let pos = 0;
  clearInterval(id);
  id = setInterval(frame, 3); // speed it moves, more is slower
  function frame() {
    if (pos == 80) {
      clearInterval(id);
      document.getElementById("items").style.outline = "4px solid red";
      document.getElementById("m3").style.display = "inline-block";
    } else {
      pos++; 
      elem.style.top = pos + "px";
      document.getElementById("attack").style.outline = "none";
    }
  }
  document.getElementById("attack-description").style.display = "none";
  document.getElementById("items-description").style.display = "inline-block";
}

function move3() {
  let id = null;
  const elem = document.getElementById("animate");   
  let pos = 390;
  let degree = 0;
  clearInterval(id);
  id = setInterval(frame, 3); // speed it moves, more is slower
  function frame() {
    if (pos == 900) {
      if (degree == -90) {
        clearInterval(id);
        document.getElementById("BossBar").style.outline = "4px solid red";
        document.getElementById("m4").style.display = "inline-block";
      } else {
        degree--;
        elem.style.rotate = degree + "deg";
      }
    } else {
      pos++; 
      elem.style.left = pos + "px";
      document.getElementById("attack").style.outline = "none";
      document.getElementById("items").style.outline = "none";
    }
  }
  document.getElementById("items-description").style.display = "none";
  document.getElementById("bosshp-description").style.display = "inline-block";
}

function move4() {
  let id = null;
  const elem = document.getElementById("animate");   
  let pos = 80;
  clearInterval(id);
  id = setInterval(frame, 3); // speed it moves, more is slower
  function frame() {
    if (pos == 150) {
      clearInterval(id);
      document.getElementById("PlayerBar").style.outline = "4px solid red";
      document.getElementById("m5").style.display = "inline-block";
    } else {
      pos++; 
      elem.style.top = pos + "px";
      document.getElementById("attack").style.outline = "none";
      document.getElementById("items").style.outline = "none";
      document.getElementById("BossBar").style.outline = "none";
    }
  }
  document.getElementById("bosshp-description").style.display = "none";
  document.getElementById("playerhp-description").style.display = "inline-block";
}

function move5() {
  let id = null;
  const elem = document.getElementById("animate");
  elem.style.top = "10px";
  elem.style.rotate = "0deg";
  let pos = -200;
  clearInterval(id);
  id = setInterval(frame, 3); // speed it moves, more is slower
  function frame() {
    if (pos == 405) {
      clearInterval(id);
      document.getElementById("back2").style.outline = "4px solid red";
      document.getElementById("m6").style.display = "inline-block";
    } else {
      pos++; 
      elem.style.left = pos + "px";
      document.getElementById("attack").style.outline = "none";
      document.getElementById("items").style.outline = "none";
      document.getElementById("BossBar").style.outline = "none";
      document.getElementById("PlayerBar").style.outline = "none";
      document.getElementById("div1").style.display = "none";  // Hide BattablePage
      document.getElementById("div2").style.display = "none";  // Hide inventoryPage
      document.getElementById("div3").style.display = "inline-block";  // Show attackPage
      document.getElementById("div4").style.display = "none";  // Hide textPage
    }
  }
  document.getElementById("playerhp-description").style.display = "none";
  document.getElementById("back-description").style.display = "inline-block";
}

function move6() {
  let id = null;
  const elem = document.getElementById("animate");
  let pos = 405;
  clearInterval(id);
  id = setInterval(frame, 3); // speed it moves, more is slower
  function frame() {
    if (pos == 545) {
      clearInterval(id);
      document.getElementById("sword").style.outline = "4px solid red";
      document.getElementById("m7").style.display = "inline-block";
    } else {
      pos++; 
      elem.style.left = pos + "px";
      document.getElementById("back2").style.outline = "none";
    }
  }
  document.getElementById("back-description").style.display = "none";
  document.getElementById("attack1-description").style.display = "inline-block";
}

function move7() {
  let id = null;
  const elem = document.getElementById("animate");
  let pos = 545;
  clearInterval(id);
  id = setInterval(frame, 3); // speed it moves, more is slower
  function frame() {
    if (pos == 695) {
      clearInterval(id);
      document.getElementById("rock").style.outline = "4px solid red";
      document.getElementById("m8").style.display = "inline-block";
    } else {
      pos++; 
      elem.style.left = pos + "px";
      document.getElementById("back2").style.outline = "none";
      document.getElementById("sword").style.outline = "none";
    }
  }
  document.getElementById("attack1-description").style.display = "none";
  document.getElementById("attack2-description").style.display = "inline-block";
}

function move8() {
  let id = null;
  const elem = document.getElementById("animate");
  let pos = 695;
  clearInterval(id);
  id = setInterval(frame, 3); // speed it moves, more is slower
  function frame() {
    if (pos == 832) {
      clearInterval(id);
      document.getElementById("descriptions").style.outline = "4px solid red";
      document.getElementById("m9").style.display = "inline-block";
    } else {
      pos++; 
      elem.style.left = pos + "px";
      document.getElementById("back2").style.outline = "none";
      document.getElementById("sword").style.outline = "none";
      document.getElementById("rock").style.outline = "none";
    }
  }
  document.getElementById("attack2-description").style.display = "none";
  document.getElementById("descriptions-description").style.display = "inline-block";
}

function move9() {
  let id = null;
  const elem = document.getElementById("animate");
  elem.style.top = "10px";
  elem.style.rotate = "0deg";
  let pos = -200;
  clearInterval(id);
  id = setInterval(frame, 3); // speed it moves, more is slower
  function frame() {
    if (pos == 405) {
      clearInterval(id);
      document.getElementById("back").style.outline = "4px solid red";
      document.getElementById("m10").style.display = "inline-block";
    } else {
      pos++; 
      elem.style.left = pos + "px";
      document.getElementById("back2").style.outline = "none";
      document.getElementById("sword").style.outline = "none";
      document.getElementById("rock").style.outline = "none";
      document.getElementById("descriptions").style.outline = "none";
      document.getElementById("div1").style.display = "none";  // Hide BattablePage
      document.getElementById("div2").style.display = "inline-block";  // Show inventoryPage
      document.getElementById("div3").style.display = "none";  // Hide attackPage
      document.getElementById("div4").style.display = "none";  // Hide textPage
    }
  }
  document.getElementById("descriptions-description").style.display = "none";
  document.getElementById("back2-description").style.display = "inline-block";
}

function move10() {
  let id = null;
  const elem = document.getElementById("animate");
  let pos = 405;
  clearInterval(id);
  id = setInterval(frame, 3); // speed it moves, more is slower
  function frame() {
    if (pos == 545) {
      clearInterval(id);
      document.getElementById("heal").style.outline = "4px solid red";
      document.getElementById("m11").style.display = "inline-block";
    } else {
      pos++; 
      elem.style.left = pos + "px";
      document.getElementById("back").style.outline = "none";
    }
  }
  document.getElementById("back2-description").style.display = "none";
  document.getElementById("heal-description").style.display = "inline-block";
}

function move11() {
  let id = null;
  const elem = document.getElementById("animate");
  let pos = 545;
  clearInterval(id);
  id = setInterval(frame, 3); // speed it moves, more is slower
  function frame() {
    if (pos == 695) {
      clearInterval(id);
      document.getElementById("luck").style.outline = "4px solid red";
      document.getElementById("m12").style.display = "inline-block";
    } else {
      pos++; 
      elem.style.left = pos + "px";
      document.getElementById("back").style.outline = "none";
      document.getElementById("heal").style.outline = "none";
    }
  }
  document.getElementById("heal-description").style.display = "none";
  document.getElementById("luck-description").style.display = "inline-block";
}

function move12() {
  let id = null;
  const elem = document.getElementById("animate");
  let pos = 695;
  clearInterval(id);
  id = setInterval(frame, 3); // speed it moves, more is slower
  function frame() {
    if (pos == 832) {
      clearInterval(id);
      document.getElementById("descriptions2").style.outline = "4px solid red";
      document.getElementById("m13").style.display = "inline-block";
    } else {
      pos++; 
      elem.style.left = pos + "px";
      document.getElementById("back").style.outline = "none";
      document.getElementById("heal").style.outline = "none";
      document.getElementById("luck").style.outline = "none";
    }
  }
  document.getElementById("luck-description").style.display = "none";
  document.getElementById("descriptions2-description").style.display = "inline-block";
}

function finish_tutorial() {
  document.getElementById("animate").style.display = "none";
  document.getElementById("m14").style.display = "inline-block";
  document.getElementById("back").style.outline = "none";
  document.getElementById("heal").style.outline = "none";
  document.getElementById("luck").style.outline = "none";
  document.getElementById("descriptions2").style.outline = "none";
  document.getElementById("div1").style.display = "flex";  // Show BattablePage
  document.getElementById("div2").style.display = "none";  // Hide inventoryPage
  document.getElementById("div3").style.display = "none";  // Hide attackPage
  document.getElementById("div4").style.display = "none";  // Hide textPage
  document.getElementById("descriptions2-description").style.display = "none";
  document.getElementById("finish-description").style.display = "inline-block";
}

function finish_tutorial_2() {
	document.getElementById("finish-description").style.display="none";
  butterflyBossBattle = true;
  setUpBattle();
  let id = null;
  const elem = document.getElementById("pitifulButterfly");
  let pos = -1800;
  clearInterval(id);
  id = setInterval(frame, 3); // speed it moves, more is slower
  function frame() {
    if (pos == -900) {
      clearInterval(id);
    } else {
      pos++; 
      elem.style.right = pos + "px";
    }
  }
	tutorialCompletedText = false;
}

function fadeInWords(paragraph, delay) {
  const audio = document.getElementById('loadingSound'); // Audio element
  const hideButton = document.getElementById('hideButton'); // Always access the button
  const container = document.getElementById('div4'); // Cache container

  // Clear previous contents and hide the button initially
  hideButton.style.display = "none"; // Hide the button
  
  // Split the paragraph into words and line breaks
  const wordsWithBreaks = paragraph.split(/(\s+|\n)/);
  
  audio.play(); // Start playing audio
  
  // Iterate through each segment and append it to the container
  wordsWithBreaks.forEach((segment, index) => {
      if (segment === '\n') {
          // Create a line break element
          const br = document.createElement('span');
          br.classList.add('line-break');
          container.appendChild(br);
      } else {
          // Create a span for each word
          const wordSpan = document.createElement('span');
          wordSpan.textContent = segment + ' '; // Add space
          wordSpan.classList.add('hiddentext');
          container.appendChild(wordSpan);
          
          // Fade in each word with a delay
          setTimeout(() => {
              wordSpan.classList.add('visibletext'); // Show the word
              
              // Check if this is the last word
              if (index === wordsWithBreaks.length - 1) {
                  audio.pause(); // Stop the audio
                  audio.currentTime = 0; // Reset the audio
                  hideButton.style.display = "inline-block"; // Show the hide button
              }
          }, index * delay);
      }
  });
}

// Function to hide the container and wipe its contents
function hideAndWipe() {
  const container = document.getElementById('div4');
  const hideButton = document.getElementById('hideButton');
  Array.from(container.children).forEach(child => {
        if (child !== hideButton) {
            container.removeChild(child); // Remove all except the button
        }
  });
  if (pregamedialog > 0 && pregamedialog < 8) {
    pregametext();
  } else if (pretutorialdialog > 0 && pretutorialdialog < 7) {
    pretutorialtext();
  } else if (tutorialdialog > 0 && tutorialdialog < 3) {
    tutorialtext();
  } else if (prebattledialog > 0 && prebattledialog < 8) {
    prebattletext();
  } else if (butterflyBossBattle == false && tutorialend == false) {
    tutorial1();
  } else if (endgametext == true) {
    endgame();
  } else if (finish == true) {
    location.reload();
  } else {
    attacktext();
  }
}
