export interface CartContextType {
  selectedItems: number[] | null;
  setSelectedItems: React.Dispatch<React.SetStateAction<number[] | null>>;
}
