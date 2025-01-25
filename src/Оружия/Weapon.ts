export abstract class Weapon {
  constructor(
    public name: string,
    public baseDamage: number,
  ) {}

  getDamage(): number {
    return this.baseDamage;
  }
}
