AFRAME.registerComponent("run", {
  init: function () {
    this.A = document.querySelector("a-marker#A");
    this.B = document.querySelector("a-marker#B");
    this.C = document.querySelector("a-marker#C");
    this.D = document.querySelector("a-marker#D");

    this.createLine("lineABCD");
  },
  createLine: function (lineName) {
    const line = document.createElement('a-entity');
    line.setAttribute('line', { start: '0 0 0', end: '0 0 0', color: 'red' });
    this.A.appendChild(line);
    this[lineName] = line;
  },
  tick: function (time, deltaTime) {
    if (marker_visible["A"] && marker_visible["B"] && marker_visible["C"] && marker_visible["D"]) {
      console.log("A, B, C, and D");

      const line = this["lineABCD"];
      const startPoint = this.A.object3D.position;
      const endPoint = this.D.object3D.position;

      line.setAttribute('line', {
        start: `${startPoint.x} ${startPoint.y} ${startPoint.z}`,
        end: `${endPoint.x} ${endPoint.y} ${endPoint.z}`,
        color: 'red'
      });
    } else {
      // Сховати лінію, якщо не всі точки видимі
      const line = this["lineABCD"];
      line.setAttribute('line', { start: '0 0 0', end: '0 0 0', color: 'red' });
    }
  }
});
