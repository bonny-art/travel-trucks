import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useField } from "formik";
import { DayPicker, defaultLocale } from "react-day-picker";
import { format, isBefore, startOfDay } from "date-fns";

import styles from "./DateInput.module.css";

const customLocale = {
  ...defaultLocale,
  localize: {
    ...defaultLocale.localize,
    day: (n) => ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][n],
  },
  options: {
    ...defaultLocale.options,
    weekStartsOn: 1,
  },
};

const DateInput = ({ name }) => {
  const [field, meta, helpers] = useField(name);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  const today = useMemo(() => startOfDay(new Date()), []);

  const handleClickOutside = useCallback((event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  const handleSelect = (date) => {
    if (!date) return;

    const selected = startOfDay(date);

    helpers.setTouched(true);

    if (isBefore(selected, today)) {
      helpers.setError("Select a date starting from today");
      return;
    }

    helpers.setValue(selected);
    setIsOpen(false);
  };

  return (
    <div className={styles.fieldWrapper}>
      <input
        type="text"
        readOnly
        placeholder="Booking date*"
        value={field.value ? format(field.value, "dd.MM.yyyy") : ""}
        onClick={() => setIsOpen((prev) => !prev)}
        className={styles.fieldStyled}
      />

      {isOpen && (
        <div ref={ref} className={styles.calendarWrapper}>
          <DayPicker
            mode="single"
            selected={field.value}
            navLayout="around"
            showOutsideDays
            onSelect={handleSelect}
            fromDate={today}
            weekStartsOn={1}
            locale={customLocale}
            className={styles.dayPicker}
            classNames={{
              months: styles.months,
              month_caption: styles.monthCaption,
              button_previous: styles.buttonPrevious,
              button_next: styles.buttonNext,
              chevron: styles.chevron,
              caption_label: styles.captionLabel,
              nav: styles.nav,
              selected: styles.selected,
              dropdown: styles.dropdown,
              today: styles.today,
              month_grid: styles.monthGrid,
              weekdays: styles.weekdays,
              weekday: styles.weekday,
              weeks: styles.weeks,
              week: styles.week,
              day: styles.day,
              outside: styles.outside,
              day_button: styles.dayButton,
            }}
          />
        </div>
      )}

      {meta.touched && meta.error && (
        <div className={styles.errorStyled}>{meta.error}</div>
      )}
    </div>
  );
};

export default DateInput;
