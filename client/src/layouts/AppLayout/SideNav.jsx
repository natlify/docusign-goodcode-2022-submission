import{ useState } from 'react';
import { Navbar, Center, Tooltip, UnstyledButton, createStyles, Stack } from '@mantine/core';
import {
  TablerIcon,
  IconHome2,
  IconGauge,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconCalendarStats,
  IconUser,
  IconSettings,
  IconLogout,
  IconSwitchHorizontal,
} from '@tabler/icons';
import { MantineLogo } from '@mantine/ds';
import { NavLink } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  link: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
    },
  },

  active: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
}));

// interface NavbarLinkProps {
//   icon: TablerIcon;
//   label: string;
//   active?: boolean;
//   onClick?(): void;
// }

function NavbarLink({ icon: Icon, label,to , end = false}) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" transitionDuration={0}>
      <NavLink
            to={to}
              className={({ isActive }) =>
              cx(classes.link, { [classes.active]: isActive })
            }
            end>
      <UnstyledButton>
        <Icon stroke={1.5} />
      </UnstyledButton>
       </NavLink>
    </Tooltip>
  );
}

const mockdata = [
  { icon: IconHome2, label: 'Home', to: '/app' , end : true},
  { icon: IconGauge, label: 'Dashboard', to :'dashboard'},
  { icon: IconDeviceDesktopAnalytics, label: 'Analytics' , to: 'analytics'},
  { icon: IconCalendarStats, label: 'Schedules' , to: 'schedules'},
  { icon: IconUser, label: 'Contacts', to: 'contacts'},
  { icon: IconFingerprint, label: 'Identity Access Management', to: 'admin-iam' },
  { icon: IconSettings, label: 'Settings', to: 'settings' },
];

export default function SideNavbarMinimal() {
  

  const links = mockdata.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label+ index}
    />
  ));

  return (
    <Navbar height={750} width={{ base: 80 }} p="md">
      <Center>
        <MantineLogo type="mark" size={30} />
      </Center>
      <Navbar.Section grow mt={50}>
        <Stack justify="center" spacing={0}>
          {links}
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Stack justify="center" spacing={0}>
          <NavbarLink icon={IconSwitchHorizontal} label="Change account" to="app/switch-accounts"/>
          <NavbarLink icon={IconLogout} label="Logout" to="auth/logout" />
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
}