let marker_visible = { A: false, B: false, C: false, D: false };

AFRAME.registerComponent("registerevents", {
  init: function () {
    var marker = this.el;
    marker.addEventListener('markerFound', function () {
      console.log('Знайдено маркер', marker.id);
      marker_visible[marker.id] = true;
    });
    marker.addEventListener('markerLost', function () {
      console.log('Втрачено маркер', marker.id);
      marker_visible[marker.id] = false;
    });
  }
});

AFRAME.registerComponent("run", {
  init: function () {
    this.A = document.querySelector("a-marker#A");
    this.B = document.querySelector("a-marker#B");
    this.C = document.querySelector("a-marker#C");
    this.D = document.querySelector("a-marker#D");

    // Створення ліній між точками
    this.createLine(this.A, this.B, "lineAB");
    this.createLine(this.B, this.C, "lineBC");
    this.createLine(this.C, this.D, "lineCD");
    this.createLine(this.D, this.A, "lineDA");
  },
  createLine: function (point1, point2, lineName) {
    const line = document.createElement('a-entity');
    line.setAttribute('line', { color: 'red' });
    point1.appendChild(line);
    this[lineName] = line;
  },
  tick: function (time, deltaTime) {
    if (marker_visible["A"] && marker_visible["B"] && marker_visible["C"] && marker_visible["D"]) {
      console.log("A, B, C, and D");

      const lines = ["lineAB", "lineBC", "lineCD", "lineDA"];

      for (let i = 0; i < lines.length; i++) {
        const lineName = lines[i];
        const line = this[lineName];
        const startPoint = line.parentElement.object3D.position;
        const nextPointName = lines[(i + 1) % lines.length];
        const endPoint = this[nextPointName].object3D.position;

        line.setAttribute('line', {
          start: `${startPoint.x} ${startPoint.y} ${startPoint.z}`,
          end: `${endPoint.x} ${endPoint.y} ${endPoint.z}`,
          color: 'red'
        });
      }
    } else {
      // Сховати лінії, якщо не всі точки видимі
      const lines = ["lineAB", "lineBC", "lineCD", "lineDA"];
      lines.forEach(lineName => {
        const line = this[lineName];
        line.setAttribute('line', { color: 'red' });
      });
    }
  }
});
