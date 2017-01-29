import React, { Component } from 'react';
import { MuiThemeProvider, getMuiTheme } from 'material-ui/styles';
import { Provider } from 'react-redux';
import { initStore } from '../store';
import Head from 'next/head'
import muiTheme from '../components/styles/muiTheme';
import LandingPageHead from '../components/splash/Head.js';
import LandingPageContent from '../components/splash/LandingPageContent.js';
import reducers from '../reducers/index.js';
import ContentHeader from '../components/ui/ContentHeader';
import mainStyles from '../components/styles/mainStyles';
import injectTapEventPlugin from 'react-tap-event-plugin';

try {
  if (typeof window !== 'undefined') {
    injectTapEventPlugin();
  }
} catch (e) {
  // do nothing
}

export default class Landing extends Component {
  static getInitialProps({ req }) {
    const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
    const isServer = !!req;
    const store = initStore(reducers, {}, isServer);
    return { initialState: store.getState(), isServer, userAgent };
  }
  constructor(props) {
    super(props);
    this.store = initStore(reducers, props.initialState, props.isServer);
  }
  render() {
    const { userAgent } = this.props;
    return (
      <Provider store={this.store}>
        <MuiThemeProvider muiTheme={getMuiTheme(muiTheme, { userAgent })}>
          <div>
            <style jsx>{mainStyles}</style>
            <LandingPageHead />
            <ContentHeader />
            <LandingPageContent />
          </div>
        </MuiThemeProvider>
      </Provider>
    );
  }
}
