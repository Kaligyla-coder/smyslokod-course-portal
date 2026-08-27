# Папка правил - готовый репозиторий - СмыслоКод

- **URL:** https://smyslokod.ru/dashboard/praktikum-august-2026/solutions/rules
- **Экспорт:** 2026-08-27 21:54

---

- Папка правил - готовый репозиторий - СмыслоКод [Смысло Код ](/) [Клуб](/)
- [Встречи](/meetings)
- [Участники](/members)
- [Видео](/watch)
- [Инструменты](/guides)
 [ Практикум](/praktikum) [ Тренинг](/training) - [ Инструменты](/guides)
 - [Клуб](/)
- [Встречи](/meetings)
- [Участники](/members)
- [Видео](/watch)
- [Инструменты](/guides)
- [ Практикум](/praktikum)
- [ Тренинг](/training)
 [Гайды 135 ](/guides)[Промпты 12 ](/promty)[Скиллы 7 ](/skills)[MCP](/mcp)[Решения 6 ](/market)[Словарь 12 ](/koncept) [Инструменты](/guides) / [Решения](/market) / Папка правил 
# Папка правил

Готовые регламенты для ИИ-агента: юридические нормы, стиль текстов, правила дизайна и работы с кодом. Кладёшь в проект - и агент перестаёт нарушать.
 С СмыслоКод · Чертёж · v 1.0.0 · обновлено сегодня · 28 
Твой доступ

## Запуск за 3 шага
 1 
### Скачай архив
 
Архив подписан персонально - внутри LICENSE.txt с твоим именем, email и Tracking ID. Ссылку никому не пересылай: при скачивании по ней мы запишем твою копию.
[Скачать v1.0.0 · 13 КБ ](https://smyslokod.ru/api/dashboard/solutions/rules/download?version=1.0.0&t=eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiI0MTY4NDU3ZS02YzVjLTQ0YmYtYTEzZi1kYWVmOTEzZWQzYzIiLCJlbWFpbCI6ImJ6Zm9ybWFAZ21haWwuY29tIiwic29sdXRpb25TbHVnIjoicnVsZXMiLCJ2ZXJzaW9uU2VtdmVyIjoiMS4wLjAiLCJ0eXAiOiJtYXJrZXQtZG93bmxvYWQiLCJpYXQiOjE3ODc4NTY4NjIsImV4cCI6MTc5MDQ0ODg2Mn0._F2hniMsMSdYGEi0TRcbI0cwE3KBXeBNwY-kQC5Vit4)
Копия будет выдана на bzforma@gmail.com . Если это не твоя почта - ты вошёл под другим аккаунтом.
 2 
### Скопируй промпт для ИИ-агента
 
Вставь его в Claude Code (или Cursor / ChatGPT в VS Code) - агент сам распакует архив, прочитает LICENSE.txt и оглавление, и подтвердит, что готов работать.
 Разворачиваю «Папка правил» v1.0.0. Сделай по шагам, отчитываясь после каждого:

1. Скачай мою персональную копию архива (ссылка привязана ко мне подписанным токеном, внутри LICENSE.txt с моим именем):
 curl -L -o rules-pack-v1.0.0.tar.gz "https://smyslokod.ru/api/dashboard/solutions/rules/download?version=1.0.0&t=eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiI0MTY4NDU3ZS02YzVjLTQ0YmYtYTEzZi1kYWVmOTEzZWQzYzIiLCJlbWFpbCI6ImJ6Zm9ybWFAZ21haWwuY29tIiwic29sdXRpb25TbHVnIjoicnVsZXMiLCJ2ZXJzaW9uU2VtdmVyIjoiMS4wLjAiLCJ0eXAiOiJtYXJrZXQtZG93bmxvYWQiLCJpYXQiOjE3ODc4NTY4NjIsImV4cCI6MTc5MDQ0ODg2Mn0._F2hniMsMSdYGEi0TRcbI0cwE3KBXeBNwY-kQC5Vit4"

2. Проверь, что скачался архив, а не страница ошибки:
 file rules-pack-v1.0.0.tar.gz # должно быть gzip compressed data
 Если это не архив - остановись и скажи мне, ссылка протухла.

3. Распакуй во временную папку:
 mkdir -p /tmp/rules-pack && tar -xzf rules-pack-v1.0.0.tar.gz -C /tmp/rules-pack

4. Скопируй папку правил в корень моего текущего проекта:
 cp -r /tmp/rules-pack/rules <корень_проекта>/rules
 Убедись, что получилось <корень_проекта>/rules/INDEX.md.

5. Подключи правила: если в корне проекта нет CLAUDE.md - создай его из /tmp/rules-pack/CLAUDE.md. Если уже есть - добавь в него блок подключения из /tmp/rules-pack/CLAUDE.md, не перезаписывая мой файл.

6. Прочитай LICENSE.txt в корне архива и подтверди мне, что лицензия выписана на моё имя.

7. Проверь: прочитай rules/INDEX.md и скажи мне, какие регламенты ты откроешь, если я попрошу сделать лендинг. Скопировать промпт 3 
### Дай агенту первую задачу
 
Когда агент подтвердил готовность - можешь давать задачи. Несколько стартовых направлений:
 - Попроси показать структуру и объяснить, что внутри.
- Дай свой контекст - текущие инструменты, цель - и пусть скажет, что из пакета подходит, а что лишнее.
- Сразу попроси развернуть в твоём проекте по инструкции из README внутри архива.
 Если что-то пошло не так + 
#### Как развернуть решение
 - Скачай архив - кнопка «Скачать» в шаге 1.
- Открой папку проекта в Claude Code, Cursor или VS Code (с расширением ChatGPT).
- Скопируй промпт из шага 2 и вставь в чат с ИИ-агентом.
- Агент распакует архив, прочитает LICENSE.txt и оглавление, подтвердит готовность.
- Дай задачу: показать структуру, объяснить README, развернуть в твоём проекте.
 Можно ли использовать решение в нескольких проектах? 
Да - лицензия персональная (на тебя), не на проект. Используй в любом количестве своих проектов. Передавать архив третьим лицам нельзя.
 Что делать, если ИИ-агент не понимает структуру? 
Попроси его прочитать README.md внутри архива - там описана архитектура и порядок развёртывания. Если всё равно не разобрался - напиши в саппорт со скриншотом.
 Как получить новую версию? 
Когда выходит новая версия - присылаем письмо (если включены уведомления). Скачать можно в секции «Версии» ниже.
 
Не получилось? Напиши в саппорт - отвечаем в течение рабочего дня. Прикладывай скриншот и название решения.
[Написать в саппорт](mailto:support@smyslokod.ru?subject=Помощь%20с%20решением) 
Что в архиве

## Что внутри
 
INDEX.md - маршрутизатор: какой регламент читать под твою задачу
 
Юридические регламенты РФ: лексика образования, англицизмы, гарантии, оферта
 
Стиль текстов: тон, стоп-слова, маркеры машинного текста
 
Правила дизайна: палитра, шрифты, сетка без самодеятельности
 
Порядок работы в репозитории: секреты, коммиты, данные людей
 
Ещё посмотри

## Тебе также может пригодиться
 [](/market/ai-cofounder) В подборке 
Движок · v 1.1.0 

### AI-Кофаундер - проактивный ИИ-сооснователь

Готовый open-source репозиторий: ИИ-сооснователь живёт на твоём маке, сам делает работу по расписанию и шлёт результат в Telegram. Форкнул,...
 TypeScript Claude Agent SDK Node 22 Prisma + 5 С СмыслоКод 50 000 ₽ Подробнее -> [](/market/blueprint) В подборке 
Чертёж · v 2.0 

### СмыслоКод Blueprint

Полный чертёж платформы СмыслоКод - той, на которой ты читаешь эту страницу. Кабинет, деньги, клуб, эфиры, админка из 71 раздела, 56...
 С СмыслоКод 50 000 ₽ Подробнее -> [](/skills/starter-proekta) 
Скилл · v 1.0.3 

### Стартер проекта

Каркас, с которого начинается любой проект. Пишешь агенту «привет» - и он сам за 90-120 минут разворачивает среду: второй мозг твоего дела...
 С СмыслоКод Цена по запросу Подробнее -> 
История

## Версии
 
### v 1.0.0
 Major 27 августа 2026 г. · 13 КБ 
## v1.0.0

 
- INDEX.md - маршрутизатор правил: тип задачи → какие регламенты читать.

- Юридические регламенты: образовательная лексика, англицизмы, гарантии, оферта.

- Стиль текстов, правила дизайна, порядок работы в репозитории.

 [Скачать v 1.0.0](https://smyslokod.ru/api/dashboard/solutions/rules/download?version=1.0.0&t=eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiI0MTY4NDU3ZS02YzVjLTQ0YmYtYTEzZi1kYWVmOTEzZWQzYzIiLCJlbWFpbCI6ImJ6Zm9ybWFAZ21haWwuY29tIiwic29sdXRpb25TbHVnIjoicnVsZXMiLCJ2ZXJzaW9uU2VtdmVyIjoiMS4wLjAiLCJ0eXAiOiJtYXJrZXQtZG93bmxvYWQiLCJpYXQiOjE3ODc4NTY4NjIsImV4cCI6MTc5MDQ0ODg2Mn0._F2hniMsMSdYGEi0TRcbI0cwE3KBXeBNwY-kQC5Vit4) Доступно тебе 
участнику практикума
 [Скачать v1.0.0 · 13 КБ ](https://smyslokod.ru/api/dashboard/solutions/rules/download?version=1.0.0&t=eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiI0MTY4NDU3ZS02YzVjLTQ0YmYtYTEzZi1kYWVmOTEzZWQzYzIiLCJlbWFpbCI6ImJ6Zm9ybWFAZ21haWwuY29tIiwic29sdXRpb25TbHVnIjoicnVsZXMiLCJ2ZXJzaW9uU2VtdmVyIjoiMS4wLjAiLCJ0eXAiOiJtYXJrZXQtZG93bmxvYWQiLCJpYXQiOjE3ODc4NTY4NjIsImV4cCI6MTc5MDQ0ODg2Mn0._F2hniMsMSdYGEi0TRcbI0cwE3KBXeBNwY-kQC5Vit4)[Все версии ->](#versions) Автор С СмыслоКод 
Персональная лицензия - LICENSE.txt в архиве выписан на тебя
 
Доступно тебе
[Скачать v1.0.0](https://smyslokod.ru/api/dashboard/solutions/rules/download?version=1.0.0&t=eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiI0MTY4NDU3ZS02YzVjLTQ0YmYtYTEzZi1kYWVmOTEzZWQzYzIiLCJlbWFpbCI6ImJ6Zm9ybWFAZ21haWwuY29tIiwic29sdXRpb25TbHVnIjoicnVsZXMiLCJ2ZXJzaW9uU2VtdmVyIjoiMS4wLjAiLCJ0eXAiOiJtYXJrZXQtZG93bmxvYWQiLCJpYXQiOjE3ODc4NTY4NjIsImV4cCI6MTc5MDQ0ODg2Mn0._F2hniMsMSdYGEi0TRcbI0cwE3KBXeBNwY-kQC5Vit4)