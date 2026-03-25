import Map "mo:core/Map";
import Float "mo:core/Float";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import Int "mo:core/Int";
import Bool "mo:core/Bool";
import Order "mo:core/Order";

actor {
  type MonumentData = {
    name : Text;
    city : Text;
    country : Text;
    latitude : Float;
    longitude : Float;
    description : Text;
    history : Text;
    category : Text;
    imageUrl : Text;
  };

  module MonumentData {
    public func compare(data1 : MonumentData, data2 : MonumentData) : Order.Order {
      switch (Text.compare(data1.name, data2.name)) {
        case (#equal) { Text.compare(data1.country, data2.country) };
        case (order) { order };
      };
    };
  };

  let monumentMap = Map.empty<Nat, MonumentData>();
  var monumentArray : [MonumentData] = [];

  func toRadian(degree : Float) : Float {
    degree * 3.14159265359 / 180.0;
  };

  func calculateDistance(lat1 : Float, lon1 : Float, lat2 : Float, lon2 : Float) : Float {
    let earthRadius = 6371.0;
    let deltaLat = toRadian(lat2 - lat1);
    let deltaLon = toRadian(lon2 - lon1);

    let a = Float.pow(Float.sin(deltaLat / 2.0), 2.0) +
            Float.cos(toRadian(lat1)) * Float.cos(toRadian(lat2)) * Float.pow(Float.sin(deltaLon / 2.0), 2.0);

    let c = 2.0 * Float.arctan2(Float.sqrt(a), Float.sqrt(1.0 - a));
    earthRadius * c;
  };

  public query func getAllMonuments() : async [MonumentData] {
    monumentArray.sort();
  };

  public query func searchMonuments(searchText : Text) : async [MonumentData] {
    let lowerSearchText = searchText.toLower();
    let filtered = monumentArray.filter(
      func(mon) {
        mon.name.toLower().contains(#text lowerSearchText) or
        mon.city.toLower().contains(#text lowerSearchText) or
        mon.country.toLower().contains(#text lowerSearchText)
      }
    );
    filtered;
  };

  public query func getMonumentsNear(lat : Float, lon : Float, radiusKm : Float) : async [MonumentData] {
    let filtered = monumentArray.filter(
      func(monument) {
        calculateDistance(lat, lon, monument.latitude, monument.longitude) <= radiusKm;
      }
    );
    filtered;
  };

  public query func getMonumentById(id : Nat) : async MonumentData {
    switch (monumentMap.get(id)) {
      case (null) { Runtime.trap("Monument not found") };
      case (?monument) { monument };
    };
  };

  // Seed data
  func initialize() {
    let monuments : [MonumentData] = [
      {
        name = "Great Pyramid of Giza";
        city = "Giza";
        country = "Egypt";
        latitude = 29.9792;
        longitude = 31.1342;
        description = "The only surviving wonder of the ancient world, the Great Pyramid of Giza is a massive stone structure built as a tomb for the Egyptian pharaoh Khufu.";
        history = "Constructed around 2560 BC, the pyramid was originally 146.6 meters tall and comprised more than 2.3 million blocks of limestone and granite. It served as a tomb for Khufu and was part of a larger complex that included two other major pyramids, smaller side pyramids, and the Great Sphinx.";
        category = "Ancient Wonder";
        imageUrl = "https://upload.wikimedia.org/wikipedia/commons/e/e3/Kheops-Pyramid.jpg";
      },
      {
        name = "Eiffel Tower";
        city = "Paris";
        country = "France";
        latitude = 48.8584;
        longitude = 2.2945;
        description = "A symbol of France, the Eiffel Tower is a wrought-iron lattice tower located on the Champ de Mars in Paris. It was constructed as the entrance to the 1889 World's Fair and is now one of the most recognizable structures in the world.";
        history = "The tower was designed by engineer Gustave Eiffel and took just over two years to build. It stood as the world's tallest man-made structure for 41 years (until 1930). The Eiffel Tower is 324 meters tall and weighs approximately 10,100 tons.";
        category = "Tower";
        imageUrl = "https://upload.wikimedia.org/wikipedia/commons/a/a8/Tour_Eiffel_Wikimedia_Commons.jpg";
      },
      {
        name = "Statue of Liberty";
        city = "New York";
        country = "United States";
        latitude = 40.6892;
        longitude = -74.0445;
        description = "Gifted by France in 1886, the Statue of Liberty is a neoclassical sculpture that stands on Liberty Island in New York Harbor. It symbolizes freedom and democracy.";
        history = "Designed by French sculptor Frédéric Auguste Bartholdi, the statue was shipped to New York in pieces and assembled on an iron framework designed by Gustave Eiffel. The torch-bearing Lady Liberty stands 93 meters tall from the ground to the tip of her torch.";
        category = "Statue";
        imageUrl = "https://upload.wikimedia.org/wikipedia/commons/a/a1/Statue_of_Liberty_7.jpg";
      },
      {
        name = "Taj Mahal";
        city = "Agra";
        country = "India";
        latitude = 27.1751;
        longitude = 78.0421;
        description = "The Taj Mahal is a white marble mausoleum built in the 17th century by Mughal emperor Shah Jahan in memory of his wife Mumtaz Mahal. It is known for its exquisite architecture and intricate carvings.";
        history = "Construction began in 1632 and took over 20 years to complete. The complex includes a mosque, guest house, and beautiful gardens. It stands as a testament to the Mughal Empire's architectural achievements and is a UNESCO World Heritage Site.";
        category = "Mausoleum";
        imageUrl = "https://upload.wikimedia.org/wikipedia/commons/d/da/Taj-Mahal.jpg";
      },
      {
        name = "Colosseum";
        city = "Rome";
        country = "Italy";
        latitude = 41.8902;
        longitude = 12.4922;
        description = "The Colosseum is an ancient Roman amphitheater that could hold between 50,000 and 80,000 spectators. It was originally used for gladiator contests and public spectacles.";
        history = "Construction began under Emperor Vespasian around 70-72 AD and was completed in 80 AD by his son, Titus. The Colosseum is the largest ancient amphitheater ever built and remains a symbol of Roman engineering and culture.";
        category = "Ancient Theater";
        imageUrl = "https://upload.wikimedia.org/wikipedia/commons/d/d8/Colosseo_2020.jpg";
      },
      {
        name = "Machu Picchu";
        city = "Cusco";
        country = "Peru";
        latitude = -13.1631;
        longitude = -72.5450;
        description = "Machu Picchu is an ancient Incan citadel located in the Andes Mountains. It's renowned for its sophisticated dry-stone walls and panoramic views.";
        history = "Built in the 15th century, Machu Picchu was abandoned during the Spanish Conquest. It remained largely unknown to the outside world until 1911, when American historian Hiram Bingham brought it to international attention.";
        category = "Ancient City";
        imageUrl = "https://upload.wikimedia.org/wikipedia/commons/e/eb/Machu_Picchu%2C_Peru.jpg";
      },
      {
        name = "Sydney Opera House";
        city = "Sydney";
        country = "Australia";
        latitude = -33.8568;
        longitude = 151.2153;
        description = "An architectural masterpiece, the Sydney Opera House is a multi-venue performing arts center with distinctive sail-like design. It is a symbol of Australia.";
        history = "Designed by Danish architect Jørn Utzon, construction began in 1959 and was completed in 1973. The structure contains multiple performance venues and is a UNESCO World Heritage Site.";
        category = "Theater";
        imageUrl = "https://upload.wikimedia.org/wikipedia/commons/8/88/Sydney_Opera_House_Sails.jpg";
      },
      {
        name = "Petra";
        city = "Wadi Musa";
        country = "Jordan";
        latitude = 30.3285;
        longitude = 35.4444;
        description = "Known as the Rose City, Petra is a historical and archaeological site famous for its rock-cut architecture and water conduit system.";
        history = "Petra was the capital of the Nabataean Kingdom in the 4th century BC. The city thrived due to trade until the Roman conquest in 106 AD. Rediscovered in 1812, it became a UNESCO World Heritage Site and is considered one of the new Seven Wonders of the World.";
        category = "Ancient City";
        imageUrl = "https://upload.wikimedia.org/wikipedia/commons/5/51/Petra_Jordan_BW_21.JPG";
      },
      {
        name = "Angkor Wat";
        city = "Siem Reap";
        country = "Cambodia";
        latitude = 13.4125;
        longitude = 103.8670;
        description = "Angkor Wat is a vast temple complex built in the early 12th century for King Suryavarman II. It is considered the largest religious structure ever constructed.";
        history = "Originally dedicated to the Hindu god Vishnu, Angkor Wat became a Buddhist temple in the 14th century. The site includes intricate bas-reliefs and towers. It's a symbol of Cambodia and appears on its national flag.";
        category = "Temple";
        imageUrl = "https://upload.wikimedia.org/wikipedia/commons/4/46/Angkor_Wat.jpg";
      },
      {
        name = "Christ the Redeemer";
        city = "Rio de Janeiro";
        country = "Brazil";
        latitude = -22.9519;
        longitude = -43.2106;
        description = "This iconic statue of Jesus Christ stands atop Mount Corcovado, overlooking Rio de Janeiro. It is a symbol of Christianity and welcome to visitors.";
        history = "Construction lasted from 1922 to 1931. The statue is 30 meters tall, not including its 8-meter pedestal, with arms stretching 28 meters wide. It is made of reinforced concrete and soapstone.";
        category = "Statue";
        imageUrl = "https://upload.wikimedia.org/wikipedia/commons/1/19/CristoRedentor2010.jpg";
      },
      {
        name = "Stonehenge";
        city = "Amesbury";
        country = "United Kingdom";
        latitude = 51.1789;
        longitude = -1.8262;
        description = "Stonehenge is a prehistoric monument made up of a ring of standing stones, each around 13 feet high and weighing approximately 25 tons.";
        history = "Believed to have been constructed between 3000 BC and 2000 BC, Stonehenge's purpose remains a mystery. It may have served as a burial ground, religious site, or astronomical observatory.";
        category = "Ancient Wonder";
        imageUrl = "https://upload.wikimedia.org/wikipedia/commons/d/d0/Stonehenge_2007_07_30.jpg";
      },
      {
        name = "Great Wall of China";
        city = "Beijing";
        country = "China";
        latitude = 40.4319;
        longitude = 116.5704;
        description = "The Great Wall of China is a series of fortifications built along the historical northern borders of China to protect against invasions.";
        history = "Construction began as early as the 7th century BC, with several walls later joined together and reinforced. The wall stretches over 21,000 kilometers and is one of the most impressive feats of engineering.";
        category = "Fortification";
        imageUrl = "https://upload.wikimedia.org/wikipedia/commons/9/99/Great_Wall_of_China_2010.jpg";
      },
      {
        name = "Hagia Sophia";
        city = "Istanbul";
        country = "Turkey";
        latitude = 41.0086;
        longitude = 28.9802;
        description = "Hagia Sophia is a former Greek Orthodox Christian basilica, later an imperial mosque, and now a museum. It is renowned for its massive dome and historical significance.";
        history = "Built in 537 AD under Byzantine Emperor Justinian I, Hagia Sophia has served as a cathedral, mosque, and museum. It remains one of the greatest surviving examples of Byzantine architecture.";
        category = "Cathedral";
        imageUrl = "https://upload.wikimedia.org/wikipedia/commons/3/32/Hagiahgm.jpg";
      },
      {
        name = "Alhambra";
        city = "Granada";
        country = "Spain";
        latitude = 37.1760;
        longitude = -3.5881;
        description = "The Alhambra is a palace and fortress complex constructed during the mid-13th century by Moorish rulers in Andalusia. It is known for its stunning Islamic architecture and gardens.";
        history = "Originally designed as a military area, it became a royal residence. The Alhambra is now a UNESCO World Heritage Site and one of Spain's most visited monuments.";
        category = "Palace";
        imageUrl = "https://upload.wikimedia.org/wikipedia/commons/f/f7/Alhambra_Granada_Spain.jpg";
      },
      {
        name = "Golden Gate Bridge";
        city = "San Francisco";
        country = "United States";
        latitude = 37.8199;
        longitude = -122.4783;
        description = "The Golden Gate Bridge is an iconic suspension bridge connecting San Francisco Bay and the Pacific Ocean. At the time of its completion in 1937, it was the longest and tallest suspension bridge in the world.";
        history = "Designed by engineer Joseph Strauss, the bridge spans 1.6 kilometers and stands 227 meters high. It is painted an internationally recognized orange color called 'International Orange'.";
        category = "Bridge";
        imageUrl = "https://upload.wikimedia.org/wikipedia/commons/0/0c/GoldenGateBridge-SF-CA.jpg";
      },
      {
        name = "Sagrada Familia";
        city = "Barcelona";
        country = "Spain";
        latitude = 41.4036;
        longitude = 2.1744;
        description = "The Sagrada Familia is a large Roman Catholic church designed by architect Antoni Gaudí, famous for its unique and intricate design.";
        history = "Construction began in 1882 and is still ongoing. Gaudí devoted the last 15 years of his life to the project. The basilica combines Gothic and curvilinear Art Nouveau forms and is a UNESCO World Heritage Site.";
        category = "Cathedral";
        imageUrl = "https://upload.wikimedia.org/wikipedia/commons/7/76/Sagrada_Familia_Barcelona_Spain.jpg";
      },
      {
        name = "Leaning Tower of Pisa";
        city = "Pisa";
        country = "Italy";
        latitude = 43.7230;
        longitude = 10.3966;
        description = "The Leaning Tower of Pisa is a freestanding bell tower known for its unintended tilt. It is one of the most recognized structures in the world.";
        history = "Construction began in 1173, and the tilt began during the building of the second floor. Efforts to stabilize and reduce the tilt have been successful, preserving the tower for future generations.";
        category = "Tower";
        imageUrl = "https://upload.wikimedia.org/wikipedia/commons/2/2e/Pisa_Tower.jpg";
      },
      {
        name = "Acropolis of Athens";
        city = "Athens";
        country = "Greece";
        latitude = 37.9715;
        longitude = 23.7267;
        description = "The Acropolis is an ancient citadel containing several buildings of historical significance, the most famous being the Parthenon.";
        history = "Built during the 5th century BC, the Acropolis served as a religious and cultural center. The Parthenon was dedicated to the goddess Athena and is regarded as a masterpiece of Greek architecture.";
        category = "Ancient City";
        imageUrl = "https://upload.wikimedia.org/wikipedia/commons/9/9c/AcropolisAthens.jpg";
      },
      {
        name = "Mount Rushmore";
        city = "Keystone";
        country = "United States";
        latitude = 43.8791;
        longitude = -103.4591;
        description = "Mount Rushmore features the 60-foot heads of four U.S. presidents carved into granite. It is a symbol of American history and achievement.";
        history = "Sculpted by Gutzon Borglum and his son Lincoln, the project took 14 years to complete (1927-1941). The monument depicts George Washington, Thomas Jefferson, Theodore Roosevelt, and Abraham Lincoln.";
        category = "Statue";
        imageUrl = "https://upload.wikimedia.org/wikipedia/commons/6/68/MountRushmore.jpg";
      },
      {
        name = "Burj Khalifa";
        city = "Dubai";
        country = "United Arab Emirates";
        latitude = 25.1972;
        longitude = 55.2744;
        description = "Burj Khalifa is the tallest structure and building in the world since its completion in 2010, standing 828 meters tall.";
        history = "Construction began in 2004 and took six years. The building includes residential apartments, offices, and the Armani Hotel. It has the highest observation deck in the world.";
        category = "Skyscraper";
        imageUrl = "https://upload.wikimedia.org/wikipedia/commons/9/93/Burj_Khalifa.jpg";
      },
      {
        name = "Chichen Itza";
        city = "Yucatán";
        country = "Mexico";
        latitude = 20.6843;
        longitude = -88.5678;
        description = "Chichen Itza is a large pre-Columbian archaeological site built by the Maya civilization. It's known for its step pyramid, El Castillo.";
        history = "Founded around 600 AD, the city flourished until the end of the first millennium. The supreme architectural achievements of the Maya-Toltec mix can be seen in the pyramid, feathered serpent carvings, and observatory.";
        category = "Ancient City";
        imageUrl = "https://upload.wikimedia.org/wikipedia/commons/5/5e/Chichen_Itza.jpg";
      },
      {
        name = "Buckingham Palace";
        city = "London";
        country = "United Kingdom";
        latitude = 51.5014;
        longitude = -0.1419;
        description = "The official London residence and administrative headquarters of the British monarch. It's known for its beautiful gardens and ceremonial Changing of the Guard.";
        history = "Acquired by King George III in 1761, Buckingham Palace became the monarch's official residence in 1837. The palace has 775 rooms and a 40-acre garden.";
        category = "Palace";
        imageUrl = "https://upload.wikimedia.org/wikipedia/commons/8/8d/Buckingham_Palace_London.jpg";
      },
      {
        name = "Neuschwanstein Castle";
        city = "Hohenschwangau";
        country = "Germany";
        latitude = 47.5576;
        longitude = 10.7498;
        description = "Neuschwanstein Castle is a 19th-century Romanesque Revival castle commissioned by Ludwig II of Bavaria. It's famous for its picturesque mountain backdrop and fairy-tale design.";
        history = "Construction began in 1869 but was never fully completed. The castle has influenced depictions of castles in Disney movies and remains one of the most visited castles in Europe.";
        category = "Castle";
        imageUrl = "https://upload.wikimedia.org/wikipedia/commons/9/9d/Schloss_Neuschwanstein_Luftbild_August_2011.jpg";
      },
      {
        name = "Dubai Frame";
        city = "Dubai";
        country = "United Arab Emirates";
        latitude = 25.2334;
        longitude = 55.2896;
        description = "The Dubai Frame is a remarkable architectural landmark designed to look like a giant picture frame. It offers panoramic views of both modern and old Dubai.";
        history = "Standing 150 meters tall, the Dubai Frame was completed in 2018. It quickly became one of the city's most popular attractions.";
        category = "Modern Architecture";
        imageUrl = "https://upload.wikimedia.org/wikipedia/commons/0/02/Dubai_Frame.jpg";
      },
      {
        name = "Pyramids of Meroë";
        city = "Bagrawiyah";
        country = "Sudan";
        latitude = 16.9366;
        longitude = 33.7531;
        description = "The Pyramids of Meroë are ancient Nubian structures built between 800 BC and 350 AD, featuring steeper sides than Egyptian pyramids.";
        history = "Located in the ancient city of Meroë, these pyramids served as tombs for the kings and queens of the Kushite Kingdom. Over 200 pyramids remain today.";
        category = "Ancient Wonder";
        imageUrl = "https://upload.wikimedia.org/wikipedia/commons/5/5c/Meroe_Pyramids.jpg";
      },
      {
        name = "Sphinx";
        city = "Giza";
        country = "Egypt";
        latitude = 29.9753;
        longitude = 31.1376;
        description = "A massive limestone statue featuring a mythical creature with a lion's body and a human head, the Sphinx is one of the world's largest and oldest statues.";
        history = "Believed to have been built around 2500 BC for the pharaoh Khafre. The Sphinx stands 20 meters high and 73 meters long and is part of the overall Giza pyramid complex.";
        category = "Ancient Wonder";
        imageUrl = "https://upload.wikimedia.org/wikipedia/commons/3/34/Sphinx%2C_Giza%2C_Egypt.jpg";
      },
      {
        name = "Guggenheim Museum Bilbao";
        city = "Bilbao";
        country = "Spain";
        latitude = 43.2686;
        longitude = -2.9344;
        description = "A contemporary art museum designed by architect Frank Gehry and opened in 1997. The Guggenheim Museum has become an architectural landmark and tourist destination.";
        history = "The museum is known for its innovative architecture, featuring titanium curves and unique design. It helped transform Bilbao into a modern cultural hub.";
        category = "Museum";
        imageUrl = "https://upload.wikimedia.org/wikipedia/commons/2/2b/Guggenheim_Bilbao_Museum.jpg";
      },
      {
        name = "Prambanan Temple";
        city = "Central Java";
        country = "Indonesia";
        latitude = -7.7521;
        longitude = 110.4918;
        description = "Prambanan is a 9th-century Hindu temple compound dedicated to the Trimurti: Brahma, Vishnu, and Shiva.";
        history = "The largest Hindu temple site in Indonesia, it consists of 240 temples. Prambanan was designated a UNESCO World Heritage Site in 1991.";
        category = "Temple";
        imageUrl = "https://upload.wikimedia.org/wikipedia/commons/f/fa/Prambanan_Temple_on_Java_Island.jpg";
      },
      {
        name = "Himeji Castle";
        city = "Himeji";
        country = "Japan";
        latitude = 34.8394;
        longitude = 134.6939;
        description = "Himeji Castle is a stunning Japanese castle complex known for its brilliant white exterior and elegant architecture.";
        history = "Originally built in the 14th century, the castle survived the bombings of World War II and numerous earthquakes. It is considered Japan's most spectacular surviving castle.";
        category = "Castle";
        imageUrl = "https://upload.wikimedia.org/wikipedia/commons/2/2c/Himeji_Castle_over_road.jpg";
      },
      {
        name = "Easter Island Moai";
        city = "Hanga Roa";
        country = "Chile";
        latitude = -27.1127;
        longitude = -109.3497;
        description = "The Moai of Easter Island are monolithic human figures carved by the Rapa Nui people. Over 900 statues remain scattered across the island.";
        history = "Created between 1250 and 1500 AD, the purpose of the statues is still debated. The Moai are believed to represent ancestors and were created using volcanic tuff.";
        category = "Statue";
        imageUrl = "https://upload.wikimedia.org/wikipedia/commons/c/c0/Easter_Island_Moai.jpg";
      },
      {
        name = "La Sagrada Familia";
        city = "Barcelona";
        country = "Spain";
        latitude = 41.4036;
        longitude = 2.1744;
        description = "La Sagrada Familia is a large Roman Catholic church designed by Catalan architect Antoni Gaudí. It's known for its distinctive design and towering spires.";
        history = "Construction began in 1882, with Gaudí taking over the project in 1883. The church is still under construction and has become a symbol of Barcelona.";
        category = "Cathedral";
        imageUrl = "https://upload.wikimedia.org/wikipedia/commons/5/5b/Sagrada_Familia.jpg";
      },
      {
        name = "Auckland Sky Tower";
        city = "Auckland";
        country = "New Zealand";
        latitude = -36.8484;
        longitude = 174.7622;
        description = "The Sky Tower is an observation and telecommunications tower that offers panoramic views of Auckland and beyond. It features a revolving restaurant and bungee jumping from the top.";
        history = "Construction began in 1994 and was completed in 1997. At 328 meters, the Sky Tower is the tallest man-made structure in the Southern Hemisphere.";
        category = "Tower";
        imageUrl = "https://upload.wikimedia.org/wikipedia/commons/4/4a/Auckland_SkyTower.jpg";
      },
      {
        name = "Lisbon Belém Tower";
        city = "Lisbon";
        country = "Portugal";
        latitude = 38.6916;
        longitude = -9.2152;
        description = "The Belém Tower is a fortified tower located in the civil parish of Santa Maria de Belém in Lisbon, Portugal. It is considered a symbol of Portugal's age of exploration.";
        history = "Built in the early 16th century, the tower served as a point of embarkation and disembarkation for Portuguese explorers. It is a UNESCO World Heritage Site.";
        category = "Fortification";
        imageUrl = "https://upload.wikimedia.org/wikipedia/commons/7/72/Belem_Tower_Lisbon.jpg";
      },
      {
        name = "Independence Hall";
        city = "Philadelphia";
        country = "United States";
        latitude = 39.9489;
        longitude = -75.1500;
        description = "Independence Hall is a historic building where both the United States Declaration of Independence and the US Constitution were debated and adopted.";
        history = "Constructed between 1732 and 1753, Independence Hall is a UNESCO World Heritage Site and a symbol of American democracy.";
        category = "Historic Building";
        imageUrl = "https://upload.wikimedia.org/wikipedia/commons/f/f1/Independence_Hall.agr.jpg";
      },
      {
        name = "Table Mountain";
        city = "Cape Town";
        country = "South Africa";
        latitude = -33.9570;
        longitude = 18.4038;
        description = "Table Mountain is a flat-topped mountain forming a prominent landmark overlooking the city of Cape Town. It is a popular tourist destination and a UNESCO World Heritage Site.";
        history = "The mountain is estimated to be over 260 million years old. It is a symbol of Cape Town and offers unique flora, fauna, and spectacular views.";
        category = "Natural Wonder";
        imageUrl = "https://upload.wikimedia.org/wikipedia/commons/a/a5/TableMountainCapeTown.jpg";
      },
    ];

    for (i : Nat in monuments.keys()) {
      if (monumentMap.containsKey(i)) { Runtime.trap("Duplicate monument id: " # i.toText()) };

      monumentMap.add(i, monuments[i]);
      monumentArray := monumentArray.concat(Array.singleton(monuments[i]));
    };
  };

  initialize();
};
