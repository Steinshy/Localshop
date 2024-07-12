export const breadCrumbItems = {
  product: (title: string) => [{ title: 'Products', href: '/products' }, { title: title }],
  user: (title: string) => [{ title: 'User', href: '/user' }, { title: title }],
  orders: (param: string) => [
    { title: 'User', href: '/user' },
    { title: 'Orders', href: '/user/orders' },
    { title: `Order ${param}` },
  ],
};
