import { Player } from './Player';
import { HeroFactory } from './HeroFactory';
import { Logger } from './Logger';

export class Game {
  private players: Player[] = [];
  private rounds: number = 1;

  constructor(private numberOfPlayers: number) {
    if (numberOfPlayers < 2) {
      throw new Error('Количество игроков должно быть не меньше 2!');
    }
    this.players = HeroFactory.createRandomHeroes(numberOfPlayers);
  }

  private fight(player1: Player, player2: Player): Player {
    Logger.logBattle(player1, player2);

    let currentPlayer = player1;
    let opponent = player2;

    while (player1.isAlive() && player2.isAlive()) {
      if (Math.random() < 0.5) {
        currentPlayer.attack(opponent);
      } else {
        currentPlayer.useAbility(opponent);
      }

      if (!opponent.isAlive()) {
        break;
      }

      if (opponent.hasSkippedTurn) {
        opponent.hasSkippedTurn = false;
        continue;
      }

      [currentPlayer, opponent] = [opponent, currentPlayer];
    }

    return player1.isAlive() ? player1 : player2;
  }

  public start(): void {
    while (this.players.length > 1) {
      Logger.logRound(this.rounds);
      const remaining: Player[] = [];

      if (this.players.length % 2 !== 0) {
        const lastPlayer = this.players.pop(); // берем последнего игрока
        if (lastPlayer) {
          remaining.push(lastPlayer); // добавляем в след раунд. в оставшихся
          Logger.logSkipBattle(lastPlayer);
        }
      }

      for (let i = 0; i < this.players.length; i += 2) {
        const player1 = this.players[i];
        const player2 = this.players[i + 1];
        const winner = this.fight(player1, player2);
        remaining.push(winner);

        winner.resetRound();
      }

      this.players = remaining;
      this.rounds++;
    }

    Logger.logWinner(this.players[0]);
  }
}
