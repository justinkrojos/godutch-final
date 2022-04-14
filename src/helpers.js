import * as ExpenseMessages from "./constants/ExpenseMessages";
import { Platform, InteractionManager } from "react-native";

export const fixTimeoutWarning = () => {
  const _setTimeout = global.setTimeout;
  const _clearTimeout = global.clearTimeout;
  const MAX_TIMER_DURATION_MS = 60 * 1000;
  if (Platform.OS === "android") {
    // Work around issue `Setting a timer for long time`
    // see: https://github.com/firebase/firebase-js-sdk/issues/97
    const timerFix = {};
    const runTask = (id, fn, ttl, args) => {
      const waitingTime = ttl - Date.now();
      if (waitingTime <= 1) {
        InteractionManager.runAfterInteractions(() => {
          if (!timerFix[id]) {
            return;
          }
          delete timerFix[id];
          fn(...args);
        });
        return;
      }

      const afterTime = Math.min(waitingTime, MAX_TIMER_DURATION_MS);
      timerFix[id] = _setTimeout(() => runTask(id, fn, ttl, args), afterTime);
    };

    global.setTimeout = (fn, time, ...args) => {
      if (MAX_TIMER_DURATION_MS < time) {
        const ttl = Date.now() + time;
        const id = "_lt_" + Object.keys(timerFix).length;
        runTask(id, fn, ttl, args);
        return id;
      }
      return _setTimeout(fn, time, ...args);
    };

    global.clearTimeout = (id) => {
      if (typeof id === "string" && id.startsWith("_lt_")) {
        _clearTimeout(timerFix[id]);
        delete timerFix[id];
        return;
      }
      _clearTimeout(id);
    };
  }
};

export const roundToTwoDP = (num) => {
  num = parseFloat(num);
  const rounded = +(Math.round(num + "e+2") + "e-2");
  return rounded.toFixed(2);
};

export const getExpenseStatus = (num, initialColor) => {
  const initialExpenseStatus = {
    message: "All Expenses Settled",
    colour: initialColor,
    total: 0,
  };

  const expenseStatus = initialExpenseStatus;

  if (num < 0) {
    expenseStatus.message = ExpenseMessages.OWING;
    expenseStatus.colour = "#F84A24";
    expenseStatus.total = roundToTwoDP(num * -1);
  } else if (num > 0) {
    expenseStatus.message = ExpenseMessages.OWED;
    expenseStatus.total = roundToTwoDP(num);
    expenseStatus.colour = "#24D2F8";
  } else {
    return initialExpenseStatus;
  }
  return expenseStatus;
};

export const getMoneyText = (value) => {
  return value >= 0 ? `$${value}` : `-$${roundToTwoDP(Math.abs(value))}`;
};

export function isFloat(value) {
  const stringValue = value.toString();
  const split =
    stringValue.indexOf(".") >= 0 ? stringValue.split(".") : [value];

  return (
    parseFloat(stringValue.match(/^-?\d*(\.\d+)?$/)) > 0 &&
    ((split.length <= 2 && split[1] && split[1].length <= 2) ||
      split.length == 1)
  );
}
