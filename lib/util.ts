import getDaysInMonth from "date-fns/getDaysInMonth";
import isFuture from "date-fns/isFuture";
import findIndex from "lodash/findIndex";
import includes from "lodash/includes";
import parseInt from "lodash/parseInt";
import size from "lodash/size";

import { devicesWithDynamicIsland, devicesWithNotch } from "./devices";

export const hasNotchOrDynamicIsland = (device: string) => {
  const deviceWithNotch = findIndex(devicesWithNotch, (_device) =>
    includes(device, _device.model)
  );
  const deviceWithDynamicIsland = findIndex(
    devicesWithDynamicIsland,
    (_device) => includes(device, _device.model)
  );

  return deviceWithNotch !== -1 || deviceWithDynamicIsland !== -1;
};

export const isDateValid = (date: string, month: string, year: string) => {
  const _date = parseInt(date);
  const _month = parseInt(month);
  const _year = parseInt(year);

  if (size(date) > 2 && size(month) > 2 && size(year) > 4)
    return "you've entered an invalid date";

  const isYearValid = _year >= 1001;
  const isMonthValid = _month >= 1 && _month <= 12;

  if (!isYearValid || !isMonthValid) return "you've entered an invalid date";

  const isCurrentDateValid =
    _date >= 1 && _date <= getDaysInMonth(new Date(_year, _month - 1));

  if (!isCurrentDateValid) return "you've entered an invalid date";

  if (isFuture(new Date(_year, _month - 1, _date)))
    return "future dates can't be added";

  return "";
};
