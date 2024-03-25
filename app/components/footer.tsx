"use client";

// NextUi - React Icon
import { Link, Chip, Button } from "@nextui-org/react";
import { DiCssdeck } from "react-icons/di";
import { FaFacebookSquare, FaTwitterSquare, FaInstagramSquare } from "react-icons/fa";

// interface - LinkItemProps
import { FooterInterface } from "../utils/interfaces";

const FooterItemLink = ({ text, isTag = false, tagText }: FooterInterface) => {
  return (
    <li>
      <Link href="#" className="text-sm" color="foreground">
        {text}
        {isTag && (
          <Chip className="ml-1" variant="flat" color="primary" size="sm" radius="sm">
            {tagText}
          </Chip>
        )}
      </Link>
    </li>
  );
};

export default function Footer() {
  return (
    <footer className="border-t border-current text-default-100 pb-2">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start">
          {/* First Col */}
          <div className="w-full lg:w-1/4 mb-6 lg:mb-0">
            <h5 className="text-foreground/75 mb-2 text-md font-semibold">
              Localshop
            </h5>
            <ul>
              <FooterItemLink text="Careers" />
              <FooterItemLink text="News" />
              <FooterItemLink text="Policies" />
              <FooterItemLink text="Help" />
              <FooterItemLink text="Diversity & Belonging" />
            </ul>
          </div>

          {/* Second Col */}
          <div className="w-full lg:w-1/4 mb-6 lg:mb-0">
            <h5 className="text-foreground/75 mb-2 text-md font-semibold">
              Categories
            </h5>
            <ul>
              <FooterItemLink text="Trust &amp; Safety" />
              <FooterItemLink text="Travel Credit" />
              <FooterItemLink text="Gift Cards" />
              <FooterItemLink text="Airbnb Citizen" />
              <FooterItemLink text="Things To Do" isTag={true} tagText="New" />
            </ul>
          </div>

          {/* Third Col */}
          <div className="w-full lg:w-1/4 mb-6 lg:mb-0">
            <div className="flex gap-1">
              <Button isIconOnly size="sm" color="primary" radius="sm" variant="flat">
                <FaFacebookSquare className="text-2xl" />
              </Button>
              <Button isIconOnly size="sm" color="primary" radius="sm" variant="flat">
                <FaTwitterSquare className="text-2xl" />
              </Button>
              <Button isIconOnly size="sm" color="primary" radius="sm" variant="flat">
                <FaInstagramSquare className="text-2xl" />
              </Button>
            </div>
            <ul>
              <FooterItemLink text="Terms" />
              <FooterItemLink text="Privacy" />
              <FooterItemLink text="Site Map" />
            </ul>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-center items-center bg-background/25 text-default-100">
        <DiCssdeck />
        <p className="text-foreground/75 font-semibold text-sm pl-1">
          &copy; 2024 Localshop. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
