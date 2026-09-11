export const projects = [
  {
    id: 'andys',
    name: "Andy's",
    category: 'Сайт ресторана и доставки',
    description: 'Имиджевый сайт ресторана с меню, акциями, мероприятиями, бронированием столика и личным кабинетом для заказов.',
    image: 'assets/andys.jpg',
    alt: "Главная страница сайта ресторана Andy's с крупной фотографией блюда",
    headline: 'Место, куда\nхочется вернуться',
    subtitle: 'Меню, события и бронирование.',
    action: 'Открыть сайт',
    note: 'Ресторан и доставка\nв одном интерфейсе.',
    nav: ['Меню', 'Акции', 'События', 'О нас'],
    url: 'https://andys.rest/'
  },
  {
    id: 'emcotec',
    name: 'ЭМСОТЕХ',
    category: 'Корпоративный сайт производителя',
    description: 'Корпоративный сайт с большим каталогом помехозащитного оборудования, подбором решений, услугами и материалами компании.',
    image: 'assets/emcotec.jpg',
    alt: 'Главная страница сайта ЭМСОТЕХ с изображением промышленного устройства',
    headline: 'Защита оборудования\nв сложных условиях',
    subtitle: 'Каталог, подбор и консультации.',
    action: 'Открыть сайт',
    note: 'Сложный B2B-продукт\nс понятной навигацией.',
    nav: ['Каталог', 'Услуги', 'Проекты', 'О компании'],
    url: 'https://emcotec.ru/'
  },
  {
    id: 'artcom',
    name: 'АРТКОМ',
    category: 'Интернет-магазин оборудования',
    description: 'Каталог телекоммуникационного и сетевого оборудования с товарными разделами, поиском, корзиной и материалами для партнёров.',
    image: 'assets/artcom.jpg',
    alt: 'Главная страница интернет-магазина АРТКОМ с баннерами и категориями оборудования',
    headline: 'Оборудование\nдля связи и сетей',
    subtitle: 'Каталог, поиск и заказ онлайн.',
    action: 'Открыть сайт',
    note: 'Товары и услуги\nдля бизнеса.',
    nav: ['Каталог', 'Услуги', 'Купить', 'Партнёрам'],
    url: 'https://www.artcom.ru/'
  }
];

export function wrapIndex(index, length = projects.length) {
  if (!Number.isInteger(index) || !Number.isInteger(length) || length < 1) throw new TypeError('Expected an integer index and positive length');
  return ((index % length) + length) % length;
}

// User-provided public contacts. No client data collection or server-side submission.
export const contact = { email: 'aleks.orlov97@gmail.com', telegram: '@Garmanika' };
