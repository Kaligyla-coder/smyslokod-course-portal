# Автопостинг рилсов - готовый репозиторий - СмыслоКод

- **URL:** https://smyslokod.ru/dashboard/praktikum-august-2026/solutions/reels-autopost
- **Экспорт:** 2026-08-27 21:54

---

- Автопостинг рилсов - готовый репозиторий - СмыслоКод [Смысло Код ](/) [Клуб](/)
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
 [Гайды 135 ](/guides)[Промпты 12 ](/promty)[Скиллы 7 ](/skills)[MCP](/mcp)[Решения 6 ](/market)[Словарь 12 ](/koncept) [Инструменты](/guides) / [Решения](/market) / Автопостинг рилсов 
# Автопостинг рилсов

Агент публикует твои вертикальные видео в Instagram Reels, TikTok и YouTube Shorts одной командой: через официальные API, без риска блокировки. Мастер настройки с нуля прилагается.
 С СмыслоКод · Интеграция · v 1.0.0 · обновлено сегодня · 31 
Твой доступ

## Запуск за 3 шага
 1 
### Скачай архив
 
Архив подписан персонально - внутри LICENSE.txt с твоим именем, email и Tracking ID. Ссылку никому не пересылай: при скачивании по ней мы запишем твою копию.
[Скачать v1.0.0 · 10 КБ ](https://smyslokod.ru/api/dashboard/solutions/reels-autopost/download?version=1.0.0&t=eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiI0MTY4NDU3ZS02YzVjLTQ0YmYtYTEzZi1kYWVmOTEzZWQzYzIiLCJlbWFpbCI6ImJ6Zm9ybWFAZ21haWwuY29tIiwic29sdXRpb25TbHVnIjoicmVlbHMtYXV0b3Bvc3QiLCJ2ZXJzaW9uU2VtdmVyIjoiMS4wLjAiLCJ0eXAiOiJtYXJrZXQtZG93bmxvYWQiLCJpYXQiOjE3ODc4NTY4NjUsImV4cCI6MTc5MDQ0ODg2NX0.DVJ63jmVu_qi7cJNhB9A0uMGj6toIQw1Aif1p3W3rn0)
Копия будет выдана на bzforma@gmail.com . Если это не твоя почта - ты вошёл под другим аккаунтом.
 2 
### Скопируй промпт для ИИ-агента
 
Вставь его в Claude Code (или Cursor / ChatGPT в VS Code) - агент сам распакует архив, прочитает LICENSE.txt и оглавление, и подтвердит, что готов работать.
 Разворачиваю «Автопостинг рилсов» v1.0.0. Сделай по шагам, отчитываясь после каждого:

1. Скачай мою персональную копию архива (ссылка привязана ко мне подписанным токеном, внутри LICENSE.txt с моим именем):
 curl -L -o reels-autopost-v1.0.0.tar.gz "https://smyslokod.ru/api/dashboard/solutions/reels-autopost/download?version=1.0.0&t=eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiI0MTY4NDU3ZS02YzVjLTQ0YmYtYTEzZi1kYWVmOTEzZWQzYzIiLCJlbWFpbCI6ImJ6Zm9ybWFAZ21haWwuY29tIiwic29sdXRpb25TbHVnIjoicmVlbHMtYXV0b3Bvc3QiLCJ2ZXJzaW9uU2VtdmVyIjoiMS4wLjAiLCJ0eXAiOiJtYXJrZXQtZG93bmxvYWQiLCJpYXQiOjE3ODc4NTY4NjUsImV4cCI6MTc5MDQ0ODg2NX0.DVJ63jmVu_qi7cJNhB9A0uMGj6toIQw1Aif1p3W3rn0"

2. Проверь, что скачался архив, а не страница ошибки:
 file reels-autopost-v1.0.0.tar.gz # должно быть gzip compressed data
 Если это не архив - остановись и скажи мне, ссылка протухла.

3. Распакуй в отдельную папку:
 mkdir -p /tmp/reels-autopost && tar -xzf reels-autopost-v1.0.0.tar.gz -C /tmp/reels-autopost

4. Поставь оба скилла в общую папку скиллов:
 mkdir -p ~/.claude/skills && cp -r /tmp/reels-autopost/skills/reels-publisher /tmp/reels-autopost/skills/reels-autopost-setup ~/.claude/skills/

5. Прочитай LICENSE.txt в корне архива и подтверди мне, что лицензия выписана на моё имя.

6. Проверь: фраза «настрой автопубликацию рилсов» должна подхватывать скилл reels-autopost-setup. Запусти его и веди меня по шагам. Скопировать промпт 3 
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
 
Публикация одной командой в Instagram Reels, TikTok и YouTube Shorts
 
Мастер настройки с нуля: от регистрации до тестового поста
 
Только официальные API платформ: аккаунты в безопасности
 
Постинг по расписанию и режим черновика для TikTok
 
Скрипт без зависимостей: хватит обычного Python
 
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
 Major 27 августа 2026 г. · 10 КБ 
## v1.0.0

 
- Скилл «Автопостинг рилсов»: публикация вертикальных видео в Instagram Reels, TikTok и YouTube Shorts одной командой.

- Скилл-мастер настройки: регистрация, подключение аккаунтов, проверка, тестовый пост.

- Постинг по расписанию, режим черновика TikTok, пометка ИИ-контента, защита от дублей.

 [Скачать v 1.0.0](https://smyslokod.ru/api/dashboard/solutions/reels-autopost/download?version=1.0.0&t=eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiI0MTY4NDU3ZS02YzVjLTQ0YmYtYTEzZi1kYWVmOTEzZWQzYzIiLCJlbWFpbCI6ImJ6Zm9ybWFAZ21haWwuY29tIiwic29sdXRpb25TbHVnIjoicmVlbHMtYXV0b3Bvc3QiLCJ2ZXJzaW9uU2VtdmVyIjoiMS4wLjAiLCJ0eXAiOiJtYXJrZXQtZG93bmxvYWQiLCJpYXQiOjE3ODc4NTY4NjUsImV4cCI6MTc5MDQ0ODg2NX0.DVJ63jmVu_qi7cJNhB9A0uMGj6toIQw1Aif1p3W3rn0) Доступно тебе 
участнику практикума
 [Скачать v1.0.0 · 10 КБ ](https://smyslokod.ru/api/dashboard/solutions/reels-autopost/download?version=1.0.0&t=eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiI0MTY4NDU3ZS02YzVjLTQ0YmYtYTEzZi1kYWVmOTEzZWQzYzIiLCJlbWFpbCI6ImJ6Zm9ybWFAZ21haWwuY29tIiwic29sdXRpb25TbHVnIjoicmVlbHMtYXV0b3Bvc3QiLCJ2ZXJzaW9uU2VtdmVyIjoiMS4wLjAiLCJ0eXAiOiJtYXJrZXQtZG93bmxvYWQiLCJpYXQiOjE3ODc4NTY4NjUsImV4cCI6MTc5MDQ0ODg2NX0.DVJ63jmVu_qi7cJNhB9A0uMGj6toIQw1Aif1p3W3rn0)[Все версии ->](#versions) Автор С СмыслоКод 
Персональная лицензия - LICENSE.txt в архиве выписан на тебя
 
Доступно тебе
[Скачать v1.0.0](https://smyslokod.ru/api/dashboard/solutions/reels-autopost/download?version=1.0.0&t=eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiI0MTY4NDU3ZS02YzVjLTQ0YmYtYTEzZi1kYWVmOTEzZWQzYzIiLCJlbWFpbCI6ImJ6Zm9ybWFAZ21haWwuY29tIiwic29sdXRpb25TbHVnIjoicmVlbHMtYXV0b3Bvc3QiLCJ2ZXJzaW9uU2VtdmVyIjoiMS4wLjAiLCJ0eXAiOiJtYXJrZXQtZG93bmxvYWQiLCJpYXQiOjE3ODc4NTY4NjUsImV4cCI6MTc5MDQ0ODg2NX0.DVJ63jmVu_qi7cJNhB9A0uMGj6toIQw1Aif1p3W3rn0)