var $apv = $('#apv-count');
var $fishermenCost = $('#fishermen-cost');
var apvCount = 0;
var clickPower = 1;

var arbitryClick = function(number) {
  apvCount = apvCount + number;
  $apv.text(apvCount);
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

$("#click-main").on('click', function(event) {
  arbitryClick(clickPower);
})

$('#fishermen-btn').on('click', function(event) {
  fishermen.buyThis();
})

window.setInterval(function() {
arbitryClick(fishermen.quantity*fishermen.value);
}, 1000);
