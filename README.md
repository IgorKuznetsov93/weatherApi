# README #

API for getting current weather by city name

## Получение текущей погоды

Данным методом можно получить текущую погоду по наименованию города

* METHOD = GET
* URL = "<адрес сервера>/weather"

Параметры в query:

|Параметры запроса|Обязательный|Описание|
|---|---|---|
|cityName   | Y | Название города |
|units      | N | Eдиницы измерения(дефолтное значение metric). Возможный вариант imperial |

```markdown
http://127.0.0.1:3000/weather?cityName=омск
```
