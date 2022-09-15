export function getLengthVector([x1, y1, z1 = 0], [x2, y2, z2 = 0]) {
  return Math.hypot((x1 - x2), (y1 - y2), (z1 - z2));
}

export function angleBetweenVectors([x1, y1, z1 = 0], [x2, y2, z2 = 0]) {
  const scalarProduct = (x1 * x2 + y1 * y2 + z1 * z2);
  const moduleFirst = Math.hypot(x1, y1, z1);
  const moduleSecond = Math.hypot(x2, y2, z2);
  const result = Math.acos(scalarProduct / (moduleFirst * moduleSecond));

  return (result * 180) / Math.PI;
}

export function getTriangleParameters([x1, y1], [x2, y2], [x3, y3]) {
  const result = {};
  const AB = Math.hypot((x2 - x1), (y2 - y1));
  const AC = Math.hypot((x3 - x2), (y3 - y2));
  const BC = Math.hypot((x1 - x3), (y1 - y3));
  const perimeter = AB + AC + BC;
  const semiPerimeter = perimeter / 2;
  const square = Math.sqrt(semiPerimeter * (semiPerimeter - AB) * (semiPerimeter - AC) * (semiPerimeter - BC));

  const CAB = (Math.acos(((AC ** 2) + (AB ** 2) - (BC ** 2)) / (2 * AC * AB)) * 180) / Math.PI;
  const ACB = (Math.acos(((AC ** 2) + (BC ** 2) - (AB ** 2)) / (2 * AC * BC)) * 180) / Math.PI;
  const ABC = (Math.acos(((BC ** 2) + (AB ** 2) - (AC ** 2)) / (2 * BC * AB)) * 180) / Math.PI;
  const height = BC * Math.sin(ACB * Math.PI / 180);

  result.sideLengths = [AB, AC, BC];
  result.angles = [CAB, ACB, ABC];
  result.perimeter = perimeter;
  result.semiPerimeter = semiPerimeter;
  result.square = square;
  result.height = height;

  return result;
}

export function getCircleParameters(radius, angle) {
  if (!angle) {
    angle = 360;
  }
  const result = {};
  result.diameter = 2 * +radius;
  result.circleLength = 2 * Math.PI * radius;
  result.square = Math.PI * radius ** 2;
  result.sectorSquare = (result.square / 360) * angle;
  result.sectorLength = ((Math.PI * radius) / 180) * angle;
  return result;
}

export function getSphereParameters(radius) {
  const result = {};
  result.diameter = 2 * radius;
  result.square = 4 * Math.PI * radius ** 2;
  result.volume = (4 / 3) * Math.PI * radius ** 3;
  return result;
}

export function getQuadrilateralParameters([x1, y1], [x2, y2], [x3, y3], [x4, y4]) {
  const result = {};
  const AB = Math.hypot((x2 - x1), (y2 - y1));
  const BC = Math.hypot((x3 - x2), (y3 - y2));
  const CD = Math.hypot((x4 - x3), (y4 - y3));
  const AD = Math.hypot((x1 - x4), (y1 - y4));
  const diagonalAC = Math.hypot((x3 - x1), (y3 - y1));
  const diagonalBD = Math.hypot((x4 - x2), (y4 - y2));
  result.sideLengths = [AB, BC, CD, AD];
  result.perimeter = result.sideLengths.reduce((acc, item) => acc + item, 0);
  result.semiPerimeter = result.perimeter / 2;
  const ABC = (Math.acos(((AB ** 2) + (BC ** 2) - (diagonalAC ** 2)) / (2 * AB * BC)) * 180) / Math.PI;
  const ADC = (Math.acos(((AD ** 2) + (CD ** 2) - (diagonalAC ** 2)) / (2 * AD * CD)) * 180) / Math.PI;
  const BAD = (Math.acos(((AB ** 2) + (AD ** 2) - (diagonalBD ** 2)) / (2 * AB * AD)) * 180) / Math.PI;
  const BCD = (Math.acos(((BC ** 2) + (CD ** 2) - (diagonalBD ** 2)) / (2 * BC * CD)) * 180) / Math.PI;
  result.angles = [ABC, BCD, ADC, BAD];
  const angle = Math.cos((ABC * Math.PI / 180 + ADC * Math.PI / 180) / 2);
  const p = result.semiPerimeter;
  result.square = Math.sqrt((p - AB) * (p - BC) * (p - CD) * (p - AD) - (AB * BC * CD * AD) * angle ** 2);

  const firstHight = AB * Math.sin(BAD * Math.PI / 180);
  const secondHight = CD * Math.sin(ADC * Math.PI / 180);
  result.heights = [firstHight, secondHight];
  result.diagonals = [diagonalAC, diagonalBD];

  return result;
}

export function getCubParameters(a, b, c) {
  const result = {};
  result.square = 2 * (a * b + a * c + b * c);
  result.volume = a * b * c;
  result.perimeter = (a + b + c) * 4;
  result.diagonal = Math.hypot(a, b, c);

  return result;
}

export function getPolygonParameters(...args) {
  const result = {};
  const sideLengths = [];
  const sum1 = args.reduce((acc, item, index, arr) => {
    if (arr[index + 1]) {
      sideLengths.push(Math.hypot((arr[index + 1][0] - item[0]), (arr[index + 1][1] - item[1])));
      return acc + item[0] * arr[index + 1][1];
    } else {
      sideLengths.push(Math.hypot((arr[0][0] - item[0]), (arr[0][1] - item[1])));
      return acc + item[0] * arr[0][1]
    }
  }, 0)

  const sum2 = args.reduce((acc, item, index, arr) => {
    if (arr[index + 1]) {
      return acc + item[1] * arr[index + 1][0];
    } else {
      return acc + item[1] * arr[0][0]
    }
  }, 0)
  result.sideLengths = sideLengths;
  result.square = Math.abs(sum1 - sum2) / 2;
  result.perimeter = sideLengths.reduce((acc, item) => acc + item, 0);

  return result;
}

export function getСylinderParameters(r, h) {
  const result = {};
  result.volume = Math.PI * r ** 2 * h;
  result.square = (2 * Math.PI * r ** 2) + (2 * Math.PI * r * h);

  return result;
}

export function getСoneParameters(r, h) {
  const result = {};
  result.l = Math.hypot(r, h);
  result.volume = Math.PI * r ** 2 * h / 3;
  result.square = (Math.PI * r ** 2) + (Math.PI * r * result.l);

  return result;
}
