interface Todo {
  id: number;
  text: string;
  checked: boolean;
}

interface User {
  login: string;
  passHash: string;
}

export { Todo, User };
