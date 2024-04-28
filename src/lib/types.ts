export type AnnotationType = {
  id: number;
  shapeType: string;
  label: string;
  isEditing: boolean;
  showForm: boolean;
  shapeData: {
    x: number;
    y: number;
    width: number;
    height: number;
    centerX?: number;
    centerY?: number;
    radius?: number;
  };
};

export type Tool = "rectangle" | "circle" | "select";
