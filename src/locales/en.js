import {
  PROFILE_PHOTO_SIZE_LIMIT,
  PROFILE_PHOTO_WEIGHT_LIMIT,
} from '../config/files'

export default {
  'app.errors.unknown': 'Unknown error',
  'app.errors.image.wrongSize': `Image must be greater than ${PROFILE_PHOTO_SIZE_LIMIT}x${PROFILE_PHOTO_SIZE_LIMIT}px`,
  'app.errors.image.wrongWeight': `Image must be less than ${PROFILE_PHOTO_WEIGHT_LIMIT} megabytes`,
  'app.errors.image.parsing': 'Problem with input file.',
  'app.errors.0': 'Incorrect password',
  'app.errors.1': 'User not found',
  'app.errors.2': 'Unknown error',
  'app.errors.3': 'User with this email already exists',
  'app.errors.4': 'Token expired',
  'app.errors.5': 'Invalid auth algorithm',
  'app.errors.6': 'Invalid auth header',
  'app.errors.7': 'Invalid invitation code',
  'app.errors.8': 'Invalid verification code',
  'app.errors.9': 'Chosen country not found',
  'app.errors.10': 'File not found',
  'app.errors.11': 'This user was deactivated',
  'app.errors.12': 'Endpoint is not found',
  'app.errors.13': 'This email is already in use',
  'app.loginPage.title': 'Login',
  'app.loginPage.forgotPassword': 'Forgot password',
  'app.loginPage.login': 'Login',
  'app.loginPage.doNotHaveAnAccount': 'Do not have an account?',
  'app.loginPage.register': 'Register',
  'app.registerPage.title': 'Registration',
  'app.registerPage.register': 'Join Handprinters',
  'app.registerPage.alreadyHaveAnAccount': 'Already have an account?',
  'app.registerPage.login': 'Login',
  'app.profilePage.addPhoto': 'Add photo',
  'app.profilePage.generalInformation': 'General information',
  'app.profilePage.saveChanges': 'Save changes',
  'app.profilePage.changePassword': 'Change password',
  'app.profilePage.changePassword.cancel': 'Cancel',
  'app.profilePage.changePassword.saveNewPassword': 'Save new password',
  'app.profilePage.form.password': 'Enter your current password',
  'app.profilePage.form.newPassword': 'Enter new password',
  'app.forms.email': 'Email',
  'app.forms.email.required': 'Email is required',
  'app.forms.email.invalid': 'This is not email',
  'app.forms.password': 'Password',
  'app.forms.createPassword': 'Create password',
  'app.forms.password.required': 'Password is required',
  'app.forms.password.tooShort': 'Password must be at least 8 characters long',
  'app.forms.password.tooLong': 'Password is too long',
  'app.forms.fullName': 'Full name',
  'app.forms.fullName.required': 'Full name is required',
  'app.forms.country': 'Country',
  'app.forms.country.required': 'Country is required',
  'app.forms.invitationCode': 'Invitation code (optional)',
  'app.forms.invitationCode.hint':
    'Curabitur sagittis enim vel libero ornare tincidunt. Cras libero metus, tempus ut nulla non, dignissim scelerisque nisi. Proin malesuada, ante vitae.',
  'app.resetPasswordPage.title': 'Reset password',
  'app.resetPasswordPage.description':
    'Enter the e-mail address you used to register and we will send you instructions on how to change your password.',
  'app.resetPasswordPage.send': 'Send',
  'app.checkYourEmailPage.title': 'Recovery mail sent',
  'app.checkYourEmailPage.description':
    'Didn’t receive the email?<br />Please check the email address you used to make sure it matches the address on your account, look in your spam folder, or request another e-mail below.',
  'app.checkYourEmailPage.sendAgain': 'Send again',
  'app.setNewPasswordPage.title': 'Set a new password',
  'app.setNewPasswordPage.changePassword': 'Change password',
  'app.languages.en': 'English',
  'app.languages.es': 'Español',
  'app.logInPage.title': 'Log in',
  'app.homePage.hero.title':
    'Want to take <strong>doing good</strong> to a global scale?\n' +
    '                You’re not alone',
  'app.homePage.hero.text':
    'Through Handprinter, creative individual actions and outreach\n' +
    '                generate ripple effects to touch and heal your community and the\n' +
    '                globe.',
  'app.homePage.hero.link': 'Join handprinters',
  'app.button.join': 'Join handprinters',
  'app.button.video': 'Watch video',
  'app.homePage.scrollText': 'I want to know more',
  'app.homePage.actionsTitle':
    'Yes shrink your footprint. <br />\n' +
    '                But also grow your handprint!',
  'app.homePage.actionsDescription':
    'We all want to do more good than harm. Handprinter helps you\n' +
    '                live it. Add ideas and inspiration, calculate and track your\n' +
    '                impacts, watch your handprint grow to exceed your footprint.\n' +
    '                Launch and join micro-movements to reach the world and heal it.',
  'app.homePage.actionsLink': 'What are footprints and handprints?',
  'app.homePage.aboutTitle': 'What are handprints?',
  'app.homePage.aboutText':
    'We&apos;ve all heard about our footprints: negative impacts of\n' +
    '                the things we buy and use. We need to reduce them, but\n' +
    '                footprints are only part of the story.',
  'app.homePage.aboutText2':
    'We can also have handprints:\n' +
    '                <strong>positive impacts in the world</strong>, including ways\n' +
    '                we help others to reduce their footprints. Handprinter lets you\n' +
    '                work with people in your neighborhood and around the world to\n' +
    '                grow your handprint &mdash; and reduce your footprint too. Get\n' +
    '                started today!',
  'app.homePage.aboutText3': 'With enough handprints, we can heal the planet!',
  'app.homePage.aboutLink': 'Our vision',
  'app.header.menu.actions': 'Actions',
  'app.header.menu.about': 'About',
  'app.header.menu.howItWorks': 'How it works',
  'app.header.menu.measurement': 'Measurement Units',
  'app.header.menu.faq': 'FAQ',
  'app.header.menu.login': 'Login',
  'app.header.menu.dashboard': 'Dashboard',
  'app.header.menu.signOut': 'Sign out',
  'app.header.menu.profileSettings': 'Profile settings',
  'app.header.menu.increaseHandprint': 'Increase handprint',
  'app.header.link': 'Join handprinters',

  'app.footer.menu.actions': 'Actions',
  'app.footer.menu.about': 'About',
  'app.footer.menu.howItWorks': 'How it works',
  'app.footer.menu.measurement': 'Measurement Units',
  'app.footer.menu.faq': 'FAQ',
  'app.footer.copyright': 'Copyright. All rights reserved',
  'app.footer.cta.title': 'Be part of a positive future',
  'app.footer.cta.link': 'Join handprinters',
  'app.actionCardLabel.tooltip.link':
    'How we measure action impacts and handprints.',
  'app.actionCardLabel.tooltip.text':
    'You can reduce your footprint for {value} {unit} on the {category} category.',
  'app.actionsSlider.link': 'View all actions',
  'app.faqPage.title': 'FAQ',
  'app.faqPage.0.question': 'What is handprint?',
  'app.faqPage.0.answer':
    'Footprint - odio ac turpis mollis vehicula. Sed\n' +
    '                        scelerisque orci non urna facilisis, vitae tristique\n' +
    '                        erat auctor. Maecenas at posuere dolor. Donec sed mauris\n' +
    '                        nec felis scelerisque posuere ac ut velit. Vivamus\n' +
    '                        pharetra aliquam porta. Nulla egestas consectetur felis\n' +
    '                        et ultricies. Fusce pharetra, tortor eget placerat\n' +
    '                        lacinia, magna augue efficitur mauris, in auctor quam\n' +
    '                        lorem vitae ante. Phasellus tincidunt, enim non\n' +
    '                        tincidunt sagittis, ex nibh tempor purus, sed\n' +
    '                        sollicitudin leo magna sit amet lacus. Nulla\n' +
    '                        sollicitudin nec tellus ut fermentum. Aenean facilisis\n' +
    '                        augue non sapien euismod, ut scelerisque dui pulvinar.\n' +
    '                        Vivamus nisi eros, placerat sed justo sit amet,\n' +
    '                        ullamcorper viverra erat. Curabitur vehicula ante\n' +
    '                        turpis, sed eleifend augue pharetra nec.',
  'app.faqPage.1.question': 'What is footprint?',
  'app.faqPage.1.answer': 'Footprint - odio ac turpis mollis vehicula.',
  'app.faqPage.2.question': 'How to get net-positive status?',
  'app.faqPage.2.answer': 'Footprint - odio ac turpis mollis vehicula.',
  'app.faqPage.3.question': 'How can I increase my handprint?',
  'app.faqPage.3.answer': 'Footprint - odio ac turpis mollis vehicula.',
  'app.faqPage.4.question': 'How to add my idea?',
  'app.faqPage.4.answer': 'Footprint - odio ac turpis mollis vehicula.',
  'app.ourVision.hero.title':
    'With enough handprints we can' +
    '                <strong> heal</strong> the planet',
  'app.ourVision.hero.text': 'From footprinters to handprinters',
  'app.ourVision.negativeImpacts.title': 'What is my Footprint?',
  'app.ourVision.negativeImpacts.text':
    'Footprint - the sum of all the negative impacts on the planet\n' +
    '                  we share, of all the activities it takes to provide each of us\n' +
    '                  with the products and services we buy and use in a year,\n' +
    '                  including the impacts from using and disposing of them.',
  'app.ourVision.about.title':
    'We&apos;ve all heard about our <strong>negative</strong> impacts, but…',
  'app.ourVision.negativeImpactsItem1.title': 'Global supply chains',
  'app.ourVision.negativeImpactsItem1.text':
    'Global chains of activities provide is with the products\n' +
    '                      and services in our lives. Even “locally grown vegetables”\n' +
    '                      have a global supply chain when you look deeply',
  'app.ourVision.negativeImpactsItem2.title': 'A footprint for every product',
  'app.ourVision.negativeImpactsItem2.text':
    'Each activity in the supply chain can have negative\n' +
    '                      impacts. The sum of all the negative impacts across its\n' +
    '                      full supply chain are its footprint.',
  'app.ourVision.negativeImpactsItem3.title': 'Many footprints actually',
  'app.ourVision.negativeImpactsItem3.text':
    'The impacts of a single product are diverse, and can\n' +
    '                      include ocean pollution, air pollution, water depletion,\n' +
    '                      human health impacts, ecosystem impacts, wastes, and more.',
  'app.ourVision.negativeImpactsItem4.title': 'Daily steps to yearly totals',
  'app.ourVision.negativeImpactsItem4.text':
    'My annual footprints are the sums of the footprints of all\n' +
    '                      the goods and services that I buy and use in a year. They\n' +
    '                      are like the cost, to everyone else, of me being here for\n' +
    '                      a year and living my life the way that I do.',
  'app.ourVision.slider.title':
    'Reducing your footprint <br /> is a great place to start',
  'app.ourVision.slider.text':
    'Just take one of the actions from the list! There are so many\n' +
    '                ways to shrink your footprint. Hundreds of people are using\n' +
    '                these ideas to reduce their footprints.',
  'app.ourVision.what.title':
    'But I want to be really <strong>positive</strong>. Not just\n' +
    '                  less bad.',
  'app.ourVision.what.subtitle': 'What is a handprint?',
  'app.ourVision.what.text':
    'Handprints are positive impacts that you create, beyond the\n' +
    '                  boundaries of your own footprint. Like planting a tree, and\n' +
    '                  helping others to take positive actions.',
  'app.ourVision.what.link': 'Start handprinting',
  'app.ourVision.steps.title': 'What can I do to handprint?',
  'app.ourVision.step1.title': '<strong>Encourage</strong> other people',
  'app.ourVision.step1.text':
    'Encourage, inform, and inspire existing members about how they\n' +
    '                  can reduce their footprints, recommending existing actions to\n' +
    '                  friends and to other organizations. Maybe invite them to try\n' +
    '                  an action that recently worked for you.',
  'app.ourVision.step2.title':
    '<strong>Give a gift </strong> that <br /> handprints',
  'app.ourVision.step2.text':
    ' Maybe you can pump up your friends’ tires, or offer them an\n' +
    '                  LED light bulb, or help them to plant some vegetables, to\n' +
    '                  build a composter, or to set up a clothesline. It’s like\n' +
    '                  Encouraging, but goes farther, through the generosity of your\n' +
    '                  time, effort, presence, and maybe spending some money too.',
  'app.ourVision.step3.title': 'Participate in a <strong> Save Wave</strong>',
  'app.ourVision.step3.text':
    'This builds on the gift idea, and takes it farther, because\n' +
    '                  you pay a gift forward to 1 or more people. For example, if a\n' +
    '                  friend gave you an LED light bulb, use some of the money\n' +
    '                  you’ll save to buy two more bulbs, and offer them to two new\n' +
    '                  friends, inviting them to be part of the wave with you.',
  'app.ourVision.stepScheme.text1': 'You buy a LED light bulb and save money.',
  'app.ourVision.stepScheme.text2':
    'Use some of the money you saved to buy two more bulbs, and\n' +
    '                    offer them to two new friends',
  'app.ourVision.stepScheme.text3':
    'They save money to and buy their frends 2 more LED light\n' +
    '                    bulbs and continue Save Wave.',
  'app.ourVision.step4.title':
    'Create your handprint <strong> idea</strong>, and share it with the world',
  'app.ourVision.step4.text':
    'Be sure you tried it out yourself first, and share ideas about\n' +
    '                  how to make it work. Another part of idea creation is modeling\n' +
    '                  the impacts of an action idea so that we can all understand\n' +
    '                  what impacts it has in the world.',
  'app.ourVision.step5.title':
    'Take a <strong>Pure <br /> Positive </strong>action',
  'app.ourVision.step5.text':
    'Planting a tree is a wonderful example. So is restoring\n' +
    '                  habitat so that it purifies water and provides places for life\n' +
    '                  to thrive. Rather than reducing somebody&apos;s footprint,\n' +
    '                  it&apos;s creating new positive impacts, some of which may be\n' +
    '                  measurable in footprint units.',
  'app.ourVision.step6.title':
    'Grow the handprinting <strong> community</strong>',
  'app.ourVision.step6.text':
    'Strengthen and broaden the movement. Invite new people. Invite\n' +
    '                  organizations too, including ones you’re a part of. Make sure\n' +
    '                  they know: There’s room for everyone. We’re incomplete without\n' +
    '                  you.',
  'app.measurementPage.Hero.Title':
    'How do we <strong>measure</strong> Action Impacts and\n' +
    '                Handprints?',
  'app.measurementPage.Hero.Text':
    'How — and why — would we measure impacts \n' +
    'in "days", "hours" and "minutes"?',
  'app.measurementPage.ScrollText': 'I want to know more',
  'app.measurementPage.Meaning.Title':
    'Most measurement units don&apos;t mean much to most of us',
  'app.measurementPage.Meaning.Text1':
    'Footprints and Handprints are usually measured in different\n' +
    '                    units that depend on the kind of impact we&apos;re talking\n' +
    '                    about. So water footprints can be measured in gallons or\n' +
    '                    liters of water, human health footprints can be measured in\n' +
    '                    years of life lost, carbon footprints in tons of carbon\n' +
    '                    dioxide (CO2), and so-on.',
  'app.measurementPage.Meaning.Text2':
    'Most of these units don’t mean much to most of us.\n' +
    '                    We&apos;ve never seen a ton of CO2, and would that be a\n' +
    '                    large or small share of our carbon footprint?',
  'app.measurementPage.Problem.Title':
    'In Handprinter, <br /> we solve this problem',
  'app.measurementPage.Problem.Text1':
    'Our solution is to relate all impacts to your footprint. Your\n' +
    '                footprint happens on a yearly basis, so we can express your full\n' +
    '                footprint as 365 days of your footprint. Half of this amount\n' +
    '                would be about 180 days of your footprint. One tenth of your\n' +
    '                yearly footprint would be about 36 days of your footprint. One\n' +
    '                tenth of 1 percent of your footprint would be close to 10 hours\n' +
    '                of your footprint.',
  'app.measurementPage.Problem.Text2':
    '<strong>This works for all impact categories.</strong> So rather\n' +
    '                than a whole soup of footprint units that most of us don&apos;t\n' +
    '                understand, we can all work with just one unit that we all\n' +
    '                understand: time.',
  'app.measurementPage.Info.Text1':
    'We all know what minutes, hours, days, and years are.',
  'app.measurementPage.Info.Text2':
    'So now we can know right away how much of a dent a given\n' +
    '                    action will make to our total footprint.',
  'app.measurementPage.Impact.Title':
    'Cut time from your footprint, create Net Positive time with\n' +
    '                  your handprints',
  'app.measurementPage.Impact.Text':
    'Every action card shows you how much impact the action can\n' +
    '                  create, expressed in days or hours or minutes of the average\n' +
    '                  global citizen’s footprint.',
  'app.measurementPage.Impact.ListTitle': 'Impact labels system',
  'app.measurementPage.Impact.ListItemBlue': 'Days are <strong>blue</strong>',
  'app.measurementPage.Impact.ListItemDarkGreen':
    'Hours are <strong>dark green</strong>',
  'app.measurementPage.Impact.ListItemLightGreen':
    'Minutes are <strong>light green</strong>',
  'app.measurementPage.Impact.ListItemGray':
    'Negative are <strong>gray and striked out</strong>',
  'app.measurementPage.Card.Title': 'Impact for this card',
  'app.measurementPage.Card.Item1':
    '<strong> 10 days </strong> of climate footprint',
  'app.measurementPage.Card.Item2':
    '<strong>2 days</strong> of ecosystem footprint',
  'app.measurementPage.Card.Item3':
    '<strong>20 hours</strong> of waste footprint',
  'app.measurementPage.Card.Item4':
    '<strong> 1 hour</strong> of water footprint',
  'app.measurementPage.Card.Item5':
    '<strong>5 minutes</strong> of health footprint',
  'app.measurementPage.CommonBasis.Title':
    'A common basis <br />\n' + 'for communication',
  'app.measurementPage.CommonBasis.Text1':
    'When we speak with everyone, action impacts are expressed in\n' +
    '                relation to an average global citizen&apos;s footprint. Then for\n' +
    '                your personally, handprinter calculates and shows you the\n' +
    '                impacts of your actions in relation to your own footprint. If\n' +
    '                your footprint is twice as large as the average global\n' +
    '                citizen&apos;s footprint, then taking an action with &Prime;2\n' +
    '                days&Prime; of global citizen water benefits will reduce your\n' +
    '                water footprint by 1 day.',
  'app.measurementPage.CommonBasis.Text2':
    'The cool thing is that <strong> the smaller your footprint gets, the more powerful each action will become </strong> when handprinter calculates the action’s effect on your footprint.',
  'app.measurementPage.Animation.Title':
    'Make your handprint bigger than your footprint. Become <strong>Net Positive</strong>',
  'app.actions.takeAction': 'Take action',
  'app.actions.congratulations': 'Congratulations',
  'app.actions.handprintIncreased': 'Your handprint just increased!',
}
