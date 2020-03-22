import React from "react";
import {
  AppBar,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SwipeableDrawer,
  Toolbar,
} from "@material-ui/core";
import { duration } from "@material-ui/core/styles/transitions";
// Local
import {
  MenuIcon,
  DashboardIcon,
  MyProductsIcon,
  OrdersIcon,
  AccountingIcon,
  ReportsIcon,
  MarketingIcon,
  ArrowIcon,
  CompanyLogoIcon
} from "../components";
import { iOS } from "../device";
import { Navigation } from "../lib";
import Pages from "../pages";
import { useSelector, useDispatch, PrefActions, PrefSelectors, } from "../state";
import { useStyles } from "./MainMenu.styles";
import clsx from "clsx";

function getItems() {
  const menuItems = [
    {
      text: "Streamlined AI",
      icon: CompanyLogoIcon,
    },
    {
      text: "Dashboard",
      icon: DashboardIcon,
      url: Pages.main.home.path,
      urlActiveIf: {
        exact: true,
      },
    },
    {
      text: "My Products",
      icon: MyProductsIcon,
      url: Pages.myProducts.home.path,
      urlActiveIf: {
        exact: true,
      },
    },
    {
      text: "Orders",
      icon: OrdersIcon,
      url: Pages.orders.home.path,
      urlActiveIf: {
        exact: true,
      },
    },
    {
      text: "Accounting",
      icon: AccountingIcon,
      url: Pages.accounting.home.path,
      urlActiveIf: {
        exact: true,
      },
    },
    {
      text: "Marketing",
      icon: MarketingIcon,
      url: Pages.marketing.home.path,
      urlActiveIf: {
        exact: true,
      },
    },
    {
      text: "Reports",
      icon: ReportsIcon,
      url: Pages.reports.home.path,
        urlActiveIf: {
        exact: true,
      },
    },
    {
      text: "Collapse",
      icon: ArrowIcon,
    },
  ];

  const viewProfileItem = {
    url: "/profile",
  };

  return {
    menuItems,
    viewProfileItem,
  };
}

function _MainMenu() {
  const isNavOpen = useSelector(PrefSelectors.navOpen);
  const dispatch = useDispatch();

  const classes = useStyles({
    isNavOpen,
  });
  // #region State
  /**
   * - We use `setCurrentPath` only to cause a re-render, not reading it.
   */
  // #endregion
  const { menuItems } = React.useMemo(getItems);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [, setCurrentPath] = React.useState(null);
  // #region Callbacks, Effects
  /**
   * - The `routeChanged` callback is created only once on component mount.
   * Not on every render. See https://reactjs.org/docs/hooks-reference.html#usecallback
   *
   * - The `Navigation.onRouteChanged` handler is only created on component
   * mount or if `routeChanged` is recreated (which only happens on mount).
   * Likewise, the retuned `remove` function is only called  React when the
   * component is unmounted or if `routeChanged` is recreated.
   * See https://reactjs.org/docs/hooks-reference.html#cleaning-up-an-effect
   * See https://reactjs.org/docs/hooks-reference.html#conditionally-firing-an-effect
   */
  // #endregion
  const routeChanged = React.useCallback(() => {
    setCurrentPath(Navigation.location.pathname);
  }, []);
  React.useEffect(() => {
    const remove = Navigation.onRouteChanged(routeChanged);
    return remove;
  }, [routeChanged]);
  // #region Input handlers
  /**
   * - These should come last because they will use things defined above.
   */
  // #endregion
  const onToggleMenu = React.useCallback(() => {
    setMobileOpen(value => !value);
  }, [setMobileOpen]);
  const onCloseMenu = React.useCallback(() => {
    setMobileOpen(false);
  }, [setMobileOpen]);
  const onOpenMenu = React.useCallback(() => {
    setMobileOpen(true);
  }, [setMobileOpen]);

  function onMenuItemClick(item) {
    if (!item.onClick) {
      item.onClick = () => {
        if (iOS) {
          // Prevent swipe back navigation from showing an open menu.
          Navigation.delayed(item.url, duration.leavingScreen + 50);
        } else if (item.text === "Collapse") {
          dispatch(PrefActions.toggleOpenNav());
        } else {
          Navigation.go(item.url);
        }
        setMobileOpen(false);
      };
    }
    return item.onClick;
  }

  const menuContent = (
    <div className={classes.menuRoot}>
      <List className={classes.menuList}>
        {menuItems.map((item, i) => {
          const { text, icon: Icon, url } = item;
          /**
           * `Navigation.isActive` can only be read reliably since we're
           * re-rendering when `setCurrentPath` is called in `routeChanged`,
           * the `Navigation.onRouteChanged` event handler...
           */
          const isActive = Navigation.isActive(url, item.urlActiveIf);
          const lastIndex = menuItems.length-1;
          return (
            <div key={text} >
              {i === 1 && <Divider />}
              <ListItem
                button
                className={clsx(
                  classes.menuListItem,
                  isActive && classes.menuListItemSelected,
                  !isActive && i !== 0 && i !== lastIndex && classes.menuListItemHoverAndActive
                )}
                onClick={onMenuItemClick(item)}
              >
                <span
                  className={clsx(
                    classes.block,
                    !isActive && classes.blockHover,
                  )}
                ></span>
                <ListItemIcon className={classes.menuListItemIcon}>
                  <Icon />
                </ListItemIcon>
                <ListItemText
                  disableTypography
                  primary={text}
                  className={clsx([classes.menuListItemText, classes.text])}
                />
              </ListItem>
            </div>
          );
        })}
      </List>
    </div>
  );

  return (
    <>
      <Hidden mdUp>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open menu"
              edge="start"
              onClick={onToggleMenu}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Hidden>
      <nav className={classes.drawer} aria-label="Main menu">
        <Hidden mdUp implementation="css">
          <SwipeableDrawer
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={onCloseMenu}
            onOpen={onOpenMenu}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            disableBackdropTransition={!iOS}
            disableDiscovery={iOS}
          >
            {menuContent}
          </SwipeableDrawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {menuContent}
          </Drawer>
        </Hidden>
      </nav>
    </>
  );
}

export const MainMenu = React.memo(_MainMenu);
