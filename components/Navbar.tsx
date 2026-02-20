"use client";
export default function Navbar() {
  return (
    <div className="fixed  w-full flex justify-between items-center py-2 bg-white z-9999">
      <div></div>
      <div className="flex justify-center items-center gap-3">
        <img src="/logo.svg" className="w-8" alt="" />
        <div className="font-bold flex text-xl">
          <p className="text-correct">WORD</p>
          <p className="text-incorrect">RUSH</p>
        </div>
      </div>
      <div></div>
    </div>
  );
}
