import equipment1 from "./equipment-1.png";
import equipment2 from "./equipment-2.png";
import glassware1 from "./glassware-1.png";
import glassware2 from "./glassware-2.png";
import materials1 from "./materials-1.png";
import materials2 from "./materials-2.png";

import measurement1 from "./measurement-1.png";
import models1 from "./models-1.png";
import models2 from "./models-2.png";
import models3 from "./models-3.png";
import models4 from "./models-4.png";

import safety1 from "./safety-1.png";
import safety2 from "./safety-2.png";
import tools1 from "./tools-1.png";
import tools2 from "./tools-2.png";
import tools3 from "./tools-3.png";

enum StockImages {
  equipment1 = "equipment1",
  equipment2 = "equipment2",
  glassware1 = "glassware1",
  glassware2 = "glassware2",
  materials1 = "materials1",
  materials2 = "materials2",
  measurement1 = "measurement1",
  models1 = "models1",
  models2 = "models2",
  models3 = "models3",
  models4 = "models4",
  safety1 = "safety1",
  safety2 = "safety2",
  tools1 = "tools1",
  tools2 = "tools2",
  tools3 = "tools3",
}

const imageDictionary: Record<StockImages, string> = {
  equipment1,
  equipment2,
  glassware1,
  glassware2,
  materials1,
  materials2,
  measurement1,
  models1,
  models2,
  models3,
  models4,
  safety1,
  safety2,
  tools1,
  tools2,
  tools3,
};

export {
  equipment1,
  equipment2,
  glassware1,
  glassware2,
  materials1,
  materials2,
  measurement1,
  models1,
  models2,
  models3,
  models4,
  safety1,
  safety2,
  tools1,
  tools2,
  tools3,
  imageDictionary,
  StockImages,
};
