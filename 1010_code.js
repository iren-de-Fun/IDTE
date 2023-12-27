let marker_visible = { A: false, B: false, C: false, D: false };
let pointA, pointB, pointC, pointD;

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
    this.AB = document.querySelector("#pointA").object3D;

    // Створення точок на сцені
    pointA = document.createElement('a-entity');
    pointB = document.createElement('a-entity');
    pointC = document.createElement('a-entity');
    pointD = document.createElement('a-entity');

    this.A.appendChild(pointA);
    this.B.appendChild(pointB);
    this.C.appendChild(pointC);
    this.D.appendChild(pointD);

    // Створення лінії
    const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
    this.lineAB = new THREE.Line(new THREE.BufferGeometry(), material);
    this.lineBC = new THREE.Line(new THREE.BufferGeometry(), material);
    this.lineCD = new THREE.Line(new THREE.BufferGeometry(), material);
    this.lineDA = new THREE.Line(new THREE.BufferGeometry(), material);

    this.AB.add(this.lineAB);
    this.BC.add(this.lineAB);
    this.CD.add(this.lineAB);
    this.DA.add(this.lineAB);

    // Позначення координат у консолі
    console.log('Point A:', pointA.object3D.position);
    console.log('Point B:', pointB.object3D.position);
    console.log('Point C:', pointC.object3D.position);
    console.log('Point D:', pointD.object3D.position);
  },
  tick: function (time, deltaTime) {
    if (marker_visible["A"] && marker_visible["B"] && marker_visible["C"] && marker_visible["D"]) {
      console.log("A, B, C, and D");

      const points = ["A", "B", "C", "D"];
      const positions = points.map(point => {
        const vec = new THREE.Vector3();
        this[point].object3D.getWorldPosition(vec);
        window['point' + point].object3D.position.copy(vec);
        return vec;
      });

      // Створення лінії
      this.lineAB.geometry.dispose();
      this.lineAB.geometry = new THREE.BufferGeometry().setFromPoints(positions.concat(positions[0]));

      // Додаткова інформація у консолі
      console.log('Point A:', pointA.object3D.position);
      console.log('Point B:', pointB.object3D.position);
      console.log('Point C:', pointC.object3D.position);
      console.log('Point D:', pointD.object3D.position);
    } else {
      this.lineAB.geometry.dispose();
    }
  }
});
