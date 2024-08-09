import { PromptTemplateOptions } from "@/types";
import { hbs, hbsAsync } from "./handlebars";
import { registerHelpers, registerPartials } from "./handlebars";

export function replaceTemplateString(
  templateString?: string,
  substitutions: Record<string, any> = {},
  configuration: PromptTemplateOptions = {
    helpers: [],
    partials: [],
  }
): string {
  if (!templateString) return templateString || "";

  const tempHelpers = [];
  const tempPartials = [];

  if (Array.isArray(configuration.helpers)) {
    registerHelpers(configuration.helpers, hbs);
    tempHelpers.push(...configuration.helpers.map((a) => a.name));
  }

  if (Array.isArray(configuration.partials)) {
    registerPartials(configuration.partials, hbs);
    tempPartials.push(...configuration.partials.map((a) => a.name));
  }

  const template = hbs.compile(templateString);
  const res = template(substitutions, {
    allowedProtoMethods: {
      substring: true,
    },
  });

  tempHelpers.forEach(function (n) {
    hbs.unregisterHelper(n);
  });

  tempPartials.forEach(function (n) {
    hbs.unregisterPartial(n);
  });

  return res;
}

export async function replaceTemplateStringAsync(
  templateString?: string,
  substitutions: Record<string, any> = {},
  configuration: PromptTemplateOptions = {
    helpers: [],
    partials: [],
  }
) {
  if (!templateString) return Promise.resolve(templateString || "");
  const tempHelpers = [];
  const tempPartials = [];

  if (Array.isArray(configuration.helpers)) {
    registerHelpers(configuration.helpers, hbsAsync);
    tempHelpers.push(...configuration.helpers.map((a) => a.name));
  }

  if (Array.isArray(configuration.partials)) {
    registerPartials(configuration.partials, hbsAsync);
    tempPartials.push(...configuration.partials.map((a) => a.name));
  }

  const template = hbsAsync.compile(templateString);
  const res = await (template(substitutions, {
    allowedProtoMethods: {
      substring: true,
    },
  }) as unknown as Promise<string>);

  tempHelpers.forEach(function (n) {
    hbsAsync.unregisterHelper(n);
  });

  tempPartials.forEach(function (n) {
    hbsAsync.unregisterPartial(n);
  });

  return res;
}
