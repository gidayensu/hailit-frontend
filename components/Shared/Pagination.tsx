"use client";
import { useState } from "react";

export default function Pagination() {
  const [firstShownButton, setFirstShownButton] = useState(1);
  const [lastButOneShownButton, setLastButOneShownButton] = useState(3);
  const [activePage, setActivePage] = useState("first");
  const totalPage = 5;

  const handleFirst = () => {
    setFirstShownButton(1);
    setLastButOneShownButton(3);
    setActivePage("first");
  };

  const handleLast = () => {
    setFirstShownButton(totalPage - 3);
    setLastButOneShownButton(totalPage);
    setActivePage("third");
  };
  const handleNext = () => {
    setFirstShownButton(firstShownButton + 1);
    setLastButOneShownButton(lastButOneShownButton + 1);
  };

  const handlePrevious = () => {
    setFirstShownButton(firstShownButton - 1);
    setLastButOneShownButton(lastButOneShownButton - 1);
  };

  const handleActivePage = (active: string) => {
    setActivePage(active);
  };

  return (
    <div className="flex gap-2 items-center justify-center">
      <p onClick={handlePrevious}>{firstShownButton > 1 ? "Previous" : ""}</p>
      <p onClick={handleFirst} className={``}>
        {firstShownButton > 2 ? 1 : ""}
      </p>
      <p>{firstShownButton > 2 ? "..." : ""}</p>
      <p
        className={`${activePage === "first" ? "bg-red-500" : ""}`}
        onClick={() => handleActivePage("first")}
      >
        {firstShownButton}
      </p>
      <p
        className={`${activePage === "second" ? "bg-red-500" : ""}`}
        onClick={() => handleActivePage("second")}
      >
        {firstShownButton + 1}
      </p>
      <p
        className={`${activePage === "third" ? "bg-red-500" : ""}`}
        onClick={() => handleActivePage("third")}
      >
        {lastButOneShownButton}
      </p>
      <p>{totalPage > lastButOneShownButton + 1 ? "..." : ""}</p>
      <p onClick={handleLast}>
        {totalPage > lastButOneShownButton ? totalPage : ""}
      </p>
      <p onClick={handleNext}>
        {totalPage > lastButOneShownButton ? "Next" : ""}
      </p>
    </div>
  );
}
