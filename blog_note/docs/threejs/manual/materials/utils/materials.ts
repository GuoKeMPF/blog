import { DoubleSide, FrontSide, Mesh, MeshBasicMaterial, MeshDepthMaterial, MeshLambertMaterial, MeshNormalMaterial, MeshPhongMaterial, MeshPhysicalMaterial, MeshStandardMaterial, MeshToonMaterial, Object3D, PlaneGeometry, SphereGeometry, TorusKnotGeometry } from 'three';
import { threejsUtils } from './';


function makeSphere(widthDivisions, heightDivisions) {
  const radius = 7;
  return new SphereGeometry(radius, widthDivisions, heightDivisions);
}

export const highPolySphereGeometry = function () {
  const widthDivisions = 100;
  const heightDivisions = 50;
  return makeSphere(widthDivisions, heightDivisions);
}();

export const lowPolySphereGeometry = function () {
  const widthDivisions = 12;
  const heightDivisions = 9;
  return makeSphere(widthDivisions, heightDivisions);

}();

export function smoothOrFlat(flatShading, radius = 7) {

  const widthDivisions = 12;
  const heightDivisions = 9;
  const geometry = new SphereGeometry(radius, widthDivisions, heightDivisions);
  const material = new MeshPhongMaterial({
    flatShading,
    color: 'hsl(300,50%,50%)',
  });
  return new Mesh(geometry, material);

}

export function basicLambertPhongExample(MaterialCtor, lowPoly?: boolean, params?: any = {}) {

  const geometry = lowPoly ? lowPolySphereGeometry : highPolySphereGeometry;
  const material = new MaterialCtor({
    color: 'hsl(210,50%,50%)',
    ...params,
  });
  return {
    obj3D: new Mesh(geometry, material),
    trackball: lowPoly,
  };

}

export function sideExample(side) {

  const base = new Object3D();
  const size = 6;
  const geometry = new PlaneGeometry(size, size);
  [
    { position: [- 1, 0, 0], up: [0, 1, 0], },
    { position: [1, 0, 0], up: [0, - 1, 0], },
    { position: [0, - 1, 0], up: [0, 0, - 1], },
    { position: [0, 1, 0], up: [0, 0, 1], },
    { position: [0, 0, - 1], up: [1, 0, 0], },
    { position: [0, 0, 1], up: [- 1, 0, 0], },
  ].forEach((settings, ndx) => {

    const material = new MeshBasicMaterial({ side });
    material.color.setHSL(ndx / 6, .5, .5);
    const mesh = new Mesh(geometry, material);
    mesh.up.set(...settings.up);
    mesh.lookAt(...settings.position);
    mesh.position.set(...settings.position).multiplyScalar(size * .75);
    base.add(mesh);

  });
  return base;

}

export function makeStandardPhysicalMaterialGrid(elem, physical, update) {

  const numMetal = 5;
  const numRough = 7;
  const meshes: Mesh[][] = [];
  const MatCtor = physical ? MeshPhysicalMaterial : MeshStandardMaterial;
  const color = physical ? 'hsl(160,50%,50%)' : 'hsl(140,50%,50%)';
  for (let m = 0; m < numMetal; ++m) {

    const row: Mesh[] = [];
    for (let r = 0; r < numRough; ++r) {

      const material = new MatCtor({
        color,
        roughness: r / (numRough - 1),
        metalness: 1 - m / (numMetal - 1),
      });
      const mesh = new Mesh(highPolySphereGeometry, material);
      row.push(mesh);

    }

    meshes.push(row);

  }

  return {
    obj3D: null,
    trackball: false,
    render(renderInfo) {

      const { camera, scene, renderer } = renderInfo;
      const rect = elem.getBoundingClientRect();

      const width = (rect.right - rect.left) * renderInfo.pixelRatio;
      const height = (rect.bottom - rect.top) * renderInfo.pixelRatio;
      const left = rect.left * renderInfo.pixelRatio;
      const bottom = (renderer.domElement.clientHeight - rect.bottom) * renderInfo.pixelRatio;

      const cellSize = Math.min(width / numRough, height / numMetal) | 0;
      const xOff = (width - cellSize * numRough) / 2;
      const yOff = (height - cellSize * numMetal) / 2;

      camera.aspect = 1;
      camera.updateProjectionMatrix();

      if (update) {

        update(meshes);

      }

      for (let m = 0; m < numMetal; ++m) {

        for (let r = 0; r < numRough; ++r) {

          const x = left + xOff + r * cellSize;
          const y = bottom + yOff + m * cellSize;
          renderer.setViewport(x, y, cellSize, cellSize);
          renderer.setScissor(x, y, cellSize, cellSize);
          const mesh = meshes[m][r];
          scene.add(mesh);
          renderer.render(scene, camera);
          scene.remove(mesh);

        }

      }

    },
  };

}

export function makeMeshNormalMaterial() {
  const radius = 4;
  const tube = 1.5;
  const radialSegments = 8;
  const tubularSegments = 64;
  const p = 2;
  const q = 3;
  const geometry = new TorusKnotGeometry(radius, tube, tubularSegments, radialSegments, p, q);
  const material = new MeshNormalMaterial();
  return new Mesh(geometry, material);
}

export function makeMeshPhysicalMaterial(props) {

  const settings = {
    clearcoat: .5,
    clearcoatRoughness: 0,
  };

  function addElem(parent, type, style = {}) {

    const elem = document.createElement(type);
    Object.assign(elem.style, style);
    parent.appendChild(elem);
    return elem;

  }

  function addRange(elem, obj, prop, min, max) {

    const outer = addElem(elem, 'div', {
      width: '100%',
      textAlign: 'center',
      'font-family': 'monospace',
    });

    const div = addElem(outer, 'div', {
      textAlign: 'left',
      display: 'inline-block',
    });

    const label = addElem(div, 'label', {
      display: 'inline-block',
      width: '12em',
    });
    label.textContent = prop;

    const num = addElem(div, 'div', {
      display: 'inline-block',
      width: '3em',
    });

    function updateNum() {

      num.textContent = obj[prop].toFixed(2);

    }

    updateNum();

    const input = addElem(div, 'input', {
    });
    Object.assign(input, {
      type: 'range',
      min: 0,
      max: 100,
      value: (obj[prop] - min) / (max - min) * 100,
    });
    input.addEventListener('input', () => {

      obj[prop] = min + (max - min) * input.value / 100;
      updateNum();

    });

  }

  const { elem } = props.renderInfo;
  addRange(elem, settings, 'clearcoat', 0, 1);
  addRange(elem, settings, 'clearcoatRoughness', 0, 1);
  const area = addElem(elem, 'div', {
    width: '100%',
    height: '400px',
  });

  return makeStandardPhysicalMaterialGrid(area, true, (meshes) => {
    meshes.forEach(row => row.forEach(mesh => {
      mesh.material.clearcoat = settings.clearcoat;
      mesh.material.clearcoatRoughness = settings.clearcoatRoughness;
    }));
  });

}

export function makeMeshDepthMaterial(props) {

  const { camera } = props;
  const radius = 4;
  const tube = 1.5;
  const radialSegments = 8;
  const tubularSegments = 64;
  const p = 2;
  const q = 3;
  const geometry = new TorusKnotGeometry(radius, tube, tubularSegments, radialSegments, p, q);
  const material = new MeshDepthMaterial();
  camera.near = 7;
  camera.far = 20;
  return new Mesh(geometry, material);
}




export const diagrams: Record<string, any> = {
  smoothShading: {
    create() {
      return smoothOrFlat(false)
    },
  },
  flatShading: {
    create() {
      return smoothOrFlat(true)
    },
  },
  MeshBasicMaterial: {
    create() {
      return basicLambertPhongExample(MeshBasicMaterial)
    },
  },
  MeshLambertMaterial: {
    create() {
      return basicLambertPhongExample(MeshLambertMaterial);
    },
  },
  MeshPhongMaterial: {
    create() {

      return basicLambertPhongExample(MeshPhongMaterial);

    },
  },
  MeshBasicMaterialLowPoly: {
    create() {
      return basicLambertPhongExample(MeshBasicMaterial, true)
    },
  },
  MeshLambertMaterialLowPoly: {
    create() {
      return basicLambertPhongExample(MeshLambertMaterial, true);
    },
  },
  MeshPhongMaterialLowPoly: {
    create() {
      return basicLambertPhongExample(MeshPhongMaterial, true);
    },
  },
  MeshPhongMaterialShininess0: {
    create() {
      return basicLambertPhongExample(MeshPhongMaterial, false, {
        color: 'red',
        shininess: 0,
      });
    },
  },
  MeshPhongMaterialShininess30: {
    create() {
      return basicLambertPhongExample(MeshPhongMaterial, false, {
        color: 'red',
        shininess: 30,
      });
    },
  },
  MeshPhongMaterialShininess150: {
    create() {
      return basicLambertPhongExample(MeshPhongMaterial, false, {
        color: 'red',
        shininess: 150,
      });
    },
  },
  MeshBasicMaterialCompare: {
    create() {
      return basicLambertPhongExample(MeshBasicMaterial, false, {
        color: 'purple',
      });
    },
  },
  MeshLambertMaterialCompare: {
    create() {
      return basicLambertPhongExample(MeshLambertMaterial, false, {
        color: 'black',
        emissive: 'purple',
      });
    },
  },
  MeshPhongMaterialCompare: {
    create() {
      return basicLambertPhongExample(MeshPhongMaterial, false, {
        color: 'black',
        emissive: 'purple',
        shininess: 0,
      });
    },
  },
  MeshToonMaterial: {
    create() {
      return basicLambertPhongExample(MeshToonMaterial);
    },
  },
  MeshStandardMaterial: {
    create(props) {
      return makeStandardPhysicalMaterialGrid(props.renderInfo.elem, false);
    },
  },
  MeshPhysicalMaterial: {
    create(props) {
      return makeMeshPhysicalMaterial(props)
    },
  },
  MeshDepthMaterial: {
    create(props) {
      return makeMeshDepthMaterial(props)
    },
  },
  MeshNormalMaterial: {
    create() {
      return makeMeshNormalMaterial()
    },
  },
  sideDefault: {
    create() {
      return sideExample(FrontSide);
    },
  },
  sideDouble: {
    create() {
      return sideExample(DoubleSide)
    },
  },
};
