export const projects = [
  { id: 'forma', name: 'Форма', category: 'Сайт для архитектурной студии', description: 'Современный сайт для студии архитектуры и интерьеров. Чистая эстетика, акцент на проектах и философии пространства.', image: 'assets/architecture.jpg', alt: 'Светлый современный интерьер с деревянными панелями и панорамными окнами', headline: 'Пространства\nдля лучшей жизни', subtitle: 'Архитектура. Интерьеры. Люди.', action: 'Смотреть проекты', note: 'Гармония формы, функциональности\nи вашего образа жизни.', url: null },
  { id: 'predmet', name: 'Предмет', category: 'Интернет-магазин мебели', description: 'Каталог мебели и предметов интерьера. Спокойная композиция помогает рассмотреть материалы, детали и найти своё сочетание.', image: 'assets/interior.jpg', alt: 'Уютная гостиная с кожаным диваном, деревянным столиком и зелёными растениями', headline: 'Вещи, которые\nстановятся домом', subtitle: 'Мебель с характером. Для вашей жизни.', action: 'Смотреть коллекцию', note: 'Натуральные материалы.\nПродуманная форма.', url: null },
  { id: 'tiho', name: 'Тихо', category: 'Сайт загородного отеля', description: 'Атмосферный сайт для отдыха у озера. Большие фотографии, знакомство с местом и понятный путь к выбору проживания.', image: 'assets/landscape.jpg', alt: 'Горное озеро, хвойный лес и деревянный дом на берегу', headline: 'Там, где\nначинается тишина', subtitle: 'Озеро. Лес. Время для себя.', action: 'Открыть место', note: 'Подальше от суеты.\nПоближе к настоящему.', url: null }
];

export function wrapIndex(index, length = projects.length) {
  if (!Number.isInteger(index) || !Number.isInteger(length) || length < 1) throw new TypeError('Expected an integer index and positive length');
  return ((index % length) + length) % length;
}

// User-provided public contacts. No client data collection or server-side submission.
export const contact = { email: 'aleks.orlov97@gmail.com', telegram: '@Garmanika' };
