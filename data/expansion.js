/* September 10: reviewed, finite practice variants. Pools contain only wrong
   answers for that exact prompt. Never borrow arbitrary answers across topics. */
(function(){
  const banks={};
  const add=(s,t,q)=>{(banks[s+'/'+t]??=[]).push(q);};
  const mc=(q,answer,wrong,why,extra={})=>({type:'mc',q,choices:[String(answer),...wrong.map(String)],answer:0,why,...extra});
  const numbers=(answer)=>[answer+1,answer+10,answer+100,Math.max(0,answer-1),Math.max(0,answer-10),answer+2].filter((n,i,a)=>n!==answer&&a.indexOf(n)===i);
  const numeric=(q,n,why,extra={})=>mc(q,n,numbers(n),why,extra);
  const ord=n=>n+({1:'st',2:'nd',3:'rd'}[n%100>=11&&n%100<=13?0:n%10]||'th');
  const letters='abcdefghijklmnopqrstuvwxyz';
  const vowels='aeiou';
  const cvce=['bake','cape','cane','cave','date','game','gate','hate','lake','late','made','name','page','rake','same','tape','wave','bike','dime','fine','hide','hike','line','mine','nine','pine','ride','ripe','side','time','wide','bone','code','cone','hope','note','pole','rope','rose','vote','cube','cute','mule','tune'];
  cvce.forEach(w=>add('english','cvce',mc(`Look closely at the letters. Which word has exactly the C-V-C-e pattern? (${w.slice(0,1).toUpperCase()} word round)`,w,['cat','bed','pig','fox','sun','fish','stamp','hand'],`${w.split('').join('-')} has a consonant, a vowel, a consonant and final silent e.`)));
  // The target distinguishes prompts while not revealing the answer itself.
  banks['english/cvce'].forEach((q,i)=>q.q=`Which word has exactly the C-V-C-e pattern?\nChoose the word that can complete: “${[
    'We will ___ a cake.','The superhero wore a ___.','Grandpa used a walking ___.','The bat flew into a ___.','Write today’s ___ on the paper.','Let’s play a ___.','Close the garden ___.','I do not like to ___ anyone.','We sailed on the ___.','Hurry so we are not ___.','She ___ a paper boat.','Tell me your ___.','Turn to the next ___.','Use a ___ to gather leaves.','We have the ___ book.','Stick it down with ___.','Give your friend a ___.','I can ride my ___.','A ___ is a coin worth ten US cents.','I feel well; I feel ___.','The mouse tried to ___.','We went on a long ___.','Stand in a straight ___.','This bag belongs to me; it is ___.','Eight plus one is ___.','A ___ tree has needles.','I want to ___ my bike.','The mango is ready to eat; it is ___.','Stand by my ___.','What ___ is it?','The road is very ___.','The dog chewed a ___.','Enter the secret ___.','The ice cream sits in a ___.','I ___ you feel better.','Write a short ___.','The flag hangs on a ___.','Tie it with a ___.','A ___ is a flower.','We will ___ for our class leader.','A die is shaped like a ___.','The little kitten is ___.','A ___ looks like a horse and a donkey.','Sing a happy ___.'][i].replace('___','______')}”`);
  const dip={oi:['boil','join','point','soil','voice'],oy:['boy','joy','toy','enjoy','royal'],ou:['cloud','house','mouse','mouth','shout'],ow:['cow','brown','clown','down','town']};
  Object.entries(dip).forEach(([sp,words])=>words.forEach(w=>add('english','diphthongs',mc(`Which spelling makes the gliding vowel sound in “${w}”?`,sp,['oi','oy','ou','ow','ee','ai','oa'].filter(x=>x!==sp),`In ${w}, the letters ${sp} spell the gliding vowel sound studied in class.`))));
  const nouns=[['Cebu','city'],['Davao','city'],['Baguio','city'],['Mia','girl'],['Marco','boy'],['Luna','girl'],['Ben','boy'],['January','month'],['March','month'],['June','month'],['Monday','day'],['Friday','day']];
  nouns.forEach(([name,kind])=>add('english','nouns',mc('Choose the PROPER noun from this set.',name,['city','girl','boy','month','day','river','school'],`“${name}” is a special name. The other choices are general names.`)));
  ['school','garden','pencil','teacher','river','friend','month','park','book','island','shop','road'].forEach(w=>add('english','nouns',mc('Choose the COMMON noun from this set.',w,['Manila','Baguio','January','Monday','Sofia','Pasig River'],`“${w}” is a general name. The named cities, people, days and months are proper nouns.`)));
  const articleWords=['ant','eagle','igloo','octopus','umbrella','apple','egg','insect','orange','owl','boat','car','desk','fan','goat','hat','jar','key','lamp','map','nest','pen','rabbit','sock'];
  articleWords.forEach(w=>{const a=vowels.includes(w[0])?'an':'a';add('english','articles',mc(`Fill in the article: “I can see ______ ${w}.”`,a,[a==='a'?'an':'a'],`${w} begins with a ${a==='an'?'vowel':'consonant'} sound, so use “${a}”.`));});
  const plurals=[['dog','dogs'],['cat','cats'],['bird','birds'],['tree','trees'],['cup','cups'],['star','stars'],['bus','buses'],['dish','dishes'],['fox','foxes'],['brush','brushes'],['baby','babies'],['city','cities'],['puppy','puppies'],['lady','ladies'],['toy','toys'],['key','keys'],['boy','boys'],['man','men'],['woman','women'],['goose','geese']];
  plurals.forEach(([one,many])=>add('english','plurals',mc(`One ${one}; more than one ______. Choose the correctly spelled plural.`,many,[one,one+'s',one+'es',one+'ies',many+'s',one+'en'].filter(x=>x!==many).filter((x,i,a)=>a.indexOf(x)===i),`The plural of ${one} is ${many}.`)));
  const pronounRows=[['My dad and I','We'],['My sister and I','We'],['Sam and I','We'],['The dancers','They'],['The puppies','They'],['The chairs','They'],['The cups','They'],['The kites','They'],['The box','It'],['The clock','It'],['The pencil','It'],['The bus','It'],['The woman','She'],['My mother','She'],['The girl','She'],['My grandmother','She'],['The man','He'],['My father','He'],['The boy','He'],['My grandfather','He']];
  pronounRows.forEach(([noun,p])=>add('english','pronouns',mc(`Replace the whole underlined subject with one pronoun:\n“<u>${noun}</u> ${['They','We'].includes(p)?'are':'is'} here.”`,p,['I','You','He','She','It','We','They'].filter(x=>x!==p),`${noun} can be replaced by ${p.toLowerCase()} in this sentence.`)));
  const sentenceRows=[['The rabbit','hops across the grass'],['Our teacher','reads a story'],['The children','wash their hands'],['My brother','packs his bag'],['A little bird','sits on the fence'],['The gardener','waters the plants'],['The baby','sleeps in the crib'],['My friends','play in the yard'],['The red bus','stops near the school'],['A black cat','runs behind the house'],['The tall boy','carries a basket'],['My mother','cooks our lunch']];
  sentenceRows.forEach(([s,p])=>{const pool=[s,p,s+' '+p,s.split(' ').slice(-1)[0],p.split(' ')[0],p.split(' ').slice(1).join(' ')];for(const role of ['subject','predicate'])add('english','sentences',mc(`What is the COMPLETE ${role}?\n“${s} ${p}.”`,role==='subject'?s:p,pool.filter(x=>x!==(role==='subject'?s:p)),`Complete subject: ${s}. Complete predicate: ${p}.`));});
  const adjectives=[['blue','color'],['green','color'],['yellow','color'],['red','color'],['purple','color'],['orange','color'],['tiny','size'],['huge','size'],['small','size'],['large','size'],['round','shape'],['square','shape'],['triangular','shape'],['oval','shape'],['soft','quality'],['rough','quality'],['smooth','quality'],['sweet','quality'],['noisy','quality'],['quiet','quality']];
  adjectives.forEach(([w,k])=>add('english','adjectives',mc(`What does the adjective “${w}” describe?`,k,['color','size','shape','quality'].filter(x=>x!==k),`“${w}” describes ${k}.`)));

  const polite=[['May tumulong magbuhat ng iyong gamit. Nais mong magpasalamat.','Maraming salamat po.'],['Binigyan ka ng lola ng baon. Nais mong magpasalamat.','Maraming salamat po.'],['Tinulungan ka ng guro na magbasa. Nais mong magpasalamat.','Maraming salamat po.'],['Binalik ng kaklase ang iyong lapis. Nais mong magpasalamat.','Maraming salamat po.'],['Natapakan mo ang paa ng kaklase. Nais mong humingi ng paumanhin.','Patawad po.'],['Nabasa mo nang di-sinasadya ang aklat ng iba. Nais mong humingi ng paumanhin.','Patawad po.'],['Nabangga mo nang di-sinasadya ang isang tao. Nais mong humingi ng paumanhin.','Patawad po.'],['Nabasag mo ang baso nang di-sinasadya. Nais mong humingi ng paumanhin.','Patawad po.'],['Nagpasalamat ang iyong kaibigan. Ano ang isasagot?','Walang anuman.'],['Sinabi ng guro na “Salamat sa tulong.” Ano ang isasagot?','Walang anuman.'],['Nagmamano ka sa lolo. Ano ang sasabihin?','Mano po.'],['Nagmamano ka sa lola. Ano ang sasabihin?','Mano po.']];
  const politeOptions=['Maraming salamat po.','Patawad po.','Walang anuman.','Mano po.','Magandang gabi po.','Maaari po ba akong makisali?'];
  polite.forEach(([s,a])=>add('filipino','magalang',mc(`Basahin ang sitwasyon: ${s}`,a,politeOptions.filter(x=>x!==a),`Ang “${a}” ay angkop sa layuning sinabi sa sitwasyon.`)));
  const filWords=['aso','trak','kaibigan','paaralan','elepante','pamilya','bahaghari','mesa','plato','tren','isda','kamatis','aklat','ilaw','sapatos','lobo','ina','pagkain','araw','kapote'];
  filWords.forEach(w=>{const n=[...w].filter(x=>vowels.includes(x)).length;add('filipino','patinig',mc(`Bilangin ang mga PATINIG sa salitang “${w}”.`,n,[0,1,2,3,4,5].filter(x=>x!==n),`Mga patinig: ${[...w].filter(x=>vowels.includes(x)).join(', ')}. Bilangin ang bawat titik, kahit nauulit.`));});
  const syllables=['a-so','trak','ka-i-bi-gan','pa-a-ra-lan','e-le-pan-te','pa-mil-ya','ba-hag-ha-ri','me-sa','pla-to','tren','is-da','ka-ma-tis','ak-lat','i-law','sa-pa-tos','lo-bo','i-na','pag-ka-in','a-raw','ka-po-te','ka-mi-se-ta','pa-la-ru-an','da-la-wa','ma-gu-lang'];
  syllables.forEach(s=>add('filipino','pantig',mc(`Bilangin ang pantig ng “${s.replaceAll('-','')}”.`,s.split('-').length,[1,2,3,4,5,6].filter(n=>n!==s.split('-').length),`${s}: ${s.split('-').length} pantig.`)));
  const clusters=[['braso','br'],['plato','pl'],['gripo','gr'],['prutas','pr'],['trak','tr'],['klase','kl'],['blusa','bl'],['krus','kr'],['prito','pr'],['pluma','pl'],['tren','tr'],['grado','gr']];
  clusters.forEach(([w,a])=>add('filipino','diptonggo',mc(`Anong KLASTER ang nasa simula ng “${w}”?`,a,['br','pl','gr','pr','tr','kl','bl','kr'].filter(x=>x!==a),`Ang ${a} ay dalawang magkasunod na katinig sa unang pantig ng ${w}.`)));
  [['nanay','ay'],['bahay','ay'],['tulay','ay'],['gulay','ay'],['sabay','ay'],['araw','aw'],['ilaw','aw'],['sabaw','aw'],['sayaw','aw'],['baboy','oy'],['kasuy','uy'],['reyna','ey']].forEach(([w,a])=>add('filipino','diptonggo',mc(`Anong DIPTONGGO ang nasa salitang “${w}”?`,a,['ay','aw','oy','uy','ey','iw'].filter(x=>x!==a),`Sa ${w}, ang ${a} ay patinig at w o y sa iisang pantig.`)));
  const rhymes=[['bata','mata'],['mata','bata'],['sabay','tulay'],['tulay','sabay'],['araw','sayaw'],['sayaw','araw'],['ilaw','sabaw'],['sabaw','ilaw'],['baso','kaso'],['kaso','baso'],['bato','pato'],['pato','bato'],['pusa','kusa'],['kusa','pusa'],['gatas','batas'],['batas','gatas'],['ulat','sulat'],['sulat','ulat'],['tulog','hulog'],['hulog','tulog']];
  rhymes.forEach(([w,a])=>add('filipino','tugma',mc(`Piliin ang salitang katugma ng “${w}”.`,a,['mesa','ibon','puno','saging','sapatos'].filter(x=>x!==a),`Magkatugma ang ${w} at ${a}: magkahawig ang tunog sa hulihan.`)));
  const filSentences=[['aso','Salita'],['lapis','Salita'],['aklat','Salita'],['bahay','Salita'],['saging','Salita'],['sa tabi ng puno','Parirala'],['ang pulang bag','Parirala'],['sa loob ng kahon','Parirala'],['mga batang masaya','Parirala'],['ang malinis na mesa','Parirala'],['Kumakain si Ana.','Pangungusap'],['Natutulog ang pusa.','Pangungusap'],['Nagbabasa si Ben.','Pangungusap'],['Malinis ang silid.','Pangungusap'],['Mabait ang bata.','Pangungusap'],['Saan ang aklat?','Pangungusap'],['Ano ang dala mo?','Pangungusap'],['Bukas ang pinto.','Pangungusap'],['ang bagong sapatos','Parirala'],['sa ilalim ng upuan','Parirala']];
  filSentences.forEach(([s,a])=>add('filipino','pangungusap',mc(`Salita, parirala, o pangungusap?\n“${s}”`,a,['Salita','Parirala','Pangungusap'].filter(x=>x!==a),a==='Salita'?'Isang salita lamang.':a==='Parirala'?'Grupo ng salita, ngunit hindi buong pahayag.':'Buo ang diwa ng pahayag o tanong.')));

  for(let i=0;i<24;i++){
    const n=132+i*31,d=Math.floor(n/10)%10;
    add('math','numbers',numeric(`What is the VALUE of the tens digit in ${n}?`,d*10,`The tens digit is ${d}. ${d} tens = ${d*10}.`));
    const a=118+i*23,b=a+(i%2?17:-9),result=a>b?'>':'<';
    add('math','compare',mc(`Compare these numbers: ${a} ______ ${b}`,result,['>','<','='].filter(x=>x!==result),`${a} ${result} ${b}. Compare hundreds, then tens, then ones.`));
    const step=[2,5,10,20,50,100][i%6],start=(Math.floor(i/6)+1)*step;
    add('math','skip',numeric(`Add ${step} each time: ${start}, ${start+step}, ${start+2*step}, ______`,start+3*step,`Every jump is ${step}. ${start+2*step} + ${step} = ${start+3*step}.`));
    const notes=[...Array(Math.floor(i/6)+1).fill(100),...[20,50,10,5,1,200].slice(0,i%6+1)];const sum=notes.reduce((a,b)=>a+b,0);
    add('math','money',numeric('Count the play money. What is the total value in pesos?',sum,`${notes.join(' + ')} = ${sum} pesos.`,{visual:{kind:'money',notes}}));
    const x=125+i*11,y=116+i*7;
    add('math','addition',numeric(`A class collected ${x} books on Monday and ${y} on Tuesday. How many books did it collect in all?`,x+y,`${x} + ${y} = ${x+y}. Add the ones, tens and hundreds, regrouping when a column reaches ten.`,{calculation:[x,y]}));
  }
  const animals=[['🐱','cat'],['🐶','dog'],['🐰','rabbit'],['🐢','turtle'],['🐟','fish'],['🦁','lion'],['🐝','bee'],['🐴','horse'],['🦒','giraffe'],['🐷','pig'],['🐮','cow'],['🐔','chicken'],['🐐','goat'],['🐯','tiger'],['🦈','shark'],['🦆','duck'],['🐸','frog'],['🐑','sheep'],['🦊','fox'],['🐻','bear']];
  for(let i=0;i<30;i++){
    const offset=i%20,items=animals.slice(offset).concat(animals.slice(0,offset));if(i%2)items.reverse();
    const position=2+(i*7)%19,correct=items[position-1][1];
    add('math','ordinals',mc(`Start at the left. Which animal is in ${ord(position)} place?`,correct,items.filter((_,j)=>j!==position-1).map(a=>a[1]),`Count from the START, one animal at a time. ${items.slice(0,position).map((a,j)=>ord(j+1)+': '+a[1]).join('; ')}.`,{visual:{kind:'line',items}}));
  }
  window.REVIEWER_EXPAND=m=>{
    if(window.REVIEWER_OPTIONS)window.REVIEWER_OPTIONS(m);
    if(window.REVIEWER_FACT_BANKS)window.REVIEWER_FACT_BANKS(m,add,mc);
    m.topics.forEach(t=>{t.questions.push(...(banks[m.subject+'/'+t.id]||[]));});
  };
})();
