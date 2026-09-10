/* Sources: CL Activity Sheet 1, Quizzes 1 & 2, Reflection Logs 1 & 2,
   Baptism review screenshots. Open writing is intentionally unscored. */
(function(){
  const mc=(q,choices,answer,why,emoji='✝️')=>({type:'mc',q,choices,answer,why,emoji});
  const tf=(q,answer,why,emoji='💭')=>({type:'tf',q,answer,why,emoji});
  REVIEWER.register({id:'cl-1t',subject:'cl',title:'Christian Living 2',subtitle:'1st Trimester · Faith in action',topics:[
    {id:'baptism',title:'Baptism & belonging',emoji:'💧',intro:'Think about the sacrament, its signs, and becoming a member of the Church.',questions:[
      mc('What is the first sacrament we receive?',['Confirmation','Baptism','Anointing of the Sick'],1,'Baptism begins our life as members of the Church.','💧'),
      mc('Which sacrament cleanses us from original sin and makes us members of the Church?',['Baptism','Confirmation','Eucharist','Anointing of the Sick'],0,'In our CL lesson, Baptism cleanses us and welcomes us into God’s family.','⛪'),
      mc('What does the water in Baptism signify?',['Winning a race','Washing away sin','Learning to swim'],1,'The water is a sign of cleansing and new life in Christ.','💧'),
      mc('What material is used in Baptism?',['Bread','Sand','Water','Rice'],2,'Water is used in Baptism. The review calls this its matter.','💧'),
      mc('Who baptized Jesus?',['St. John Baptist de La Salle','John the Baptist','St. John Bosco'],1,'John the Baptist baptized Jesus. He is a different person from St. John Baptist de La Salle.'),
      mc('Where was Jesus baptized?',['Red Sea','Sea of Galilee','Jordan River'],2,'The class review names the Jordan River.','🏞️'),
      mc('In your class review, what response follows “I baptize you in the name of the Father, and of the Son, and of the Holy Spirit”?',['Amen','Alleluia','And with your spirit'],0,'The response taught in your review is “Amen.”','🙏'),
      tf('We receive God’s grace during Baptism.',true,'Baptism gives us God’s grace and welcomes us into the Church.','💧'),
      tf('Baptism and Confirmation are two names for the same sacrament.',false,'Baptism and Confirmation are different sacraments. Baptism begins our life as members of the Church.','⛪'),
      tf('Holy bread is the matter used in Baptism.',false,'Water is used in Baptism. Bread is associated with the Eucharist.','💧'),
      tf('Original sin is a wrong action that a baby personally chose to do.',false,'The lesson teaches that original sin is inherited. It is not a bad action personally chosen by a baby.'),
      tf('Baptized members of the Church are called to help build a caring community.',true,'We show our faith by loving and helping others.','🤝'),
    ]},
    {id:'jesus-prayer',title:'Jesus, Mary & prayer',emoji:'🙏',intro:'Remember the people and prayers from your CL activities.',questions:[
      mc('Who is the mother of Jesus?',['Elizabeth','Mary','Martha','Magdalene'],1,'Mary is the mother of Jesus.','💙'),
      mc('Who healed the man with leprosy in the Bible story studied in class?',['John','Mark','Matthew','Jesus'],3,'Jesus healed the man and showed him love and care.'),
      tf('Mama Mary is free from original sin.',true,'Your CL lesson teaches that Mary was preserved from original sin.','💙'),
      tf('Jesus is the Light of the world.',true,'Jesus guides us toward love and goodness. “Light” here means guidance.','🕯️'),
      mc('What does the Lasallian Prayer help us remember?',['Only teachers can pray.','We are in the holy presence of God.','Every wish must come true.'],1,'The prayer begins by reminding us of God’s holy presence.','🙏'),
      mc('What do we ask for in the Angel of God prayer?',['An angel’s guidance and protection','A prize for every good deed','To never do schoolwork'],0,'We ask our guardian angel to guide and protect us.','👼'),
      mc('Which action shows respect during the Morning Assembly prayer?',['Shouting to a friend','Playing a rough game','Listening attentively'],2,'Listening attentively lets us join the prayer and respect the people praying.','🙏'),
      mc('How can you take part respectfully during Community Mass?',['Sing and pray with the community.','Chat loudly about toys.','Run between the seats.'],0,'Joining the prayers and songs helps us worship together.','⛪'),
      mc('Which sentence is a prayer of thanksgiving?',['Give me every toy I want.','Dear God, thank you for my family’s love.','I never need anyone’s help.'],1,'A thanksgiving prayer expresses gratitude for a blessing.','🙏'),
      tf('Praying means that we will always get whatever we ask for.',false,'Prayer is talking and listening to God. It is not a promise that every wish will come true.','🙏'),
    ]},
    {id:'kindness',title:'Sharing with a kind heart',emoji:'🤝',intro:'Read why the person acts. A kind intention is to help, not to gain a reward.',questions:[
      mc('Which child shares with a good intention?',['Leo gives food only to become famous.','Ana gives food because a family is hungry.','Ben gives food only to win a sticker.'],1,'Ana wants to meet another person’s need. Her goal is to help.','🥫'),
      mc('Why do we donate to the school’s Kasiyana project?',['To be praised by everyone','To get a higher score','To care for people who need help'],2,'Sharing blessings is a way to follow God’s teaching to love others.','🎁'),
      mc('Which action directly shares food with people in need?',['Sitting quietly','Donating canned goods','Singing a song'],1,'All can be good actions, but donating canned goods directly provides food.','🥫'),
      mc('A classmate has no pencil. You have a spare. What is a caring choice?',['Lend the spare pencil.','Hide both pencils.','Laugh at the classmate.'],0,'Sharing a spare pencil helps your classmate learn.','✏️'),
      mc('A family has lost its belongings in an earthquake. Which action helps them?',['Ask them to give you a present.','Donate useful supplies with your family.','Make fun of their damaged home.'],1,'Useful supplies can meet their needs. Ask your family to help you donate safely.','📦'),
      mc('Which is the best reason to follow CLAYGO?',['To keep shared places clean for everyone','To collect the most prizes','To make another child do all the work'],0,'Clean As You Go shows care for the next person who will use the place.','🧹'),
      tf('We should share only when someone promises us a reward.',false,'We share to care for others, even when there is no reward.','🎁'),
      tf('Listening patiently when a friend needs help can be an act of kindness.',true,'Kindness includes our time and attention, not just things we give.','💛'),
      mc('Read the four actions. Which one is a donation?\n1. Kneeling during prayer\n2. Listening to the reading\n3. Singing with the class\n4. Giving canned goods for families in need',['Action 1','Action 2','Action 3','Action 4'],3,'Action 4 gives useful goods to people who need them.','🥫'),
      mc('Your friend thanks you for sharing. What is a kind response?',['You must now give me a prize.','I’m glad I could help.','Tell everyone I am the best.'],1,'A kind heart is happy to help without demanding a reward.','💛'),
    ]},
    {id:'creation',title:'Caring for God’s creation',emoji:'🌱',intro:'Think about caring for people, plants, animals and the places we share.',questions:[
      tf('The story of Creation reminds us to take care of the earth.',true,'Creation is a gift. Caring for it shows our gratitude.','🌍'),
      mc('Which action takes care of God’s creation?',['Burning plastic','Throwing litter into a stream','Planting and caring for a tree'],2,'A cared-for tree grows and helps living things.','🌳'),
      mc('Why are plants important to people and animals?',['They only make noise.','They provide food and oxygen.','They make all water dirty.'],1,'Plants provide food and release oxygen.','🌿'),
      mc('You see paper on the classroom floor. What should you do?',['Step on it.','Leave it there.','Put it in the proper bin.'],2,'Using the proper bin keeps our shared space clean.','🗑️'),
      mc('Which habit saves water while brushing your teeth?',['Leaving the tap running','Turning the tap off when not using it','Playing with the running water'],1,'Turning off the tap avoids wasting water.','🚰'),
      mc('Why should we care for animals?',['They are part of God’s creation.','All animals are toys.','They never need food or water.'],0,'Animals are living creatures that deserve proper care.','🐾'),
      mc('Which action shows care for people?',['Laughing when someone falls','Offering safe help to a person who needs it','Ignoring a person asking for help'],1,'Helping safely shows that we care. A grown-up can help when needed.','🤝'),
      tf('Wasting clean paper is a way to care for creation.',false,'Using paper wisely helps reduce waste.','📄'),
      mc('A classroom plant has dry soil. What caring action can you take?',['Tear off its leaves.','Ask the teacher and give it the right amount of water.','Put rubbish in its pot.'],1,'Plants need suitable care, including enough water.','🪴'),
      tf('We can thank God through both prayer and caring actions.',true,'Our words and actions can both show gratitude.','💚'),
    ]},
    {id:'reflection',title:'My prayer & reflection studio',emoji:'🎨',intro:'Use your own ideas. These activities have many good answers and are not scored.',questions:[
      {type:'reflect',q:'Write a short thanksgiving prayer. Name a blessing and explain why you are thankful.',emoji:'🙏',example:'Dear God, thank you for my family because they love and guide me. In Jesus’ name, Amen.',rubric:['I named a blessing.','I explained why I am thankful.','My words make sense as a prayer.']},
      {type:'reflect',q:'Complete your prayer: “Dear Lord, thank you for my friends because…” Add another sentence about sharing your blessings.',emoji:'💛',example:'Dear Lord, thank you for my friends because they care for me. Help me share my books with someone who needs them. Amen.',rubric:['I explained why I am grateful for my friends.','I named a caring action I can do.']},
      {type:'reflect',q:'Draw or write one way you can be a helpful member of the Church. Explain your idea in your own words.',emoji:'⛪',example:'I can help collect canned goods with my family for people who need food.',rubric:['My idea shows care for others.','I explained whom it helps or how it helps.']},
      {type:'reflect',q:'Think about home, school and church. Write or draw one respectful action you can do in each place.',emoji:'🏡',example:'At home I put away my toys. At school I listen to my teacher. At church I join the prayers.',rubric:['I included home, school and church.','Each action shows respect or care.']},
    ]},
  ]});
})();
