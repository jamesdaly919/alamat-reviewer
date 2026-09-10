/* Curated scenario banks. Closed classifications keep their natural categories. */
(function(){
  window.REVIEWER_FACT_BANKS=(m,add,mc)=>{
    const s=m.subject;
    const statement=(topic,i)=>add(s,topic,window.REVIEWER_STATEMENT(s,topic,i));
    function rows(topic,data,pool){
      data.forEach(([prompt,answer,why,en,whyEn],i)=>{
        const options=s==='science'&&topic==='classify'?pool.filter(x=>answer==='Length'?x!=='Size':x!=='Length'):pool;
        const q=mc(prompt,answer,options.filter(x=>x!==answer),why,{emoji:s==='cl'?'💭':s==='ap'?'🧭':'🔬'});
        if(s==='ap'){q.en=en;q.whyEn=whyEn;}
        add(s,topic,q);
        statement(topic,i);
      });
    }
    if(s==='cl'){
      rows('baptism',[
        ['Which sacrament welcomes a person into the Church at the start of Christian life?','Baptism','Baptism welcomes us into the Church.'],
        ['In Baptism, which material is poured or used for immersion?','Water','Water is the matter used for Baptism.'],
        ['Who baptized Jesus in the Jordan River?','John the Baptist','John the Baptist baptized Jesus.'],
        ['Which river is named in the class lesson on Jesus’ Baptism?','Jordan River','Jesus was baptized in the Jordan River.'],
        ['What gift from God do we receive in Baptism?','Grace','Baptism gives God’s grace, not a prize for winning.'],
        ['Baptism makes us members of which community of faith?','The Church','Baptism welcomes us into the Church, God’s family.'],
        ['According to your class review, what is the spoken response after the baptismal formula?','Amen','The response in the class review is Amen.'],
        ['What does baptismal water symbolize being washed away?','Sin','The water signifies cleansing from sin and new life.'],
      ],['Baptism','Water','John the Baptist','Jordan River','Grace','The Church','Amen','Sin']);
      rows('jesus-prayer',[
        ['Who is Jesus’ mother in the Bible stories?','Mary','Mary is Jesus’ mother.'],
        ['Who showed compassion by healing the man with leprosy?','Jesus','Jesus healed the man in the story.'],
        ['Which prayer asks a guardian angel to light and guard us?','Angel of God','Angel of God asks for guidance and protection.'],
        ['Which prayer in your lesson begins by remembering God’s holy presence?','Lasallian Prayer','The Lasallian Prayer reminds us of God’s presence.'],
        ['Which kind of prayer says “Thank you, God, for people who care for me”?','Thanksgiving prayer','It gives thanks for a blessing.'],
        ['Who is called the Light of the world in your CL review?','Jesus','Jesus guides people toward love and goodness.'],
        ['Who is asked to pray for us in the school prayer: “Saint John Baptist de La Salle…”?','St. John Baptist de La Salle','The school prayer names St. John Baptist de La Salle.'],
        ['Who is addressed at the beginning of “Dear God, thank you for today”?','God','The prayer is addressed to God.'],
      ],['Mary','Jesus','Angel of God','Lasallian Prayer','Thanksgiving prayer','St. John Baptist de La Salle','God']);
      const kindness=[
        ['A classmate forgot a pencil. You have an extra one.','Lend the spare pencil.','This gives the classmate a tool needed for learning.'],
        ['A relief collection needs canned food for families. Your family can contribute.','Donate suitable canned food.','Food donations help meet people’s needs.'],
        ['A new pupil is sitting alone and wants company.','Invite the pupil to join you.','An invitation helps the new pupil feel welcome.'],
        ['You accidentally knock over a friend’s crayons.','Apologize and help pick them up.','Take responsibility and help repair the mistake.'],
        ['You have finished using the shared classroom blocks.','Put the blocks away properly.','Returning materials is caring for the next person.'],
        ['A friend is telling you why they feel sad.','Listen kindly without interrupting.','Kind listening shows care for the friend’s feelings.'],
        ['A class collection asks for gently used books. You have suitable books to share.','Donate books to help others learn.','The purpose is to support learning.'],
        ['You are asked why you help with the Kasiyana project.','To care for people in need.','The purpose is to help others, not to demand a reward.'],
      ];
      const unkind=['Demand a prize before helping.','Laugh at the person.','Make the mess bigger.','Hide the materials.','Tell the person to go away.'];
      kindness.forEach(([scene,a,why],i)=>{add(s,'kindness',mc(scene+' What is a caring response?',a,unkind,why));statement('kindness',i);});
      const care=[
        ['The tap is running while nobody uses the water.','Turn off the tap.','This avoids wasting water.'],
        ['A used sheet still has a clean blank side.','Use the blank side for practice.','Using both sides reduces paper waste.'],
        ['You finish your snack and have an empty wrapper.','Put it in the proper bin.','Proper disposal keeps shared places clean.'],
        ['Your pet’s water bowl is empty. An adult says you may refill it.','Give the pet clean water.','Animals need appropriate food, water and care.'],
        ['The class is caring for a young tree.','Water it as your teacher directs.','A young tree needs suitable care.'],
        ['You see a classmate pulling leaves off the class plant for fun.','Ask them to stop and care for the plant.','Protecting plants is caring for creation.'],
        ['You leave a room and an adult asks you to switch off its unused light.','Switch off the unused light.','This avoids wasting electricity.'],
        ['You visit a park with your family. There is a sign to keep to the path.','Stay on the path to protect the plants.','Following the sign helps care for the park.'],
      ];
      care.forEach(([scene,a,why],i)=>{add(s,'creation',mc(scene+' Which action shows care?',a,['Waste more water.','Leave rubbish behind.','Damage the plants.','Use materials carelessly.','Ignore the caring instruction.'],why));statement('creation',i);});
    }
    if(s==='science'){
      rows('process',[
        ['Lia describes the bell’s ringing sound. Which science skill is she using?','Observing','She notices sound directly with her ears.'],
        ['Ben uses a ruler to find the length of a leaf. Which skill is this?','Measuring','A ruler gives a length in a unit.'],
        ['Ana sorts leaves into large and small groups. Which skill is this?','Classifying','She groups leaves by size.'],
        ['A child sees wet soil and suggests that someone watered it. Which skill is this?','Inferring','The child suggests a cause from evidence.'],
        ['Mia says an ice cube may melt later in a warm room. Which skill is this?','Predicting','She says what may happen in the future.'],
        ['A pupil records that a stone feels rough. Which skill is this?','Observing','Roughness is noticed directly by touch.'],
        ['A pupil groups buttons by color. Which skill is this?','Classifying','Sorting by a shared feature is classifying.'],
        ['A pupil checks how many centimeters long a ribbon is. Which skill is this?','Measuring','The pupil finds a length in centimeters.'],
        ['There are crumbs near a plate. A pupil suggests someone ate a biscuit there. Which skill is this?','Inferring','The pupil suggests an explanation, which is not certain.'],
        ['A pupil says a plant may droop tomorrow if its soil stays dry. Which skill is this?','Predicting','Tomorrow refers to a future possibility.'],
      ],['Observing','Measuring','Classifying','Inferring','Predicting']);
      rows('classify',[
        ['A red cup, red ribbon and red block are grouped by which stated property?','Color','The shared stated property is red.'],
        ['A round button and a round coin are grouped by which stated property?','Shape','Both are round.'],
        ['A small ball and a small box are grouped by which stated property?','Size','Both are described as small.'],
        ['Rough sandpaper and a rough stone are grouped by which stated property?','Texture','Both feel rough.'],
        ['Objects measuring 5 cm are put together. What measurement is the grouping rule?','Length','All have the same measured length.'],
        ['Blue beads and blue toy cars are grouped by which stated property?','Color','Both are blue, even though their uses differ.'],
        ['Large boxes and large baskets are grouped by which stated property?','Size','Both are described as large.'],
        ['Square tiles and square paper pieces are grouped by which stated property?','Shape','Both are square.'],
        ['Smooth pebbles and smooth marbles are grouped by which stated property?','Texture','Both have smooth surfaces.'],
        ['Ribbons measuring 10 cm are grouped together. What measurement is the rule?','Length','The rule is a length of 10 centimeters.'],
      ],['Color','Shape','Size','Texture','Length']);
      for(const unit of ['cm','inches'])for(let end=1;end<=10;end++){
        const answer=`${end} ${unit}`,pool=Array.from({length:10},(_,i)=>`${i+1} ${unit}`).concat([`${end} ${unit==='cm'?'inches':'cm'}`]);
        add(s,'measure',mc('Read the ruler. How long is the pencil?',answer,pool.filter(x=>x!==answer),`The pencil starts at 0 and ends at ${end}. The unit is ${unit}, so its length is ${answer}.`,{visual:{kind:'ruler',end,unit}}));
      }
      rows('properties',[
        ['A scarf is purple. Which property is stated?','Color','Purple names a color.'],
        ['A tabletop feels rough. Which property is stated?','Texture','Rough describes how its surface feels.'],
        ['A tile is triangular. Which property is stated?','Shape','Triangular describes a shape.'],
        ['One toy is small and the other is large. Which property is being compared?','Size','Small and large describe size.'],
        ['A piece of cloth soaks up a water spill. Which useful property is shown?','Absorbency','Absorbent materials soak up liquids.'],
        ['A ball is red. Which property is stated?','Color','Red names a color.'],
        ['A plate is round. Which property is stated?','Shape','Round describes a shape.'],
        ['A pebble feels smooth. Which property is stated?','Texture','Smooth describes the surface.'],
        ['A basket is larger than another basket. Which property is compared?','Size','The comparison concerns size.'],
        ['A sponge takes in water when used on a wet counter. Which property helps it do this?','Absorbency','It can soak up liquid.'],
      ],['Color','Texture','Shape','Size','Absorbency']);
      [['a wooden chair','Solid'],['a metal key','Solid'],['a glass marble','Solid'],['an ice cube','Solid'],['a stone','Solid'],['a plastic block','Solid'],['water in a cup','Liquid'],['milk in a bottle','Liquid'],['juice in a glass','Liquid'],['cooking oil','Liquid'],['air in a ball','Gas'],['air in a tire','Gas'],['water vapour','Gas'],['air in a room','Gas']].forEach(([item,a])=>{add(s,'matter',mc(`Classify ${item}. What state of matter is it?`,a,['Solid','Liquid','Gas'].filter(x=>x!==a),`${item} is ${a.toLowerCase()}. ${a==='Solid'?'It has its own shape.':a==='Liquid'?'It flows and takes the container’s shape.':'It spreads through available space.'}`));});
      rows('changes',[
        ['Solid butter becomes liquid when warmed. What change is this?','Melting','Melting changes solid to liquid.'],
        ['Liquid juice becomes a solid ice pop in the freezer. What change is this?','Freezing','Freezing changes liquid to solid.'],
        ['Liquid water in a puddle becomes water vapour. What change is this?','Evaporation','Evaporation changes liquid to gas.'],
        ['Water vapour forms liquid drops on a cool lid. What change is this?','Condensation','Condensation changes gas to liquid.'],
        ['A solid chocolate piece turns liquid in a warm pan. What change is this?','Melting','Heat causes the solid chocolate to melt.'],
        ['Liquid water in an ice tray becomes solid. What change is this?','Freezing','The water loses heat and freezes.'],
        ['Water on a wet cloth gradually becomes vapour. What change is this?','Evaporation','Liquid water changes to water vapour.'],
        ['Water vapour touches a cold mirror and forms drops. What change is this?','Condensation','Water changes from gas to liquid.'],
        ['An ice pop becomes liquid in a warm room. What change is this?','Melting','The solid gains heat and becomes liquid.'],
        ['Melted butter becomes solid again as it cools enough. What change is this?','Freezing','A liquid becomes solid when sufficiently cooled.'],
      ],['Melting','Freezing','Evaporation','Condensation']);
      const safe=[
        ['An experiment includes an unknown powder.','Ask the teacher before touching it.','Unknown materials need teacher instructions.'],
        ['A tool’s sharp edge is exposed on the floor.','Keep away and tell an adult.','An adult can safely handle the sharp tool.'],
        ['A class activity needs a hot glue gun.','Ask an adult to help with the hot tool.','Hot tools can burn.'],
        ['Your group finishes a science activity.','Return the tools to their proper places.','Proper storage keeps the tools safe.'],
        ['Water is spilled where people walk.','Tell the teacher and help clean it safely.','A wet floor can cause slips.'],
        ['You need to carry closed scissors to your desk.','Walk carefully as the teacher directs.','Running with scissors is unsafe.'],
        ['A container has no label. You want to know what is in it.','Ask the teacher to identify it.','Do not taste or sniff unknown substances.'],
        ['A glass container breaks near your group.','Step back and tell an adult.','Broken glass can cut.'],
      ];
      safe.forEach(([scene,a,why],i)=>{add(s,'care',mc(scene+' What should you do?',a,['Taste the material.','Rush without checking.','Hide the problem from the teacher.','Treat the tool as a toy.','Ignore the safety instructions.'],why));statement('care',i);});
    }
    if(s==='ap'){
      const places=['Paaralan','Ospital','Pamilihan','Simbahan','Pook-libangan','Pamahalaan'];
      rows('institutions',[
        ['Saan pumapasok ang mga mag-aaral upang matuto?','Paaralan','Sa paaralan nag-aaral ang mga bata.','Where do pupils go to learn?','Pupils learn at school.'],
        ['Saan nagpapagamot ang taong kailangang manatili sa pagamutan?','Ospital','Ang ospital ay nagbibigay ng pangangalagang medikal.','Where does someone stay for hospital treatment?','A hospital provides medical care.'],
        ['Saan bumibili ng sariwang gulay sa mga tindero?','Pamilihan','Sa pamilihan bumibili at nagtitinda ng produkto.','Where do people buy fresh vegetables from sellers?','A market has sellers offering food and other goods.'],
        ['Anong institusyon ang pinupuntahan para sa Misa?','Simbahan','Sa simbahan nagtitipon para sa Misa.','Which institution do people visit for Mass?','A church is a place of worship.'],
        ['Anong uri ng lugar ang parke na may padulasan at duyan?','Pook-libangan','Ang palaruan ay lugar ng paglalaro at paglilibang.','What kind of place is a park with slides and swings?','It is a recreation place.'],
        ['Aling institusyon ang namamahala sa mga pampublikong serbisyo ng lungsod?','Pamahalaan','Ang pamahalaan ay namamahala sa serbisyo ng lungsod.','Which institution manages city public services?','The local government manages public services.'],
        ['May guro, silid-aralan at mga mag-aaral. Anong institusyon ito?','Paaralan','Mga palatandaan ito ng paaralan.','There are teachers, classrooms and pupils. Which institution is this?','These are features of a school.'],
        ['May mga doktor at silid para sa mga pasyenteng kailangang manatili. Anong institusyon ito?','Ospital','Sa ospital inaalagaan ang mga pasyente.','Doctors care for patients staying in treatment rooms. Which institution is this?','A hospital cares for patients.'],
      ],places);
      const workers=['Guro','Doktor','Mananahi','Bumbero','Magsasaka','Mangingisda','Pulis','Karpintero'];
      rows('helpers',[
        ['Sino ang nagtuturo ng pagbasa sa klase?','Guro','Ang guro ay nagtuturo.','Who teaches reading in class?','A teacher teaches pupils.'],
        ['Sino ang sumusuri sa pasyente at nagrereseta ng gamot?','Doktor','Ang doktor ay nagbibigay ng pangangalagang medikal.','Who examines patients and prescribes medicine?','A doctor provides medical care.'],
        ['Sino ang nagtatahi ng uniporme bilang hanapbuhay?','Mananahi','Ang mananahi ay nagtatahi ng damit.','Who sews uniforms for a living?','A tailor sews clothes.'],
        ['Sino ang sinanay sa pag-apula ng sunog?','Bumbero','Ang bumbero ay pumapatay ng apoy.','Who is trained to put out fires?','Firefighters are trained to extinguish fires.'],
        ['Sino ang nagtatanim at nag-aani ng palay?','Magsasaka','Ang magsasaka ay nagtatanim ng pagkain.','Who plants and harvests rice?','Farmers grow crops.'],
        ['Sino ang gumagamit ng lambat sa dagat upang makahuli ng isda bilang hanapbuhay?','Mangingisda','Ang mangingisda ay nanghuhuli ng isda.','Who uses a fishing net at sea for a living?','Fishers catch fish.'],
        ['Sino ang nagpapatupad ng batas at tumutulong sa kaayusan?','Pulis','Ang pulis ay nagpapatupad ng batas.','Who enforces laws and helps keep order?','Police enforce laws.'],
        ['Sino ang gumagawa ng kahoy na pinto bilang hanapbuhay?','Karpintero','Ang karpintero ay gumagawa at nag-aayos ng mga bagay na kahoy.','Who makes wooden doors for a living?','Carpenters build and repair wooden structures.'],
      ],workers);
      rows('community',[
        ['Ano ang tawag sa mga taong naninirahan at may ugnayan sa isang lugar?','Komunidad','Binubuo ng mga tao at kanilang ugnayan ang komunidad.','What do we call people living and interacting in a place?','They form a community.'],
        ['Ano ang hanapbuhay na pagtatanim ng palay?','Pagsasaka','Ang pagtatanim ay bahagi ng pagsasaka.','What livelihood involves growing rice?','Growing rice is farming.'],
        ['Ano ang hanapbuhay na panghuhuli ng isda?','Pangingisda','Ang panghuhuli ng isda ay pangingisda.','What livelihood involves catching fish?','Catching fish is fishing.'],
        ['Ano ang ipinapakita ng magkakapitbahay na sabay-sabay naglilinis?','Pagtutulungan','May iisang mabuting layunin ang kanilang sama-samang gawain.','What do neighbors show by cleaning together?','They show cooperation.'],
        ['Ano ang tawag sa paraan ng pagkita upang matugunan ang pangangailangan?','Hanapbuhay','Ang hanapbuhay ay trabaho o paraan ng pagkita.','What is work used to earn a living called?','It is a livelihood.'],
        ['Aling salita ang tumutukoy sa dami ng espasyong sakop ng isang lungsod?','Lawak','Ang lawak ay sukat ng lugar.','Which word refers to the area a city covers?','Lawak means area or extent.'],
        ['Ano ang inilalarawan ng “nasa gitna ng NCR”: lawak o kinalalagyan?','Kinalalagyan','Ang nasa gitna ay nagsasabi kung nasaan ang lugar.','Does “in the center of NCR” describe area or location?','It describes location.'],
        ['Anong hanapbuhay ang paggawa at pagkukumpuni ng damit?','Pananahi','Ang pananahi ay paggawa at pag-aayos ng damit.','What livelihood involves making and repairing clothes?','It is sewing or tailoring.'],
      ],['Komunidad','Pagsasaka','Pangingisda','Pagtutulungan','Hanapbuhay','Lawak','Kinalalagyan','Pananahi']);
      const cells=['🏫 Paaralan','🌳 Parke','🏥 Ospital','🏪 Pamilihan','🏠 Bahay','⛪ Simbahan','🚒 Istasyon ng bumbero','🏛️ Pamahalaan','🛝 Palaruan'];
      const englishPlaces=['school','park','hospital','market','house','church','fire station','government building','playground'];
      const ds=[[0,-1,'Hilaga','north'],[0,1,'Timog','south'],[-1,0,'Kanluran','west'],[1,0,'Silangan','east']];
      for(let start=0;start<9;start++)for(const [dx,dy,a,e] of ds){const x=start%3+dx,y=Math.floor(start/3)+dy;if(x<0||x>2||y<0||y>2)continue;const end=y*3+x,from=cells[start].split(' ').slice(1).join(' '),to=cells[end].split(' ').slice(1).join(' ');add(s,'maps',mc(`Mula sa ${from}, anong direksyon ang ${to} sa mapang ito?`,a,ds.map(d=>d[2]).filter(d=>d!==a),`${a} ang ${to} mula sa ${from}. Tingnan ang gabay ng direksyon.`,{en:`From the ${englishPlaces[start]}, which direction is the ${englishPlaces[end]} on this map?`,whyEn:`The destination is directly ${e} of the starting place.`,visual:{kind:'map',cells,caption:'Mapa ng pagsasanay. Hilaga ang itaas.'}}));}
      const careScenes=[
        ['May nagsasalita sa pagpupulong. Paano mo igagalang ang kaniyang pagkakataon?', 'Makinig at hintayin ang iyong pagkakataon.', 'Ang maayos na pakikinig ay paggalang.', 'Someone is speaking at a meeting. How can you respect their turn?', 'Listen and wait for your turn.'],
        ['May batang walang aklat. May sobra kang aklat na maaari mong ibigay. Ano ang makatutulong?', 'Ibahagi ang sobrang aklat.', 'Magagamit ng bata ang aklat sa pag-aaral.', 'A child has no book. You have a spare you may give away. What helps?', 'Share the spare book so the child can use it to learn.'],
        ['May kalat sa parke. Alin ang makatutulong na panatilihing malinis ito?', 'Itapon ang kalat sa tamang basurahan.', 'Ang tamang pagtatapon ay nagpapanatili ng kalinisan.', 'There is litter in the park. What helps keep it clean?', 'Put litter in the proper bin.'],
        ['May gawaing paglilinis sa barangay. Paano ka makikibahagi nang ligtas?', 'Sumama sa magulang at gawin ang ligtas na gawaing ibinigay.', 'Makikibahagi ka habang may gabay ng magulang.', 'There is a community clean-up. How can you take part safely?', 'Join your parent and do the safe task assigned to you.'],
        ['Tapos ka nang gumamit ng laruan sa silid. Paano mo ito aalagaan?', 'Ibalik nang maingat sa tamang lalagyan.', 'Maiiwasan ang pagkasira at magagamit ito ng iba.', 'You have finished using a shared toy. How can you care for it?', 'Return it carefully to its proper container.'],
        ['Nangongolekta ang paaralan ng pagkain para sa mga nangangailangan. Paano makikibahagi?', 'Magbigay ng angkop na pagkain kasama ang pamilya.', 'Ang donasyon ay para sa pangangailangan ng iba.', 'School is collecting food for people in need. How can you join in?', 'Donate suitable food with your family.'],
        ['May bagong kapitbahay na hindi alam ang daan sa barangay hall. May magulang kang kasama. Ano ang makatutulong?', 'Hilingin sa magulang na tumulong magturo ng daan.', 'Makatutulong ang tamang direksyon.', 'A new neighbor needs directions to the barangay hall. Your parent is with you. What helps?', 'Ask your parent to help give directions.'],
        ['Tapos na ang laro sa palaruan. May balot ka ng pagkain. Ano ang responsableng gawin?', 'Ilagay ang balot sa tamang basurahan.', 'Panatilihing malinis ang lugar para sa susunod na gagamit.', 'Playtime is over. You have a food wrapper. What is responsible?', 'Put it in the proper bin so the playground stays clean.'],
      ];
      const careless=['Magkalat pa sa paligid.','Sirain ang gamit ng iba.','Tawanan ang taong nangangailangan.','Itago ang gamit upang walang ibang makinabang.','Guluhin ang mga tumutulong.'];
      careScenes.forEach(([q,a,why,en,whyEn],i)=>{
        add(s,'care',mc(q,a,careless,why,{en,whyEn}));
        statement('care',i);
      });
    }
    if(s==='cl'||s==='ap'){
      const themes=s==='cl'?['my family','a friend','my teacher','people who grow food','people who keep our school clean','a helpful neighbor','a shared book','a safe place to learn','plants','animals','clean water','a new classmate','a person who is lonely','someone who helped me','a class project','our church']:['kalinisan ng parke','pagbabahagi ng aklat','pagtulong sa bagong kaklase','pag-aalaga sa palaruan','paggalang sa guro','pagbabahagi ng pagkain','pag-iingat sa gamit','pagtulong sa kapitbahay','pagtutulungan ng pamilya','kalinisan ng kalsada','paggalang sa manggagawa','paggamit ng mapa','pag-aaral sa paaralan','pag-aalaga sa halaman','pagtulong sa komunidad','pagbabahagi ng laruan','paggalang sa nakatatanda','tamang pagtatapon ng basura'];
      const englishThemes=['keeping the park clean','sharing books','helping a new classmate','caring for a playground','respecting teachers','sharing food','taking care of equipment','helping a neighbor','family cooperation','keeping roads clean','respecting workers','using a map','learning at school','caring for plants','helping the community','sharing toys','respecting older people','proper rubbish disposal'];
      themes.forEach((theme,i)=>add(s,'reflection',s==='cl'?{type:'reflect',q:`Think about ${theme}. Write a short prayer of thanks and one caring action you could take.`,example:`Dear God, thank you for the people and gifts in my life. Help me use them to care for others. Amen.`,rubric:['I named a blessing connected to the topic.','I explained why I am thankful.','I named a caring action I can do.'],emoji:'🎨'}:{type:'reflect',q:`Sumulat o gumuhit tungkol sa ${theme}. Ipaliwanag kung paano ito makatutulong sa komunidad.`,example:'Maaari akong tumulong sa isang gawaing mabuti. Ipapaliwanag ko kung sino ang matutulungan at paano.',rubric:['May tiyak na gawaing kaugnay ng paksa.','Naipaliwanag kung sino ang matutulungan.','Naipaliwanag kung paano ito makatutulong.'],en:`Write or draw about this topic: ${englishThemes[i]}. Explain how it can help the community.`,whyEn:'Many answers are possible. Name a specific helpful action, who it helps, and how. Discuss your idea with a grown-up.',emoji:'🎨'}));
    }
  };
})();
