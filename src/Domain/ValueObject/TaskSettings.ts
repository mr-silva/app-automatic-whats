export class TaskSettings {
  constructor(private message: string, private processItemInterval: number = 10) {}

  public getMessage(): string {
    return this.message
  }

  public getProcessItemInterval(): number {
    return this.processItemInterval
  }

  public setMessage(message: string): this {
    this.message = message
    return this
  }

  public setProcessItemInterval(processItemInterval: number): this {
    this.processItemInterval = processItemInterval
    return this
  }
}
