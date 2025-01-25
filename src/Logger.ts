import { Player } from './Player';

export class Logger {
  static logRound(round: number): void {
    console.log(`\nРаунд ${round}.\n`);
  }

  static logBattle(player1: Player, player2: Player): void {
    console.log(`(${player1.constructor.name}) ${player1.name} vs (${player2.constructor.name}) ${player2.name}`);
  }

  static logAttack(attacker: Player, defender: Player, damage: number): void {
    console.log(
      `(${attacker.constructor.name}) ${attacker.name} наносит урон ${damage} противнику (${defender.constructor.name}) ${defender.name}`,
    );
  }

  static logAbility(attacker: Player, defender: Player, ability: string, damage?: number): void {
    if (damage) {
      console.log(
        `(${attacker.constructor.name}) ${attacker.name} использует (${ability}) и наносит урон ${damage} противнику (${defender.constructor.name}) ${defender.name}`,
      );
    } else {
      console.log(`(${attacker.constructor.name}) ${attacker.name} использует (${ability})`);
    }
  }

  static logFireDamage(attacker: Player, defender: Player, damage: number): void {
    console.log(
      `(${attacker.constructor.name}) ${attacker.name} наносит урон ${damage} от горения противнику (${defender.constructor.name}) ${defender.name}`,
    );
  }

  static logDeath(player: Player): void {
    console.log(`(${player.constructor.name}) ${player.name} погибает`);
  }

  static logWinner(winner: Player): void {
    console.log(`\nПобедитель: (${winner.constructor.name}) ${winner.name}!`);
  }

  static logSkipTurn(player: Player): void {
    console.log(`(${player.constructor.name}) ${player.name} пропускает ход`);
  }

  static logSkipBattle(player: Player): void {
    console.log(`(${player.constructor.name}) ${player.name} проходит без боя\n`);
  }
}
