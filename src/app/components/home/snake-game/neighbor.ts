export function upperNeighbor(
  cell: number,
  dimension: number,
  latticeSize: number
): number {
  const props = getNeighborProperties(cell, latticeSize, dimension);
  return (
    ((cell + props.distanceToNeighbor) % props.rangelength) + props.rangestart
  );
}

export function lowerNeighbor(
  cell: number,
  dimension: number,
  latticeSize: number
): number {
  const props = getNeighborProperties(cell, latticeSize, dimension);
  return (
    ((cell - props.distanceToNeighbor + props.rangelength) %
      props.rangelength) +
    props.rangestart
  );
}

function getNeighborProperties(
  cell: number,
  latticeSize: number,
  dimension: number
) {
  const rangelength = getRangeLength(latticeSize, dimension);
  return {
    distanceToNeighbor: getDistanceToNeighbor(latticeSize, dimension),
    rangelength,
    rangestart: getRangeStart(cell, rangelength),
  };
}

function getDistanceToNeighbor(size: number, dimension: number) {
  return pow(size, dimension - 1);
}

function getRangeLength(size: number, dimension: number) {
  return pow(size, dimension);
}

function getRangeStart(cell: number, rangelength: number) {
  return Math.floor(cell / rangelength) * rangelength;
}

function pow(basis: number, exponent: number) {
  return Math.pow(basis, exponent);
}
