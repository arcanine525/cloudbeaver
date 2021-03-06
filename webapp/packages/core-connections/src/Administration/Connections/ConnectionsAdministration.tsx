/*
 * cloudbeaver - Cloud Database Manager
 * Copyright (C) 2020 DBeaver Corp and others
 *
 * Licensed under the Apache License, Version 2.0.
 * you may not use this file except in compliance with the License.
 */

import { observer } from 'mobx-react';
import styled, { css } from 'reshadow';

import { AdministrationTools } from '@cloudbeaver/core-administration';
import { Loader, IconButton } from '@cloudbeaver/core-blocks';
import { useController } from '@cloudbeaver/core-di';
import { useStyles, composes } from '@cloudbeaver/core-theming';

import { ConnectionsAdministrationController } from './ConnectionsAdministrationController';
import { ConnectionsTable } from './ConnectionsTable/ConnectionsTable';

const styles = composes(
  css`
    AdministrationTools {
      composes: theme-background-secondary theme-text-on-secondary from global;
    }
  `,
  css`
    content {
      position: relative;
      padding-top: 16px;
      flex: 1;
      overflow: auto;
    }
    TableColumnHeader {
      border-top: solid 1px;
    }
    AdministrationTools {
      display: flex;
      padding: 0 16px;
      align-items: center;
    }
    IconButton {
      height: 32px;
      width: 32px;
      margin-right: 16px;
    }
  `
);

export const ConnectionsAdministration = observer(function ConnectionsAdministration() {
  const controller = useController(ConnectionsAdministrationController);

  return styled(useStyles(styles))(
    <>
      <AdministrationTools>
        <IconButton name="add" viewBox="0 0 28 28" onClick={controller.create} />
        <IconButton name="trash" viewBox="0 0 28 28" onClick={controller.delete} />
        <IconButton name="reload" viewBox="0 0 28 28" onClick={controller.update} />
      </AdministrationTools>
      <content as='div'>
        <ConnectionsTable connections={controller.connections} selectedItems={controller.selectedItems} />
        {controller.isLoading && <Loader overlay/>}
      </content>
    </>
  );
});
