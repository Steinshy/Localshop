"use client";

import { redirect } from 'next/navigation';

export default function Order() {
  redirect('/order/cart');
}
