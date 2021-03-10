import * as React from 'react';
import 'react-contexify/dist/ReactContexify.css';
import { Menu, Item, ItemParams } from 'react-contexify';
import { useDispatch, useTrackedState } from '../../store';

export const MULTI_ROWS_MENU_ID = 'multi-rows-menu-id';

type MultiRowsMenuProps = {};

const MultiRowsMenu: React.FC<MultiRowsMenuProps> = () => {
  const dispatch = useDispatch();
  const state = useTrackedState();

  function onRowsDelete(p: ItemParams) {
    const { props } = p;
    const { selectedRows } = props;
    const removeIds = Array.from(selectedRows) as number[] | string[];
    state.rowService!.delete(removeIds);

    dispatch({ type: 'REMOVE_ROWS', payload: removeIds });
  }

  return (
    <Menu id={MULTI_ROWS_MENU_ID}>
      <Item onClick={onRowsDelete}>Delete all selected rows</Item>
    </Menu>
  );
};
export default MultiRowsMenu;
