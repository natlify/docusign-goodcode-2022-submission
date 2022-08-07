import React,{ useState } from 'react';
import {
  AppShell,
  useMantineTheme,
} from '@mantine/core';
import HeaderMiddle from './HeadNav';
import SideNavbar from './SideNav';
import SideBar from './SideBar';

export default function AppLayout({children}) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  return (
    <AppShell
      styles={{
        main: {
          background:theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={<SideNavbar p="md" hiddenBreakpoint="sm" hidden={!opened} setOpened={setOpened} width={{ sm: 200, lg: 300 }}/>}
      aside={<SideBar/>}
      header={<HeaderMiddle links={[{link: 'foo', label : 'bar'}]} opened={opened} setOpened={setOpened}/>}
    >
      {children}
    </AppShell>
  );
}