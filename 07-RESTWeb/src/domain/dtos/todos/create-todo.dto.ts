export class CreateTodoDto {
  private constructor(public readonly text: string) {}

  static create(props: { [key: string]: string }): [string?, CreateTodoDto?] {
    const { text } = props;

    if (!text || text.length === 0)
      return ['text property is required', undefined];

    return [undefined, new CreateTodoDto(text)];
  }
}
