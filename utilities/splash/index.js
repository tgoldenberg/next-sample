export function getSocialShareUrls(referralLink) {
  const facebookAppID = '965653656912204';
  const linkedinText = "Can't wait for $0 commission trades and personalized investment suggestions!";
  const twitterText = `Can’t wait for $0 commission trades and personalized investment suggestions! - @commandiv`;
  const twitter = `https://twitter.com/share?url=${encodeURI(referralLink)}&text=${twitterText}&hashtags=investing`;
  const facebook = `https://www.facebook.com/dialog/feed?app_id=${facebookAppID}&display=popup&link=${referralLink}`;
  const reddit = `http://reddit.com/submit?url=${referralLink}&title=${encodeURI(twitterText)}`;
  const linkedin = `https://www.linkedin.com/shareArticle?mini=true&url=${referralLink}&title=${encodeURI(linkedinText)}`;

  return { twitter, facebook, linkedin, reddit };
}
