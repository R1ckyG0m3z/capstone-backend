--
-- PostgreSQL database dump
--

\restrict kjec0MbpAT1hVSefSEAYZR1wi7vCqdL9Hp16QfcVyh5U1ihCDvlxcnM7AcKbIr7

-- Dumped from database version 18.1
-- Dumped by pg_dump version 18.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: trips; Type: TABLE; Schema: public; Owner: gomez
--

CREATE TABLE public.trips (
    id integer NOT NULL,
    trip_name text NOT NULL,
    trip_location text NOT NULL,
    trip_difficulty text NOT NULL,
    trip_description text NOT NULL,
    terrain_type text NOT NULL,
    trail_length text,
    estimated_time text,
    photo_urls text[],
    created_by integer,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.trips OWNER TO gomez;

--
-- Name: trips_id_seq; Type: SEQUENCE; Schema: public; Owner: gomez
--

CREATE SEQUENCE public.trips_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.trips_id_seq OWNER TO gomez;

--
-- Name: trips_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gomez
--

ALTER SEQUENCE public.trips_id_seq OWNED BY public.trips.id;


--
-- Name: user_profiles; Type: TABLE; Schema: public; Owner: gomez
--

CREATE TABLE public.user_profiles (
    id integer NOT NULL,
    user_id integer NOT NULL,
    name text,
    about_me text,
    vehicle_type text,
    photo_url text,
    bio text,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.user_profiles OWNER TO gomez;

--
-- Name: user_profiles_id_seq; Type: SEQUENCE; Schema: public; Owner: gomez
--

CREATE SEQUENCE public.user_profiles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_profiles_id_seq OWNER TO gomez;

--
-- Name: user_profiles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gomez
--

ALTER SEQUENCE public.user_profiles_id_seq OWNED BY public.user_profiles.id;


--
-- Name: user_trips; Type: TABLE; Schema: public; Owner: gomez
--

CREATE TABLE public.user_trips (
    user_profile_id integer NOT NULL,
    trip_id integer NOT NULL,
    travel_start_date date,
    travel_end_date date,
    status text DEFAULT 'planned'::text,
    notes text,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
    CONSTRAINT user_trips_status_check CHECK ((status = ANY (ARRAY['planned'::text, 'in_progress'::text, 'completed'::text, 'cancelled'::text])))
);


ALTER TABLE public.user_trips OWNER TO gomez;

--
-- Name: users; Type: TABLE; Schema: public; Owner: gomez
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email text NOT NULL,
    password text NOT NULL
);


ALTER TABLE public.users OWNER TO gomez;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: gomez
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO gomez;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: gomez
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: trips id; Type: DEFAULT; Schema: public; Owner: gomez
--

ALTER TABLE ONLY public.trips ALTER COLUMN id SET DEFAULT nextval('public.trips_id_seq'::regclass);


--
-- Name: user_profiles id; Type: DEFAULT; Schema: public; Owner: gomez
--

ALTER TABLE ONLY public.user_profiles ALTER COLUMN id SET DEFAULT nextval('public.user_profiles_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: gomez
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: trips; Type: TABLE DATA; Schema: public; Owner: gomez
--

COPY public.trips (id, trip_name, trip_location, trip_difficulty, trip_description, terrain_type, trail_length, estimated_time, photo_urls, created_by, created_at, updated_at) FROM stdin;
1	Alpine Loop	Colorado	easy	Get ready for an unforgettable mountain adventure! Wind through Colorado's majestic peaks on this beginner-friendly trail that packs stunning alpine vistas at every turn. Perfect for testing your rig's capabilities while soaking in panoramic mountain views. This scenic loop offers the perfect blend of excitement and natural beauty - bring your camera and prepare to be amazed!	Mountain	12 miles	3-4 hours	{https://cdn.buttercms.com/IZR28K9QT2W65dFuUETx,https://images-prod.trailsoffroad.com/trails/426/highlights/1695073100775_poughkeepsie_gulch-800.jpg,https://images-prod.trailsoffroad.com/trails/8584/highlights/1693331943777_mineral_creek-800.jpg}	\N	2026-02-01 16:44:59.973651	2026-02-01 16:44:59.973651
2	Moab Rocks	Utah	moderate	Calling all rock crawling enthusiasts! Experience the legendary red rock terrain of Moab - the ultimate proving ground for serious off-roaders. Navigate technical ledges, articulate through slickrock, and conquer iconic obstacles that have challenged wheelers for decades. This is where legends are made and your 4x4 skills will truly shine. Don't miss this bucket-list adventure!	Desert	8 miles	4-5 hours	{https://mild2wildrafting.com/wp-content/uploads/2021/02/resized_highlight.jpeg,https://mild2wildrafting.com/wp-content/uploads/2021/02/Moab-Lead.jpg,https://www.gorancho.com/cdn/shop/articles/Rancho-Jeep-Wrangler-On-Moab-Trail-Thumbnail.jpg?v=1691371437}	\N	2026-02-01 16:44:59.975527	2026-02-01 16:44:59.975527
3	Forest Trail	Oregon	difficult	Are you ready for the ultimate challenge? Dive into Oregon's wild backcountry where mother nature throws everything at you - thick mud bogs, massive fallen timber, and heart-pounding climbs through pristine old-growth forest. This expert-level trail demands skill, preparation, and a well-equipped rig. Perfect for experienced wheelers seeking an adrenaline-pumping adventure in the great outdoors!	Forest	15 miles	6-7 hours	{https://trail4runner.com/wp-content/uploads/2024/04/trail_features_south_carolina_3-1024x682.png,https://images-prod.trailsoffroad.com/trails/3161/highlights/1713476092978_peewee_crossing_-_southern_missouri_off-road_ranch-1440.jpg,https://trail4runner.com/wp-content/uploads/2024/04/trail_feature_new_hampshire_1-1024x682.png}	\N	2026-02-01 16:44:59.976066	2026-02-01 16:44:59.976066
4	Desert Dash	Arizona	easy	Feel the rush of open desert freedom! Blast through Arizona's stunning sandy washes and wide-open terrain where you can really let your rig breathe. This fast-paced trail is perfect for newcomers and families looking to experience the thrill of desert off-roading without extreme technical challenges. Spectacular desert sunsets and endless horizons await!	Desert	10 miles	2-3 hours	{https://www.visitutah.com/azure/cmsroot/visitutah/media/site-assets/articles-photography/article-photography-02/web2000_blazingsandals_northlakepowell_jay_dash_photography_img_0391.jpg,https://www.ridenorth.com.au/wp-content/uploads/2024/05/Ride-North-About-Us.webp,https://dixie4wheeldrive.com/wp-content/uploads/2021/08/Desert-RATS.jpeg}	\N	2026-02-01 16:44:59.976519	2026-02-01 16:44:59.976519
5	Coastal Cruise	California	moderate	Experience the best of both worlds! This incredible coastal route combines technical off-road challenges with absolutely breathtaking Pacific Ocean views. Traverse beach access points, tackle sandy sections, and explore hidden coastal gems only accessible by 4x4. Watch for wildlife, breathe in that ocean air, and create memories that'll last a lifetime on this scenic adventure!	Coastal	18 miles	4-5 hours	{https://www.lastgreatroadtrip.com/wp-content/uploads/2017/10/FJ-cruiser-baja-beach-475x324.jpg,"https://photos.production.onxmaps.com/production-onxmaps/image/upload/c_limit,f_auto,h_1500,q_auto,w_1500/v1/public/81522ea3-3b85-416f-b778-83472ecdfd2a.jpg"}	\N	2026-02-01 16:44:59.976981	2026-02-01 16:44:59.976981
6	Urban Adventure	Nevada	difficult	Think off-roading is only for the wilderness? Think again! Navigate an extreme urban landscape featuring industrial obstacles, concrete challenges, and man-made terrain that'll test your creativity and driving skills. This unique trail combines technical precision with urban exploration - perfect for experienced drivers looking for something completely different!	Urban	6 miles	3-4 hours	{https://images.pexels.com/photos/15807365/pexels-photo-15807365/free-photo-of-adventure-4x4-car.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1}	\N	2026-02-01 16:44:59.977373	2026-02-01 16:44:59.977373
7	River Run	Tennessee	easy	Splash into adventure! Follow Tennessee's beautiful riverbanks on this family-friendly trail featuring fun water crossings and gorgeous scenic overlooks. Perfect for hot summer days when you want to cool off while getting your wheels dirty. The gentle terrain makes this ideal for beginners, but the water obstacles provide just enough excitement to keep things interesting!	River	14 miles	3-4 hours	{https://i.ytimg.com/vi/sW2drr2RgIs/maxresdefault.jpg,https://images-prod.trailsoffroad.com/trails/8638/highlights/1701109318517_wolf_den_run_state_park_-_2301_potomac_river_area-800.jpg}	\N	2026-02-01 16:44:59.977805	2026-02-01 16:44:59.977805
8	Canyon Crawl	New Mexico	moderate	Discover the raw beauty of the Southwest! Navigate narrow canyon passages where towering walls create dramatic shadows and the terrain demands respect. This trail offers the perfect mix of technical rock crawling and jaw-dropping scenery. Every twist and turn reveals new challenges and photo opportunities - it's like wheeling through a natural cathedral!	Canyon	11 miles	5-6 hours	{https://i.ytimg.com/vi/yWwHTH7PWiQ/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLB5W5wmxj6z6Jsj-4DlJYl1MnVCVA,https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEho5ud2hzqtFFVnVD9vwPQmwplm28bFPnZb8W4bMIwTwLO1Z5TieOcGy8gxxHeJKcZ1_NvKJiHepOYjjuvyS3cGKvj_LHrny7xYkzeur81AvzGAJ1O72sulXXOAlx7KNBAVdInDCh3SXOA/s1600/Billings+Canyon+Jeep+164.JPG}	\N	2026-02-01 16:44:59.978225	2026-02-01 16:44:59.978225
9	Swamp Safari	Louisiana	difficult	Mud lovers, this is YOUR trail! Tackle Louisiana's gnarliest swamp terrain where deep mud holes and water obstacles separate the weekend warriors from the serious mudders. Bring your snorkel, lift kit, and sense of adventure. This extreme trail promises to get you absolutely filthy and give you stories to tell for years to come!	Swamp	9 miles	5-7 hours	{https://ewscripps.brightspotcdn.com/dims4/default/405eadc/2147483647/strip/true/crop/639x335+0+72/resize/1200x630!/quality/90/?url=http%3A%2F%2Fsharing.fox4now.com%2Fsharewfts%2Fphoto%2F2017%2F08%2F08%2FMONSTER%20TRUCK%20SAFARI_1502204871947_63850989_ver1.0_640_480.jpg,"https://photos.production.onxmaps.com/production-onxmaps/image/upload/c_limit,f_auto,h_1500,q_auto,w_1500/v1/public/ac1101f4-88b0-4713-939e-34724bb185dd.jpg"}	\N	2026-02-01 16:44:59.978626	2026-02-01 16:44:59.978626
10	Glacier Glide	Alaska	easy	Experience the last frontier! Journey across Alaska's stunning glacial landscapes where massive ice formations create an otherworldly backdrop for your off-road adventure. This smooth, accessible trail lets you explore pristine wilderness while spotting wildlife and soaking in views that few people ever get to see. An absolute must-do for bucket-list adventurers!	Glacier	20 miles	4-5 hours	{https://i.ytimg.com/vi/n1yHpTnMkIY/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDXcftI6BawQn5zGKEr8QxCtuIoFQ,https://adventures.com/media/213023/m-jeep-riding-on-a-glacial-snow-in-iceland-com.jpg}	\N	2026-02-01 16:44:59.979174	2026-02-01 16:44:59.979174
11	Volcano Venture	Hawaii	moderate	Wheel through paradise! Explore Hawaii's dramatic volcanic terrain where ancient lava flows have created unique off-road challenges unlike anywhere else on Earth. Navigate through otherworldly black rock formations, tropical vegetation, and terrain that's been shaped by fire and time. This is off-roading with a serious dose of aloha spirit!	Volcano	13 miles	4-5 hours	{"https://media.cnn.com/api/v1/images/stellar/prod/141208165450-volcano-safari-7.jpg?q=w_1590,h_1193,x_0,y_0,c_fill",https://www.pelago.com/img/products/ID-Indonesia/merapi-4wd-jeep-tour/0923-0707_merapi-4wd-jeep-tour-indonesia-pelago3.jpg}	\N	2026-02-01 16:44:59.979599	2026-02-01 16:44:59.979599
12	Jungle Journey	Florida	difficult	Venture into the wild! Navigate Florida's dense jungle terrain where tropical vegetation, wildlife encounters, and challenging obstacles create an expedition-style adventure. This expert trail will push your navigation skills, test your rig's durability, and immerse you in an environment that feels like something out of an adventure movie. Bring your machete and pioneering spirit!	Jungle	16 miles	6-8 hours	{https://thumbs.dreamstime.com/b/off-road-adventure-lush-rainforest-rugged-vehicle-navigates-muddy-riverbed-dense-verdant-loaded-camping-gear-332801671.jpg,https://media.istockphoto.com/id/172472343/photo/jeep-in-the-forest-jungle-adventure.jpg?s=612x612&w=0&k=20&c=VrmdZ8loWKKCodzz2PL6l7MnWbwm6-B035fga3mb858=,https://images.stockcake.com/public/7/0/e/70e340ae-9cb2-4b79-a373-369e5229922e/jungle-off-road-adventure-stockcake.jpg}	\N	2026-02-01 16:44:59.980638	2026-02-01 16:44:59.980638
\.


--
-- Data for Name: user_profiles; Type: TABLE DATA; Schema: public; Owner: gomez
--

COPY public.user_profiles (id, user_id, name, about_me, vehicle_type, photo_url, bio, created_at, updated_at) FROM stdin;
1	1	\N	\N	\N	\N	\N	2026-02-02 19:31:29.012961	2026-02-02 19:31:29.012961
2	2	Ricky Gomez	I like 4x4 off-roading, overlanding, and occasionally some rock crawling.  I like to explore new trails across the country and meet others that love off-roading. 	2018 4Runner Off-Road	https://th.bing.com/th/id/OIP.qTHA6CsoNl1TOLPNLEdB4AHaE7?w=256&h=180&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3	My bio 	2026-02-02 19:32:30.857699	2026-02-02 19:34:46.73126
\.


--
-- Data for Name: user_trips; Type: TABLE DATA; Schema: public; Owner: gomez
--

COPY public.user_trips (user_profile_id, trip_id, travel_start_date, travel_end_date, status, notes, created_at, updated_at) FROM stdin;
2	10	\N	\N	planned	\N	2026-02-12 18:58:11.139478	2026-02-12 18:58:11.139478
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: gomez
--

COPY public.users (id, email, password) FROM stdin;
1	user@example.com	$2b$10$.xeobCXL2BTcfoBd/S1SjOgWluUV5eUJT9tSROUhyAAJOt4F7btNy
2	gomez.ricky@gmail.com	$2b$10$gr3PMPrZSDtNzueu0zb.W.wjNQ/dv1pTcryDwyVFQCOO1NJpl7Owq
\.


--
-- Name: trips_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gomez
--

SELECT pg_catalog.setval('public.trips_id_seq', 12, true);


--
-- Name: user_profiles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gomez
--

SELECT pg_catalog.setval('public.user_profiles_id_seq', 2, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: gomez
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- Name: trips trips_pkey; Type: CONSTRAINT; Schema: public; Owner: gomez
--

ALTER TABLE ONLY public.trips
    ADD CONSTRAINT trips_pkey PRIMARY KEY (id);


--
-- Name: user_profiles user_profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: gomez
--

ALTER TABLE ONLY public.user_profiles
    ADD CONSTRAINT user_profiles_pkey PRIMARY KEY (id);


--
-- Name: user_profiles user_profiles_user_id_key; Type: CONSTRAINT; Schema: public; Owner: gomez
--

ALTER TABLE ONLY public.user_profiles
    ADD CONSTRAINT user_profiles_user_id_key UNIQUE (user_id);


--
-- Name: user_trips user_trips_pkey; Type: CONSTRAINT; Schema: public; Owner: gomez
--

ALTER TABLE ONLY public.user_trips
    ADD CONSTRAINT user_trips_pkey PRIMARY KEY (user_profile_id, trip_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: gomez
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: gomez
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: trips trips_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gomez
--

ALTER TABLE ONLY public.trips
    ADD CONSTRAINT trips_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id) ON DELETE SET NULL;


--
-- Name: user_profiles user_profiles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gomez
--

ALTER TABLE ONLY public.user_profiles
    ADD CONSTRAINT user_profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: user_trips user_trips_trip_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gomez
--

ALTER TABLE ONLY public.user_trips
    ADD CONSTRAINT user_trips_trip_id_fkey FOREIGN KEY (trip_id) REFERENCES public.trips(id) ON DELETE CASCADE;


--
-- Name: user_trips user_trips_user_profile_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: gomez
--

ALTER TABLE ONLY public.user_trips
    ADD CONSTRAINT user_trips_user_profile_id_fkey FOREIGN KEY (user_profile_id) REFERENCES public.user_profiles(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict kjec0MbpAT1hVSefSEAYZR1wi7vCqdL9Hp16QfcVyh5U1ihCDvlxcnM7AcKbIr7

