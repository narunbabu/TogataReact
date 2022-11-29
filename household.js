
const mFormData = [
    {name: 'name', type:'string',label:'Name:',fieldType:'input'},
     {name: 'relation_to_hoh',type:'string',label:'Relation to the head of house:',fieldType:'select',
     data:[{id:'1',label: 'Self', value: 'self'}, 
            {id:'2',label: 'Wife', value: 'wife'},
            {id:'3',label: 'husband', value: 'husband'}, 
            {id:'4',label: 'Son', value: 'son'}, 
            {id:'5',label: 'Daughter', value: 'daughter'}, 
            {id:'6',label: 'Father', value: 'father'},
            {id:'7',label: 'Mother', value: 'mother'}, 
            {id:'8',label: 'Brother', value: 'brother'}, 
            {id:'9',label: 'Syster', value: 'syster'}, 
            {id:'10',label: 'Other', value: 'other'}, 
       ]},
       {name: 'gender',type:'string',label:'Gender',fieldType:'select',
       data:[{id:'1',label: 'Female', value: 'female'}, 
            {id:'2',label: 'Male', value: 'male'},
            {id:'3',label: 'Other', value: 'other'},  ]},
      {name: 'aadhaar', type:'string',label:'Aadhaar Number:',fieldType:'input'},
      {name: 'rationcard', type:'string',label:'Ration card Number:',fieldType:'input'},
      {name: 'mobile', type:'string',label:'Mobile Number:',fieldType:'input'},
      {name: 'date',type:'string',label:'Date of Birth',fieldType:'date'},
      {name: 'education',type:'string',label:'Educational qualification',fieldType:'select',
            data:[{id:'1',label: 'No Education', value: 'nil'}, 
            {id:'2',label: 'Below 10th Class', value: 'under_10th'},
            {id:'3',label: '10th Pass', value: '10th_pass'},
            {id:'4',label: 'Undergraduate', value: 'undergraduate'},
            {id:'5',label: 'Masters', value: 'masters'},
            {id:'6',label: 'Docterate', value: 'doctors'},]},
      {name: 'profession',type:'string',label:'Profession:',fieldType:'select',
            data:[{id:'1',label: 'Studying', value: 'study'},
            {id:'2',label: 'Searching for a Job', value: 'unemployed'},
            {id:'3',label: 'Government Employee', value: 'gvt_emp'}, 
            {id:'4',label: 'Private Employee', value: 'pvt_emp'},
            {id:'5',label: 'Small time Pvt Employee', value: 'small_pvt_emp'},
            {id:'6',label: 'Agriculture Farmer', value: 'farmer'},            
            {id:'7',label: 'Daily wage worker', value: 'daily_worker'},
            {id:'8',label: 'Self Employee/ Cheneta worker/Tailor', value: 'self_emp'},
            {id:'9',label: 'Business owner', value: 'business'},
            {id:'10',label: 'Other', value: 'other'},]},
      {name: 'staying_at_home',type:'string',label:'Staying at Home?',fieldType:'radio',
      data:[{id:'1',label: 'Yes', value: 'yes'}, 
            {id:'2',label: 'No', value: 'no'} ]},
      {name: 'earnings', type:'string',label:'Average Earning per year:',fieldType:'input'},

      {name: 'staying_in_india',type:'string',label:'Staying in India?',fieldType:'radio',
      data:[{id:'1',label: 'Yes', value: 'yes'}, 
            {id:'2',label: 'No', value: 'no'} ]},
      {name: 'staying_in_state',type:'string',label:'Staying in home state?',fieldType:'radio',
      data:[{id:'1',label: 'Yes', value: 'yes'}, 
            {id:'2',label: 'No', value: 'no'} ]},
  ];
var capitalize = function (k) { return k.charAt(0).toUpperCase() + k.slice(1); };
mFormData.map(k=>{
  mstr=` ${k.name}: {
    required: {value: true, message: '${capitalize(k.name)} is required'},
  },`;
//   mstr=` ${k.name}: string; `;
//   mstr=`register('${k.name}', validation.${k.name});`
//   if (k.fieldType!=='input')
  console.log(mstr);
});
var mstr='';
mFormData.map(k=>{
  if (k.fieldType!=='input')
    mstr+=`register('${k.name}', validation.${k.name});\n`
  // console.log(mstr);
});
// console.log(mstr);
