import * as React from "react";
import { Keyboard, StyleSheet, TextInput, View } from "react-native";
import getDate from "date-fns/getDate";
import getMonth from "date-fns/getMonth";
import getYear from "date-fns/getYear";
import isValid from "date-fns/isValid";
import isEmpty from "lodash/isEmpty";
import padStart from "lodash/padStart";
import size from "lodash/size";

import { isDateValid } from "../lib/util";

import Text from "./ui/text";

interface Props {
  date: string;
  setDate: (value: string) => void;
}

const DateInput = ({ date: incomingDate, setDate: incomingSetDate }: Props) => {
  let _date = new Date(incomingDate);
  const isIncomingDateValid = isValid(_date);

  if (!isIncomingDateValid) _date = new Date();

  const [date, setDate] = React.useState(
    padStart(getDate(_date).toString(), 2, "0")
  );
  const [month, setMonth] = React.useState(
    padStart((getMonth(_date) + 1).toString(), 2, "0")
  );
  const [year, setYear] = React.useState(
    padStart(getYear(_date).toString(), 4, "0")
  );
  const [error, setError] = React.useState("");

  const monthRef = React.useRef<TextInput>(null);
  const yearRef = React.useRef<TextInput>(null);

  React.useEffect(() => {
    setError("");

    if (size(date) === 2 && isEmpty(month)) monthRef.current?.focus();

    if (size(month) === 2 && isEmpty(year)) yearRef.current?.focus();

    const error = isDateValid(date, month, year);

    if (isEmpty(error) && !isEmpty(date) && !isEmpty(month) && !isEmpty(year)) {
      incomingSetDate(`${year}-${month}-${date}`);
      Keyboard.dismiss();
      return;
    }

    if (!isEmpty(date) && !isEmpty(month) && !isEmpty(year)) setError(error);
  }, [date, month, year]);

  return (
    <View>
      <View
        style={[styles.container, !isEmpty(error) && styles.errorContainer]}
      >
        <View style={styles.innerContainer}>
          <TextInput
            placeholder="DD"
            placeholderTextColor="#4b5563"
            value={date}
            onChangeText={(date) => setDate(date)}
            inputMode="numeric"
            returnKeyType="next"
            style={styles.input}
            maxLength={2}
          />
        </View>
        <View style={styles.separator} />
        <View style={styles.innerContainer}>
          <TextInput
            placeholder="MM"
            placeholderTextColor="#4b5563"
            value={month}
            onChangeText={(month) => setMonth(month)}
            inputMode="numeric"
            returnKeyType="next"
            style={styles.input}
            maxLength={2}
            ref={monthRef}
          />
        </View>
        <View style={styles.separator} />
        <View style={styles.innerContainer}>
          <TextInput
            placeholder="YYYY"
            placeholderTextColor="#4b5563"
            value={year}
            onChangeText={(year) => setYear(year)}
            inputMode="numeric"
            returnKeyType="done"
            style={styles.input}
            maxLength={4}
            ref={yearRef}
          />
        </View>
      </View>
      {!isEmpty(error) ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#1f2937",
    borderRadius: 16,
  },
  innerContainer: {
    flex: 1,
    alignItems: "center",
  },
  input: {
    fontSize: 16,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 16,
    paddingRight: 16,
    color: "#e5e7eb",
  },
  separator: {
    height: 16,
    width: 1,
    backgroundColor: "#4b5563",
    transform: [{ rotate: "16deg" }],
  },
  errorContainer: {
    borderColor: "#dc2626",
  },
  errorText: {
    color: "#dc2626",
    marginTop: 4,
    marginLeft: 4,
    fontSize: 14,
  },
});

export default DateInput;
