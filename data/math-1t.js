/* Sources: 1st Trim REVIEWER (20 questions + key), Math Quizzes 1.1, 2, 3.
   Fresh examples practise the same skills. Arithmetic is checked in tests/content.cjs. */
(function(){
  const mc=(q,choices,answer,why,extra={})=>({type:'mc',q,choices:choices.map(String),answer,why,emoji:'🔢',...extra});
  const input=(q,answer,why,extra={})=>({type:'input',q,answer:String(answer),numeric:true,why,emoji:'✏️',...extra});
  const order=(q,values,answer,why)=>({type:'build',q,tiles:values.map(String),answer:answer.join(', '),join:', ',why,emoji:'🚂'});
  const topics=[
    {id:'numbers',title:'Numbers & place value',emoji:'🧱',intro:'Read hundreds, then tens, then ones. Place means the digit’s position; value means how much it stands for.',questions:[
      mc('Write four hundred twenty-six in figures.',[426,462,642,264],0,'Four hundreds = 400, two tens = 20, six ones = 6. Together: 426.'),
      mc('How do you write 378 in words?',['Seven hundred thirty-eight','Three hundred seventy-eight','Three hundred eighty-seven','Eight hundred thirty-seven'],1,'The digits show 3 hundreds, 7 tens and 8 ones.'),
      mc('What is the VALUE of the digit 7 in 574?',[700,70,7,574],1,'The 7 is in the tens place. Seven tens = 70.'),
      mc('Which number has 3 hundreds, 7 tens and 0 ones?',[307,370,37,703],1,'300 + 70 + 0 = 370. Zero keeps the ones place.'),
      mc('How do you write three hundred four?',[343,340,334,304],3,'Three hundreds and four ones make 304. There are zero tens.'),
      mc('Which number matches the blocks?',[453,543,463,435],0,'4 hundreds + 5 tens + 3 ones = 453.',{visual:{kind:'blocks',values:[4,5,3]}}),
      mc('Which number-and-name pair is correct?',['620 — six two zero','603 — six hundred thirty','609 — six hundred nine','639 — six hundred ninety-three'],2,'609 has 6 hundreds, 0 tens and 9 ones: six hundred nine.'),
      input('I have 7 hundreds, no tens and 8 ones. What number am I?',708,'700 + 0 + 8 = 708.'),
      mc('Which number matches the blocks?',[824,834,844,854],1,'8 hundreds + 3 tens + 4 ones = 834.',{visual:{kind:'blocks',values:[8,3,4]}}),
      mc('Which is an expanded form of 906?',['90 + 6','900 + 6','900 + 60','900 + 10 + 6'],1,'906 = 900 + 0 + 6. The zero tens may be left out of the sum.'),
      mc('What is the PLACE of the digit 7 in 257?',['Ones','Tens','Hundreds','Thousands'],0,'The rightmost digit is in the ones place.'),
      mc('Which digit is in the highest place in 483?',[4,8,3,7],0,'The hundreds place is the highest place in this three-digit number. Its digit is 4.'),
      mc('Which number has a tens digit with a VALUE of 30?',[43,306,435,653],2,'435 has 3 in its tens place: 3 tens = 30.'),
      mc('In 527, why is the value of the tens digit greater than the value of the ones digit?',['20 is greater than 7.','2 is greater than 7.','7 is greater than 20.','The values are equal.'],0,'Compare the values, not just the digits: 2 tens = 20 and 7 ones = 7.'),
      input('Write one thousand in figures.',1000,'One thousand is written as 1 followed by three zeros: 1000.'),
      input('Write 600 + 20 + 9 as one number.',629,'6 hundreds, 2 tens and 9 ones make 629.'),
    ]},
    {id:'ordinals',title:'Ordinals & positions',emoji:'🏁',intro:'Ordinals tell position. Read where the line starts before you count.',questions:[
      mc('What position comes immediately after 3rd?',['2nd','4th','5th','6th'],1,'The positions go 1st, 2nd, 3rd, 4th.'),
      mc('Ken is 18th and Pablo is 20th in a line. You are the one person between them. What is your position?',['17th','18th','19th','20th'],2,'18th, 19th, 20th: the middle position is 19th.'),
      mc('Which is the seventh month of the year?',['April','June','July','October'],2,'January is 1st, February 2nd, March 3rd, April 4th, May 5th, June 6th and July 7th.'),
      mc('Lara celebrated her 16th birthday two years ago. Which birthday will she celebrate this year?',['17th','18th','19th','20th'],1,'One year later was her 17th birthday. Two years later is her 18th.'),
      mc('You are in 10th place in a race. You pass exactly three runners ahead of you. What is your new place?',['3rd','7th','9th','13th'],1,'Passing three runners takes you from 10th to 9th, then 8th, then 7th.'),
      mc('There are 20 runners. Which position comes immediately after 15th?',['14th','18th','17th','16th'],3,'15th is followed by 16th.'),
      mc('Count from START on the left. Which animal is 8th?',['Bee','Lion','Giraffe','Horse'],3,'Count in order from the left. Horse is in position 8.',{visual:{kind:'line',items:[['🐱','cat'],['🐶','dog'],['🐰','rabbit'],['🐢','turtle'],['🐟','fish'],['🦁','lion'],['🐝','bee'],['🐴','horse'],['🦒','giraffe'],['🐷','pig'],['🐮','cow'],['🐔','chicken'],['🐐','goat'],['🐯','tiger'],['🦈','shark']]}}),
      mc('Which ordinal means “twentieth”?',['12th','2nd','20th','10th'],2,'Twentieth is written 20th.'),
      mc('Which position comes immediately before 12th?',['13th','11th','10th','2nd'],1,'The positions go 10th, 11th, 12th.'),
      mc('A book is 6th from the left. The book immediately to its right is in which position from the left?',['5th','7th','4th','8th'],1,'Moving one place to the right while counting from the left adds one position: 7th.'),
    ]},
    {id:'compare',title:'Compare & order',emoji:'⚖️',intro:'Compare hundreds first. If they match, compare tens, then ones. The open side of > or < faces the greater number.',questions:[
      mc('Choose the sign: 426 ______ 462',['>','<','=','+'],1,'The hundreds match. Compare tens: 2 tens is less than 6 tens, so 426 < 462.'),
      mc('Which list goes from GREATEST to LEAST?',['215, 251, 512','512, 251, 215','251, 215, 512','512, 215, 251'],1,'512 is greatest. Between 251 and 215, 251 is greater because 5 tens is more than 1 ten.'),
      mc('Kim says 350 is greater than 305. Which explanation is correct?',['350 < 305','350 > 305 because 5 tens is more than 0 tens.','350 = 305','350 > 305 because 0 is greater than 5.'],1,'The hundreds match. 50 is greater than 0, so 350 is greater.'),
      mc('Which number is greatest?',[365,355,306,356],0,'All have 3 hundreds. 365 has 6 tens; the others have 5 or 0 tens.'),
      order('Tap the numbers from SMALLEST to BIGGEST.',[523,352,235,253],[235,253,352,523],'Compare hundreds, then tens: 235 < 253 < 352 < 523.'),
      mc('Which number is NOT between 476 and 486?',[477,481,487,485],2,'487 is greater than 486, so it is outside the interval.'),
      mc('Ella says 709 < 690 because 0 < 9. What did she forget?',['Compare the ones first.','Compare the hundreds first.','Always choose the number with 9.','Ignore the hundreds.'],1,'7 hundreds is more than 6 hundreds, so 709 > 690. We only compare tens when hundreds match.'),
      mc('Josh wrote 458 > 485. Is he correct?',['Yes, because both start with 4.','Yes, because 8 is greater than 5.','No, 458 is less than 485.','No, the numbers are equal.'],2,'The hundreds match. Compare tens: 5 < 8, so 458 < 485.'),
      mc('Choose the sign: 608 ______ 608',['<','>','='],2,'Both numbers have exactly the same value.'),
      order('Tap the numbers from GREATEST to LEAST.',[901,109,910,190],[910,901,190,109],'Start with 9 hundreds. Compare their tens: 910 > 901. Then 190 > 109.'),
      mc('Which number is smallest?',[700,670,607,760],2,'The numbers with 6 hundreds are smaller. Between 607 and 670, 607 has fewer tens.'),
      order('Tap these three numbers from LEAST to GREATEST.',[450,405,540],[405,450,540],'405 has fewer tens than 450; 540 has more hundreds than both.'),
    ]},
    {id:'skip',title:'Skip-counting trails',emoji:'🐸',intro:'Look for equal jumps. Practise counting by 2, 5, 10, 20, 50 and 100.',questions:[
      mc('Count by 20s: 20, 40, 60, 80, ______',[85,90,100,120],2,'Add 20 to 80: the next number is 100.'),
      mc('50, 100, 150, 200. How much is added each time?',[10,20,50,100],2,'100 − 50 = 50. Every jump adds 50.'),
      input('Count by 20s: 120, 140, 160, ______',180,'160 + 20 = 180.'),
      mc('The rule is “start at 50 and add 10.” Which number breaks the pattern: 50, 60, 70, 85, 90?',[60,70,85,90],2,'After 70, adding 10 should give 80, not 85.'),
      input('When counting by 2s, what comes after 12?',14,'12 + 2 = 14.'),
      mc('Which list counts by 50s?',['50, 100, 150, 200','50, 100, 105, 150','50, 100, 150, 175','50, 110, 150, 200'],0,'In 50, 100, 150, 200, each number is 50 more than the one before it.'),
      input('Count by 10s: 60, 70, 80, ______, 100',90,'80 + 10 = 90, and 90 + 10 = 100.'),
      mc('I am greater than 15 but less than 25. You say me when counting from 0 by 5s and by 10s. What am I?',[10,20,30,40],1,'20 lies between 15 and 25 and belongs to both counting patterns.'),
      mc('There are 4 packs with 10 eggs in each pack. Which list counts the totals after each pack?',['10, 15, 20, 24','10, 20, 30, 40','10, 12, 14, 16','10, 20, 40, 60'],1,'Add 10 eggs per pack. Four packs give 40 eggs.'),
      mc('Sky counts 50, 100, 150…500. Matt counts 100, 200, 300…500. Who says fewer numbers?',['Sky','Matt','They say the same number of numbers'],1,'Matt says 5 numbers; Sky says 10. Bigger jumps reach 500 in fewer steps.'),
      mc('The rule is “start at 0 and add 10.” Why does 65 not belong?',['It is too big.','It is too small.','Every number in this pattern ends in 0.','65 is even.'],2,'Starting at 0 and adding 10 gives 10, 20, 30…60, 70. 65 is between two steps.'),
      input('Count by 100s: 300, 400, 500, ______',600,'Each jump adds one hundred: 500 + 100 = 600.'),
      input('Count by 5s: 25, 30, 35, ______',40,'35 + 5 = 40.'),
      input('Count by 2s: 18, 20, 22, ______',24,'22 + 2 = 24.'),
      input('Count by 50s: 250, 300, 350, ______',400,'350 + 50 = 400.'),
    ]},
    {id:'money',title:'Peso pocket',emoji:'💵',intro:'Add the value of the money, not just the number of bills or coins.',questions:[
      mc('What is the total value of this play money?',[220,250,320,350],2,'₱100 + ₱100 + ₱100 + ₱20 = ₱320.',{inputLabel:'Pesos',visual:{kind:'money',notes:[100,100,100,20]}}),
      mc('Josh has one ₱200 bill. Ken has ten ₱20 coins. Who has more?',['They have equal amounts.','Josh','Ken'],0,'Ten ₱20 coins total ₱200, the same as one ₱200 bill.'),
      input('You have two ₱100 bills and one ₱50 bill. How many pesos do you have?',250,'100 + 100 + 50 = 250 pesos.',{visual:{kind:'money',notes:[100,100,50]}}),
      mc('Which amount equals one ₱100 bill?',['Two ₱20 coins','Five ₱20 coins','Three ₱20 coins','Four ₱20 coins'],1,'Count by 20s: 20, 40, 60, 80, 100. Five coins make ₱100.'),
      input('Count the play money. Write the total number of pesos.',170,'100 + 50 + 20 = 170 pesos.',{visual:{kind:'money',notes:[100,50,20]}}),
      mc('Ana has ₱150. Ben has ₱105. Who has more money?',['Ana','Ben','They have equal amounts.'],0,'₱150 > ₱105. Compare the tens after matching the hundreds.'),
      input('A snack costs ₱35. You pay ₱50. How many pesos should you get back?',15,'35 + 15 = 50, so your change is ₱15.'),
      mc('Which group totals ₱200?',['₱100 + ₱50','₱100 + ₱100','₱50 + ₱20','₱200 + ₱20'],1,'100 + 100 = 200. The other totals are 150, 70 and 220.'),
      input('You have ₱120 and save another ₱50. How many pesos do you have now?',170,'120 + 50 = 170 pesos.'),
      input('You need ₱300 for a class project. You have ₱250. How many more pesos do you need?',50,'250 + 50 = 300, so you need ₱50 more.'),
    ]},
    {id:'addition',title:'Addition & number stories',emoji:'➕',intro:'Line up hundreds, tens and ones. Regroup 10 ones as 1 ten, or 10 tens as 1 hundred.',questions:[
      mc('Which property is shown by 9 + 0 = 9?',['Commutative','Associative','Identity','Skip-counting'],2,'The identity property says adding zero leaves the number unchanged.'),
      mc('Which property is shown by 9 + 7 = 7 + 9?',['Identity','Commutative','Associative','Ordinal'],1,'Commutative means we can switch the order of the addends without changing the sum.'),
      mc('Carla says 7 + 0 = 0. Which correction is right?',['7 + 0 = 7','7 + 0 = 1','7 + 0 = 8','Carla is correct.'],0,'Adding zero adds nothing. The amount stays 7.'),
      mc('Which property is shown by (2 + 3) + 4 = 2 + (3 + 4)?',['Identity','Commutative','Associative'],2,'The grouping changes, but the order 2, 3, 4 stays the same. Both sides equal 9.'),
      input('What is 432 + 215?',647,'Ones: 2 + 5 = 7. Tens: 3 + 1 = 4. Hundreds: 4 + 2 = 6. Sum: 647.',{calculation:[432,215]}),
      input('Ana saved ₱275 and her brother saved ₱158. How many pesos did they save in all?',433,'Ones: 5 + 8 = 13, regroup 1 ten. Tens: 7 + 5 + 1 = 13, regroup 1 hundred. Hundreds: 2 + 1 + 1 = 4. Total: ₱433.',{calculation:[275,158]}),
      input('The class gave ₱265 last week and ₱178 this week. Its target is ₱500. How many MORE pesos are needed?',57,'First add: 265 + 178 = 443. Then 443 + 57 = 500, so ₱57 more is needed.'),
      mc('Which number sentence solves this story?\nThere are 124 red beads and 132 blue beads. How many beads are there in all?',['124 − 132','124 + 132','132 − 124'],1,'“In all” asks us to join the two groups, so add 124 and 132.'),
      input('What number goes in the blank? 46 + ______ = 46',0,'Only zero can be added to 46 without changing it.'),
      input('What number goes in the blank? 28 + 15 = 15 + ______',28,'Switch the same two addends: 28 and 15.'),
      ...[[123,245],[356,127],[208,141],[467,215],[189,236],[305,287],[444,126],[580,120],[99,101],[268,157]].map(([a,b])=>{
        const ones=a%10+b%10, carryTen=Math.floor(ones/10);
        const tens=Math.floor(a/10)%10+Math.floor(b/10)%10+carryTen, carryHundred=Math.floor(tens/10);
        const hundreds=Math.floor(a/100)+Math.floor(b/100)+carryHundred;
        return input(`Find the sum: ${a} + ${b}`,a+b,`Ones total ${ones}: write ${ones%10}${carryTen?', carry 1 ten':''}. Tens total ${tens}${carryTen?' including the carried ten':''}: write ${tens%10}${carryHundred?', carry 1 hundred':''}. Hundreds total ${hundreds}${carryHundred?' including the carried hundred':''}. The sum is ${a+b}.`,{calculation:[a,b]});
      }),
    ]},
  ];
  REVIEWER.register({id:'math-1t',subject:'math',title:'Math 2',subtitle:'1st Trimester · Number adventures',topics});
})();
