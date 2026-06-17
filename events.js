// PDS Events — edit this file to add, remove, or update events.
// Each event will automatically appear in the event list, mini calendar, and filters.
//
// Fields:
//   id          : unique number
//   featured    : true = blue "Featured" ribbon (only one at a time)
//   title       : event name
//   category    : one of Social | Growth | Worship | Service | Sports | Study | Group
//   date        : "YYYY-MM-DD"
//   time        : display string e.g. "7:00 PM" or "7:00 PM - 9:00 PM"
//   location    : venue name (shown on card)
//   address     : full street address (used for Directions button)
//   description : full event description (shown when card is expanded)
//   foodNote    : food/drink info, or null
//   afterpartyNote : afterparty info, or null

const EVENTS = [
{
  id: 1,
  featured: true,
  title: "Grace for the Journey",
  category: "Group",
  date: "2026-06-18",
  time: "7:00 PM",
  location: "Journey Church Main Hall",
  address: "400 Maitland Ave, Altamonte Springs, FL",
  description: `This Thursday, join Purpose Driven Singles for our first deep dive into Grace for the Journey!

Rubi will be leading us through "How Grace Speaks" speaking to one another, speaking the way God would want us to speak, and communicating God's way.

Come prepared to take notes and soak in a powerful message.`,
  foodNote: `🍜 Food: Asian Cuisine

Group funds will provide a variety of main dish options. Please bring a side dish, dessert, or drinks to share.`,
  afterpartyNote: `Afterparty: 10:00 PM – 12:00 AM

Join us afterward for a relaxed evening outdoors at the Enzian Theater in Maitland.

Hang out, chat, connect, and enjoy the atmosphere with friends old and new. Come and go as you please!`
},
{
  id: 2,
  featured: false,
  title: "Faith & Finance Workshop",
  category: "Growth",
  date: "2026-07-19",
  time: "6:30 PM",
  location: "Journey Church Room 201",
  address: "1234 Journey Blvd, Orlando, FL 32801",
  description: "Practical teaching on biblical stewardship, budgeting, and building a purpose-driven financial future. Guest speaker from our church leadership team.",
  foodNote: "Light refreshments served.",
  afterpartyNote: null
},
{
  id: 3,
  featured: false,
  title: "Rooftop Worship Night",
  category: "Worship",
  date: "2026-08-02",
  time: "8:00 PM",
  location: "The Rooftop at Journey",
  address: "1234 Journey Blvd, Orlando, FL 32801",
  description: "Open-air worship under the stars. Bring a blanket, an open heart, and your voice.",
  foodNote: null,
  afterpartyNote: "Ember Lounge after — 10:00 PM."
},
{
  id: 4,
  featured: false,
  title: "Community Serve Day",
  category: "Service",
  date: "2026-08-15",
  time: "9:00 AM",
  location: "Journey Church Lobby",
  address: "1234 Journey Blvd, Orlando, FL 32801",
  description: "Hitting the streets of Orlando to serve. Multiple project sites across the city. Come ready to work and leave ready to be changed.",
  foodNote: "Breakfast burritos before we head out.",
  afterpartyNote: "Debrief lunch together at noon."
},
{
  id: 10,
  featured: false,
  title: "Sunset Pickleball",
  category: "Sports",
  date: "2026-06-10",
  time: "7:00 PM - 8:30 PM",
  location: "Highland Community Courts",
  address: "698 Sheoah Blvd, Winter Springs, FL 32708",
  description: "Open play for beginners.",
  foodNote: null,
  afterpartyNote: null
},
{
  id: 11,
  featured: false,
  title: "Sunset Pickleball",
  category: "Sports",
  date: "2026-06-17",
  time: "7:00 PM - 8:30 PM",
  location: "Highland Community Courts",
  address: "698 Sheoah Blvd, Winter Springs, FL 32708",
  description: "Open play for beginners.",
  foodNote: null,
  afterpartyNote: null
},
{
  id: 12,
  featured: false,
  title: "Sunset Pickleball",
  category: "Sports",
  date: "2026-06-24",
  time: "7:00 PM - 8:30 PM",
  location: "Highland Community Courts",
  address: "698 Sheoah Blvd, Winter Springs, FL 32708",
  description: "Open play for beginners.",
  foodNote: null,
  afterpartyNote: null
},
{
  id: 13,
  featured: false,
  title: "Sunset Pickleball",
  category: "Sports",
  date: "2026-07-01",
  time: "7:00 PM - 8:30 PM",
  location: "Highland Community Courts",
  address: "698 Sheoah Blvd, Winter Springs, FL 32708",
  description: "Open play for beginners.",
  foodNote: null,
  afterpartyNote: null
},
{
  id: 14,
  featured: false,
  title: "Sunset Pickleball",
  category: "Sports",
  date: "2026-07-08",
  time: "7:00 PM - 8:30 PM",
  location: "Highland Community Courts",
  address: "698 Sheoah Blvd, Winter Springs, FL 32708",
  description: "Open play for beginners.",
  foodNote: null,
  afterpartyNote: null
},
{
  id: 15,
  featured: false,
  title: "Sunset Pickleball",
  category: "Sports",
  date: "2026-07-15",
  time: "7:00 PM - 8:30 PM",
  location: "Highland Community Courts",
  address: "698 Sheoah Blvd, Winter Springs, FL 32708",
  description: "Open play for beginners.",
  foodNote: null,
  afterpartyNote: null
},
{
  id: 16,
  featured: false,
  title: "Sunset Pickleball",
  category: "Sports",
  date: "2026-07-22",
  time: "7:00 PM - 8:30 PM",
  location: "Highland Community Courts",
  address: "698 Sheoah Blvd, Winter Springs, FL 32708",
  description: "Open play for beginners.",
  foodNote: null,
  afterpartyNote: null
},
{
  id: 17,
  featured: false,
  title: "Sunset Pickleball",
  category: "Sports",
  date: "2026-07-29",
  time: "7:00 PM - 8:30 PM",
  location: "Highland Community Courts",
  address: "698 Sheoah Blvd, Winter Springs, FL 32708",
  description: "Open play for beginners.",
  foodNote: null,
  afterpartyNote: null
}
];
