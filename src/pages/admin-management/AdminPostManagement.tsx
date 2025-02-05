import React from "react";
import { extendTheme } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import BarChartIcon from "@mui/icons-material/BarChart";
import DescriptionIcon from "@mui/icons-material/Description";
import PendingIcon from '@mui/icons-material/Pending';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { AppProvider, Navigation, Router } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";

import AdminPostTable from "./AdminPostTable";
import AdminUserTable from "./AdminUserTable";
import AdminPostApproval from "./AdminPostApproval";

const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    segment: "usersManagement",
    title: "Users Management",
    icon: <PersonSearchIcon />,
  },
  {
    segment: "post",
    title: "Posts Management",
    icon: <DashboardIcon />,
    children: [
      {
        segment: "postManagement",
        title: "Posts List",
        icon: <BorderColorIcon />,
      },
      {
        segment: "postApproval",
        title: "Pending Posts",
        icon: <PendingIcon />,
      },
    ]
  },
  {
    kind: "divider",
  },
  {
    kind: "header",
    title: "Analytics",
  },
  {
    segment: "reports",
    title: "Reports",
    icon: <BarChartIcon />,
    children: [
      {
        segment: "sales",
        title: "Sales",
        icon: <DescriptionIcon />,
      },
    ],
  }
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: "class",
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function useDemoRouter(initialPath: string): Router {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path: string | URL) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}


export default function AdminPostManagement(props: any) {
  const { window } = props;

  const router = useDemoRouter("/postManagement");

  // Remove this const when copying and pasting into your project.
  const demoWindow = window ? window() : undefined;

  let content;
  if (router.pathname === "/usersManagement") {
    content = <AdminUserTable />;
  } else if (router.pathname === "/post/postManagement") {
    content = <AdminPostTable />;
  } else if (router.pathname === "/post/postApproval") {
    content = <AdminPostApproval />;
  } else {
    content = <div>Chọn một mục từ main items</div>;
  }

  return (
    <AppProvider navigation={NAVIGATION} router={router} theme={demoTheme} window={demoWindow}>
      <DashboardLayout>
        {content}
      </DashboardLayout>
    </AppProvider>
  );
}
