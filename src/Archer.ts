import { Player } from './Player';
import { Weapon } from './Оружия/Weapon';
import { Logger } from './Logger';

export class Archer extends Player {
  private isBurning: boolean = false;
  private hasUsedAbility: boolean = false;

  constructor(name: string, health: number, weapon: Weapon) {
    super(name, health, weapon);
  }

  useAbility(enemy: Player): void {
    if (this.hasUsedAbility) {
      this.attack(enemy);
      return;
    }

    Logger.logAbility(this, enemy, 'Огненные стрелы', 2);
    enemy.takeDamage(2);
    this.isBurning = true;
    this.hasUsedAbility = true;
  }

  attack(enemy: Player): void {
    const baseDamage = this.weapon.getDamage();
    const fireDamage = this.isBurning ? 2 : 0; // true - дамаг 2. не тру - не дамажем
    const totalDamage = baseDamage + fireDamage;

    Logger.logAttack(this, enemy, baseDamage);
    if (this.isBurning) {
      Logger.logFireDamage(this, enemy, fireDamage);
    }

    enemy.takeDamage(totalDamage);
  }

  resetRound(): void {
    super.resetRound();
    this.hasUsedAbility = false;
    this.isBurning = false;
  }
}
