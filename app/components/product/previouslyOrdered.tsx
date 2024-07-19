'use client';

// React
import { FC, useContext, useEffect, useState } from 'react';

// NextJS
import Link from 'next/link';

// NextUI
import { Button, Card, CardBody } from '@nextui-org/react';

// subProviders
import { UserContext } from '@subProviders/userProvider';

// Utils
import { showToast } from '@utils/helpers';

// Actions
import { getPreviouslyOrdered } from '@actions/actionsUserOrders';

// Interfaces
import { PreviouslyOrderedProps } from '@interfaces/product';
import { OrderItem, OrderResponse } from '@interfaces/userOrder';

const PreviouslyOrdered: FC<PreviouslyOrderedProps> = ({ productId }) => {
  const userStore = useContext(UserContext);
  const { isLogged } = userStore;
  if (!isLogged()) return null;

  const [orders, setOrders] = useState<OrderResponse>({} as OrderResponse);
  const { attributes } = orders || {};
  const { items, createdAt, total } = attributes || {};
  const orderItem = items?.find((item: OrderItem) => item.product.data.id === productId.toString()) || {} as OrderItem;
  const [checked, setChecked] = useState<boolean>(false);

  const handleGetOrders = () => {
    const apiFetch = async () => {
      setChecked(true);
      const { data, error } = await getPreviouslyOrdered(productId.toString());
      if (error) {
        showToast(error.message, 'error');
        setChecked(false);
        return;
      }
      let orders = data;
      if (!orders.length) {
        setOrders({} as OrderResponse); 
        return;
      }

      setOrders(orders[0]);
      console.log(orders)
    };

    if (!checked) void apiFetch();
  };

  useEffect(() => {
    handleGetOrders();
  }, [orders]);
  
    { return createdAt ?
      
    <Card shadow='none' className='border-1'>
      <CardBody>
        <div className='flex flex-col sm:flex-row justify-center items-center sm:justify-between gap-2'>
          <div>
            <p>Your have ordered this product {orderItem.quantity > 1 ? `${orderItem.quantity} times` : 'once'}</p>
            <p className='text-foreground/75 text-sm'>Last ordered on {createdAt} for {total}€</p>
          </div>
          <Button as={Link} href={`/user/orders/${orders.id}`} size='sm' variant='flat'>
              View
            </Button>
        </div>
      </CardBody>
    </Card>
    : <Card shadow='none' className='border-1'>
      <CardBody>
        <p>You have not ordered this product yet</p>
      </CardBody>
    </Card>
    }
}

export default PreviouslyOrdered;

// {
//   "id": "2",
//   "type": "order",
//   "attributes": {
//       "id": 2,
//       "total": 536,
//       "createdAt": "18 July 2024",
//       "updatedAt": "18 July 2024",
//       "user": {
//           "data": {
//               "id": "1",
//               "type": "user",
//               "attributes": {
//                   "id": 1,
//                   "firstname": "Pearle",
//                   "lastname": "Hayes",
//                   "email": "sunni@mclaughlin-wehner.test",
//                   "avatar": {
//                       "small": "http://api.localshop.test:3005/uploads/users/1/avatar/small-34c95a0a9dfe91e81e38505ad18f6c38.webp",
//                       "large": "http://api.localshop.test:3005/uploads/users/1/avatar/large-35cd17d1f0ce641005a9504cffb662dc.webp"
//                   }
//               }
//           }
//       },
//       "shipping": {
//           "data": {
//               "id": "7",
//               "type": "address",
//               "attributes": {
//                   "id": 7,
//                   "label": "Minima",
//                   "firstname": "Timothy",
//                   "lastname": "Carroll",
//                   "address": "Suite 106 481 Landon River, East Kati, NJ 89206",
//                   "city": "Sethland",
//                   "state": "Connecticut",
//                   "country": "France",
//                   "zip": "75000",
//                   "phone": "151-827-2797",
//                   "default": false
//               }
//           }
//       },
//       "billing": {
//           "data": {
//               "id": "7",
//               "type": "address",
//               "attributes": {
//                   "id": 7,
//                   "label": "Minima",
//                   "firstname": "Timothy",
//                   "lastname": "Carroll",
//                   "address": "Suite 106 481 Landon River, East Kati, NJ 89206",
//                   "city": "Sethland",
//                   "state": "Connecticut",
//                   "country": "France",
//                   "zip": "75000",
//                   "phone": "151-827-2797",
//                   "default": false
//               }
//           }
//       },
//       "items": [
//           {
//               "quantity": 1,
//               "price": 12,
//               "product": {
//                   "data": {
//                       "id": "4",
//                       "type": "product",
//                       "attributes": {
//                           "id": 4,
//                           "slug": "red-lipstick",
//                           "title": "Red Lipstick",
//                           "description": "The Red Lipstick is a classic and bold choice for adding a pop of color to your lips. With a creamy and pigmented formula, it provides a vibrant and long-lasting finish.",
//                           "price": 12.99,
//                           "discountPercentage": 19.03,
//                           "rating": 4.666666666666667,
//                           "stock": 68,
//                           "brand": "Chic Cosmetics",
//                           "category": {
//                               "data": {
//                                   "id": "1",
//                                   "type": "category",
//                                   "attributes": {
//                                       "id": 1,
//                                       "title": "Beauty",
//                                       "slug": "beauty"
//                                   }
//                               }
//                           },
//                           "thumbnail": {
//                               "url": "http://api.localshop.test:3005/uploads/products/4/images/small-1d82752edf57fadb848418a8386d0bd2.webp",
//                               "full": "http://api.localshop.test:3005/uploads/products/4/images/large-d2a2c98dc57bb687e83502c2084a0f02.webp"
//                           },
//                           "images": [
//                               {
//                                   "thumbnail": "http://api.localshop.test:3005/uploads/product_images/4/images/small-f479e126f548936037ace983d103aac6.webp",
//                                   "full": "http://api.localshop.test:3005/uploads/product_images/4/images/large-2725a53fc677baef0202642cab0e3805.webp"
//                               }
//                           ]
//                       }
//                   }
//               }
//           },
//           {
//               "quantity": 1,
//               "price": 9,
//               "product": {
//                   "data": {
//                       "id": "1",
//                       "type": "product",
//                       "attributes": {
//                           "id": 1,
//                           "slug": "essence-mascara-lash-princess",
//                           "title": "Essence Mascara Lash Princess",
//                           "description": "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
//                           "price": 9.99,
//                           "discountPercentage": 7.17,
//                           "rating": 3,
//                           "stock": 5,
//                           "brand": "Essence",
//                           "category": {
//                               "data": {
//                                   "id": "1",
//                                   "type": "category",
//                                   "attributes": {
//                                       "id": 1,
//                                       "title": "Beauty",
//                                       "slug": "beauty"
//                                   }
//                               }
//                           },
//                           "thumbnail": {
//                               "url": "http://api.localshop.test:3005/uploads/products/1/images/small-5b1f795df580dd99f8df19459608709b.webp",
//                               "full": "http://api.localshop.test:3005/uploads/products/1/images/large-bda80a53d9e451e75cb51d8bd623fa37.webp"
//                           },
//                           "images": [
//                               {
//                                   "thumbnail": "http://api.localshop.test:3005/uploads/product_images/1/images/small-534a380b920a7a7bb544b5d42875357b.webp",
//                                   "full": "http://api.localshop.test:3005/uploads/product_images/1/images/large-11cea8f79de2cb8b196a343c47ab2594.webp"
//                               }
//                           ]
//                       }
//                   }
//               }
//           },
//           {
//               "quantity": 1,
//               "price": 19,
//               "product": {
//                   "data": {
//                       "id": "2",
//                       "type": "product",
//                       "attributes": {
//                           "id": 2,
//                           "slug": "eyeshadow-palette-with-mirror",
//                           "title": "Eyeshadow Palette with Mirror",
//                           "description": "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application.",
//                           "price": 19.99,
//                           "discountPercentage": 5.5,
//                           "rating": 3.3333333333333335,
//                           "stock": 44,
//                           "brand": "Glamour Beauty",
//                           "category": {
//                               "data": {
//                                   "id": "1",
//                                   "type": "category",
//                                   "attributes": {
//                                       "id": 1,
//                                       "title": "Beauty",
//                                       "slug": "beauty"
//                                   }
//                               }
//                           },
//                           "thumbnail": {
//                               "url": "http://api.localshop.test:3005/uploads/products/2/images/small-dfc5817e0ac60523dcb720011dccb455.webp",
//                               "full": "http://api.localshop.test:3005/uploads/products/2/images/large-5231c938399af92239e2d997efdae08c.webp"
//                           },
//                           "images": [
//                               {
//                                   "thumbnail": "http://api.localshop.test:3005/uploads/product_images/2/images/small-7ba91b58805e95d3a922eb347366b8b9.webp",
//                                   "full": "http://api.localshop.test:3005/uploads/product_images/2/images/large-cfde9f3c00f3cf937f4b8288eca05b8b.webp"
//                               }
//                           ]
//                       }
//                   }
//               }
//           },
//           {
//               "quantity": 1,
//               "price": 10,
//               "product": {
//                   "data": {
//                       "id": "60",
//                       "type": "product",
//                       "attributes": {
//                           "id": 60,
//                           "slug": "grater-black",
//                           "title": "Grater Black",
//                           "description": "The Grater in Black is a handy kitchen tool for grating cheese, vegetables, and more. Its sleek design and sharp blades make food preparation efficient and easy.",
//                           "price": 10.99,
//                           "discountPercentage": 3.29,
//                           "rating": 4.333333333333333,
//                           "stock": 80,
//                           "brand": null,
//                           "category": {
//                               "data": {
//                                   "id": "6",
//                                   "type": "category",
//                                   "attributes": {
//                                       "id": 6,
//                                       "title": "Kitchen Accessories",
//                                       "slug": "kitchen-accessories"
//                                   }
//                               }
//                           },
//                           "thumbnail": {
//                               "url": "http://api.localshop.test:3005/uploads/products/60/images/small-e9a448340bbdfddfcc5c67ccf9b05de8.webp",
//                               "full": "http://api.localshop.test:3005/uploads/products/60/images/large-cbe3c7793c2651b3099ef8b8354cf2a5.webp"
//                           },
//                           "images": [
//                               {
//                                   "thumbnail": "http://api.localshop.test:3005/uploads/product_images/99/images/small-ba2fbb933bf902528aedde872f0446b3.webp",
//                                   "full": "http://api.localshop.test:3005/uploads/product_images/99/images/large-b97580bcf505ca3c1ac29729d9b890c9.webp"
//                               }
//                           ]
//                       }
//                   }
//               }
//           },
//           {
//               "quantity": 1,
//               "price": 129,
//               "product": {
//                   "data": {
//                       "id": "7",
//                       "type": "product",
//                       "attributes": {
//                           "id": 7,
//                           "slug": "chanel-coco-noir-eau-de",
//                           "title": "Chanel Coco Noir Eau De",
//                           "description": "Coco Noir by Chanel is an elegant and mysterious fragrance, featuring notes of grapefruit, rose, and sandalwood. Perfect for evening occasions.",
//                           "price": 129.99,
//                           "discountPercentage": 18.64,
//                           "rating": 3,
//                           "stock": 41,
//                           "brand": "Chanel",
//                           "category": {
//                               "data": {
//                                   "id": "2",
//                                   "type": "category",
//                                   "attributes": {
//                                       "id": 2,
//                                       "title": "Fragrances",
//                                       "slug": "fragrances"
//                                   }
//                               }
//                           },
//                           "thumbnail": {
//                               "url": "http://api.localshop.test:3005/uploads/products/7/images/small-7783fb586661e7539477f347dafcb13b.webp",
//                               "full": "http://api.localshop.test:3005/uploads/products/7/images/large-9cd0d799791dd5c417b0029ba164d0ad.webp"
//                           },
//                           "images": [
//                               {
//                                   "thumbnail": "http://api.localshop.test:3005/uploads/product_images/9/images/small-b4d4865f6964cb65c7cfe1d8fbd1e5af.webp",
//                                   "full": "http://api.localshop.test:3005/uploads/product_images/9/images/large-f5d38a33d5f08b39432c15da8282b59c.webp"
//                               },
//                               {
//                                   "thumbnail": "http://api.localshop.test:3005/uploads/product_images/10/images/small-9a704b7cbcf5be560cca4df3f1915a57.webp",
//                                   "full": "http://api.localshop.test:3005/uploads/product_images/10/images/large-f7f2d73495c559cc30e44d68a461cd71.webp"
//                               },
//                               {
//                                   "thumbnail": "http://api.localshop.test:3005/uploads/product_images/11/images/small-5f093d53d34d7f883c99c2dfbb03ccc5.webp",
//                                   "full": "http://api.localshop.test:3005/uploads/product_images/11/images/large-91f03f5a5090f3c27106e72a6a3f643d.webp"
//                               }
//                           ]
//                       }
//                   }
//               }
//           },
//           {
//               "quantity": 1,
//               "price": 14,
//               "product": {
//                   "data": {
//                       "id": "3",
//                       "type": "product",
//                       "attributes": {
//                           "id": 3,
//                           "slug": "powder-canister",
//                           "title": "Powder Canister",
//                           "description": null,
//                           "price": 14.99,
//                           "discountPercentage": 18.14,
//                           "rating": 4.666666666666667,
//                           "stock": 59,
//                           "brand": "Velvet Touch",
//                           "category": {
//                               "data": {
//                                   "id": "1",
//                                   "type": "category",
//                                   "attributes": {
//                                       "id": 1,
//                                       "title": "Beauty",
//                                       "slug": "beauty"
//                                   }
//                               }
//                           },
//                           "thumbnail": {
//                               "url": "http://api.localshop.test:3005/uploads/products/3/images/small-f0bb63e2857a8b7c26d9c979fd4da2e8.webp",
//                               "full": "http://api.localshop.test:3005/uploads/products/3/images/large-adf1232e271d5e1defb00a437950e537.webp"
//                           },
//                           "images": [
//                               {
//                                   "thumbnail": "http://api.localshop.test:3005/uploads/product_images/3/images/small-8070c59c0bf397728a63d67bb95a38a6.webp",
//                                   "full": "http://api.localshop.test:3005/uploads/product_images/3/images/large-20f2051cd94e46ed7d19181a931a209f.webp"
//                               }
//                           ]
//                       }
//                   }
//               }
//           },
//           {
//               "quantity": 7,
//               "price": 49,
//               "product": {
//                   "data": {
//                       "id": "6",
//                       "type": "product",
//                       "attributes": {
//                           "id": 6,
//                           "slug": "calvin-klein-ck-one",
//                           "title": "Calvin Klein CK One",
//                           "description": "CK One by Calvin Klein is a classic unisex fragrance, known for its fresh and clean scent. It's a versatile fragrance suitable for everyday wear.",
//                           "price": 49.99,
//                           "discountPercentage": 0.32,
//                           "rating": 3,
//                           "stock": 17,
//                           "brand": "Calvin Klein",
//                           "category": {
//                               "data": {
//                                   "id": "2",
//                                   "type": "category",
//                                   "attributes": {
//                                       "id": 2,
//                                       "title": "Fragrances",
//                                       "slug": "fragrances"
//                                   }
//                               }
//                           },
//                           "thumbnail": {
//                               "url": "http://api.localshop.test:3005/uploads/products/6/images/small-260c3d631f0514b59e0095c321e3930a.webp",
//                               "full": "http://api.localshop.test:3005/uploads/products/6/images/large-5b2bb154760cfbeddf81ec742072b16f.webp"
//                           },
//                           "images": [
//                               {
//                                   "thumbnail": "http://api.localshop.test:3005/uploads/product_images/6/images/small-5eb95aa8da7c8ba4ed098bdd23dc972c.webp",
//                                   "full": "http://api.localshop.test:3005/uploads/product_images/6/images/large-718be08675a6d0d79cd3d53fb5ef5ad5.webp"
//                               },
//                               {
//                                   "thumbnail": "http://api.localshop.test:3005/uploads/product_images/7/images/small-ad436377598446eea1dec44ff5e4b0a7.webp",
//                                   "full": "http://api.localshop.test:3005/uploads/product_images/7/images/large-9a3d6dbe7f65a904db13d02d5cb388a2.webp"
//                               },
//                               {
//                                   "thumbnail": "http://api.localshop.test:3005/uploads/product_images/8/images/small-fdfd3d442fb6aed0814fe68b6574ba8b.webp",
//                                   "full": "http://api.localshop.test:3005/uploads/product_images/8/images/large-fe35ff23e031c0a47be4f63198428d08.webp"
//                               }
//                           ]
//                       }
//                   }
//               }
//           }
//       ],
//       "totalItems": 13,
//       "totalUniqueItems": 7,
//       "status": "Pending"
//   }
// }
