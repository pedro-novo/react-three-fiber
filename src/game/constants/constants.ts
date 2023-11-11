import { BoxGeometry, MeshStandardMaterial, Vector3 } from "three";

export const boxGeometry = new BoxGeometry(1, 1, 1);
export const startEndBlockMaterial = new MeshStandardMaterial({ color: "limegreen" });
export const trapBlockMaterial = new MeshStandardMaterial({ color: "greenyellow" });
export const obstacleBlockMaterial = new MeshStandardMaterial({ color: "orangered" });
export const wallBlockMaterial = new MeshStandardMaterial({ color: "slategrey" });

export interface BlockProps {
  position?: Vector3;
}
