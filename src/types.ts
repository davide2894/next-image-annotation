export type AnnotationType = {
  id: number;
  shapeType: string;
  shapeData: RectangleShapeData | CircleShapeData;
  label: string;
  editing: boolean;
};

export type RectangleShapeData = {
  x: number;
  y: number;
  width: number;
  height: number;
};
export type CircleShapeData = {
  centerX: number;
  centerY: number;
  radius: number;
};
