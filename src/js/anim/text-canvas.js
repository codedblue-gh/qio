let s = document.getElementById('say-canvas');
let e = s.getContext('2d');
s.width = window.innerWidth;
s.height = 300;
let i = [];
function particle(s, i, a) {
  this.upd = function () {
    (e.fillStyle = a),
      e.beginPath(),
      e.arc(s, i, 1, 0, 2 * Math.PI),
      e.fill(),
      e.closePath();
  };
}

new FontFace(
  'Roobert SemiMono',
  'url(/fonts/ROOBERTSEMIMONOTRIAL-MEDIUM.woff2)'
)
  .load()
  .then(() => {
    (function () {
      let a = s.dataset.text.trim(),
        t = 107 * a.length;
      (e.fillStyle = 'rgba(0,0,0,0)'),
        e.fillRect(0, 0, t, 120),
        (e.fillStyle = 'white'),
        (e.font = '500 100px Roobert SemiMono'),
        e.fillText(a, 0, 110);
      let l = e.getImageData(0, 0, t, 120);
      for (let e = 0; e < t; e += 2)
        for (let a = 0; a < 120; a += 2)
          l.data[4 * a * t + 4 * e + 3] > 128 &&
            i.push(
              new particle(
                2.5 * e + s.width / 2 - t / 1.37,
                2.5 * a + s.height / 2 - 180,
                '#898989'
              )
            );
    })(),
      e.clearRect(0, 0, s.width, s.height),
      (function () {
        for (let e = 0; e < i.length; e++) i[e].upd();
      })();
  }),
  window.innerWidth > 900;
