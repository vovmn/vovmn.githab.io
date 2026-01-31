// src/data/services.js

export const serviceSections = [
  {
    id: 'countertops',
    title: 'Столешницы',
    items: [
      { id: 'euro-cut-countertop', name: 'Еврозапил столешницы', description: 'Точный еврозапил для стыковки столешницы.', price: '1 900 ₽/шт' },
      { id: 'edging-countertop-plastic', name: 'Кромление столешницы (пластик)', description: 'Кромление столешницы пластиком по торцам.', price: '250 ₽/м' },
      { id: 'edging-countertop-nonstd-pvc', name: 'Кромление столешницы и нестандартных толщин (ПВХ)', description: 'Кромление столешниц и нестандартных толщин ПВХ-кромкой.', price: '85 ₽/м' },
      { id: 'cut-countertop-client-material-3', name: 'Раскрой столешницы (3) — материал клиента', description: 'Раскрой столешницы из материала клиента.', price: '350 ₽/шт' },
      { id: 'cut-countertop-26-3', name: 'Раскрой столешницы 26 мм (3)', description: 'Раскрой столешницы толщиной 26 мм.', price: '300 ₽/шт' },
      { id: 'cut-countertop-38-3', name: 'Раскрой столешницы 38 мм (3)', description: 'Раскрой столешницы толщиной 38 мм.', price: '350 ₽/шт' },
      { id: 'cut-countertop-38-42', name: 'Раскрой столешницы 38 мм (4,2)', description: 'Раскрой столешницы 38 мм (позиция 4,2).', price: '400 ₽/шт' },
      { id: 'saw-countertop', name: 'Рез столешницы', description: 'Рез/распил столешницы.', price: '300 ₽/шт' },
      { id: 'saw-countertop-client', name: 'Рез столешницы клиента', description: 'Рез/распил столешницы из материала клиента.', price: '120 ₽/шт' }
    ]
  },

  {
    id: 'edging',
    title: 'Кромление',
    items: [
      { id: 'edging-curved-2pvc', name: 'Кромление криволинейной 2×ПВХ', description: 'Кромление криволинейных деталей двойной ПВХ-кромкой.', price: '80 ₽/м' },
      { id: 'edging-pvc-04-2', name: 'Кромление ПВХ 0,4–2 мм', description: 'Кромление ПВХ-кромкой толщиной 0,4–2 мм.', price: '40 ₽/м' },
      { id: 'edging-pvc-2', name: 'Кромление ПВХ 2 мм', description: 'Кромление ПВХ-кромкой 2 мм (усиленный торец).', price: '50 ₽/м' }
    ]
  },

  {
    id: 'cutting',
    title: 'Раскрой',
    items: [
      { id: 'cutting-map', name: 'Карта раскроя (1)', description: 'Подготовка схемы раскроя для оптимального расхода материала.', price: '100 ₽/л' },

      { id: 'cut-ldvp', name: 'Раскрой ЛДВП', description: 'Раскрой листов ЛДВП по размерам.', price: '250 ₽/лист' },
      { id: 'cut-hdf', name: 'Раскрой ХДФ', description: 'Раскрой листов ХДФ по размерам.', price: '250 ₽/л' },

      { id: 'cut-ldsp-5', name: 'Раскрой ЛДСП (5)', description: 'Раскрой ЛДСП (позиция 5 по прайсу).', price: '500 ₽/лист' },
      { id: 'cut-ldsp-6', name: 'Раскрой ЛДСП (6)', description: 'Раскрой ЛДСП (позиция 6 по прайсу).', price: '550 ₽/лист' },
      { id: 'cut-ldsp-client-sheets', name: 'Раскрой ЛДСП (листы клиента)', description: 'Раскрой ЛДСП из материала клиента.', price: '600 ₽/л' },
      { id: 'cut-ldsp-26', name: 'Раскрой ЛДСП 26 мм', description: 'Раскрой ЛДСП толщиной 26 мм.', price: '600 ₽/лист' },

      { id: 'cut-furniture-board-3', name: 'Раскрой мебельного щита (3)', description: 'Раскрой мебельного щита.', price: '250 ₽/шт' },
      { id: 'cut-ldsp-remnants', name: 'Раскрой остатков ЛДСП', description: 'Раскрой остатков ЛДСП (малые элементы).', price: '350 ₽/шт' }
    ]
  },

  {
    id: 'drilling',
    title: 'Сверление и пазы',
    items: [
      { id: 'hole-euroscrew', name: 'Отверстие под евровинт', description: 'Сверление под евровинт (конфирмат).', price: '10 ₽/шт' },
      { id: 'hole-hinge', name: 'Отверстие под петлю', description: 'Сверление под мебельную петлю (чашка).', price: '40 ₽/шт' },
      { id: 'holes-ties-no-eurocut', name: 'Отверстия под стяжки (без еврозапила)', description: 'Сверление отверстий под стяжки.', price: '600 ₽/шт' },
      { id: 'groove-ldvp', name: 'Паз под ЛДВП', description: 'Выборка паза под заднюю стенку (ЛДВП).', price: '50 ₽/м' }
    ]
  },

  {
    id: 'sawing',
    title: 'Рез',
    items: [
      { id: 'bevel-cut', name: 'Косой рез', description: 'Рез под углом (косой рез) по заданию.', price: '150 ₽/шт' },
      { id: 'saw-ldsp', name: 'Рез ЛДСП', description: 'Рез/распил ЛДСП.', price: '120 ₽/шт' }
    ]
  },

  {
    id: 'custom',
    title: 'Нестандарт и индивидуальные работы',
    items: [
      { id: 'nonstandard-thickness-glue', name: 'Изготовление нестандартных толщин (склейка)', description: 'Склейка для получения нестандартной толщины детали.', price: '450 ₽/м²' },
      { id: 'oval-making', name: 'Изготовление овала', description: 'Фигурная обработка: овал по заданному размеру.', price: '600 ₽/шт' },
      { id: 'radius-making', name: 'Изготовление радиуса', description: 'Скругление (радиус) по шаблону/размеру.', price: '400 ₽/шт' },
      { id: 'radius-with-edging', name: 'Изготовление радиуса с кромлением', description: 'Скругление + кромление для аккуратного края.', price: '350 ₽/шт' },
      { id: 'custom-order-ready', name: 'Индивидуальный заказ (готовое изделие)', description: 'Изготовление изделия по индивидуальному ТЗ.', price: '1 550 ₽/шт' }
    ]
  }
]
