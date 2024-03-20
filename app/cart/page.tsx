"use client";

// React context
import { useContext, useEffect, useState } from "react";

// Components - Generation
import { CartContext } from "../utils/cartProvider";
import { generateSlug } from "../utils/interfaces";

// Zod
import { z } from "zod";

// Formik
import { Formik, Form, Field } from "formik";

// NextLink - NextUI
import { Image, Button, Input, Spinner } from "@nextui-org/react";
import Link from "next/link";

// React Icons
import {
  FaTrash,
  FaCartArrowDown,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";

export default function Cart() {
  const cartStore = useContext(CartContext);
  const [isLoading, setIsLoading] = useState(true);
  const [cartChecked, setCartChecked] = useState(false);
  const [cart, setCart] = useState(cartStore.data);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const calculateTotal = () => {
      let total = 0;
      cartStore.data.forEach((item) => {
        total += item.price * item.quantity;
      });
      setTotal(total);
    };

    calculateTotal();
  }, [cartStore.data]);

  useEffect(() => {
    setCart(cartStore.data);
    setCartChecked(true);
  }, [cartStore.data]);

  useEffect(() => {
    if (!cartChecked) return;
    setIsLoading(false);
  }, [cartChecked]);

  const handleUpdateCart = (event: React.MouseEvent<HTMLElement>, id: number) => {
    event.preventDefault();

    const newCart = cartStore.data.filter((item) => item.id !== id);
    cartStore.update(newCart);
  };

  const handleQuantityChange = (value: string, id: number) => {
    const newCart = cartStore.data.map((item) => {
      if (item.id === id) {
        return { ...item, quantity: parseInt(value) };
      }
      return item;
    });
    cartStore.update(newCart);
  };

  return (
    <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-8">
      {/* LEFT */}
      <div className="flex flex-col col-span-1 lg:col-span-2">
        <div className="flex justify-end items-center mb-4">
          <Button
            color="default"
            variant="light"
            onClick={() => cartStore.update([])}
            startContent={<FaTrash className="text-foreground/50" />}
            size="sm"
            isDisabled={cart.length <= 0}
            className="text-foreground/50"
          >
            Delete Cart
          </Button>
        </div>
        {cart.length <= 0 ? (
          <div className="flex flex-col flex-grow items-center justify-center">
            {isLoading ? (
              <Spinner size="lg" color="warning" label="Loading Cart..." />
            ) : (
              <>
                <FaCartArrowDown className="text-8xl text-foreground" />
                <p className="text-lg text-center mt-4">Your cart is empty</p>

                <Button
                  color="primary"
                  variant="flat"
                  href="/products"
                  as={Link}
                  className="mt-4"
                  endContent={<FaArrowRight />}
                >
                  Start shopping
                </Button>
              </>
            )}
          </div>
        ) : (
          <ul className="flex flex-col flex-grow">
            {cart.map((item) => {
              const slug = generateSlug(item.title);
              return (
                <li
                  key={item.id}
                  className="p-2 bg-background border-2 border-current text-default-100 rounded-md mb-2"
                >
                  <div className="grid grid-cols-2">
                    <div className="flex justify-start items-center">
                      <Link href={`/products/${item.id}/${slug}`}>
                        <Image
                          src={item.thumbnail}
                          alt={item.title}
                          classNames={{
                            img: "w-16 h-16 object-cover",
                            wrapper: "mr-4",
                          }}
                          radius="md"
                          shadow="none"
                        />
                      </Link>
                      <p className="text-lg text-foreground font-semibold">
                        {item.title}
                      </p>
                    </div>
                    <div className="flex justify-end items-start">
                      <Button
                        color="default"
                        variant="light"
                        className="text-foreground/25"
                        onClick={(e) => handleUpdateCart(e, item.id)}
                        startContent={<FaTrash />}
                        isIconOnly
                        size="sm"
                      />
                    </div>
                  </div>

                  <hr className="my-4" />

                  <div className="grid grid-cols-3 gap-4">
                    <p className="text-md text-foreground/50">Price</p>
                    <p className="text-md text-foreground/50">Quantity</p>
                    <p className="text-md text-foreground/50">Total</p>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <p className="text-lg text-foreground">€{item.price}</p>
                    <Input
                      type="number"
                      value={item.quantity.toString()}
                      onChange={(e) =>
                        handleQuantityChange(e.target.value, item.id)
                      }
                    />
                    <p className="text-lg text-foreground">
                      €{item.price * item.quantity}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        {/* Add condition */}
        {cart.length > 0 && (
          <div className="flex justify-start items-center mt-4">
            <Button
              color="default"
              variant="light"
              href="/products"
              as={Link}
              startContent={<FaArrowLeft className="text-foreground/50" />}
              className="text-foreground/50"
            >
              Continue shopping
            </Button>
          </div>
        )}
      </div>

      {/* RIGHT */}
      <div>
        <div className="border-2 border-current p-4 rounded-md bg-background text-default-100">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">
            Order summary
          </h2>

          <div className="grid grid-cols-2 gap-4 text-foreground">
            <p className="text-lg">Subtotal:</p>
            <p className="text-lg">€{total}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-foreground">
            <p className="text-lg">Shipping:</p>
            <p className="text-lg">€0</p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-foreground">
            <p className="text-lg">Taxes:</p>
            <p className="text-lg">€0</p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-foreground">
            <p className="text-lg">Discount:</p>
            <p className="text-lg">€0</p>
          </div>

          <hr className="my-4" />
          <div className="grid grid-cols-2 gap-4 text-foreground">
            <p className="text-lg">Total:</p>
            <p className="text-lg font-semibold">€{total}</p>
          </div>

          <hr className="my-4" />
          <p className="text-small mb-4 text-foreground/75 italic">
            Shipping and taxes will be calculated at checkout
          </p>

          {/* Coupon Validation */}
          <Formik
            initialValues={{ coupon: "" }}
            validate={(values) => {
              const errors: { coupon?: string } = {};
              if (!values.coupon) {
                errors.coupon = "Required";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                if (values.coupon === "UserCoupon1234") {
                  alert("Coupon successfully applied!");
                } else {
                  alert("Your Coupon is invalide!");
                }
                setSubmitting(false);
              }, 400);
            }}
          >
            {({ isSubmitting }) => (
              <Form
                className="grid grid-cols-3 gap-4 my-4"
              >
                <Field
                  as={Input}
                  className="col-span-2"
                  name="coupon"
                  // placeholder="Enter your Promo Code"
                  type="text"
                  isDisabled={cart.length <= 0 || isLoading}
                  radius="sm"
                  isRequired
                  description="UserCoupon1234 | Is a valid code !"
                />

                <Button
                  color="primary"
                  variant="solid"
                  className="col-span-1"
                  type="submit"
                  radius="sm"
                  isDisabled={cart.length <= 0 || isLoading}
                >
                  Apply
                </Button>
              </Form>
            )}
          </Formik>

          {/* Checkout Redirection */}

          <div className="grid grid-cols-2 gap-4">
            <Button
              color="success"
              variant="solid"
              href="/checkout"
              as={Link}
              endContent={<FaArrowRight />}
              className="text-white col-span-2"
              size="lg"
              radius="sm"
              isDisabled={cart.length <= 0 || isLoading}
            >
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
