# [Проект: Место](<https://julfy-bs.github.io/mesto/>)

***

"Место" - лента с фотографиями на основе проекта выполненного на курсе Web+ от Yandex Практикум.

Версия 0.3.0 приложения Место выполнена на курсе [Web+][yandex-practicum-web-plus] от [Yandex Практикум][yandex-practicum-url] в соответствии
со [стандартами Яндекс.Практикума по оформлению HTML и CSS кода][yandex-styleguide].

Эту часть можно найти в отдельном репозитории [mesto-project][mesto-project].

[//]: # (## Функционал)

[//]: # ()
[//]: # (- [x] Создания, удаления и детального просмотра карточки)

[//]: # (- [x] Редактирования информации профиля)

[//]: # (- [x] Редактирования аватара пользователя)

[//]: # (- [x] Лоадера)

[//]: # (- [x] Визуального отображения ожидания ответа от сервера)

[//]: # (- [x] Обработки пользовательских ошибок)

[//]: # (- [x] Отображения, добавления и удаления лайков)

[//]: # (- [x] Валидации полей форм)

## История версий

- ***Версия 0.4.0***

    - Переписывает проект на TypeScript.
    - Заменяет webpack на vite.

- ***Версия 0.3.0***

    - Добавляет функционал обработки пользовательских ошибок.
    - Разбивает проект на классы, согласно принципам ООП.

- ***Версия 0.2.0***

    - Добавляет валидацию форм.
    - Добавляет попап подтверждения удаления карточки.
    - Подключает внешний API и настраивает взаимодействие с сервером.

- ***Версия 0.1.0***

    - Добавляет попап для редактирования информации профиля.
    - Добавляет попап для создания карточки.
    - Добавляет возможность лайкать карточку.
    - Добавляет возможность удаления карточки.
    - Добавляет попап детального просмотра картинки.

| Спринт | Версия |                      Технологии                       |                Чеклисты                |              Макеты              |
|:-------|:------:|:-----------------------------------------------------:|:--------------------------------------:|:--------------------------------:|
| 1      | 0.1.0  | [HTML5][tech-html], [CSS3][tech-css], [BEM][tech-bem] | [чеклист 1 спринта][mesto-checklist-1] | [макет 1 спринта][mesto-figma-1] |
| 2      | 0.1.0  |                 [JavaScript][tech-js]                 | [чеклист 2 спринта][mesto-checklist-2] | [макет 2 спринта][mesto-figma-2] |
| 3      | 0.2.0  |                [webpack][tech-webpack]                | [чеклист 3 спринта][mesto-checklist-3] | [макет 3 спринта][mesto-figma-3] |
| 4      | 0.3.0  |                           -                           | [чеклист 4 спринта][mesto-checklist-4] |                -                 |
| -      | 0.4.0  |       [TypeScript][tech-ts], [Vite][tech-vite]        |                   -                    |                -                 |

## Запустить проект

- Клонировать проект - `git clone git@github.com:julfy-bs/mesto.git`
- Установить зависимости `npm install`
- Запустить сервер для разработки `npm run dev`

&copy; Автор - [Сутужко Богдан][author-github]

[//]: # 'Общие переменные для проектов Yandex'

[yandex-practicum-web-plus]: https://practicum.yandex.ru/promo/long-courses/web

[yandex-practicum-url]: https://practicum.yandex.ru/

[yandex-styleguide]: https://code.s3.yandex.net/web-developer/static/design-rules/index.html

[//]: # 'Общие переменные автора'

[author-github]: https://github.com/julfy-bs

[mesto-project]: https://github.com/julfy-bs/mesto-project

[//]: # 'Переменные для проекта mesto'

[mesto-checklist-1]: https://code.s3.yandex.net/web-developer/checklists-pdf/web-plus/checklist-3.pdf

[mesto-checklist-2]: https://code.s3.yandex.net/web-developer/checklists-pdf/web-plus/checklist-4.pdf

[mesto-checklist-3]: https://code.s3.yandex.net/web-developer/checklists-pdf/web-plus/checklist-8.pdf

[mesto-checklist-4]: https://code.s3.yandex.net/web-developer/checklists-pdf/web-plus/checklist-10.pdf

[mesto-figma-1]: https://www.figma.com/file/2cn9N9jSkmxD84oJik7xL7/JavaScript.-Sprint-4?node-id=0%3A1

[mesto-figma-2]: https://www.figma.com/file/bjyvbKKJN2naO0ucURl2Z0/JavaScript.-Sprint-5?node-id=0%3A1

[mesto-figma-3]: https://www.figma.com/file/kRVLKwYG3d1HGLvh7JFWRT/JavaScript.-Sprint-6?node-id=0%3A1&t=NTZ6LMqKskKd4S1Z-0

[//]: # 'Переменные используемых технологий'

[tech-html]: https://html5.org/

[tech-css]: https://www.w3.org/Style/CSS/Overview.en.html

[tech-js]: https://www.javascript.com/

[tech-bem]: https://ru.bem.info/methodology/

[tech-webpack]: https://webpack.js.org/

[tech-vite]: https://vitejs.dev/

[tech-ts]: https://www.typescriptlang.org/

