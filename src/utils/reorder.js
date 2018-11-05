export const reorder = (list, source, destination) => {
  const result = Array.from(list);
  const [removed] = result.splice(source, 1);
  result.splice(destination, 0, removed);

  return result;
};

export const reorderCardMap = ({ cardMap, source, destination }) => {
  const current = [...cardMap[source.droppableId]];
  const next = [...cardMap[destination.droppableId]];
  const target = current[source.index];

  /*
   * movendo dentro da mesma lista
   */
  if (source.droppableId === destination.droppableId) {
    const reordered = reorder(current, source.index, destination.index);
    const result = {
      ...cardMap,
      [source.droppableId]: reordered,
    };

    return {
      cardMap: result,
    };
  }

  /*
   * movendo para uma lista diferente
   */

  // remove da lista original
  current.splice(source.index, 1);
  // insere na nova lista
  next.splice(destination.index, 0, target);

  const result = {
    ...cardMap,
    [source.droppableId]: current,
    [destination.droppableId]: next,
  };

  return {
    cardMap: result,
  };
};
