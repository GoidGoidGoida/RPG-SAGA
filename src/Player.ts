import { Logger } from './Logger';
import { Weapon } from './Оружия/Weapon';

export abstract class Player {
  private playerDead: boolean = false;
  public hasSkippedTurn: boolean = false;
  protected weapon: Weapon;

  constructor(
    public name: string,
    public health: number,
    weapon: Weapon,
  ) {
    this.weapon = weapon;
  }

  abstract useAbility(enemy: Player): void;

  attack(enemy: Player): void {
    const damage = this.weapon.getDamage();
    Logger.logAttack(this, enemy, damage);
    enemy.takeDamage(damage);
  }

  takeDamage(damage: number): void {
    if (this.playerDead) {
      return;
    }

    this.health -= damage;
    if (this.health <= 0) {
      this.playerDead = true;
      Logger.logDeath(this);
    }
  }

  isAlive(): boolean {
    return this.health > 0;
  }

  resetRound(): void {
    this.hasSkippedTurn = false;
  }

  skipTurn(): void {
    this.hasSkippedTurn = true;
    Logger.logSkipTurn(this);
  }
}
