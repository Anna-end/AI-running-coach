interface ListProps<T> {
    items: T[];
    renderItem: (item: T) => React.ReactNode;
    keyExtractor: (item: T) => string;
    emptyMessage?: string;
  }
  
  function List<T>({ items, renderItem, keyExtractor, emptyMessage }: ListProps<T>) {
    if (items.length === 0) {
      return <div>{emptyMessage ?? "Список пуст"}</div>;
    }
    return (
      <div>
        {items.map((item) => (
          <div key={keyExtractor(item)}>{renderItem(item)}</div>
        ))}
      </div>
    );
  }