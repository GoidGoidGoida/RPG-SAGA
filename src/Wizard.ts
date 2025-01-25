import { Player } from './Player';
import { Weapon } from './Оружия/Weapon';
import { Logger } from './Logger';

export class Wizard extends Player {
  private hasUsedAbility: boolean = false;

  constructor(name: string, health: number, weapon: Weapon) {
    super(name, health, weapon);
  }

  useAbility(enemy: Player): void {
    if (this.hasUsedAbility) {
      this.attack(enemy);
      return;
    }

    Logger.logAbility(this, enemy, 'Заворожение');
    this.hasUsedAbility = true;
    enemy.skipTurn();
  }

  resetRound(): void {
    super.resetRound();
    this.hasUsedAbility = false;
  }
}
