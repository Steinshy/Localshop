"use client";

export default function UserLayout({ children }) {
  
  return (
    <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-8">
      {children}
    </div>
  );
}
