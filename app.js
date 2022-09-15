import BaseComponent from "./base-component.js";
import Block from "./block.js";
import {
  angleBetweenVectors,
  getCircleParameters,
  getLengthVector,
  getPolygonParameters,
  getQuadrilateralParameters,
  getSphereParameters,
  getTriangleParameters,
  getСylinderParameters,
  getСoneParameters,
  getCubParameters
} from "./geometry.js";

class App extends BaseComponent {
  constructor(parentNode) {
    super(parentNode, 'main', ['main'])
    this.vector2d = new Block(this.node, 'Длина вектора в двумерной системе координат',
      [['x1', 'y1'], ['x2', 'y2']]).renderForm();
    this.vector2d.button.node.addEventListener('click', (e) => {
      e.preventDefault();
      const arrValue = this.getValue(this.vector2d.inputs);
      const lengthVector2D = getLengthVector(...arrValue);
      this.vector2d.result.node.textContent = lengthVector2D.toFixed(2);
    });

    this.vector3d = new Block(this.node, 'Длина вектора в трехмерной системе координат',
      [['x1', 'y1', 'z1'], ['x2', 'y2', 'z2']]).renderForm();
    this.vector3d.button.node.addEventListener('click', (e) => {
      e.preventDefault();
      const arrValue = this.getValue(this.vector3d.inputs);
      const lengthVector3D = getLengthVector(...arrValue);
      this.vector3d.result.node.textContent = lengthVector3D.toFixed(2);
    });

    this.angle2d = new Block(this.node, 'Угол между векторами в двумерной системе координат',
      [['x1', 'y1'], ['x2', 'y2']]).renderForm();
    this.angle2d.button.node.addEventListener('click', (e) => {
      e.preventDefault();
      const arrValue = this.getValue(this.angle2d.inputs);
      const angle = angleBetweenVectors(...arrValue);
      if (arrValue.flat(1).every(item => item !== '')) {
        this.angle2d.result.node.textContent = angle.toFixed(2);
      } else {
        this.angle2d.result.node.textContent = 'Заполните поля';
      }
    });

    this.angle3d = new Block(this.node, 'Угол между векторами в трехмерной системе координат',
      [['x1', 'y1', 'z1'], ['x2', 'y2', 'z2']]).renderForm();
    this.angle3d.button.node.addEventListener('click', (e) => {
      e.preventDefault();
      const arrValue = this.getValue(this.angle3d.inputs);
      const angle = angleBetweenVectors(...arrValue);
      if (arrValue.flat(1).every(item => item !== '')) {
        this.angle3d.result.node.textContent = angle.toFixed(2);
      } else {
        this.angle3d.result.node.textContent = 'Заполните поля';
      }
    });

    this.triangle = new Block(this.node, 'Углы, стороны, площадь, периметр и высота для треугольника',
      [['x1', 'y1'], ['x2', 'y2'], ['x3', 'y3']]).renderForm();
    this.triangle.button.node.addEventListener('click', (e) => {
      e.preventDefault();
      const arrValue = this.getValue(this.triangle.inputs);
      const triangle = getTriangleParameters(...arrValue);
      if (triangle.angles.filter(angle => angle > 0).length === 3) {
        this.triangle.result.node.innerHTML =
          `Cтороны: ${triangle.sideLengths.map(item => item.toFixed(2))}<br>
          Углы: ${triangle.angles.map(item => item.toFixed(2))}<br>
          Площадь: ${triangle.square.toFixed(2)}<br>
          Периметр: ${triangle.perimeter.toFixed(2)}<br>
          Высота: ${triangle.height.toFixed(2)}<br>`;
      } else {
        this.triangle.result.node.innerHTML = 'Не возможно построить треугольник';
      }
    });

    this.сircle = new Block(this.node, 'Площадь, диаметр, длина окружности, площадь и длина сектора',
      [['Радиус'], ['Угол сектора']]).renderForm();
    this.сircle.button.node.addEventListener('click', (e) => {
      e.preventDefault();
      const arrValue = this.getValue(this.сircle.inputs);
      const сircle = getCircleParameters(...arrValue);
      if (+arrValue[0][0] < 0) {
        this.сircle.result.node.innerHTML = 'радиус должен быть больше 0';
      } else if (+arrValue[1][0] > 360) {
        this.сircle.result.node.innerHTML = 'угол не должен быть больше 360';
      } else {
        this.сircle.result.node.innerHTML =
          `Площадь: ${сircle.square.toFixed(2)}<br>
          Диаметр: ${сircle.diameter.toFixed(2)}<br>
          Длина окружности: ${сircle.circleLength.toFixed(2)}<br>
          Площадь сектора: ${сircle.sectorSquare.toFixed(2)}<br>
          Длина сектора: ${сircle.sectorLength.toFixed(2)}<br>`;
      }
    });

    this.sphere = new Block(this.node, 'Площадь, диаметр, объем шара', [['Радиус']]).renderForm();
    this.sphere.button.node.addEventListener('click', (e) => {
      e.preventDefault();
      const arrValue = this.getValue(this.sphere.inputs);
      const sphere = getSphereParameters(...arrValue);
      if (+arrValue[0][0] < 0) {
        this.sphere.result.node.innerHTML = 'радиус должен быть больше 0';
      } else {
        this.sphere.result.node.innerHTML =
          `Площадь: ${sphere.square.toFixed(2)}<br>
          Диаметр: ${sphere.diameter.toFixed(2)}<br>
          Объем: ${sphere.volume.toFixed(2)}<br>`;
      }
    });

    this.quadrilateral = new Block(this.node, 'Площадь, периметр, стороны, углы, высоты, диагонали для произвольного четырехугольника',
      [['x1', 'y1'], ['x2', 'y2'], ['x3', 'y3'], ['x4', 'y4']]).renderForm();
    this.quadrilateral.button.node.addEventListener('click', (e) => {
      e.preventDefault();
      const arrValue = this.getValue(this.quadrilateral.inputs);

      const quadrilateral = getQuadrilateralParameters(...arrValue);
      if (!quadrilateral.angles.every(angle => angle) ||
        Math.round(quadrilateral.angles.reduce((acc, angle) => acc + angle, 0)) < 360
      ) {
        this.quadrilateral.result.node.innerHTML = 'Не возможно построить четырехугольник'
      } else {
        this.quadrilateral.result.node.innerHTML =
          `Площадь: ${quadrilateral.square.toFixed(2)}<br>
          Периметр: ${quadrilateral.perimeter.toFixed(2)}<br>
          Стороны: ${quadrilateral.sideLengths.map(item => item.toFixed(2))}<br>
          Углы: ${quadrilateral.angles.map(item => item.toFixed(2))}<br>
          Высоты: ${quadrilateral.heights.map(item => item.toFixed(2))}<br>
          Диагонали: ${quadrilateral.diagonals.map(item => item.toFixed(2))}<br>`;

      };
    });

    this.polygon = new Block(this.node, 'Площадь, периметр, стороны для многоугольника (Формула Гаусса)',
      [['x1', 'y1'], ['x2', 'y2'], ['x3', 'y3'], ['x4', 'y4'], ['x5', 'y5'], ['x6', 'y6']]).renderForm();
    this.polygon.button.node.addEventListener('click', (e) => {
      e.preventDefault();
      const arrValue = this.getValue(this.polygon.inputs);
      const polygon = getPolygonParameters(...arrValue);
      this.polygon.result.node.innerHTML =
        `Площадь: ${polygon.square.toFixed(2)}<br>
        Периметр: ${polygon.perimeter.toFixed(2)}<br>
        Стороны: ${polygon.sideLengths.map(item => item.toFixed(2))}<br>`;
    });

    this.cylinder = new Block(this.node, 'Площадь и объем цилиндра', [['Радиус'], ['Высота']]).renderForm();
    this.cylinder.button.node.addEventListener('click', (e) => {
      e.preventDefault();
      const arrValue = this.getValue(this.cylinder.inputs);
      const cylinder = getСylinderParameters(...arrValue);
      if (!arrValue.every(item => +item >= 0)) {
        this.cylinder.result.node.innerHTML = 'Значение должно быть больше 0';
      } else {
        this.cylinder.result.node.innerHTML =
          `Площадь: ${cylinder.square.toFixed(2)}<br>
        Объем: ${cylinder.volume.toFixed(2)}<br>`;
      }
    });

    this.сone = new Block(this.node, 'Площадь, объем и длина грани конуса', [['Радиус'], ['Высота']]).renderForm();
    this.сone.button.node.addEventListener('click', (e) => {
      e.preventDefault();
      const arrValue = this.getValue(this.сone.inputs);
      const сone = getСoneParameters(...arrValue);
      if (!arrValue.every(item => +item >= 0)) {
        this.сone.result.node.innerHTML = 'Значение должно быть больше 0';
      } else {
        this.сone.result.node.innerHTML =
          `Площадь: ${сone.square.toFixed(2)}<br>
          Объем: ${сone.volume.toFixed(2)}<br>
          Длина грани: ${сone.l.toFixed(2)}<br>`;
      }
    });

    this.cub = new Block(this.node, 'Площадь, периметр, объем и диагональ прямоугольного параллелепипеда',
      [['Длина А'], ['Длина B'], ['Длина C']]).renderForm();
    this.cub.button.node.addEventListener('click', (e) => {
      e.preventDefault();
      const arrValue = this.getValue(this.cub.inputs);
      const cub = getCubParameters(...arrValue);
      console.log(arrValue)
      if (!arrValue.every(item => +item >= 0)) {
        this.cub.result.node.innerHTML = 'Значение должно быть больше 0';
      } else {
        this.cub.result.node.innerHTML =
          `Площадь: ${cub.square.toFixed(2)}<br>
          Объем: ${cub.volume.toFixed(2)}<br>
          Периметр: ${cub.perimeter.toFixed(2)}<br>
          Диагональ: ${cub.diagonal.toFixed(2)}<br>`;
      }

    });
  }

  getValue(inputs) {
    return inputs.map((input) => {
      return input.map((inputComponent) => inputComponent.node.value);
    });
  }
}

export default App;
