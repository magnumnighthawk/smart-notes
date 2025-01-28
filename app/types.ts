// types.ts
export interface Note {
  id: string;
  title: string;
  content: string;
  category: {
    name: string;
  };
}
