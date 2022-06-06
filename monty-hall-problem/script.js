console.log("Monty Hall problem");

const doors = {
  winDoor: 0,
  firstChoice: 0,
  secondChoice: 0,
  openedDoor: 0,
  getRndDoor: function () {
    return Math.ceil(Math.random() * 3);
  },
  getSecondChoice: function () {
    for (let door = 1; door <= 3; door++) {
      if (door != this.firstChoice && door != this.openedDoor) {
        return door;
      }
    }
  },
  getDoorToOpen: function () {
    let door;
    do {
      door = this.getRndDoor();
    } while (door == this.winDoor || door == this.firstChoice);
    return door;
  },
  isWin: function () {
    return this.winDoor == this.secondChoice;
  },
  turn: function () {
    this.winDoor = this.getRndDoor();
    this.firstChoice = this.getRndDoor();
    this.openedDoor = this.getDoorToOpen();
    this.secondChoice = this.getSecondChoice();
  },
};

const sim = {
  doors: doors,
  attempts: 0,
  winCount: 0,
  go: function (attemptCount) {
    for (let attempt = 1; attempt <= attemptCount; attempt++) {
      this.attempts++;
      this.doors.turn();
      if (this.doors.isWin()) {
        this.winCount++;
      }
      document.writeln(
        `<p>WD=${this.doors.winDoor} FC=${this.doors.firstChoice} OD=${
          this.doors.openedDoor
        } SC=${this.doors.secondChoice} WR=${
          Math.round((this.winCount / this.attempts) * 10000) / 100
        }%</p>`
      );
    }
  },
};

sim.go(20);
