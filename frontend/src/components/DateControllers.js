import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const DateControllers = ({
  setIsModalOpen,
  selectedDay,
  setSelectedDay,
  setMonthNumber,
  monthNumber,
  localDate,
}) => {
  return (
    <div className="controls">
      <button
        className="btn btn-primary"
        type="button"
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        Add ToDo
      </button>
      <div className="calendar">
        <div className="month">
          <IoIosArrowBack
            className="arrow-back"
            onClick={() => {
              if (monthNumber <= 1) setMonthNumber(12);
              else setMonthNumber(monthNumber - 1);
            }}
          />
          <div>
            <p className="title">Month</p>
            <p className="month-number">
              {monthNumber < 10 ? "0" + monthNumber : monthNumber}
            </p>
          </div>
          <IoIosArrowForward
            className="arrow-forward"
            onClick={() => {
              if (monthNumber >= 12) setMonthNumber(1);
              else setMonthNumber(monthNumber + 1);
            }}
          />
        </div>
        <div className="days">
          {[
            ...Array(
              monthNumber == 2
                ? 29
                : monthNumber < 8
                ? monthNumber % 2 == 0
                  ? 31
                  : 32
                : monthNumber % 2 == 0
                ? 32
                : 31
            ),
          ].map((_, index) => {
            if (index > 0) {
              return (
                <div
                  key={index}
                  className={`${
                    index === selectedDay
                      ? "selected-"
                      : Number(localDate.split(".")[0]) >= index ||
                        monthNumber < Number(localDate.split(".")[1])
                      ? monthNumber > Number(localDate.split(".")[1])
                        ? ""
                        : "past-"
                      : ""
                  }day`}
                  onClick={() => setSelectedDay(index)}
                >
                  {index}
                </div>
              );
            } else {
              return;
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default DateControllers;
