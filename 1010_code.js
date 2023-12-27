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

    const geometry = new THREE.CylinderGeometry(0.05, 0.05, 1, 32);
        geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 0.5, 0));
        geometry.applyMatrix4(new THREE.Matrix4().makeRotationX(Math.PI / 2));
        const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

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
            this.lineAB.visible = true;
            this.lineBC.visible = true;
            this.lineCD.visible = true;
            this.lineDA.visible = true;

            const vecA = new THREE.Vector3();
            const vecB = new THREE.Vector3();
            const vecC = new THREE.Vector3();
            const vecD = new THREE.Vector3();

            this.A.object3D.getWorldPosition(vecA);
            this.B.object3D.getWorldPosition(vecB);
            this.C.object3D.getWorldPosition(vecC);
            this.D.object3D.getWorldPosition(vecD);
            const vidstanAB = vecA.distanceTo(vecB);
            const vidstanBC = vecB.distanceTo(vecC);
            const vidstanCD = vecC.distanceTo(vecD);
            const vidstanDA = vecD.distanceTo(vecA);
            this.lineAB.lookAt(vecB);
            this.lineAB.scale.set(1, 1, vidstanAB);

            this.lineBC.lookAt(vecC);
            this.lineBC.scale.set(1, 1, vidstanBC);

            this.lineCD.lookAt(vecD);
            this.lineCD.scale.set(1, 1, vidstanCD);

            this.lineDA.lookAt(vecA);
            this.lineDA.scale.set(1, 1, vidstanDA);

            console.log("AB = ", vidstanAB);
            console.log("BC = ", vidstanBC);
            console.log("CD = ", vidstanCD);
            console.log("DA = ", vidstanDA);
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
