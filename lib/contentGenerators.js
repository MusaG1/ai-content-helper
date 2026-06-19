const businessTypes = [
  'Coffee Shop', 'Bakery', 'Restaurant', 'Fitness Studio', 'Salon',
  'Boutique', 'Dental Clinic', 'Law Office', 'Daycare', 'Pet Grooming',
  'Food Truck', 'Yoga Studio', 'Barbershop', 'Auto Repair', 'Cleaning Service'
]

const tones = ['Professional', 'Casual', 'Friendly', 'Playful', 'Urgent', 'Warm']

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function pickN(arr, n) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, n)
}

const templates = {
  post: {
    Instagram: [
      "The secret is out. Our {product} has been flying off the shelves, and now we know why. Customers keep telling us it's the best {category} they've ever tried. Come taste the difference for yourself! 📍 {location} #{hashtag1} #{hashtag2}",
      "Monday mornings look different at {business}. ☕✨ Our team is brewing up something special this week. Swipe through to see what's new on the menu! #{hashtag1} #{hashtag2}",
      "It's {day} and we're feeling grateful. 🫶 Thank you to every single customer who has walked through our doors. You're the reason we do what we do. #{hashtag1}",
      "NEW ALERT 🚨 We just dropped something that will change your {category} game forever. First 20 customers get a free {product} with any purchase. Run, don't walk! #{hashtag1}",
      "Behind the scenes at {business}. 🎬 Here's how we make our famous {product} from scratch. The amount of love (and {ingredient}) that goes into each batch is unreal. #{hashtag1} #{hashtag2}"
    ],
    Facebook: [
      "Big news from {business}! 🎉 We're celebrating our anniversary with a week-long sale. Everything {category} is {discount}% off — no code needed. Come see us at {location}!",
      "Customer spotlight! 🌟 {customerName} has been coming to us for {years} years. Here's what they had to say: '{quote}'. Thanks for being part of our family!",
      "We believe in giving back. This month, {discount}% of all proceeds go to {charity}. Help us make a difference while enjoying the best {category} in town. ❤️",
      "Meet the team! 👋 Say hello to {name}, our {role}. They've been with us for {years} years and make sure every customer leaves with a smile.",
      "Weekend plans? We're open Saturday and Sunday with extended hours. Bring a friend and get {discount}% off your second {product}. See you soon!"
    ],
    Twitter: [
      "Hot take: {product} + {day} = the perfect combination. Don't @ us. 😏 #{hashtag1}",
      "We just hit {followers} followers! To celebrate, we're giving away a free {product} to one lucky follower. RT to enter! 🎉",
      "PSA: Our {product} is back in stock. You're welcome. #{hashtag1}",
      "Currently: {activity}. Come join the fun at {location}! #{hashtag1}",
      "What's better than a {day}? A {day} with {product} from {business}. You deserve it."
    ],
    LinkedIn: [
      "Proud to announce that {business} has been named one of the top {category} providers in {year}! This recognition belongs to our incredible team and loyal customers. Here's to many more years of growth and service. 🏆",
      "We're hiring! {business} is looking for a passionate {role} to join our growing team. If you love {category} and want to work with the best, apply at the link in our profile.",
      "Reflecting on {years} years in business. When we started, we had a simple mission: provide the best {category} experience in town. Today, that mission hasn't changed — but our impact has grown beyond what we imagined. Thank you to everyone who's been part of this journey.",
      "Tip of the week from {business}: {tip}. It's a small change that makes a big difference in how we serve our customers. What's your go-to tip for success?",
      "Collaboration announcement 🤝 We're thrilled to partner with {partner} to bring you an exclusive {product} experience. Stay tuned for details!"
    ]
  },
  reply: {
    Positive: [
      "Thank you so much, {customerName}! We're thrilled you enjoyed your experience at {business}. Your kind words mean the world to our team. Hope to see you again soon! 🙏",
      "Wow, {customerName}, thank you for this amazing review! 😊 We work hard to make every visit special, and it's reviews like yours that keep us motivated. See you next time!",
      "{customerName}, you just made our day! 🌟 We're so glad we could deliver a great experience. Don't forget to ask about our loyalty program on your next visit!",
      "Thanks for the 5 stars, {customerName}! ⭐ We're grateful for customers like you who make {business} such a wonderful place to be. Come back and see us soon!",
      "{customerName}, thank you for taking the time to share your experience! We're delighted that you loved our {product}. We'll see you again soon!"
    ],
    Neutral: [
      "Hi {customerName}, thank you for your feedback. We're glad you visited and would love to make your next experience even better. Please reach out to us directly — we'd love to hear more about how we can improve.",
      "Thanks for sharing, {customerName}. We appreciate your honesty and are always looking to improve. Next time you're in, mention this review and we'll make it extra special.",
      "Hi {customerName}, we appreciate your review! We'd love the opportunity to earn a 5-star rating from you. Please give us another chance — we think you'll be pleasantly surprised.",
      "Thank you for your visit, {customerName}! We value all feedback and will share yours with our team. If there's anything specific you'd like us to improve, please let us know.",
      "Hey {customerName}, thanks for stopping by! We hope to see you again and provide an even better experience. Feel free to DM us with any suggestions!"
    ],
    Negative: [
      "Hi {customerName}, we're sorry to hear about your experience. This isn't the standard we strive for at {business}. Please DM us so we can make things right. Your satisfaction is our top priority.",
      "{customerName}, we apologize for falling short. We take feedback seriously and would like the chance to address your concerns directly. Please contact us at {phone} or reply to this message.",
      "Thank you for bringing this to our attention, {customerName}. We've shared your feedback with our team and are taking steps to improve. We hope you'll give us another opportunity to serve you better.",
      "We're sorry, {customerName}. This isn't the experience we want any customer to have. Please give us a call at {phone} — we'd like to personally make this right.",
      "Hi {customerName}, we appreciate you sharing your honest feedback. We're committed to fixing this issue and would love to discuss it further. Please reach out when you have a moment."
    ]
  },
  flyer: [
    {
      headline: "GRAND OPENING",
      subheadline: "Come celebrate with us!",
      body: "We're thrilled to announce the grand opening of {business}! 🎉\n\nJoin us on {date} for:\n• Free {product} for the first 50 guests\n• {discount}% off all {category}\n• Live music and refreshments\n• Exclusive giveaways\n\n📍 {location}\n🕐 {time} - {endTime}\n\nBring a friend and celebrate with us!",
      cta: "Save My Spot"
    },
    {
      headline: "SUMMER SALE",
      subheadline: "Up to {discount}% Off Everything!",
      body: "Beat the heat with our biggest sale of the year! ☀️\n\nFor a limited time, enjoy:\n• {discount}% off all {category}\n• BOGO free on selected {product}\n• Free gift with every purchase over ${amount}\n\nSale runs {date} - {endDate}\n📍 {location}\n\nNo coupon needed — just show this flyer!",
      cta: "Shop Now"
    },
    {
      headline: "NEW MENU ALERT",
      subheadline: "Introducing Our Latest Creations",
      body: "We've been cooking up something special! 🍽️\n\nStarting {date}, our new menu features:\n• {product} — a customer favorite\n• Seasonal specials made with fresh {ingredient}\n• Exclusive chef's tasting menu\n\n📍 Visit us at {location}\n\nFirst taste is on us — mention this flyer for a free sample!",
      cta: "View Menu"
    },
    {
      headline: "HOLIDAY SPECIAL",
      subheadline: "Spread Joy This Season",
      body: "Make this holiday season unforgettable with {business}! 🎄✨\n\nLimited-time offers:\n• Holiday gift bundles starting at ${amount}\n• Free {product} with every {category} purchase\n• Gift cards available (bonus ${bonus} for every ${amount} spent)\n\n📍 {location}\n📅 Offer valid through {endDate}\n\nGive the gift of {category} this year!",
      cta: "Shop Holiday Deals"
    },
    {
      headline: "FLASH SALE",
      subheadline: "Today Only!",
      body: "⏰ FLASH SALE — {discount}% OFF EVERYTHING ⏰\n\nNo minimum. No code. No exceptions.\n\nToday at {location} only:\n• All {category} {discount}% off\n• Extra {bonus}% off when you spend ${amount}+ \n• Free {product} while supplies last\n\n📍 {location}\n🕐 {time} - {endTime}\n\nFirst come, first served. Don't miss out!",
      cta: "Get Directions"
    }
  ],
  text: {
    Promotional: [
      "Hey {customerName}! 🎉 {business} here. We're running a flash sale — {discount}% off all {category} today only! Stop by {location} or visit our site. Show this text to redeem!",
      "Exclusive offer just for you! 🤫 {business} wants to treat you to {discount}% off your next {product}. Mention code SAVE{discount} at checkout. Valid through {endDate}!",
      "Your next visit is on us! Sort of. 😉 Buy one {product}, get one FREE at {business}. Show this message to claim. {location} — we'll save you a spot!"
    ],
    Reminder: [
      "Hey {customerName}! This is a friendly reminder from {business} about your appointment on {date} at {time}. See you soon! Reply CONFIRM to confirm or CANCEL to reschedule.",
      "Just a heads up — our special {discount}% off {category} deal ends tomorrow! Don't miss out. Visit {location} or order online. Use code LASTCHANCE.",
      "Quick reminder: {business} closes at {time} today. We're open {hours} — plenty of time to grab your {product}! See you soon!"
    ],
    Announcement: [
      "Big news from {business}! 🚀 We're expanding! Starting {date}, we'll be open later — until {endTime} on weekends. More time for your favorite {product}!",
      "We've got something new! 🆕 {business} just launched {product} and it's already a hit. First 20 customers get {discount}% off. Come try it today! 📍{location}",
      "Thank you, {customerName}! 🙏 We just hit {milestone} happy customers and we're celebrating with a giveaway. Reply to enter and win a free {product}!"
    ]
  }
}

function generatePost(type, business, tone) {
  const platform = pick(Object.keys(templates.post))
  const lines = templates.post[platform]
  let content = pick(lines)
  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  content = content
    .replace(/{business}/g, business.name)
    .replace(/{product}/g, pick(business.products))
    .replace(/{category}/g, business.category)
    .replace(/{location}/g, business.location)
    .replace(/{hashtag1}/g, `#${business.name.replace(/\s+/g, '')}`)
    .replace(/{hashtag2}/g, `#${pick(['SmallBusiness', 'LocalLove', 'ShopLocal', 'CommunityFirst', 'SupportLocal'])}`)
    .replace(/{day}/g, pick(dayNames))
    .replace(/{ingredient}/g, pick(['love', 'passion', 'dedication', 'care', 'creativity']))
    .replace(/{discount}/g, pick(['15', '20', '25', '30', '50']))
    .replace(/{customerName}/g, pick(['Sarah', 'Mike', 'Jessica', 'David', 'Emily', 'Alex']))
    .replace(/{years}/g, pick(['3', '5', '7', '10', '12']))
    .replace(/{quote}/g, pick(['Best in town!', 'Absolutely love this place', 'Can not recommend enough', 'My go-to spot']))
    .replace(/{charity}/g, pick(['Local Food Bank', 'Children\'s Hospital', 'Animal Shelter', 'Community Center']))
    .replace(/{name}/g, pick(['Maria', 'James', 'Lisa', 'Carlos', 'Amanda']))
    .replace(/{role}/g, pick(['Manager', 'Head Chef', 'Lead Designer', 'Customer Happiness Officer', 'Founder']))
    .replace(/{followers}/g, pick(['1,000', '5,000', '10,000', '25,000']))
    .replace(/{activity}/g, pick(['brewing fresh coffee', 'baking sourdough', 'prepping ingredients', 'setting up for an event', 'testing new recipes']))
    .replace(/{year}/g, '2026')
    .replace(/{tip}/g, pick(['Consistency is everything', 'Listen more than you talk', 'Quality over quantity, always', 'Your team is your greatest asset']))
    .replace(/{partner}/g, pick(['Local Roasters Co.', 'Greenleaf Organics', 'Main Street Collective', 'The Artisan Guild']))

  return { content, platform, type: 'post' }
}

function generateReply(business, sentiment) {
  const sentimentType = sentiment === 'negative' ? 'Negative' : sentiment === 'positive' ? 'Positive' : 'Neutral'
  const replies = templates.reply[sentimentType]
  let content = pick(replies)
  content = content
    .replace(/{customerName}/g, pick(['Sarah', 'Mike', 'Jessica', 'David', 'Emily', 'Alex', 'Rachel', 'Tom']))
    .replace(/{business}/g, business.name)
    .replace(/{product}/g, pick(business.products))
    .replace(/{phone}/g, '(555) 123-4567')

  return { content, sentiment: sentimentType.toLowerCase(), type: 'reply' }
}

function generateFlyer(business) {
  const template = pick(templates.flyer)
  const replacers = {
    '{business}': business.name,
    '{product}': pick(business.products),
    '{category}': business.category,
    '{location}': business.location,
    '{date}': pick(['March 15th', 'April 1st', 'May 20th', 'June 10th', 'July 4th']),
    '{endDate}': pick(['March 22nd', 'April 8th', 'May 27th', 'June 17th', 'July 11th']),
    '{time}': pick(['9:00 AM', '10:00 AM', '11:00 AM', '8:00 AM']),
    '{endTime}': pick(['6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM']),
    '{discount}': pick(['20', '25', '30', '40', '50']),
    '{amount}': pick(['25', '50', '75', '100']),
    '{bonus}': pick(['5', '10', '15', '20']),
    '{ingredient}': pick(['locally sourced ingredients', 'organic produce', 'hand-selected materials', 'premium quality goods'])
  }
  const fill = (s) => Object.entries(replacers).reduce((acc, [k, v]) => acc.replace(new RegExp(k.replace(/[{}]/g, '\\$&'), 'g'), v), s)

  return {
    headline: fill(template.headline),
    subheadline: fill(template.subheadline),
    body: fill(template.body),
    cta: template.cta,
    type: 'flyer'
  }
}

function generateText(business) {
  const categories = Object.keys(templates.text)
  const category = pick(categories)
  const messages = templates.text[category]
  let content = pick(messages)
  content = content
    .replace(/{customerName}/g, pick(['Sarah', 'Mike', 'Jessica', 'David', 'Emily']))
    .replace(/{business}/g, business.name)
    .replace(/{product}/g, pick(business.products))
    .replace(/{category}/g, business.category)
    .replace(/{location}/g, business.location)
    .replace(/{discount}/g, pick(['15', '20', '25', '30']))
    .replace(/{date}/g, pick(['March 15th', 'April 1st', 'May 20th', 'June 10th']))
    .replace(/{time}/g, pick(['9:00 AM', '2:00 PM', '5:00 PM', '7:00 PM']))
    .replace(/{endTime}/g, pick(['10:00 PM', '11:00 PM', 'Midnight']))
    .replace(/{endDate}/g, pick(['March 22nd', 'April 8th', 'May 27th']))
    .replace(/{hours}/g, pick(['7AM-9PM', '8AM-8PM', '6AM-10PM']))
    .replace(/{milestone}/g, pick(['500', '1,000', '5,000', '10,000']))

  return { content, category: category.toLowerCase(), type: 'text' }
}

export default function generate(type, business, options = {}) {
  const b = {
    name: business.name || pick(businessTypes),
    category: business.category || pick(['Coffee', 'Bakery', 'Food', 'Fitness', 'Beauty']),
    location: business.location || 'Downtown',
    products: business.products || [pick(['Latte', 'Croissant', 'Burger', 'Smoothie', 'Blowout'])]
  }

  switch (type) {
    case 'post':
      return generatePost(type, b, options.tone)
    case 'reply':
      return generateReply(b, options.sentiment || 'positive')
    case 'flyer':
      return generateFlyer(b)
    case 'text':
      return generateText(b)
    default:
      return { error: 'Unknown type' }
  }
}
