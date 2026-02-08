import db from "#db/client";
import { createUser, getUserByEmailAndPassword } from "#db/queries/users";
import { createTrip } from "#db/queries/trips";

await db.connect();
try {
  await seed();
  console.log("🌱 Database seeded.");
} catch (err) {
  console.error("Seeding failed:", err);
} finally {
  await db.end();
}

async function seed() {
  await seedUsers();
  await seedTrips();
}

async function seedUsers() {
  const email = "user@example.com";
  const password = "password123";
  let user = await getUserByEmailAndPassword(email, password);

  if (!user) {
    user = await createUser(email, password);
    console.log("✅ User created:", user.email);
  } else {
    console.log("ℹ️ User already exists:", user.email);
  }
  return user;
}

async function seedTrips() {
  // List of trips to create
  const tripsToCreate = [
    {
      id: 1,
      trip_name: "Alpine Loop",
      trip_location: "Colorado",
      trip_difficulty: "easy",
      trip_description:
        "Get ready for an unforgettable mountain adventure! Wind through Colorado's majestic peaks on this beginner-friendly trail that packs stunning alpine vistas at every turn. Perfect for testing your rig's capabilities while soaking in panoramic mountain views. This scenic loop offers the perfect blend of excitement and natural beauty - bring your camera and prepare to be amazed!",
      terrain_type: "Mountain",
      trail_length: "12 miles",
      estimated_time: "3-4 hours",
      photo_urls: [
        "https://cdn.buttercms.com/IZR28K9QT2W65dFuUETx",
        "https://images-prod.trailsoffroad.com/trails/426/highlights/1695073100775_poughkeepsie_gulch-800.jpg",
        "https://images-prod.trailsoffroad.com/trails/8584/highlights/1693331943777_mineral_creek-800.jpg",
      ],
    },
    {
      id: 2,
      trip_name: "Moab Rocks",
      trip_location: "Utah",
      trip_difficulty: "moderate",
      trip_description:
        "Calling all rock crawling enthusiasts! Experience the legendary red rock terrain of Moab - the ultimate proving ground for serious off-roaders. Navigate technical ledges, articulate through slickrock, and conquer iconic obstacles that have challenged wheelers for decades. This is where legends are made and your 4x4 skills will truly shine. Don't miss this bucket-list adventure!",
      terrain_type: "Desert",
      trail_length: "8 miles",
      estimated_time: "4-5 hours",
      photo_urls: [
        "https://mild2wildrafting.com/wp-content/uploads/2021/02/resized_highlight.jpeg",
        "https://mild2wildrafting.com/wp-content/uploads/2021/02/Moab-Lead.jpg",
        "https://www.gorancho.com/cdn/shop/articles/Rancho-Jeep-Wrangler-On-Moab-Trail-Thumbnail.jpg?v=1691371437",
      ],
    },
    {
      id: 3,
      trip_name: "Forest Trail",
      trip_location: "Oregon",
      trip_difficulty: "difficult",
      trip_description:
        "Are you ready for the ultimate challenge? Dive into Oregon's wild backcountry where mother nature throws everything at you - thick mud bogs, massive fallen timber, and heart-pounding climbs through pristine old-growth forest. This expert-level trail demands skill, preparation, and a well-equipped rig. Perfect for experienced wheelers seeking an adrenaline-pumping adventure in the great outdoors!",
      terrain_type: "Forest",
      trail_length: "15 miles",
      estimated_time: "6-7 hours",
      photo_urls: [
        "https://trail4runner.com/wp-content/uploads/2024/04/trail_features_south_carolina_3-1024x682.png",
        "https://images-prod.trailsoffroad.com/trails/3161/highlights/1713476092978_peewee_crossing_-_southern_missouri_off-road_ranch-1440.jpg",
        "https://trail4runner.com/wp-content/uploads/2024/04/trail_feature_new_hampshire_1-1024x682.png",
      ],
    },
    {
      id: 4,
      trip_name: "Desert Dash",
      trip_location: "Arizona",
      trip_difficulty: "easy",
      trip_description:
        "Feel the rush of open desert freedom! Blast through Arizona's stunning sandy washes and wide-open terrain where you can really let your rig breathe. This fast-paced trail is perfect for newcomers and families looking to experience the thrill of desert off-roading without extreme technical challenges. Spectacular desert sunsets and endless horizons await!",
      terrain_type: "Desert",
      trail_length: "10 miles",
      estimated_time: "2-3 hours",
      photo_urls: [
        "https://www.visitutah.com/azure/cmsroot/visitutah/media/site-assets/articles-photography/article-photography-02/web2000_blazingsandals_northlakepowell_jay_dash_photography_img_0391.jpg",
        "https://www.ridenorth.com.au/wp-content/uploads/2024/05/Ride-North-About-Us.webp",
        "https://dixie4wheeldrive.com/wp-content/uploads/2021/08/Desert-RATS.jpeg",
      ],
    },
    {
      id: 5,
      trip_name: "Coastal Cruise",
      trip_location: "California",
      trip_difficulty: "moderate",
      trip_description:
        "Experience the best of both worlds! This incredible coastal route combines technical off-road challenges with absolutely breathtaking Pacific Ocean views. Traverse beach access points, tackle sandy sections, and explore hidden coastal gems only accessible by 4x4. Watch for wildlife, breathe in that ocean air, and create memories that'll last a lifetime on this scenic adventure!",
      terrain_type: "Coastal",
      trail_length: "18 miles",
      estimated_time: "4-5 hours",
      photo_urls: [
        "https://www.lastgreatroadtrip.com/wp-content/uploads/2017/10/FJ-cruiser-baja-beach-475x324.jpg",
        "https://photos.production.onxmaps.com/production-onxmaps/image/upload/c_limit,f_auto,h_1500,q_auto,w_1500/v1/public/81522ea3-3b85-416f-b778-83472ecdfd2a.jpg",
      ],
    },
    {
      id: 6,
      trip_name: "Urban Adventure",
      trip_location: "Nevada",
      trip_difficulty: "difficult",
      trip_description:
        "Think off-roading is only for the wilderness? Think again! Navigate an extreme urban landscape featuring industrial obstacles, concrete challenges, and man-made terrain that'll test your creativity and driving skills. This unique trail combines technical precision with urban exploration - perfect for experienced drivers looking for something completely different!",
      terrain_type: "Urban",
      trail_length: "6 miles",
      estimated_time: "3-4 hours",
      photo_urls: [
        "https://images.pexels.com/photos/15807365/pexels-photo-15807365/free-photo-of-adventure-4x4-car.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      ],
    },
    {
      id: 7,
      trip_name: "River Run",
      trip_location: "Tennessee",
      trip_difficulty: "easy",
      trip_description:
        "Splash into adventure! Follow Tennessee's beautiful riverbanks on this family-friendly trail featuring fun water crossings and gorgeous scenic overlooks. Perfect for hot summer days when you want to cool off while getting your wheels dirty. The gentle terrain makes this ideal for beginners, but the water obstacles provide just enough excitement to keep things interesting!",
      terrain_type: "River",
      trail_length: "14 miles",
      estimated_time: "3-4 hours",
      photo_urls: [
        "https://i.ytimg.com/vi/sW2drr2RgIs/maxresdefault.jpg",
        "https://images-prod.trailsoffroad.com/trails/8638/highlights/1701109318517_wolf_den_run_state_park_-_2301_potomac_river_area-800.jpg",
      ],
    },
    {
      id: 8,
      trip_name: "Canyon Crawl",
      trip_location: "New Mexico",
      trip_difficulty: "moderate",
      trip_description:
        "Discover the raw beauty of the Southwest! Navigate narrow canyon passages where towering walls create dramatic shadows and the terrain demands respect. This trail offers the perfect mix of technical rock crawling and jaw-dropping scenery. Every twist and turn reveals new challenges and photo opportunities - it's like wheeling through a natural cathedral!",
      terrain_type: "Canyon",
      trail_length: "11 miles",
      estimated_time: "5-6 hours",
      photo_urls: [
        "https://i.ytimg.com/vi/yWwHTH7PWiQ/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLB5W5wmxj6z6Jsj-4DlJYl1MnVCVA",
        "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEho5ud2hzqtFFVnVD9vwPQmwplm28bFPnZb8W4bMIwTwLO1Z5TieOcGy8gxxHeJKcZ1_NvKJiHepOYjjuvyS3cGKvj_LHrny7xYkzeur81AvzGAJ1O72sulXXOAlx7KNBAVdInDCh3SXOA/s1600/Billings+Canyon+Jeep+164.JPG",
      ],
    },
    {
      id: 9,
      trip_name: "Swamp Safari",
      trip_location: "Louisiana",
      trip_difficulty: "difficult",
      trip_description:
        "Mud lovers, this is YOUR trail! Tackle Louisiana's gnarliest swamp terrain where deep mud holes and water obstacles separate the weekend warriors from the serious mudders. Bring your snorkel, lift kit, and sense of adventure. This extreme trail promises to get you absolutely filthy and give you stories to tell for years to come!",
      terrain_type: "Swamp",
      trail_length: "9 miles",
      estimated_time: "5-7 hours",
      photo_urls: [
        "https://ewscripps.brightspotcdn.com/dims4/default/405eadc/2147483647/strip/true/crop/639x335+0+72/resize/1200x630!/quality/90/?url=http%3A%2F%2Fsharing.fox4now.com%2Fsharewfts%2Fphoto%2F2017%2F08%2F08%2FMONSTER%20TRUCK%20SAFARI_1502204871947_63850989_ver1.0_640_480.jpg",
        "https://photos.production.onxmaps.com/production-onxmaps/image/upload/c_limit,f_auto,h_1500,q_auto,w_1500/v1/public/ac1101f4-88b0-4713-939e-34724bb185dd.jpg",
      ],
    },
    {
      id: 10,
      trip_name: "Glacier Glide",
      trip_location: "Alaska",
      trip_difficulty: "easy",
      trip_description:
        "Experience the last frontier! Journey across Alaska's stunning glacial landscapes where massive ice formations create an otherworldly backdrop for your off-road adventure. This smooth, accessible trail lets you explore pristine wilderness while spotting wildlife and soaking in views that few people ever get to see. An absolute must-do for bucket-list adventurers!",
      terrain_type: "Glacier",
      trail_length: "20 miles",
      estimated_time: "4-5 hours",
      photo_urls: [
        "https://i.ytimg.com/vi/n1yHpTnMkIY/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDXcftI6BawQn5zGKEr8QxCtuIoFQ",
        "https://adventures.com/media/213023/m-jeep-riding-on-a-glacial-snow-in-iceland-com.jpg",
      ],
    },
    {
      id: 11,
      trip_name: "Volcano Venture",
      trip_location: "Hawaii",
      trip_difficulty: "moderate",
      trip_description:
        "Wheel through paradise! Explore Hawaii's dramatic volcanic terrain where ancient lava flows have created unique off-road challenges unlike anywhere else on Earth. Navigate through otherworldly black rock formations, tropical vegetation, and terrain that's been shaped by fire and time. This is off-roading with a serious dose of aloha spirit!",
      terrain_type: "Volcano",
      trail_length: "13 miles",
      estimated_time: "4-5 hours",
      photo_urls: [
        "https://media.cnn.com/api/v1/images/stellar/prod/141208165450-volcano-safari-7.jpg?q=w_1590,h_1193,x_0,y_0,c_fill",
        "https://www.pelago.com/img/products/ID-Indonesia/merapi-4wd-jeep-tour/0923-0707_merapi-4wd-jeep-tour-indonesia-pelago3.jpg",
      ],
    },
    {
      id: 12,
      trip_name: "Jungle Journey",
      trip_location: "Florida",
      trip_difficulty: "difficult",
      trip_description:
        "Venture into the wild! Navigate Florida's dense jungle terrain where tropical vegetation, wildlife encounters, and challenging obstacles create an expedition-style adventure. This expert trail will push your navigation skills, test your rig's durability, and immerse you in an environment that feels like something out of an adventure movie. Bring your machete and pioneering spirit!",
      terrain_type: "Jungle",
      trail_length: "16 miles",
      estimated_time: "6-8 hours",
      photo_urls: [
        "https://thumbs.dreamstime.com/b/off-road-adventure-lush-rainforest-rugged-vehicle-navigates-muddy-riverbed-dense-verdant-loaded-camping-gear-332801671.jpg",
        "https://media.istockphoto.com/id/172472343/photo/jeep-in-the-forest-jungle-adventure.jpg?s=612x612&w=0&k=20&c=VrmdZ8loWKKCodzz2PL6l7MnWbwm6-B035fga3mb858=",
        "https://images.stockcake.com/public/7/0/e/70e340ae-9cb2-4b79-a373-369e5229922e/jungle-off-road-adventure-stockcake.jpg",
      ],
    },
  ];
  for (const trip of tripsToCreate) {
    await createTrip(
      trip.trip_name,
      trip.trip_location,
      trip.trip_difficulty,
      trip.trip_description,
      trip.terrain_type,
      trip.trail_length,
      trip.estimated_time,
      trip.photo_urls,
    );
  }
  console.log(`✅ Created ${tripsToCreate.length} trips`);
}
