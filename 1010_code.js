let marker_visible = { A: false, B: false, C: false, D: false };
let points = ["A", "B", "C", "D"];

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
    points.forEach(point => {
      const entity = document.querySelector(`a-marker#${point}`);
      const line = document.createElement('a-entity');
      line.setAttribute('line', { start: '0 0 0', end: '0 0 0', color: 'red' });
      entity.appendChild(line);
    });
  },
  tick: function (time, deltaTime) {
    if (points.every(point => marker_visible[point])) {
      console.log("A, B, C, and D");

      points.forEach(point => {
        const entity = document.querySelector(`a-marker#${point}`);
        const line = entity.querySelector('a-entity[line]');

        const vec = new THREE.Vector3();
        entity.object3D.getWorldPosition(vec);

        line.setAttribute('line', {
          start: '0 0 0',
          end: `${vec.x} ${vec.y} ${vec.z}`,
          color: 'red'
        });
      });

      console.log('Points:', points.map(point => {
        const vec = new THREE.Vector3();
        document.querySelector(`a-marker#${point}`).object3D.getWorldPosition(vec);
        return { [point]: vec };
      }));
    } else {
      points.forEach(point => {
        const entity = document.querySelector(`a-marker#${point}`);
        const line = entity.querySelector('a-entity[line]');
        line.setAttribute('line', { start: '0 0 0', end: '0 0 0', color: 'red' });
      });
    }
  }
});
