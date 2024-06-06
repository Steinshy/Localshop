const chipColor = (status: string) => {
  switch (status) {
    case "Delivered":
      return "success";
    case "Processing":
      return "warning";
    case "Canceled":
      return "danger";
    default:
      return "default";
  }
};
export { chipColor };
