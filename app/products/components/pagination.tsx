// React
import { FC } from "react";

// Nextui - React Icon
import { Button } from "@nextui-org/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Squeleton
import { Skeleton } from "@nextui-org/react";

// Interface - Generation
import { PaginationInterface, PaginationButtonInterface, generateClamp } from "../../utils/interfaces";


const PaginationButton: FC<PaginationButtonInterface> = ({ isDisabled, onClick, children, startContent = null, endContent = null }) => (
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

const Pagination: FC<PaginationInterface> = ({ isLoading, total, skip, limit, previousPage, nextPage }) => {
  
  return (
    <div className="flex flex-grow justify-between px-2 mb-4">
      <Skeleton isLoaded={!isLoading} classNames={{ base: "rounded-md" }}>
        <PaginationButton isDisabled={skip <= 0} onClick={previousPage} startContent={<FaChevronLeft />}>
          Previous
        </PaginationButton>
      </Skeleton>

      <Skeleton isLoaded={!isLoading} classNames={{ base: isLoading ? "rounded-full" : ""}}>
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
