var $apv = $('#apv-count');
var clickMain = {
  active: true,
  clickValue: 1,
  onClick: function() {
    var int = parseInt($apv.text());
    $apv.text(int + this.clickValue);
  }
}


$("#click-main").on('click', function(event) {
    clickMain.onClick();
})
