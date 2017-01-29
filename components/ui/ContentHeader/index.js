import React from 'react';
import { connect } from 'react-redux';
import { NavigationMenu, NavigationClose } from 'material-ui/svg-icons';
import { AppBar, FlatButton, IconMenu, MenuItem, IconButton } from 'material-ui';

const Header = (props) => {
  const { position, referralLink } = props;
  const waitlistURL = `/waitlist?position=${position}&referralLink=${referralLink}`;
  return (
    <AppBar
      className="flex-container-left appbar"
      title={(
        <a href="/" className="logo-title">
          <img src="/static/images/CV_white_nobar_161009.svg" height="50" alt="company logo" className="appbar-logo"/>
        </a>
      )}
      iconElementLeft={<span />}
      iconElementRight={(
        <IconMenu
          className="navigation-close"
          iconButtonElement={<IconButton><NavigationMenu /></IconButton>}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          <MenuItem
            primaryText="Home"
            onClick={() => console.log('/home')}
          />
          <MenuItem
            primaryText="Status & Leaderboard"
            onClick={() => console.log(waitlistURL)}
          />
          {/*<MenuItem primaryText="Why Commandiv" />
          <MenuItem primaryText="Pricing" />
          <MenuItem primaryText="Blog" />
          */}
        </IconMenu>
      )}
    />
  );
}

export default connect(
  ({ splash }, ownProps) => ({
    position: splash.position,
    referralLink: splash.referralLink,
  }),
  dispatch => ({

  }),
)(Header);
