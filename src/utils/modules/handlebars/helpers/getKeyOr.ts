import { get } from "@/utils/modules/get";

export function getKeyOr(this: any, key: string, arg2: any) {
  const res = get(this, key);
  return typeof res !== "undefined" && res !== "" ? res : arg2;
}
