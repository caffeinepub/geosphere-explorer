import type { Monument } from "../types";

export const LOCAL_MONUMENTS: Monument[] = [
  {
    id: 1,
    name: "Eiffel Tower",
    city: "Paris",
    country: "France",
    latitude: 48.8584,
    longitude: 2.2945,
    category: "Tower",
    description:
      "The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France. It is named after the engineer Gustave Eiffel, whose company designed and built the tower from 1887 to 1889.",
    history:
      "Built as a temporary exhibit for the 1889 World's Fair, the Eiffel Tower was initially criticized by French artists and intellectuals but has become a global cultural icon of France.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg/405px-Tour_Eiffel_Wikimedia_Commons_%28cropped%29.jpg",
  },
  {
    id: 2,
    name: "Taj Mahal",
    city: "Agra",
    country: "India",
    latitude: 27.1751,
    longitude: 78.0421,
    category: "Mausoleum",
    description:
      "The Taj Mahal is an ivory-white marble mausoleum on the right bank of the river Yamuna in Agra, India. It was commissioned in 1631 by the Mughal emperor Shah Jahan to house the tomb of his beloved wife Mumtaz Mahal.",
    history:
      "Built between 1631 and 1648, the Taj Mahal is considered one of the finest examples of Mughal architecture and is a UNESCO World Heritage Site.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Taj_Mahal_%28Edited%29.jpeg/1200px-Taj_Mahal_%28Edited%29.jpeg",
  },
  {
    id: 3,
    name: "Great Wall of China",
    city: "Beijing",
    country: "China",
    latitude: 40.4319,
    longitude: 116.5704,
    category: "Ancient Wonder",
    description:
      "The Great Wall of China is a series of walls and fortifications that were built across the northern borders of ancient Chinese states.",
    history:
      "Construction of the wall began in the 7th century BC and continued for centuries. The most well-known sections were built during the Ming dynasty (1368–1644).",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/20090529-great-wall.jpg/1200px-20090529-great-wall.jpg",
  },
  {
    id: 4,
    name: "Colosseum",
    city: "Rome",
    country: "Italy",
    latitude: 41.8902,
    longitude: 12.4922,
    category: "Ancient Wonder",
    description:
      "The Colosseum is an oval amphitheatre in the centre of Rome, Italy. It is the largest ancient amphitheatre ever built and is still the largest standing amphitheatre in the world.",
    history:
      "Construction began under Emperor Vespasian in AD 72 and was completed in AD 80 under his son Titus. It could hold between 50,000 and 80,000 spectators.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Colosseo_2020.jpg/1200px-Colosseo_2020.jpg",
  },
  {
    id: 5,
    name: "Machu Picchu",
    city: "Cusco",
    country: "Peru",
    latitude: -13.1631,
    longitude: -72.545,
    category: "Ancient Wonder",
    description:
      "Machu Picchu is a 15th-century Inca citadel located in the Eastern Cordillera of southern Peru on a 2,430-metre mountain ridge.",
    history:
      "Built in the classical Inca style, with polished dry-stone walls. Machu Picchu was built around 1450 and abandoned a century later during the Spanish conquest.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Machu_Picchu%2C_Peru.jpg/1200px-Machu_Picchu%2C_Peru.jpg",
  },
  {
    id: 6,
    name: "Statue of Liberty",
    city: "New York City",
    country: "USA",
    latitude: 40.6892,
    longitude: -74.0445,
    category: "Statue",
    description:
      "The Statue of Liberty is a colossal neoclassical sculpture on Liberty Island in New York Harbor. It was a gift from France to the United States.",
    history:
      "Dedicated on October 28, 1886, the statue was designed by French sculptor Frédéric Auguste Bartholdi, and its metal framework was built by Alexandre Gustave Eiffel.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Statue_of_Liberty_7.jpg/800px-Statue_of_Liberty_7.jpg",
  },
  {
    id: 7,
    name: "Sydney Opera House",
    city: "Sydney",
    country: "Australia",
    latitude: -33.8568,
    longitude: 151.2153,
    category: "Architecture",
    description:
      "The Sydney Opera House is a multi-venue performing arts centre in Sydney. It is one of the 20th century's most distinctive buildings.",
    history:
      "Designed by Danish architect Jørn Utzon, construction began in 1959 and was completed in 1973. It became a UNESCO World Heritage Site in 2007.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Sydney_Australia._(21339175489).jpg/1200px-Sydney_Australia._(21339175489).jpg",
  },
  {
    id: 8,
    name: "Big Ben",
    city: "London",
    country: "United Kingdom",
    latitude: 51.5007,
    longitude: -0.1246,
    category: "Tower",
    description:
      "Big Ben is the nickname for the Great Bell of the striking clock at the north end of the Palace of Westminster in London.",
    history:
      "The Elizabeth Tower was completed in 1859. Big Ben refers to the main bell, weighing over 13 tonnes.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Clock_Tower_-_Palace_of_Westminster%2C_London_-_May_2007_icon.png/800px-Clock_Tower_-_Palace_of_Westminster%2C_London_-_May_2007_icon.png",
  },
  {
    id: 9,
    name: "Sagrada Familia",
    city: "Barcelona",
    country: "Spain",
    latitude: 41.4036,
    longitude: 2.1744,
    category: "Church",
    description:
      "The Basílica de la Sagrada Família is a large unfinished Roman Catholic minor basilica in Barcelona, Spain, designed by architect Antoni Gaudí.",
    history:
      "Construction began in 1882 and is still ongoing. Gaudí devoted the last years of his life to the project.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Sagrada_Familia_01.jpg/800px-Sagrada_Familia_01.jpg",
  },
  {
    id: 10,
    name: "Pyramids of Giza",
    city: "Cairo",
    country: "Egypt",
    latitude: 29.9792,
    longitude: 31.1342,
    category: "Ancient Wonder",
    description:
      "The Pyramids of Giza are ancient Egyptian pyramids located in Giza, Egypt. The oldest of the Seven Wonders of the Ancient World.",
    history:
      "Built over 4,500 years ago, the Great Pyramid was built for Pharaoh Khufu around 2560 BC. It remained the tallest man-made structure for over 3,800 years.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Kheops-Pyramid.jpg/1200px-Kheops-Pyramid.jpg",
  },
  {
    id: 11,
    name: "Christ the Redeemer",
    city: "Rio de Janeiro",
    country: "Brazil",
    latitude: -22.9519,
    longitude: -43.2105,
    category: "Statue",
    description:
      "Christ the Redeemer is an Art Deco statue of Jesus Christ in Rio de Janeiro, Brazil. It stands 30 metres tall, not including its 8-metre pedestal.",
    history:
      "The statue was constructed between 1922 and 1931. It is the largest Art Deco statue in the world and one of the New Seven Wonders of the World.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Christ_the_Redeemer_-_Cristo_Redentor.jpg/800px-Christ_the_Redeemer_-_Cristo_Redentor.jpg",
  },
  {
    id: 12,
    name: "Angkor Wat",
    city: "Siem Reap",
    country: "Cambodia",
    latitude: 13.4125,
    longitude: 103.8667,
    category: "Temple",
    description:
      "Angkor Wat is a Hindu-Buddhist temple complex and the world's largest religious monument, located in Siem Reap, Cambodia.",
    history:
      "Built in the 12th century by Emperor Suryavarman II, it was originally dedicated to the Hindu god Vishnu before gradually converting to Buddhism.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Angkor_Wat_as_seen_from_the_top_of_Phnom_Bakheng.jpg/1200px-Angkor_Wat_as_seen_from_the_top_of_Phnom_Bakheng.jpg",
  },
  {
    id: 13,
    name: "Burj Khalifa",
    city: "Dubai",
    country: "UAE",
    latitude: 25.1972,
    longitude: 55.2744,
    category: "Tower",
    description:
      "The Burj Khalifa is a skyscraper in Dubai, UAE. With a total height of 829.8 m, it is the tallest structure and building in the world.",
    history:
      "Construction began in 2004 and was completed in 2009. Named after the ruler of Abu Dhabi and UAE president Khalifa bin Zayed Al Nahyan.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/thumb/9/93/Burj_Khalifa.jpg/800px-Burj_Khalifa.jpg",
  },
  {
    id: 14,
    name: "Acropolis of Athens",
    city: "Athens",
    country: "Greece",
    latitude: 37.9715,
    longitude: 23.7269,
    category: "Ancient Wonder",
    description:
      "The Acropolis of Athens is an ancient citadel located on a rocky outcrop above the city of Athens, containing the remains of several ancient buildings.",
    history:
      "The most famous building is the Parthenon, built in the 5th century BC. The Acropolis was inscribed as a UNESCO World Heritage Site in 1987.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/The_Parthenon_in_Athens.jpg/1200px-The_Parthenon_in_Athens.jpg",
  },
  {
    id: 15,
    name: "Stonehenge",
    city: "Wiltshire",
    country: "United Kingdom",
    latitude: 51.1789,
    longitude: -1.8262,
    category: "Ancient Wonder",
    description:
      "Stonehenge is a prehistoric monument on Salisbury Plain in Wiltshire, England. It consists of a ring of standing stones.",
    history:
      "Archaeologists believe it was built from 3000 BC to 2000 BC. Its purpose remains unclear but it may have been used as a burial ground or religious site.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Stonehenge2007_07_30.jpg/1200px-Stonehenge2007_07_30.jpg",
  },
  {
    id: 16,
    name: "Petra",
    city: "Ma'an",
    country: "Jordan",
    latitude: 30.3285,
    longitude: 35.4444,
    category: "Ancient Wonder",
    description:
      "Petra is a famous archaeological city in southern Jordan, known for its rock-cut architecture and water conduit system. Also known as the Rose City.",
    history:
      "Established possibly as early as the 4th century BC, Petra served as the capital of the Nabataean Kingdom. It was later annexed by Rome in 106 AD.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Petra_Jordan_BW_21.JPG/1200px-Petra_Jordan_BW_21.JPG",
  },
  {
    id: 17,
    name: "Alhambra",
    city: "Granada",
    country: "Spain",
    latitude: 37.176,
    longitude: -3.5881,
    category: "Palace",
    description:
      "The Alhambra is a palace and fortress complex in Granada, Andalusia, Spain. It was originally constructed as a military fortress in 889 CE.",
    history:
      "The complex was built primarily during the Nasrid dynasty from the 13th to 15th centuries. It became a UNESCO World Heritage Site in 1984.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Alhambra_evening_panorama_Mirador_San_Nicolas_sRGB-1.jpg/1200px-Alhambra_evening_panorama_Mirador_San_Nicolas_sRGB-1.jpg",
  },
  {
    id: 18,
    name: "Leaning Tower of Pisa",
    city: "Pisa",
    country: "Italy",
    latitude: 43.723,
    longitude: 10.3966,
    category: "Tower",
    description:
      "The Leaning Tower of Pisa is the campanile, or freestanding bell tower, of the cathedral of the Italian city of Pisa, known worldwide for its nearly four-degree lean.",
    history:
      "Construction began in 1173 and took about 200 years to complete. The lean began during construction and worsened until the 20th century when restoration work stabilized it.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Leaning_tower_of_pisa_2.jpg/800px-Leaning_tower_of_pisa_2.jpg",
  },
  {
    id: 19,
    name: "Hagia Sophia",
    city: "Istanbul",
    country: "Turkey",
    latitude: 41.0086,
    longitude: 28.9802,
    category: "Church",
    description:
      "Hagia Sophia is a Late Antique place of worship in Istanbul. Built as a cathedral, it later became a mosque and is now a museum.",
    history:
      "Originally built as a Greek Orthodox Christian cathedral in 537 AD, it became a mosque after the Ottoman conquest in 1453, and was converted to a museum in 1934.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Hagia_Sophia_Mars_2013.jpg/1200px-Hagia_Sophia_Mars_2013.jpg",
  },
  {
    id: 20,
    name: "Golden Gate Bridge",
    city: "San Francisco",
    country: "USA",
    latitude: 37.8199,
    longitude: -122.4783,
    category: "Bridge",
    description:
      "The Golden Gate Bridge is a suspension bridge spanning the Golden Gate, the opening of the San Francisco Bay into the Pacific Ocean.",
    history:
      "Construction of the bridge began in 1933 and was completed in 1937. It was the longest and tallest suspension bridge in the world at the time of its opening.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/GoldenGateBridge-001.jpg/1200px-GoldenGateBridge-001.jpg",
  },
  {
    id: 21,
    name: "Mount Fuji",
    city: "Shizuoka",
    country: "Japan",
    latitude: 35.3606,
    longitude: 138.7274,
    category: "Natural Wonder",
    description:
      "Mount Fuji is the highest mountain in Japan at 3,776 metres. It is an active stratovolcano and a sacred site in Japanese culture.",
    history:
      "Mount Fuji has been a sacred mountain since ancient times and was inscribed as a UNESCO World Heritage Site in 2013. It was first climbed in 663 AD.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/080103_hakkai_fuji.jpg/1200px-080103_hakkai_fuji.jpg",
  },
  {
    id: 22,
    name: "Neuschwanstein Castle",
    city: "Bavaria",
    country: "Germany",
    latitude: 47.5576,
    longitude: 10.7498,
    category: "Castle",
    description:
      "Neuschwanstein Castle is a 19th-century historicist palace on a rugged hill above the village of Hohenschwangau in Bavaria.",
    history:
      "Commissioned by King Ludwig II of Bavaria in 1868, the castle was intended as a personal refuge but became one of the most visited castles in Europe.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Schloss_Neuschwanstein_2013.jpg/1200px-Schloss_Neuschwanstein_2013.jpg",
  },
  {
    id: 23,
    name: "Chichen Itza",
    city: "Yucatan",
    country: "Mexico",
    latitude: 20.6843,
    longitude: -88.5678,
    category: "Ancient Wonder",
    description:
      "Chichen Itza was a large pre-Columbian city built by the Maya people of the Terminal Classic period.",
    history:
      "One of the largest Maya cities, it was a major focal point in the Northern Maya Lowlands from the Late Classic through the Terminal Classic periods.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/El_Castillo_at_Chichen_Itza.jpg/1200px-El_Castillo_at_Chichen_Itza.jpg",
  },
  {
    id: 24,
    name: "Santorini",
    city: "Santorini",
    country: "Greece",
    latitude: 36.3932,
    longitude: 25.4615,
    category: "Natural Wonder",
    description:
      "Santorini is a Greek island known for its stunning volcanic caldera, white-washed buildings with blue domes, and spectacular sunsets.",
    history:
      "One of the Cyclades islands, Santorini was the site of one of the largest volcanic eruptions in recorded history around 1600 BC.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Santorini_sunset.jpg/1200px-Santorini_sunset.jpg",
  },
  {
    id: 25,
    name: "Niagara Falls",
    city: "Ontario",
    country: "Canada",
    latitude: 43.0896,
    longitude: -79.0849,
    category: "Natural Wonder",
    description:
      "Niagara Falls is a group of three waterfalls at the southern end of Niagara Gorge, spanning the border between Ontario, Canada and New York, USA.",
    history:
      "The falls formed about 12,000 years ago as glacial meltwater carved the gorge. They have been a major tourist attraction since the 19th century.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/All_three_Niagara_Falls_American_falls%2C_Bridal_Veil_falls_%26_Horseshoe_falls%2C_air_view.jpg/1200px-All_three_Niagara_Falls_American_falls%2C_Bridal_Veil_falls_%26_Horseshoe_falls%2C_air_view.jpg",
  },
  {
    id: 26,
    name: "Forbidden City",
    city: "Beijing",
    country: "China",
    latitude: 39.9163,
    longitude: 116.3972,
    category: "Palace",
    description:
      "The Forbidden City is a palace complex in central Beijing that served as the home of Chinese emperors and their households for nearly 500 years.",
    history:
      "Built from 1406 to 1420, it was the ceremonial and political center of Chinese government for the Ming and Qing dynasties.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Forbidden_City_in_2011_-_panoramio.jpg/1200px-Forbidden_City_in_2011_-_panoramio.jpg",
  },
  {
    id: 27,
    name: "Louvre Museum",
    city: "Paris",
    country: "France",
    latitude: 48.8606,
    longitude: 2.3376,
    category: "Museum",
    description:
      "The Louvre is the world's most-visited art museum and a historic monument in Paris. It is home to the Mona Lisa.",
    history:
      "Originally built as a fortress in the late 12th century, it became a royal palace and later a museum opened to the public in 1793.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Louvre_Pyramid.jpg/1200px-Louvre_Pyramid.jpg",
  },
  {
    id: 28,
    name: "Vatican City",
    city: "Rome",
    country: "Italy",
    latitude: 41.9022,
    longitude: 12.4539,
    category: "Church",
    description:
      "Vatican City is an independent city-state enclaved within Rome, and is the headquarters of the Roman Catholic Church.",
    history:
      "The Holy See has been in Rome since the 1st century AD. Vatican City as a state was established by the Lateran Treaty in 1929.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Basilica_di_San_Pietro_in_Vaticano_September_2015-1a.jpg/1200px-Basilica_di_San_Pietro_in_Vaticano_September_2015-1a.jpg",
  },
  {
    id: 29,
    name: "Kremlin",
    city: "Moscow",
    country: "Russia",
    latitude: 55.752,
    longitude: 37.6175,
    category: "Palace",
    description:
      "The Moscow Kremlin is a fortified complex in the center of Moscow, overlooking the Moskva River.",
    history:
      "The Kremlin has served as the seat of power of Russia for centuries. Its current walls and towers were built from 1485 to 1495.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Moscow_July_2011-4.jpg/1200px-Moscow_July_2011-4.jpg",
  },
  {
    id: 30,
    name: "Sphinx of Giza",
    city: "Cairo",
    country: "Egypt",
    latitude: 29.9753,
    longitude: 31.1376,
    category: "Ancient Wonder",
    description:
      "The Great Sphinx of Giza is a limestone statue of a reclining sphinx with a human face, believed to represent Pharaoh Khafre.",
    history:
      "Believed to have been built during the reign of Pharaoh Khafre around 2500 BC, it is one of the largest and oldest monolithic statues in the world.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Front_of_the_Sphinx.jpg/1200px-Front_of_the_Sphinx.jpg",
  },
  {
    id: 31,
    name: "Colossus of Rhodes",
    city: "Rhodes",
    country: "Greece",
    latitude: 36.451,
    longitude: 28.2278,
    category: "Ancient Wonder",
    description:
      "Rhodes is a Greek island known for its Medieval Old Town and the ancient Colossus, one of the Seven Wonders of the Ancient World.",
    history:
      "The Colossus stood at the entrance of the harbor from 280 BC until it was toppled by an earthquake in 226 BC.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Rhodos_Old_Town_%281%29.jpg/1200px-Rhodos_Old_Town_%281%29.jpg",
  },
  {
    id: 32,
    name: "Uluru",
    city: "Northern Territory",
    country: "Australia",
    latitude: -25.3444,
    longitude: 131.0369,
    category: "Natural Wonder",
    description:
      "Uluru, also known as Ayers Rock, is a large sandstone formation in the southern part of the Northern Territory in central Australia.",
    history:
      "Sacred to the Anangu people for tens of thousands of years, Uluru is a UNESCO World Heritage Site and a symbol of Aboriginal culture.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Uluru_Australia_%281%29.jpg/1200px-Uluru_Australia_%281%29.jpg",
  },
  {
    id: 33,
    name: "Versailles Palace",
    city: "Versailles",
    country: "France",
    latitude: 48.8049,
    longitude: 2.1204,
    category: "Palace",
    description:
      "The Palace of Versailles was the principal royal residence of France from 1682 until 1789. It is known for the Hall of Mirrors.",
    history:
      "Constructed in the 17th century by King Louis XIV, it became the center of French political power for over a century.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Versailles_Palace_2014.jpg/1200px-Versailles_Palace_2014.jpg",
  },
  {
    id: 34,
    name: "Borobudur Temple",
    city: "Magelang",
    country: "Indonesia",
    latitude: -7.6079,
    longitude: 110.2038,
    category: "Temple",
    description:
      "Borobudur is a 9th-century Mahayana Buddhist temple in Central Java, Indonesia. It is the world's largest Buddhist temple.",
    history:
      "Built during the reign of the Syailendra dynasty around 800 AD, it was rediscovered in the 19th century and restored in the 1970s.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Borobudur-Nothwest-view.jpg/1200px-Borobudur-Nothwest-view.jpg",
  },
  {
    id: 35,
    name: "Moai Statues",
    city: "Easter Island",
    country: "Chile",
    latitude: -27.1127,
    longitude: -109.3497,
    category: "Ancient Wonder",
    description:
      "The Moai are monolithic human figures carved by the Rapa Nui people on Easter Island between the 13th and 16th centuries.",
    history:
      "About 900 Moai were carved from compressed volcanic ash. They are believed to represent deified ancestors.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Moai_Rano_raraku.jpg/1200px-Moai_Rano_raraku.jpg",
  },
  {
    id: 36,
    name: "Pisa Cathedral",
    city: "Pisa",
    country: "Italy",
    latitude: 43.7231,
    longitude: 10.3958,
    category: "Church",
    description:
      "The Cathedral of Pisa is a medieval Roman Catholic cathedral dedicated to the Assumption of the Virgin Mary.",
    history:
      "Construction began in 1063 and was completed in 1118. It is a magnificent example of Romanesque architecture.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Piazza_dei_Miracoli_-_Pisa_%28Italy%29.jpg/1200px-Piazza_dei_Miracoli_-_Pisa_%28Italy%29.jpg",
  },
  {
    id: 37,
    name: "Iguazu Falls",
    city: "Misiones",
    country: "Argentina",
    latitude: -25.6953,
    longitude: -54.4367,
    category: "Natural Wonder",
    description:
      "Iguazu Falls is a system of waterfalls of the Iguazu River on the border of Argentina and Brazil. It is one of the world's largest waterfalls.",
    history:
      "Discovered by Spanish conquistador Álvar Núñez Cabeza de Vaca in 1541, the falls became a UNESCO World Heritage Site in 1984.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Iguaz%C3%BA_-_Cataratas_del_Iguaz%C3%BA_-_20100206-02.jpg/1200px-Iguaz%C3%BA_-_Cataratas_del_Iguaz%C3%BA_-_20100206-02.jpg",
  },
  {
    id: 38,
    name: "Notre-Dame Cathedral",
    city: "Paris",
    country: "France",
    latitude: 48.853,
    longitude: 2.3499,
    category: "Church",
    description:
      "Notre-Dame de Paris is a medieval Catholic cathedral on the Île de la Cité in Paris. It is considered one of the finest examples of French Gothic architecture.",
    history:
      "Construction began in 1163 and was largely complete by 1345. It survived the French Revolution and a devastating fire in 2019 that destroyed its spire.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Notre_Dame_de_Paris.jpg/800px-Notre_Dame_de_Paris.jpg",
  },
  {
    id: 39,
    name: "Acropolis Museum",
    city: "Athens",
    country: "Greece",
    latitude: 37.9686,
    longitude: 23.7278,
    category: "Museum",
    description:
      "The Acropolis Museum is an archaeological museum focused on the findings of the archaeological site of the Acropolis of Athens.",
    history:
      "Opened in 2009, it is built on the archaeological site of ancient Athens and houses artifacts from the Acropolis.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Athens_-_Acropolis_Museum_-_20060901.jpg/1200px-Athens_-_Acropolis_Museum_-_20060901.jpg",
  },
  {
    id: 40,
    name: "Shwedagon Pagoda",
    city: "Yangon",
    country: "Myanmar",
    latitude: 16.7985,
    longitude: 96.1499,
    category: "Temple",
    description:
      "The Shwedagon Pagoda is a gilded stupa located in Yangon, Myanmar. It is the most sacred Buddhist pagoda in Myanmar.",
    history:
      "Believed to be 2,500 years old, the pagoda is said to enshrine strands of the Buddha's hair and other sacred relics.",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Shwedagon_Pagoda%2C_Rangoon%2C_Burma.jpg/1200px-Shwedagon_Pagoda%2C_Rangoon%2C_Burma.jpg",
  },
];
