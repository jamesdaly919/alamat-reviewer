/* Additional wrong answers reviewed against the exact original question.
   Topic/index addresses refer to the original source-based bank, before expansion. */
(function(){
  window.REVIEWER_OPTIONS=m=>{
    if(m.subject==='ap')Object.assign(m.glossary,{
      tinatawag:'called',dapat:'should',din:'also',donasyong:'donated',edukasyon:'education',gaano:'how much',ganitong:'this kind of',gantimpala:'reward',gaya:'such as',ginagabayan:'guides',ginagamit:'used',ginagamot:'treated',humingi:'ask for',inalagaan:'cared for',institusyong:'institution that',kahit:'even if',kalaki:'large','kapaki-pakinabang':'beneficial',karaniwang:'commonly',kumikita:'earns money',laruang:'toy that',magkapareho:'the same',magkaparehong:'the same',maglalaro:'will play',maglaro:'play',maglibang:'enjoy recreation',magpagawa:'have something made',magsalita:'speak',maiiwan:'left behind',makatulong:'help',manggagawang:'worker who',mapagkakatiwalaang:'trusted',mapanganib:'dangerous',maraming:'many',mayroon:'has / there is',nabibigyan:'given',nagbabahagi:'shares',nakabubuti:'benefits',pagbebenta:'selling',pagbibigay:'giving',pagdaan:'passing through',pagdarasal:'praying',paghihintay:'waiting',pagkakataong:'turn / opportunity',pagkuha:'getting',paglalarawan:'description',pagsamba:'worship',pagtitinda:'selling',pagtuturo:'teaching',pananim:'crops',pangangailangang:'need',pangangalaga:'care',pangkalusugan:'health-related',pinaghihiramang:'shared / borrowed',pumili:'choose',salitang:'word',sinasabi:'says',sinusuri:'examined',tinitirhan:'lived in',tumutugon:'meets / responds to',tungkulin:'role / duty',
      aalagaan:'will care for',aklat:'book',alam:'knows',angkop:'suitable',bagay:'thing',balot:'wrapper',bang:'marks a question',batas:'law',bumibili:'buys',dami:'amount',duyan:'swing',espasyong:'space',gabay:'guide',gagamit:'will use',gawaing:'activity',guluhin:'disturb',gumagamit:'uses',habang:'while',halaman:'plant',hilingin:'ask for',hintayin:'wait for',ibang:'other',ibigay:'give',ibinigay:'given',igagalang:'will respect',iisang:'one and the same',inaalagaan:'cared for',isda:'fish',istasyon:'station',itago:'hide',kaayusan:'order',kahoy:'wood',kailangang:'needs to',kalinisan:'cleanliness',kang:'you',kasama:'with',kinalalagyan:'location',klase:'class',lalagyan:'container',lambat:'net',laro:'game',layunin:'purpose',maaari:'may / can',magkalat:'litter / make a mess',magturo:'teach / show',maiiwasan:'can be avoided',maingat:'careful',makahuli:'catch',makikibahagi:'will take part',makinabang:'benefit',manatili:'stay',matuto:'learn',medikal:'medical',misa:'Mass',mong:'your / you',
      'nag-aani':'harvests','nag-aaral':'studies','nag-aayos':'repairs / arranges',naglilinis:'cleans',nagpapagamot:'seeks treatment',nagpapanatili:'maintains',nagpapatupad:'enforces',nagrereseta:'prescribes',nagsasabi:'tells',nagsasalita:'speaks',nagtatahi:'sews',nagtatanim:'plants',nagtitinda:'sells',nagtitipon:'gathers',nakatatanda:'older people',namamahala:'manages',nanghuhuli:'catches',nangongolekta:'collects',pa:'more / still',padulasan:'slide',
      'pag-aayos':'repairing / arranging','pag-apula':'extinguishing','pag-iingat':'taking care',pagbasa:'reading',paggamit:'using',paggawa:'making',pagkakataon:'turn / opportunity',pagkasira:'damage',pagkita:'earning',pagkukumpuni:'repairing',paglalaro:'playing',paglilibang:'recreation',pagpupulong:'meeting',pagtatanim:'planting',pagtatapon:'disposal',palatandaan:'sign / clue',pampublikong:'public',pananahi:'sewing / tailoring',panatilihing:'keep',pangangalagang:'care',panghuhuli:'catching',pasyente:'patient',pasyenteng:'patient who',pinto:'door',pinupuntahan:'visited',produkto:'product',pumapasok:'goes into / attends',pumapatay:'extinguishes (a fire)',responsableng:'responsible','sabay-sabay':'together at the same time',sakop:'covered',sariwang:'fresh',silid:'room','silid-aralan':'classroom',sinanay:'trained',sirain:'damage / destroy',sobra:'extra',sobrang:'extra',sumama:'join / go with',sumulat:'write',sumusuri:'examines',susunod:'next',tapos:'finished',tawag:'term / name',tawanan:'laugh at',tindero:'seller',trabaho:'work',tungkol:'about',uniporme:'uniform',uri:'kind',
      bakanteng:'empty',gumagawa:'makes',sapatos:'shoes',mesa:'table',premyo:'prize',nangungutya:'mocks',naninira:'damages',pagpapanatiling:'keeping',pagsira:'damaging',pagsusulat:'writing',pahintulot:'permission','pag-iwan':'leaving',nabubulok:'rotting',ilog:'river',pagtangging:'refusing',mawala:'disappear',kusang:'by itself',mawawala:'will disappear',mangangailangan:'will need',magtrabaho:'work',lahat:'all','pare-pareho':'all the same',iisang:'the same single',mananahing:'tailor who',mangingisdang:'fisher who',naghahanda:'prepares',balewalain:'disregard',itapon:'throw away',sigawan:'shout at',makapagtrabaho:'be able to work',makagamit:'be able to use',ituro:'point out / show',maling:'wrong',silid:'room',bag:'bag',pagluluto:'cooking',tinapay:'bread',ibenta:'sell',pagtatahi:'sewing',pagtatago:'hiding',pagkain:'food',ibahagi:'share',
    });
    const categoryPools=[
      ['Hilaga','Timog','Silangan','Kanluran'],
      ['Paaralan','Ospital','Pamilihan','Simbahan','Pook-libangan','Pamahalaan','Palaruan'],
      ['Guro','Doktor','Mananahi','Bumbero','Magsasaka','Mangingisda','Karpintero','Panadero','Pulis'],
      ['Observing','Inferring','Predicting','Classifying','Measuring'],
      ['Identity','Commutative','Associative'],
      ['Melting','Freezing','Evaporation','Condensation'],
    ];
    m.topics.forEach(t=>t.questions.forEach(q=>{
      if(q.type!=='mc'||q.format==='Pagpili sa kahon')return;
      const pool=categoryPools.find(p=>q.choices.every(c=>p.includes(c)));
      if(!pool)return;
      // A playground and recreation place describe the same institution.
      q.distractors=pool.filter(c=>!q.choices.includes(c)&&!(['Pook-libangan','Palaruan'].includes(c)&&q.choices.some(x=>['Pook-libangan','Palaruan'].includes(x))));
    }));
    const ap={
      community:{
        0:['Mga laruan lamang, na walang taong nakatira.','Isang bakanteng kahon lamang.'],
        1:['Komunidad na gumagawa ng mga sapatos.','Komunidad na gumagawa ng kahoy na mesa.'],
        2:['Komunidad na gumagawa ng mga sapatos.','Komunidad na gumagawa ng kahoy na mesa.'],
        4:['Davao City','Bacolod City'],
        5:['May mga guro sa paaralan.','Maraming nagtitinda ng pagkain.'],
        6:['Nasa labas ito ng NCR.','Nasa Cebu ito.'],
        7:['Pagtatago ng gamit upang hindi magamit ng iba.','Pagsira sa mga upuan sa parke.'],
      },
      institutions:{
        5:['Pagluluto ng tinapay para ibenta','Pagtatahi ng uniporme'],
        6:['Upang wala nang kailangang magtrabaho','Upang pare-pareho na ang lahat ng serbisyo'],
        7:['Lahat ng sakit ay kusang mawawala.','Wala nang mangangailangan ng doktor.'],
      },
      helpers:{
        4:['Mananahing gumagawa ng uniporme','Mangingisdang naghahanda ng lambat'],
        7:['Wala silang naitutulong sa komunidad.','Lahat sila ay gumagawa ng iisang trabaho.'],
      },
      maps:{8:['Itapon ang mapa bago tingnan.','Balewalain ang lahat ng palatandaan.']},
      care:{
        0:['Pamilyang naninira ng gamit ng kapitbahay','Pamilyang nangungutya sa nangangailangan'],
        1:['Pagsira ng mga upuan','Pagsusulat sa dingding nang walang pahintulot'],
        2:['Pag-iwan ng nabubulok na basura sa daan','Pagtatapon ng basura sa ilog'],
        3:['Pagsira sa mga aklat na maaaring ibahagi','Pagtangging tumulong dahil walang premyo'],
        4:['Mawawala na ang lahat ng ibang pangangailangan nila.','Hindi na nila kailangan ng guro.'],
        5:['Ituro ang maling silid para maligaw siya.','Itago ang kaniyang bag.'],
        6:['Iwan ang basura sa padulasan.','Itago ang laruan upang walang ibang makagamit.'],
        7:['Sigawan sila upang hindi makapagtrabaho.','Sirain ang kanilang kagamitan.'],
      },
    };
    if(m.subject==='ap')for(const t of m.topics)for(const [index,wrong] of Object.entries(ap[t.id]||{})){
      const q=t.questions[Number(index)];
      if(!q||q.type!=='mc')throw Error('Invalid reviewed option address '+t.id+'/'+index);
      q.distractors=(q.distractors||[]).concat(wrong);
    }
    // Do not pad a/an, true/false, or other genuinely closed classifications.
  };
})();
