import React, { useState, useRef, useEffect } from "react";

const Calendar = () => {
  const currentDate = new Date();
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
  const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);
  const monthDropdownRef = useRef(null);
  const yearDropdownRef = useRef(null);

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getMonthName = (month) => {
    return new Intl.DateTimeFormat("en-US", { month: "short" }).format(
      new Date(2000, month, 1)
    );
  };

  const getWeekdayName = (day) => {
    return new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(
      new Date(2000, 0, day + 2)
    );
  };

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
    setIsMonthDropdownOpen(false);
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
    setIsYearDropdownOpen(false);
  };

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleClickOutside = (event) => {
    if (
      monthDropdownRef.current &&
      !monthDropdownRef.current.contains(event.target)
    ) {
      setIsMonthDropdownOpen(false);
    }
    if (
      yearDropdownRef.current &&
      !yearDropdownRef.current.contains(event.target)
    ) {
      setIsYearDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const renderDaysList = () => {
    return Array.from({ length: 7 }, (_, i) => (
      <div
        key={i}
        className="flex-1 text-center text-gray-600 text-xs font-bold uppercase tracking-wider py-2"
      >
        {getWeekdayName(i)}
      </div>
    ));
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
    const firstDay = new Date(selectedYear, selectedMonth, 1).getDay();

    const calendar = [];

    for (let i = 0; i < firstDay; i++) {
      calendar.push(<div key={`empty-${i}`} className="aspect-square" />);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(selectedYear, selectedMonth, i);
      const isSelected = date.toDateString() === selectedDate.toDateString();
      const isToday = date.toDateString() === currentDate.toDateString();

      calendar.push(
        <button
          key={i}
          onClick={() => handleDateClick(date)}
          className={`aspect-square flex items-center justify-center rounded-lg font-semibold transition-all ${
            isSelected
              ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg scale-105"
              : isToday
              ? "border-2 border-blue-500 text-blue-600 font-bold"
              : "text-gray-700 hover:bg-gray-100"
          }`}
          aria-label={`${i} ${getMonthName(selectedMonth)} ${selectedYear}`}
          aria-current={isToday ? "date" : undefined}
        >
          {i}
        </button>
      );
    }

    return calendar;
  };

  return (
    <div className="w-full bg-gradient-to-br from-white to-indigo-50 rounded-2xl p-5 shadow-lg border border-indigo-200">
      <div className="flex gap-3 items-center mb-5 justify-center">
        <div ref={monthDropdownRef} className="relative">
          <button
            onClick={() => setIsMonthDropdownOpen(!isMonthDropdownOpen)}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold hover:from-blue-600 hover:to-indigo-600 transition-all shadow-lg hover:shadow-xl hover:scale-105"
            aria-haspopup="listbox"
            aria-expanded={isMonthDropdownOpen}
          >
            {getMonthName(selectedMonth)}
          </button>

          {isMonthDropdownOpen && (
            <div className="absolute top-full mt-2 bg-white/95 backdrop-blur-xl border-2 border-blue-200 shadow-2xl rounded-xl p-3 z-10 grid grid-cols-3 gap-2 w-56">
              {Array.from({ length: 12 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleMonthChange(i)}
                  className={`px-3 py-2 rounded-lg font-semibold transition-all ${
                    i === selectedMonth
                      ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg"
                      : "hover:bg-blue-50 text-slate-700"
                  }`}
                >
                  {getMonthName(i)}
                </button>
              ))}
            </div>
          )}
        </div>

        <div ref={yearDropdownRef} className="relative">
          <button
            onClick={() => setIsYearDropdownOpen(!isYearDropdownOpen)}
            className="px-5 py-2.5 rounded-xl bg-white border-2 border-slate-300 text-slate-700 font-bold hover:bg-slate-50 hover:border-slate-400 transition-all shadow-md hover:shadow-lg hover:scale-105"
            aria-haspopup="listbox"
            aria-expanded={isYearDropdownOpen}
          >
            {selectedYear}
          </button>

          {isYearDropdownOpen && (
            <div className="absolute top-full mt-2 bg-white/95 backdrop-blur-xl border-2 border-slate-300 shadow-2xl rounded-xl p-2 z-10 max-h-56 overflow-y-auto w-24">
              {Array.from({ length: 50 }).map((_, index) => {
                const year = currentDate.getFullYear() - 25 + index;
                return (
                  <button
                    key={year}
                    onClick={() => handleYearChange(year)}
                    className={`w-full px-3 py-2 text-center rounded-lg font-semibold transition-all ${
                      year === selectedYear
                        ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg"
                        : "hover:bg-slate-50 text-slate-700"
                    }`}
                  >
                    {year}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="border-t-2 border-indigo-200 pt-4">
        <div className="grid grid-cols-7 gap-1 mb-3">{renderDaysList()}</div>
        <div className="grid grid-cols-7 gap-2">{renderCalendar()}</div>
      </div>
    </div>
  );
};

export default Calendar;
