var mstr=`const FormData = {
    name: {type:'string',label:'Name',fieldType:'input',data:[]},
    email: {type:'string',label:'Email',fieldType:'input',data:[]},
    password: {type:'string',label:'Password',fieldType:'input',data:[]},
    date: {type:'string',label:'Date of Birth',fieldType:'date',data:[]},
    gender: {type:'string',label:'Gender',fieldType:'select',data:[{id:'1',label: 'Female', value: 'female'}, {id:'2',label: 'Male', value: 'male'},{id:'3',label: 'Other', value: 'other'},  ]},
    option:{type:'string',label:'Company',fieldType:'radio',data :[
      {id:'1', value: 'Apple',label: 'Apple' },
      { id:'2',value: 'Samsung' ,label: 'Samsung'},
      {id:'3', value: 'Blackberry',label: 'Blackberry' },
    ]},
  };

  `
//   var jsontext = '{"firstname":string,"surname":"Bond","mobile":["007-700-007","001-007-007-0007"]}';  

//   var contact = JSON.parse(jsontext);  
//   type FormData = {
//     name: string;
//     email: string;
//     password: string;
//     date: string;
//     gender: string;
//     option:string;
//   };
 eval (mstr)
  console.log(e);
//   console.log(contact.firstname + " " + contact.surname);  
  
//   console.log(contact.mobile[1]);  
//   FormData.map(k=>console.log(k));
// Object.keys(FormData).map(k=>console.log(FormData[k]))
// console.log(array);


