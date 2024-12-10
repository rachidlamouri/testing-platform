type PrerequisiteInput = {
  tailId: string;
  headId: string;
};

export class Prerequisite implements PrerequisiteInput {
  tailId: string;

  headId: string;

  get id(): string {
    return `${this.tailId}:${this.headId}`;
  }

  constructor(input: PrerequisiteInput) {
    this.tailId = input.tailId;
    this.headId = input.headId;
  }
}
