var $apv = $('#apv-count');
var $fishermenCost = $('#fishermen-cost');
var apvCount = 0; //cheat here,
var clickPower = 1; //or here.



var arbitryClick = function(number) {
  apvCount = apvCount + number;
  $apv.text(apvCount);
  var $boxes = $('div.btn-box');

  for (var i = 0; i < btnArray.length; i++) {
    if (apvCount >= btnArray[i].cost) {
      var $thisBox = $boxes.eq(i);
      $thisBox.slideDown("fast", function() {
        //Stuff to do *after* the animation takes place
      })
    }
  }
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
      var $test = $('#norris-box').append($newP);
      $newP.hide().slideDown("slow", function () {
        $newP.fadeOut(2000, function() {
          $newP.remove();
        })
      }).delay(5000);
    }
  })
}

var checkAchieve = function() {
  
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
      }
  }
}

var btnArray = [fishermen, clickUp, procrast, norris, plat, exist];

$("#click-main").on('click', function(event) {
  arbitryClick(clickPower);
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
