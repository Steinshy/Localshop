// React
import { FC } from "react";

// Nextui - React Icon
import { Button } from "@nextui-org/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Squeleton
import { Skeleton } from "@nextui-org/react";

// Interface - Generation
import { PaginationInterface, generateClamp } from "../../utils/interfaces";

const Pagination: FC<PaginationInterface> = ({ isLoading, total, skip, limit, previousPage, nextPage }) => {
  // const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);

  return (
    total > 0 && (
      <div className="flex flex-grow justify-between px-2 mb-4">
        <Button
          isDisabled={skip <= 0}
          isLoading={isLoading}
          size="sm"
          variant="flat"
          onClick={previousPage}
          startContent={<FaChevronLeft />}
        >
          Previous
        </Button>
        <Skeleton isLoaded={!isLoading}>
          <p className="text-sm text-foreground/40">
            Displaying {generateClamp(skip + limit, 0, total)} items of {total}
          </p>
        </Skeleton>
        <Button
          isDisabled={skip + limit >= total}
          isLoading={isLoading}
          size="sm"
          variant="flat"
          onClick={nextPage}
          endContent={<FaChevronRight />}
        >
          Next
        </Button>
      </div>
    )
  );
};

export default Pagination;
