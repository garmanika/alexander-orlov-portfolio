export const projects = [
  {
    id: 'andys',
    name: "Andy's",
    category: 'Сайт ресторана и доставки',
    description: 'Имиджевый сайт ресторана с меню, акциями, мероприятиями, бронированием столика и личным кабинетом для заказов.',
    image: 'assets/andys.jpg',
    mobileImage: 'assets/andys-mobile.jpg',
    alt: "Главная страница сайта ресторана Andy's с крупной фотографией блюда",
    url: 'https://andys.rest/'
  },
  {
    id: 'emcotec',
    name: 'ЭМСОТЕХ',
    category: 'Корпоративный сайт производителя',
    description: 'Корпоративный сайт с большим каталогом помехозащитного оборудования, подбором решений, услугами и материалами компании.',
    image: 'assets/emcotec.jpg',
    mobileImage: 'assets/emcotec-mobile.jpg',
    alt: 'Главная страница сайта ЭМСОТЕХ с изображением промышленного устройства',
    url: 'https://emcotec.ru/'
  },
  {
    id: 'artcom',
    name: 'АРТКОМ',
    category: 'Интернет-магазин оборудования',
    description: 'Каталог телекоммуникационного и сетевого оборудования с товарными разделами, поиском, корзиной и материалами для партнёров.',
    image: 'assets/artcom.jpg',
    mobileImage: 'assets/artcom-mobile.jpg',
    alt: 'Главная страница интернет-магазина АРТКОМ с баннерами и категориями оборудования',
    url: 'https://www.artcom.ru/'
  },
  {
    id: 'cleanroomshop',
    name: 'Альфа-Лаб',
    category: 'Интернет-магазин для чистых помещений',
    description: 'Интернет-магазин расходных материалов и оборудования для чистых помещений и производств: большой каталог, поиск, сравнение, избранное и заказ товаров.',
    image: 'assets/cleanroomshop.jpg',
    mobileImage: 'assets/cleanroomshop-mobile.jpg',
    alt: 'Главная страница интернет-магазина Альфа-Лаб с каталогом и баннером стерильной перекиси водорода',
    url: 'https://cleanroomshop.ru/'
  }
];

export function wrapIndex(index, length = projects.length) {
  if (!Number.isInteger(index) || !Number.isInteger(length) || length < 1) throw new TypeError('Expected an integer index and positive length');
  return ((index % length) + length) % length;
}

// User-provided public contacts. No client data collection or server-side submission.
export const contact = { email: 'aleks.orlov97@gmail.com', telegram: '@Garmanika' };
