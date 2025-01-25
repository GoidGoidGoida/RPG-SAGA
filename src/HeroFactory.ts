import { Sword } from './Оружия/Sword';
import { Bow } from './Оружия/Bow';
import { Staff } from './Оружия/Staff';
import { Weapon } from './Оружия/Weapon';
import { Player } from './Player';
import { Knight } from './Knight';
import { Archer } from './Archer';
import { Wizard } from './Wizard';

export class HeroFactory {
  static createHero(type: string, name: string, health: number): Player {
    let weapon: Weapon;

    switch (type) {
      case 'Knight':
        weapon = new Sword();
        return new Knight(name, health, weapon);
      case 'Archer':
        weapon = new Bow();
        return new Archer(name, health, weapon);
      case 'Wizard':
        weapon = new Staff();
        return new Wizard(name, health, weapon);
      default:
        throw new Error('Неизвестный тип героя');
    }
  }

  static createRandomHeroes(count: number): Player[] {
    const names = ['Артур', 'Мерлин', 'Галахад', 'Робин', 'Гэндальф'];
    const types = ['Knight', 'Archer', 'Wizard'];
    const heroes: Player[] = [];

    for (let i = 0; i < count; i++) {
      const name = names[Math.floor(Math.random() * names.length)];
      const type = types[Math.floor(Math.random() * types.length)];
      const health = 100;

      heroes.push(this.createHero(type, name, health));
    }

    return heroes;
  }
}
