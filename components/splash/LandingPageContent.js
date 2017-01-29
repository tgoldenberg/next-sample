import React, { Component } from 'react';
import faker from 'faker';
import Colors from '../styles/colors';
import { ActionCheckCircle } from 'material-ui/svg-icons';
import { Paper, Divider, Dialog, FlatButton } from 'material-ui';
import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper';
import ActionButton from '../ui/ActionButton';
import { SocialIcon } from 'react-social-icons';
import CustomInput from '../ui/CustomInput';
import CustomAlert from '../ui/CustomAlert';
import Footer from '../ui/Footer';
import { extend } from 'lodash';
import { isMobile } from '../../utilities/dom';
import { headers } from '../../utilities/http';
import { getSocialShareUrls } from '../../utilities/splash';
import GA from 'react-ga';
import landingStyles from '../styles/landingStyles';
import waitlistStyles from '../styles/waitlistStyles';
import footerStyles from '../ui/Footer/footerStyles';
import alertStyles from '../ui/CustomAlert/alertStyles';
import headerStyles from '../ui/ContentHeader/headerStyles';
import buttonStyles from '../ui/ActionButton/buttonStyles';

GA.initialize(process.env.REACT_APP_GA_TRACKING_ID, {
  debug: true,
  titleCase: false,
});


export default class Splash extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCloseAlert = this.handleCloseAlert.bind(this);
    this.state = {
      showSuccessModal: false,
      modalClassName: '',
      errorMessage: '',
      position: 0,
      total: 0,
      email: '',
      referralLink: '',
    };
  }
  componentDidMount(){
    if (typeof window !== 'undefined' && window.Waitlisted) {
      this.waitlisted = new window.Waitlisted.Api({
        domain: process.env.REACT_APP_WAITLISTED_DOMAIN || '',
      });
    }
  }
  sendWelcomeEmail(email, referralLink) {
    console.log('PARAMS', email, referralLink);
    const { twitter, facebook, linkedin } = getSocialShareUrls(referralLink);
    let sendEmail = fetch('/api/send-welcome-email', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({ email, referralLink, twitter, facebook, linkedin }),
    });
    sendEmail.then(res => res.json()).then(res => {
      console.log('RES', res);
    });
    sendEmail.catch(err => console.log('ERR', err));
  }
  handleCloseAlert() {
    this.setState({ errorMsg: '' });
  }
  createFormData(email, refcode) {
    let formData = `reservation[email]=${encodeURI(email)}&reservation[name]=${encodeURI(email)}`;
    if (refcode) {
      formData += `&reservation[refcode]=${refcode}`;
    }
    return formData;
  }
  blurInputs() {
    this.input1.input.blur();
    this.input2.input.blur();
  }
  showModal(rsvp, referralLink) {
    this.props.setRSVP(rsvp.reservation.position, referralLink);
    if (isMobile.any()) {
      this.setState({
        showSuccessModal: true,
        modalClassName: '',
        position: rsvp.reservation.position,
        total: rsvp.meta.total,
        errorMsg: '',
        referralLink: referralLink,
      });
    } else {
      this.props.renderPosition(rsvp.reservation.position, referralLink);
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    this.blurInputs();
    const { email } = this.state;
    const options = { method: 'POST', headers };
    const mailchimpBody = JSON.stringify({ email });
    // first add user to Mailchimp or get error message back
    let mailchimpReq = fetch('api/subscribe-waitlist', extend({ body: mailchimpBody }, options));
    mailchimpReq.then(res => res.json()).then(res => {
      console.log('RES', res);
      if (res.status === 200) {
        GA.event({
          category: 'User',
          action: 'Joined Waitlist',
        });
        const formData = this.createFormData(email, this.props.location.refcode)
        // if added to Mailchimp, then add user to Waitlisted.co list
        let createReservation = fetch(`${process.env.REACT_APP_WAITLISTED_DOMAIN}/api/v1/reservation`, extend(options, { body: formData, method: 'GET' }));
        createReservation.then(res => res.json()).then((rsvp) => {
          console.log('RESERVATION', rsvp);
          const referralLink = `${process.env.REACT_APP_ROOT_URL}?refcode=${rsvp.reservation.affiliate}`;
          this.showModal(rsvp, referralLink);
          this.sendWelcomeEmail(email, referralLink);
          // if user was referred, give points to referrer and referree
          if (rsvp.reservation.referred_by) {
            const attributionBody = JSON.stringify({ referrer: rsvp.reservation.referred_by.email, referred: email });
            let attributeReferral = fetch('/api/attribute-waitlist-referral', extend({ body: attributionBody }, options));
            attributeReferral.then(res => res.json()).then(res => console.log('RES', res));
            attributeReferral.catch(err => console.log('ERR', err));
          } else {
            // add waitlisted.co user to MongoDB
            const createWaitlistBody = JSON.stringify({ email: email });
            let createWaitlistUser = fetch('/api/create-waitlist-user', extend({ body: createWaitlistBody, options }));
            createWaitlistUser.then(res => res.json()).then(res => console.log('RES', res));
            createWaitlistUser.catch(err => console.log('ERR', err));
          }
        });
        createReservation.catch(err => {
          console.log('ERR', err);
          this.setError('Email is invalid');
        });
      } else {
        if (res.error === 'Member Exists') {
          this.waitlisted.position(email).then((rsvp) => {
            console.log('RESERVATION', rsvp);
            const referralLink = `${process.env.REACT_APP_ROOT_URL}?refcode=${rsvp.reservation.affiliate}`;
            this.showModal(rsvp, referralLink)
            // this.sendWelcomeEmail(email, referralLink);
          });
        } else {
          this.setError(res.error);
        }
      }
    })
    .catch(err => console.log('ERR', err));
  }
  setError(error) {
    if (error === 'Email is invalid' || error === 'Invalid Resource') {
      error = "Sorry, but we didn't recognize that as a valid email address. Give it another shot.";
    }
    this.setState({ errorMsg: error });
  }
  renderSignupInput(idx) {
    const { errorMsg, referralLink } = this.state;
    return (
      <form method="POST" className="m-t-1 splash-input-group email-input" onSubmit={this.handleSubmit}>
        <CustomInput
          placeholder="Enter your email"
          value=""
          ref={(el) => this[`input${idx}`] = el }
          name="reservation[email]"
          type="email"
          className={!!errorMsg ? 'has-error' : ''}
          autoFocus={true}
          autoComplete={false}
          id="splash-input"
          handleChange={(e) => this.setState({ email: e.target.value })}
        />
        <ActionButton
          label={(<span>GET EARLY ACCESS</span>)}
          // disabled={!!referralLink}
          className="splash-cta"
          primary={true}
          onTouchTap={this.handleSubmit}
        />
      </form>
    );
  }
  renderDescriptionContent() {
    return (
      <div className="splash-description-content">
        <section className="flex-container m-x-1" style={{ justifyContent: 'space-between' }}>
          <Paper className="landing-paper hidden-sm-down" zDepth={4} rounded={false}>
            <img src="/static/images/invest-2.png" alt="investment advice" style={{ width: '100%' }}/>
          </Paper>
          <div className="splash-description-section">
            <h2 className="splash-description-h2">{faker.lorem.sentence()}</h2>
            <p className="splash-description-p">{faker.lorem.sentences(2)}</p>
          </div>
        </section>
        <section className="flex-container m-x-1" style={{ justifyContent: 'space-between' }}>
          <div className="splash-description-section">
            <h2 className="splash-description-h2">{faker.lorem.sentence()}</h2>
            <p className="splash-description-p">{faker.lorem.sentences(2)}</p>
          </div>
          <Paper className="landing-paper hidden-sm-down lower" zDepth={4} rounded={false}>
            <img src="/static/images/invest-3.png" alt="investment advice" style={{ width: '100%' }}/>
          </Paper>
        </section>
        <section className="flex-container m-x-1" style={{ justifyContent: 'space-between' }}>
          <Paper className="landing-paper lower hidden-sm-down" zDepth={4} rounded={false}>
            <img src="/static/images/invest-4.png" alt="investment advice" style={{ width: '100%' }}/>
          </Paper>
          <div className="splash-description-section">
            <h2 className="splash-description-h2">{faker.lorem.sentence()}</h2>
            <p className="splash-description-p">{faker.lorem.sentences(2)}</p>
          </div>
        </section>
      </div>
    );
  }
  renderModal() {
    const { showSuccessModal, position, referralLink } = this.state;
    const alertClassName = `custom-modal-content animated slideInUp ${this.state.modalClassName}`;
    return (
      <CustomAlert
        open={showSuccessModal}
        contentClassName={alertClassName}
        hasAlternateHeader={true}
        className="custom-modal"
        overlayClassName="custom-modal-overlay"
        bodyClassName="custom-modal-body"
        bodyStyle={{ height: typeof window === 'undefined' ? 1000 : window.innerHeight, overflowY: 'auto' }}
        title={(
          <span className="waitlist-title lead">
            <section className="success-svg animated bounceIn">
              <ActionCheckCircle color={Colors.brand} style={{ height: 100, width: 100 }} />
            </section>
            <span>
              {"You're on the VIP list for early access! Move up the list by referring friends."}
            </span>
            <br /><br />
            <span className="waitlist-subtitle">
              Your position on the waiting list is: <b>#{position}</b>
            </span>
          </span>
        )}
        description={(
          <div>
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
        )}
        handleClose={() => {
          this.setState({ modalClassName: 'slideOutDown' });
          this.timeout = setTimeout(() => {
            this.setState({ showSuccessModal: false });
          }, 500);
        }}
        errorMessages={[]}
        hideButtons={true}
      />
    );
  }
  renderErrorDialog() {
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
  render() {
    return (
      <div>
        <style jsx>{landingStyles}</style>
        <style jsx>{waitlistStyles}</style>
        <style jsx>{buttonStyles}</style>
        <style jsx>{footerStyles}</style>
        <section className="splash-header">
          <h2 className="splash-lead">{faker.lorem.sentence()}</h2>
          <p className="signup-description">
            {faker.lorem.sentence()}
          </p>
          {this.renderSignupInput(1)}
        </section>
        <Divider />
        {this.renderDescriptionContent()}
        <br />
        <Divider />
        <section className="p-b-1 splash-mid-container">
          <p className="signup-description">
            Sign up now for early access!
          </p>
          {this.renderSignupInput(2)}
          <div className="divider" />
          <Footer />
        </section>
        {this.renderModal()}
        {this.renderErrorDialog()}
      </div>
    );
  }
}
