import { orderByList } from "../types/types.shared";

export default function buildLocalizedOptions(orderBy: any, t: any) {
  const localizedArr: Array<orderByList> = [];
  orderBy.forEach((item: any) => {
    const tempObj = {
      id: item.id,
      label: t(item.label),
      value: item.value,
    };
    localizedArr.push(tempObj);
  });

  return {
    localizedArr,
  };
}
