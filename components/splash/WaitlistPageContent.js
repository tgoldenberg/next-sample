import React, { Component } from 'react';
import { Divider, Dialog, FlatButton } from 'material-ui';
import Colors from '../styles/colors';
import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper';
import { ActionCheckCircle } from 'material-ui/svg-icons';
import { SocialIcon } from 'react-social-icons';
import { getSocialShareUrls } from '../../utilities/splash';
import CustomInput from '../ui/CustomInput';
import ActionButton from '../ui/ActionButton';
import waitlistStyles from '../styles/waitlistStyles';

export default class Waitlist extends Component {
  constructor() {
    super();
    this.state = {
      errorMsg: '',
      referralLink: '',
      email: '',
    };
    this.handleCloseAlert = this.handleCloseAlert.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.waitlisted = new window.Waitlisted.Api({
      domain: 'commandiv.app.waitlisted.co',
    });
  }
  handleCloseAlert() {
    this.setState({ errorMsg: '' });
  }
  setError(error) {
    console.log('ERROR', error);
    error = "Sorry, but we didn't recognize that as a valid email address. Give it another shot.";
    this.setState({ errorMsg: error });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.input.input.blur();
    const { email } = this.state;
    const getRSVP = fetch(`https://commandiv.app.waitlisted.co/api/v1/reservation?email=${email}`);
    getRSVP.then(res => res.json()).then(rsvp => {
      console.log('RESERVATION', rsvp);
      if (rsvp.error) {
        this.setError(rsvp.error);
      } else {
        const referralLink = `http://commandiv.com?refcode=${rsvp.reservation.affiliate}`;
        this.props.push(`/waitlist/?referralLink=${referralLink}&position=${rsvp.reservation.position}`);
      }
    });
  }
  _renderErrorDialog() {
    return (
      <Dialog
        title="Mind trying again?"
        actions={[
          <FlatButton
            label="Close"
            primary={true}
            onTouchTap={this.handleCloseAlert}
          />
        ]}
        modal={false}
        open={!!this.state.errorMsg}
        onRequestClose={this.handleCloseAlert}
      >
        <div>{this.state.errorMsg}</div>
      </Dialog>
    );
  }
  _renderEmailSignup() {
    const { errorMsg, referralLink } = this.state;
    return (
      <div>
        <section className="waitlist-title">
          <h2 className="lead">
            <span>
              Check your spot on the waitlist
            </span>
            <br />
          </h2>
        </section>
        <form method="POST" className="m-t-1 splash-input-group email-input" onSubmit={this.handleSubmit}>
          <CustomInput
            placeholder="Enter your email"
            value=""
            ref={(el) => this.input = el }
            name="reservation[email]"
            type="email"
            className={!!errorMsg ? 'has-error' : ''}
            autoFocus={true}
            autoComplete={false}
            id="splash-input"
            handleChange={(e) => this.setState({ email: e.target.value })}
          />
          <ActionButton
            label={(<span>{!referralLink ? 'GET EARLY ACCESS' : 'CHECK STATUS'}</span>)}
            className="splash-cta"
            primary={true}
            onTouchTap={this.handleSubmit}
          />
        </form>
        {this._renderErrorDialog()}
      </div>
    );
  }
  render() {

    const { position, referralLink } = this.props;
    if (!position || !referralLink) {
      console.log('RENDER EMAIL SIGNUP');
      return this._renderEmailSignup();
    }
    return (
      <div>
        <section className="waitlist-title">
          <section className="success-svg animated bounceIn">
            <ActionCheckCircle color={Colors.brand} style={{ height: 100, width: 100 }} />
          </section>
          <h2 className="lead">
            <span>
              You're on the VIP list for early access! Move up the list by referring friends.
            </span>
            <br />
            <br />
            <span className="waitlist-subtitle">
              Your position on the waiting list is: <b>#{position}</b>
            </span>
          </h2>
        </section>
        <section className="waitlist-content">
          <span className="flex-container" style={{ flexWrap: 'wrap-reverse' }}>
            <span className="waitlist-description p-x-1">
              <span>Share your unique URL:</span><br />
              <a href={referralLink}>{referralLink}</a><br />
              <span>Share your unique URL via social media:</span><br />
              <span>
                <SocialIcon
                  onClick={(e) => {
                    e.preventDefault();
                    const width = 800;
                    const height = 800;
                    const left = (window.innerWidth/2)-(width/2);
                    const top = (window.innerHeight/2) - (height/2);
                    const command = "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=800,width=800,top=" + top + ",left=" + left;
                    window.open(getSocialShareUrls(referralLink).twitter, '', command);
                    return false;
                  }}
                  className="m-x-1"
                  url={getSocialShareUrls(referralLink).twitter}
                />
                <SocialIcon
                  className="m-x-1"
                  url={getSocialShareUrls(referralLink).facebook}
                  onClick={(e) => {
                    e.preventDefault();
                    window.FB.ui({
                      method: 'share',
                      mobile_iframe: true,
                      hashtag: "#investing",
                      href: referralLink,
                    }, function(response) {});
                  }}
                />
                <SocialIcon
                  className="m-x-1"
                  url={getSocialShareUrls(referralLink).linkedin}
                  onClick={(e) => {
                    e.preventDefault();
                    const width = 600;
                    const height = 600;
                    const left = (window.innerWidth/2)-(width/2);
                    const top = (window.innerHeight/2) - (height/2);
                    const command = "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=" + height + ",width=" + width + ",top=" + top + ",left=" + left;
                    window.open(getSocialShareUrls(referralLink).linkedin, '', command);
                  }}
                />
              </span>
            </span>
          </span>
        </section>
        <br />
        <Divider />
        <section className="waitlist-title">
          <h2 className="lead">
            <span>
              Unlock more prizes by referring friends.
            </span>
          </h2>
          <div className="col-sm-4 col-sm-offset-4">
            <Stepper activeStep={1} orientation="vertical">
              <Step completed={true} active={true}>
                <StepLabel>VIP Early Access to Commandiv</StepLabel>
                <StepContent>
                  <p className="step-content">Signup on waitlist prior to product launch</p>
                </StepContent>
              </Step>
              <Step completed={false} active={true} disabled={true}>
                <StepLabel>Upgrade to Premiere Client</StepLabel>
                <StepContent>
                  <p className="step-content">Refer 1 friend to sign up with your URL</p>
                </StepContent>
              </Step>
            </Stepper>
            <Stepper activeStep={0} linear={false} orientation="vertical">
              <Step active={true} completed={false} disabled={true}>
                <StepLabel>Commandiv Free for 1 Year</StepLabel>
                <StepContent>
                  <p className="step-content">Top 100 - refer friends to climb the leaderboard!</p>
                </StepContent>
              </Step>
              <Step active={true} completed={false} disabled={true}>
                <StepLabel>Commandiv Free for 5 Year</StepLabel>
                <StepContent>
                  <p className="step-content">Top 10 - refer friends to climb the leaderboard!</p>
                </StepContent>
              </Step>
              <Step active={true} completed={false} disabled={true}>
                <StepLabel>Commandiv Free for Life!</StepLabel>
                <StepContent>
                  <p className="step-content">Top 1 - refer friends to climb the leaderboard!</p>
                </StepContent>
              </Step>
            </Stepper>
          </div>
        </section>
      </div>
    );
  }
}
