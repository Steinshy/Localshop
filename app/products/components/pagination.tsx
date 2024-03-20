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

  return (
    <div className="flex flex-grow justify-between px-2 mb-4">
      <Skeleton isLoaded={!isLoading} classNames={{
        base: "rounded-md",
      }}>
        <Button
          isDisabled={skip <= 0}
          size="sm"
          variant="flat"
          onClick={previousPage}
          startContent={<FaChevronLeft />}
        >
          Previous
        </Button>
      </Skeleton>

      <Skeleton isLoaded={!isLoading} classNames={{
        base: "rounded-full",
      }}>
        <p className="text-sm text-foreground/40">
          Displaying {generateClamp(skip + limit, 0, total)} items of {total}
        </p>
      </Skeleton>

      <Skeleton isLoaded={!isLoading} classNames={{
        base: "rounded-md",
      }}>
        <Button
          isDisabled={skip + limit >= total}
          size="sm"
          variant="flat"
          onClick={nextPage}
          endContent={<FaChevronRight />}
        >
          Next
        </Button>
      </Skeleton>
    </div>
  );
};

export default Pagination;
