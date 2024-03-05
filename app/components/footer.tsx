"use client";

// NextUi - React Icon
import { Link, Chip, Button } from "@nextui-org/react";
import { DiCssdeck } from "react-icons/di";
import { FaFacebookSquare, FaTwitterSquare, FaInstagramSquare } from "react-icons/fa";

// interface - LinkItemProps
import { LinkItemProps } from "../utils/site";

const LinkItem = ({ text, isTag = false, tagText }: LinkItemProps) => {
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
              <LinkItem text="Careers" />
              <LinkItem text="News" />
              <LinkItem text="Policies" />
              <LinkItem text="Help" />
              <LinkItem text="Diversity & Belonging" />
            </ul>
          </div>

          {/* Second Col */}
          <div className="w-full lg:w-1/4 mb-6 lg:mb-0">
            <h5 className="text-foreground/75 mb-2 text-md font-semibold">
              Categories
            </h5>
            <ul>
              <LinkItem text="Trust &amp; Safety" />
              <LinkItem text="Travel Credit" />
              <LinkItem text="Gift Cards" />
              <LinkItem text="Airbnb Citizen" />
              <LinkItem text="Things To Do" isTag={true} tagText="New" />
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
              <LinkItem text="Terms" />
              <LinkItem text="Privacy" />
              <LinkItem text="Site Map" />
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
