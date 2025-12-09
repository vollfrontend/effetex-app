export interface HeaderProps {
  title?: string;
  isSearchIncluded?: boolean;

  // Якщо є пошук
  searchValue?: string;
  onSearchChange?: (text: string) => void;
  onSearchSubmit?: (text: string) => void;
}
