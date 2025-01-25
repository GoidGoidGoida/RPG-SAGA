import { Archer } from '../src/Archer';
import { Wizard } from '../src/Wizard';
import { Sword } from '../src/Оружия/Sword';
import { Game } from '../src/Game';
import { Knight } from '../src/Knight';
import { Bow } from '../src/Оружия/Bow';
import { Staff } from '../src/Оружия/Staff';

describe('Game', () => {
  let game: Game;

  test('Должно создать игру с указанным количеством игроков', () => {
    game = new Game(3);
    expect(game['players'].length).toBe(3);
  });

  test('Должно выдать ошибку, если игроков меньше 2', () => {
    expect(() => new Game(1)).toThrow('Количество игроков должно быть не меньше 2!');
  });

  test('Должно правильно обрабатывать нечетное кол-во игроков. Один игрок пропускает бой', () => {
    game = new Game(3);
    game.start();
  });

  test('Должно правильно использовать "Удар возмездия" против врага', () => {
    const sword = new Sword();
    const knight = new Knight('Артур', 100, sword);
    const enemy = new Archer('Робин', 100, new Bow());

    const baseDamage = sword.getDamage();
    const expectedDamage = baseDamage + baseDamage * 0.3;

    knight.useAbility(enemy);
    expect(enemy.health).toBe(100 - expectedDamage);
  });

  test('Должно правильно использовать "Огненные стрелы" против врага', () => {
    const bow = new Bow();
    const archer = new Archer('Робин', 100, bow);
    const enemy = new Knight('Артур', 100, new Sword());

    archer.useAbility(enemy);
    expect(enemy.health).toBe(100 - 2);
    expect(archer['isBurning']).toBe(true);
  });

  it('Должен проходить урон второй атаки лучника, при использовании "Огненных стрел"', () => {
    const bow = new Bow();
    const archer = new Archer('Робин', 100, bow);
    const enemy = new Knight('Враг', 100, new Sword());

    archer.useAbility(enemy);

    expect(enemy.health).toBe(98);

    archer.attack(enemy);

    expect(enemy.health).toBe(86);
  });

  test('Должно правильно использовать "Заворожение" против врага', () => {
    const wizard = new Wizard('Мерлин', 100, new Wand());
    const enemy = new Knight('Артур', 100, new Sword());

    wizard.useAbility(enemy);
    expect(enemy.hasSkippedTurn).toBe(true);
  });

  test('проверка сброса способностей после раунда', () => {
    const sword = new Sword();
    const bow = new Bow();
    const wand = new Wand();

    const knight = new Knight('Артур', 100, sword);
    const archer = new Archer('Робин', 100, bow);
    const wizard = new Wizard('Мерлин', 100, wand);

    knight.useAbility(archer);
    archer.useAbility(wizard);
    wizard.useAbility(knight);

    knight.resetRound();
    archer.resetRound();
    wizard.resetRound();

    expect(knight['hasSkippedTurn']).toBe(false);
    expect(archer['isBurning']).toBe(false);
    expect(archer['hasUsedAbility']).toBe(false);
    expect(wizard['hasUsedAbility']).toBe(false);
  });

  test('проверка определения победителя', () => {
    const sword = new Sword();
    const bow = new Bow();

    const knight = new Knight('Артур', 100, sword);
    const archer = new Archer('Робин', 10, bow);

    game = new Game(2);
    game['players'] = [knight, archer];
    game.start();
  });

  test('проверка проведения раундов. должно быть 2 раунда', () => {
    const sword = new Sword();
    const bow = new Bow();
    const wand = new Wand();

    const knight = new Knight('Артур', 100, sword);
    const archer = new Archer('Робин', 100, bow);
    const wizard = new Wizard('Мерлин', 100, wand);

    game = new Game(3);
    game['players'] = [knight, archer, wizard];
    game.start();
  });

  test('проверка логирования атаки и способности', () => {
    const sword = new Sword();
    const bow = new Bow();

    const knight = new Knight('Артур', 100, sword);
    const archer = new Archer('Робин', 100, bow);

    knight.attack(archer);
    archer.useAbility(knight);
  });

  test('проверка смерти героя', () => {
    const sword = new Sword();
    const bow = new Bow();

    const knight = new Knight('Артур', 100, sword);
    const archer = new Archer('Робин', 10, bow);

    knight.attack(archer);
    expect(archer.isAlive()).toBe(false);
  });

  test('проверка пропуска хода у способности мага', () => {
    const wand = new Wand();
    const sword = new Sword();

    const wizard = new Wizard('Мерлин', 100, wand);
    const knight = new Knight('Артур', 100, sword);

    wizard.useAbility(knight);
    expect(knight.hasSkippedTurn).toBe(true);
  });

  test('проверка дамага от огня', () => {
    const bow = new Bow();
    const sword = new Sword();

    const archer = new Archer('Робин', 100, bow);
    const knight = new Knight('Артур', 100, sword);

    archer.useAbility(knight);
    archer.attack(knight);

    const baseDamage = bow.getDamage();
    const fireDamage = 2;

    expect(knight.health).toBe(100 - fireDamage - baseDamage - fireDamage);
  });

  test('должен продолжать наносить урон от огня при следующих атаках лучника, во время горения противника', () => {
    const bow = new Bow();
    const sword = new Sword();

    const archer = new Archer('Робин', 100, bow);
    const knight = new Knight('Артур', 100, sword);

    archer.useAbility(knight);
    expect(knight.health).toBe(100 - 2);
    expect(archer['isBurning']).toBe(true);

    archer.attack(knight);
    expect(knight.health).toBe(100 - 2 - bow.getDamage() - 2);

    archer.attack(knight);
    expect(knight.health).toBe(100 - 2 - bow.getDamage() - 2 - bow.getDamage() - 2);

    expect(archer['isBurning']).toBe(true); // горение сохраняется до сброса
  });
});
