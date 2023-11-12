class TimeTrackerContainer {
  private time: number = Date.now();

  public resetTime(): void {
    this.time = Date.now();
  }

  public getTimeDiff(): number {
    return this.time - Date.now();
  }
}

let timeTrackerContainer: TimeTrackerContainer;

export const getTimeTrackerContainer = (): TimeTrackerContainer => {
  if (timeTrackerContainer === undefined) {
    timeTrackerContainer = new TimeTrackerContainer();
  }
  return timeTrackerContainer;
};
