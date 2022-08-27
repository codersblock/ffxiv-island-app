import { IslandAnimalsStack } from "./IslandAnimalsStack";
import { App } from "@serverless-stack/resources";

export default function (app: App) {
  app.setDefaultFunctionProps({
    runtime: "nodejs16.x",
    srcPath: "island-animals",
    bundle: {
      format: "esm",
    },
  });
  app.stack(IslandAnimalsStack);
}
