// NOTE

var elem = document.querySelector('.carousel-nav');
var flkty = new Flickity( elem, {
  cellAlign: 'left',
  contain: true,
  pageDots: false,
  draggable: false
});

var elem2 = document.querySelector('.carousel-main')

var flicktyNav = new Flickity ( elem2, {
    asNavFor: '.carousel-nav',
    contain: true,
    pageDots: false,
    draggable: false
});