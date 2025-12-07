import DatePicker from "./DatePicker";

function DatePickerDemo() {
  return (
    <div className="mb-10">
      <h4 className="mb-2">Date Picker:</h4>
      <div className="w-[312px]">
        <DatePicker
          mode="range"
          disablePastDates
          validateRange
          onChange={(val: Date | [Date, Date] | null) => console.log("Selected:", val)}
          placeholder="Select date range"
        />
      </div>
    </div>
  );
}

export default DatePickerDemo;
