import { StackContext, Api, ReactStaticSite } from "@serverless-stack/resources";

export function IslandAnimalsStack({ stack }: StackContext) {
  const site = new ReactStaticSite(stack, "IslandAnimals", {
    path: "island-animals/"
  })

  stack.addOutputs({
    SiteUrl: site.url
  });
}
