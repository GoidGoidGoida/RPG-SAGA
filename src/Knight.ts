import { Player } from './Player';
import { Logger } from './Logger';
import { Weapon } from './Оружия/Weapon';

export class Knight extends Player {
  constructor(name: string, health: number, weapon: Weapon) {
    super(name, health, weapon);
  }

  useAbility(enemy: Player): void {
    const baseDamage = this.weapon.getDamage();
    const additionalDamage = baseDamage * 0.3;
    const fullDamage = baseDamage + additionalDamage;

    Logger.logAbility(this, enemy, 'Удар возмездия', fullDamage);
    enemy.takeDamage(fullDamage);
  }

  resetRound(): void {
    super.resetRound();
  }
}
