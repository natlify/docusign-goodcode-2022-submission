import React,{ useState } from 'react';
import {
  AppShell,
  useMantineTheme,
} from '@mantine/core';
import HeaderMiddle from './headNav/HeadNav';
import { NavbarMinimal } from './navbar/Navbar';
import SideBar from '../SideBar';

export default function AppShellDemo({children}) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <NavbarMinimal p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
        </NavbarMinimal>
      }
      aside={<SideBar/>}
      header={<HeaderMiddle links={[{link: 'foo', label : 'bar'}]}/>}
    >
      {children}
    </AppShell>
  );
}