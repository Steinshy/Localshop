// React
import { FC } from "react";

// Icons
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// NextUI
import { Button } from "@nextui-org/react";

interface PaginationProps {
  totalPages: number;
  localPage: number;
  previousPage: () => void;
  nextPage: () => void;
}

const Pagination: FC<PaginationProps> = ({ totalPages, localPage, previousPage, nextPage }) => {
  return (
    <>
      <Button isDisabled={localPage === 1} size="sm" variant="flat" onClick={previousPage} startContent={<FaChevronLeft />}>
        Previous
      </Button>

      <p className="text-sm text-foreground/40">
        Displaying page {localPage} of {totalPages}
      </p>

      <Button isDisabled={localPage >= totalPages} size="sm" variant="flat" endContent={<FaChevronRight />} onClick={nextPage}>
        Next
      </Button>
    </>
  );
};

export default Pagination;
