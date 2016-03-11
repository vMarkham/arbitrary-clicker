var $apv = $('#apv-count');
var $fishermenCost = $('#fishermen-cost');
var apvCount = 0; //cheat here,
var clickPower = 1; //or here.
var totalEarned = 0;
var totalSpent = 0;
var totalClicks = 0;
var passiveTotal = 0;

var Achievement = function (alertText, cheevoText, reward) {
 this.locked = true;
 this.alertText = alertText;
 this.cheevoText = cheevoText;
 this.reward = reward;

}

Achievement.prototype.unlock = function() {
  this.locked = false;
  var $newP = $("<p>")
  var $newP2 = $("<p>")
  $newP.text(this.alertText);
  $newP2.text(this.cheevoText);
  $("div#log").prepend($newP);
  $newP.hide().slideDown("slow").delay(5000).fadeOut("slow");
  $("div#cheevo-box").append($newP2);
  arbitryClick(this.reward);
}

var cheevoCheck = function() {
  if (totalClicks === 1 && firstClick.locked) {
    firstClick.unlock();
  }
  if(totalClicks === 100 && first100Clicks.locked) {
    first100Clicks.unlock();
  }
  if(totalClicks === 1000 && first1000Clicks.locked) {
    first1000Clicks.unlock();
  }
  if(totalEarned >= 1000 && first1000Earned.locked) {
    first1000Earned.unlock();
  }
  if (totalEarned >= 10000 && first10000Earned.locked) {
    first10000Earned.unlock();
  }
  if (totalEarned >= 100000 && first100000Earned.locked) {
    first100000Earned.unlock();
  }
  if (totalEarned >= 1000000 && firstMillionEarned.locked) {
    firstMillionEarned.unlock();
  }
}

var firstClick = new Achievement("One small click for man...", "Your first click!", 0);

var first100Clicks = new  Achievement("Wow! 100 clicks! Bonus 5 APV", "Your first 100 clicks!", 5);

var first1000Clicks = new Achievement("Golly, 1000 clicks! Bonus 100 APV","Your first 1000 clicks!", 100);

var first1000Earned = new Achievement("Cowabunga! 1000 earned APV! Bonus 20 APV", "1000 total APV earned!", 20);

var first10000Earned = new Achievement("Holy guacamole! 10000 earned APV! Bonus 100 APV", "10000 total APV earned!", 100);

var first100000Earned = new Achievement("Slow down there cowboy! 100000 earned APV! Bonus 1000 APV", "100000 total APV earned!", 1000)

var firstMillionEarned = new Achievement("Don't you have anything better to do? Bonus go outside. Please.", "Your parents are ashamed of you.", 100000)

var firstFish = new Achievement("Exploitation is fun! Bonus 2 APV", "You taught a man to fish for the first time!", 2);

var firstClickUp = new Achievement("Double click! Bonus 5 APV", "You upgraded your click for the first time!", 5);

var firstProcrast = new Achievement("Doing science! Bonus 10 APV", "You researched the cure for procrastination for the first time!", 10);

var firstNorris = new Achievement("Killer moves! Bonus 50 APV", "You took lessons from Chuck Norris for the first time!", 50);

var firstPlat = new Achievement("Enlightening! Bonus 100 APV", "You consulted a platypus for the first time!", 100);

var firstExist = new Achievement("Downward spiral! bonus 1000 APV", "You had your first existential crisis!", 1000);

var updateStats = function() {
    $('li#stats-clicks').text("You have clicked " + totalClicks + " times.");
    $('li#stats-earned').text("you have earned a total of " + totalEarned + " APV.");
    $('li#stats-power').text("Your click power is " + clickPower + " APV per click.")
    $('li#stats-passive-total').text("You earn " + passiveTotal + " APV per second from your upgrades.")
}

var arbitryClick = function(number) {
  apvCount = apvCount + number;
  $apv.text(apvCount);
  var $boxes = $('div.btn-box');
  totalEarned += number;
  for (var i = 0; i < btnArray.length; i++) {
    if (apvCount >= btnArray[i].cost) {
      var $thisBox = $boxes.eq(i);
      $thisBox.slideDown("fast", function() {
        //Stuff to do *after* the animation takes place
      })
    }
  }
  updateStats();
  cheevoCheck();
}

var getNorris = function () {
  var newP = document.createElement("p");
  var $newP = $(newP);
  $.ajax({
    method: "GET",
    url: "http://api.icndb.com/jokes/random",
    success: function(rand) {
      console.log(rand.value.joke);
      norris.joke = rand.value.joke;
      newP.innerText = norris.joke;
      var $test = $('div#log').prepend($newP);
      $newP.hide().slideDown("slow", function () {
        $newP.fadeOut(2000, function() {
          $newP.remove();
        })
      }).delay(5000);
    }
  })
}

var fishermen = {
  active: false,
  cost: 15,
  quantity: 0,
  value: 1,
  buyThis: function() {
      if (apvCount >= this.cost) {
        this.quantity += 1;
        apvCount -= this.cost;
        this.cost = Math.floor(15 * Math.pow(1.2, this.quantity));
        $apv.text(apvCount);
        $fishermenCost.text(this.cost);
        passiveTotal += this.value;
        if (firstFish.locked) {
          firstFish.unlock();
        }
      }
  }
}

var clickUp = {
  active: false,
  cost: 100,
  quantity: 0,
  value: 1,
  buyThis: function() {
      if (apvCount >= this.cost) {
        this.quantity += 1;
        apvCount -= this.cost;
        this.cost = Math.floor(100 * Math.pow(1.2, this.quantity));
        $apv.text(apvCount);
        clickPower += 1;
        $('#click-up-cost').text(this.cost);
        if (firstClickUp.locked) {
          firstClickUp.unlock();
        }
      }
  }
}

var procrast = {
  active: false,
  cost: 1000,
  quantity: 0,
  value: 25,
  buyThis: function() {
      if (apvCount >= this.cost) {
        this.quantity += 1;
        apvCount -= this.cost;
        this.cost = Math.floor(1000 * Math.pow(1.2, this.quantity));
        $apv.text(apvCount);
        $('#procrast-cost').text(this.cost);
        passiveTotal += this.value;
        if (firstProcrast.locked) {
          firstProcrast.unlock();
        }
      }
  }
}

var norris = {
  active: false,
  cost: 10000,
  quantity: 0,
  value: 350,
  joke: "",
  buyThis: function() {
      if (apvCount >= this.cost) {
        this.quantity += 1;
        apvCount -= this.cost;
        this.cost = Math.floor(10000 * Math.pow(1.2, this.quantity));
        $apv.text(apvCount);
        $('#norris-cost').text(this.cost);
        getNorris();
        passiveTotal += this.value;
        if (firstNorris.locked) {
          firstNorris.unlock();
        }
      }
  }
}

var plat = {
  active: false,
  cost: 100000,
  quantity: 0,
  value: 2000,
  buyThis: function() {
      if (apvCount >= this.cost) {
        this.quantity += 1;
        apvCount -= this.cost;
        this.cost = Math.floor(100000 * Math.pow(1.2, this.quantity));
        $apv.text(apvCount);
        $('#plat-cost').text(this.cost);
        passiveTotal += this.value;
        if (firstPlat.locked) {
          firstPlat.unlock();
        }
      }
  }
}

var exist = {
  active: false,
  cost: 1000000,
  quantity: 0,
  value: 11100,
  buyThis: function() {
      if (apvCount >= this.cost) {
        this.quantity += 1;
        apvCount -= this.cost;
        this.cost = Math.floor(1000000 * Math.pow(1.2, this.quantity));
        $apv.text(apvCount);
        $('#exist-cost').text(this.cost);
        passiveTotal += this.value;
        if (firstExist.locked) {
          firstExist.unlock();
        }
      }
  }
}

var btnArray = [fishermen, clickUp, procrast, norris, plat, exist];

$("#click-main").on('click', function(event) {
  arbitryClick(clickPower);
  totalClicks += 1;
})

$('#fishermen-btn').on('click', function(event) {
  fishermen.buyThis();
})

$('#click-up-btn').on('click', function(event) {
  clickUp.buyThis();
})

$('#procrast-btn').on('click', function(event) {
  procrast.buyThis();
})

$('#norris-btn').on('click', function(event) {
  norris.buyThis();
})

$('#plat-btn').on('click', function(event) {
  plat.buyThis();
})

$('#exist-btn').on('click', function(event) {
  exist.buyThis();
})

window.setInterval(function() {
arbitryClick(fishermen.quantity*fishermen.value);
arbitryClick(procrast.quantity*procrast.value);
arbitryClick(norris.quantity*norris.value);
arbitryClick(plat.quantity*plat.value);
arbitryClick(exist.quantity*exist.value);

}, 1000);
