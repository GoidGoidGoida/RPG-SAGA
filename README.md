1. Archer.ts
Описание: Этот файл содержит класс Archer, который является подклассом Player. Лучник имеет уникальные способности и атрибуты.

Основные моменты:

isBurning: Логический флаг, указывающий, горит ли лучник.

hasUsedAbility: Логический флаг, указывающий, использовал ли лучник свою способность в текущем раунде.

useAbility: Метод, который позволяет лучнику использовать способность "Огненные стрелы", нанося дополнительный урон врагу и поджигая его.

attack: Метод атаки, который учитывает базовый урон оружия и дополнительный урон от горения, если оно активно.

resetRound: Метод сброса состояния лучника в начале нового раунда.

2. Game.ts
Описание: Этот файл содержит класс Game, который управляет логикой игры, включая создание игроков, проведение раундов и определение победителя.

Основные моменты:

players: Массив игроков, участвующих в игре.

rounds: Счетчик раундов.

fight: Метод, который проводит бой между двумя игроками, чередуя атаки и способности.

start: Метод, который запускает игру, управляет раундами и определяет победителя.

3. HeroFactory.ts
Описание: Этот файл содержит класс HeroFactory, который отвечает за создание героев (игроков) с различными типами и оружием.

Основные моменты:

createHero: Метод, который создает героя определенного типа (Рыцарь, Лучник, Волшебник) с соответствующим оружием.

createRandomHeroes: Метод, который создает случайных героев с случайными именами и типами.

4. index.ts
Описание: Это точка входа в приложение. Здесь создается экземпляр игры и запускается процесс игры.

Основные моменты:

Создается экземпляр Game с указанием количества игроков.

Вызывается метод start для начала игры.

5. Knight.ts
Описание: Этот файл содержит класс Knight, который является подклассом Player. Рыцарь имеет уникальные способности.

Основные моменты:

useAbility: Метод, который позволяет рыцарю использовать способность "Удар возмездия", нанося дополнительный урон врагу.

resetRound: Метод сброса состояния рыцаря в начале нового раунда.

6. Logger.ts
Описание: Этот файл содержит класс Logger, который отвечает за логирование различных событий в игре.

Основные моменты:

Различные методы для логирования раундов, атак, способностей, урона от огня, смерти игроков, победителей и пропущенных ходов.

7. Player.ts
Описание: Этот файл содержит абстрактный класс Player, который является базовым классом для всех типов игроков.

Основные моменты:

playerDead: Логический флаг, указывающий, жив ли игрок.

hasSkippedTurn: Логический флаг, указывающий, пропустил ли игрок ход.

weapon: Оружие, которым владеет игрок.

attack: Метод атаки, который наносит урон врагу.

takeDamage: Метод, который уменьшает здоровье игрока при получении урона.

isAlive: Метод, проверяющий, жив ли игрок.

resetRound: Метод сброса состояния игрока в начале нового раунда.

skipTurn: Метод, который позволяет игроку пропустить ход.

8. Wizard.ts
Описание: Этот файл содержит класс Wizard, который является подклассом Player. Волшебник имеет уникальные способности.

Основные моменты:

hasUsedAbility: Логический флаг, указывающий, использовал ли волшебник свою способность в текущем раунде.

useAbility: Метод, который позволяет волшебнику использовать способность "Заворожение", заставляя врага пропустить ход.

resetRound: Метод сброса состояния волшебника в начале нового раунда.

9. Bow.ts
Описание: Этот файл содержит класс Bow, который является подклассом Weapon. Лук имеет базовый урон 10.

Основные моменты:

Конструктор инициализирует лук с именем "Лук" и базовым уроном 10.

10. Staff.ts
Описание: Этот файл содержит класс Staff, который является подклассом Weapon. Посох имеет базовый урон 8.

Основные моменты:

Конструктор инициализирует посох с именем "Посох" и базовым уроном 8.

11. Sword.ts
Описание: Этот файл содержит класс Sword, который является подклассом Weapon. Меч имеет базовый урон 15.

Основные моменты:

Конструктор инициализирует меч с именем "Меч" и базовым уроном 15.

12. Weapon.ts
Описание: Этот файл содержит абстрактный класс Weapon, который является базовым классом для всех типов оружия.

Основные моменты:

name: Название оружия.

baseDamage: Базовый урон оружия.

getDamage: Метод, возвращающий базовый урон оружия.
