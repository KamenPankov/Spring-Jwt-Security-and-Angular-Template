export class Role {
  id: number;
  name: string;
  checked?: boolean;
  disabled?: boolean;

  constructor(id: number, name: string, checked?: boolean) {
    this.id = id;
    this.name = name;
    this.checked = checked;
  }
}
