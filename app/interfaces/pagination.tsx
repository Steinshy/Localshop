type PaginationProps = {
  total: number;
  skip: number;
  limit: number;
  isLoading: boolean;
  previousPage: () => void;
  nextPage: () => void;
};

type PaginationButtonProps = {
  isDisabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
};

export type { PaginationProps, PaginationButtonProps };
