import global from "./global.json";
import es from "./es.json";
import uk from "./uk.json";
import us from "./us.json";

export const validationPatterns: any = {
  global: global,
  "es-ES": es,
  "en-GB": uk,
  "en-US": us,
};
export default validationPatterns;
