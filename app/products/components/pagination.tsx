// React
import { FC } from "react";

// Icons
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// NextUI
import { Button, Skeleton } from "@nextui-org/react";

// Interface
import { PaginationProps, PaginationButtonProps } from "../../interfaces/pagination";

// Helpers
import { generateClamp } from "../../utils/helpers";

const PaginationButton:FC<PaginationButtonProps> = ({ isDisabled, onClick, children, startContent, endContent }) => (
  <Button
    isDisabled={isDisabled}
    size="sm"
    variant="flat"
    onClick={onClick}
    startContent={startContent}
    endContent={endContent}>
    
    {children}
  </Button>
);

const Pagination:FC<PaginationProps> = ({ isLoading, total, skip, limit, previousPage, nextPage }) => {
  
  return (
    <div className="flex flex-grow justify-between px-2 mb-4">
      <Skeleton isLoaded={!isLoading} classNames={{ base: "rounded-md" }}>
        <PaginationButton isDisabled={skip <= 0} onClick={previousPage} startContent={<FaChevronLeft />}>
          Previous
        </PaginationButton>
      </Skeleton>

      <Skeleton isLoaded={!isLoading} classNames={{
        base: isLoading ? "rounded-full hidden sm:block" : "hidden sm:block"
      }}>
        <p className="text-sm text-foreground/40">
          Displaying {generateClamp(skip + limit, 0, total)} items of {total}
        </p>
      </Skeleton>

      <Skeleton isLoaded={!isLoading} classNames={{ base: "rounded-md" }}>
        <PaginationButton isDisabled={skip + limit >= total} onClick={nextPage} endContent={<FaChevronRight />}>
          Next
        </PaginationButton>
      </Skeleton>
    </div>
  );
};

export default Pagination;
