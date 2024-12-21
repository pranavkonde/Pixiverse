import { TILES } from "@/helpers/tiles";
import { Placement } from "./Placement";
import Sprite from "@/components/object-graphics/Sprite";

export class PlantPlacement extends Placement {
  constructor(properties, level) {
    super(properties, level);
    this.trait = properties.trait ?? 1;
  }
  isSolidForBody(_body) {
    return true;
  }
  renderComponent() {
    const traitKey = `PLANT_${this.trait}`;
    return <Sprite frameCoord={TILES[traitKey]} />;
  }
}
