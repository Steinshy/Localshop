"use client";

export default function UserLayout({ children }) {
  
  return (
    <div className="max-w-screen-xl mx-auto flex flex-col my-8">
      {children}
    </div>
  );
}
