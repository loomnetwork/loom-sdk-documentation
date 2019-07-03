var _dcq = _dcq || [];
var _dcs = _dcs || {};
_dcs.account = '8247700';

(function() {
  var dc = document.createElement('script');
  dc.type = 'text/javascript'; dc.async = true;
  dc.src = '//tag.getdrip.com/' + _dcs.account + '.js';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(dc, s);
})();
/*
twitter analytics
 */
!function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments);
},s.version='1.1',s.queue=[],u=t.createElement(n),u.async=!0,u.src='//static.ads-twitter.com/uwt.js',
  a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,'script');
// Insert Twitter Pixel ID and Standard Event data below
twq('init','nyw09');
twq('track','PageView');

/*
facebook tracking
 */
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
  n.queue=[];t=b.createElement(e);t.async=!0;
  t.src=v;s=b.getElementsByTagName(e)[0];
  s.parentNode.insertBefore(t,s)}(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '135237727203133');
fbq('track', 'PageView');
