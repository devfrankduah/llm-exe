import { isEmpty } from "@/utils/modules/isEmpty";
import { isPromise } from "@/utils/modules/isPromise";

interface HandlebarsOptions {
  fn: (context: any) => string;
  inverse: (context: any) => string;
  hash: Record<string, any>;
}

export async function ifFnAsync (
  this: Record<string, any>,
  conditional: any,
  options: HandlebarsOptions
) {
  if (arguments.length !== 2) {
    throw new Error("#if requires exactly one argument");
  }

  if (isPromise(conditional)) {
    conditional = await conditional;
  }

  else if (typeof conditional === "function") {
    conditional = conditional.call(this);
  }
  // Default behavior is to render the positive path if the value is truthy and not empty.
  // The `includeZero` option may be set to treat the conditional as purely not empty based on the
  // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
  if ((!options.hash.includeZero && !conditional) || isEmpty(conditional)) {
    return options.inverse(this);
  } else {
    return options.fn(this);
  }
}
