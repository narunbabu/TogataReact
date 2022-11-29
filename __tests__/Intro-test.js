import React from 'react';
import renderer from 'react-test-renderer';
// import AddHouse from '../MeasanAuthApp_Orig/app/scenes/home/AddHouse';
import Simple from '../FormExample/Simple';
// import Intro from '../Intro';
import mFormData from '../MeasanAuthApp_Orig/app/scenes/home/House/house_form';
var fs = require('fs');
var properties={'tablename':'HouseDetails',
                'migration_file':'/2022_11_09_120000_house_details_tables.php',
                'model_prefix':'hd_',
            };


var capitalize = function (k) { return k.charAt(0).toUpperCase() + k.slice(1); };

var phpfolder='./php_folder'
!fs.existsSync(phpfolder) && fs.mkdirSync(phpfolder, { recursive: true })
var schemastr='';
var downstr=`Schema::dropIfExists('${properties.tablename}');`;

const migFilecreation = function (){


//************************************************************************************ */
//// Migration file creation
var maintablestr=`Schema::create('${properties.tablename}', function (Blueprint $table) {
    $table->id();`;
mFormData.map(k=>{ //.slice(0,3)
    // console.log(k.name);
    var dbname=properties.model_prefix+k.name+'s'
    if (k.name.slice(-1)==='s') dbname=properties.model_prefix+k.name+'es';
    if (k.name.slice(-1)==='y') dbname=properties.model_prefix+k.name.slice(0,-1)+'ies';
    
    
    if (k.fieldType==='select' || k.fieldType==='radio')
    {
        maintablestr+=`     $table->tinyInteger('${k.name+'_id'}');\n`;
    schemastr+=`     
    Schema::create('${dbname}', function (Blueprint $table) {
        $table->id();
        $table->string('name');
        $table->string('label');
        $table->timestamps();
    });
    `;
    downstr+=`
    Schema::dropIfExists('${dbname}');
    `
    }else{
        maintablestr+=`     $table->string('${k.name}');\n`;
    }
return 0;
});
maintablestr+='});\n';
var phpmigrationstr=
`
<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class extends Migration
{
     public function up()
     { 
        ${maintablestr+schemastr}
    }


    public function down()
    {
        
        ${downstr}
    }
};
`
// var path=phpfolder+`database/migrations/2022_11_09_120000_house_details_tables.php`;
var path=phpfolder+`/2022_11_09_120000_house_details_tables.php`;
// fs.mkdirSync(path.split('/').slice(0,-1).join('/'))
fs.writeFile(path, phpmigrationstr, function (err) {    
    if (err)        return console.log(err);    });
//// Migration file creation
//************************************************************************************ */
}; //end function
const modelsCreation = function(){


//************************************************************************************ */
//// Models creation

    
    
mFormData.map(k=>{ //.slice(0,3)  
    if (k.fieldType==='select' || k.fieldType==='radio')
    {
        var mstr=`<?php
namespace App\\Models\\${properties.tablename};
use Illuminate\\Database\\Eloquent\\Factories\\HasFactory;
use Illuminate\\Database\\Eloquent\\Model;


class ${properties.model_prefix+k.name} extends Model
{
    use HasFactory;
    protected $fillable = ${JSON.stringify(['id','name','label'])};
}`;
!fs.existsSync(phpfolder+'/Models') && fs.mkdirSync(phpfolder+'/Models', { recursive: true })
!fs.existsSync(phpfolder+'/Models/'+properties.tablename) && fs.mkdirSync(phpfolder+'/Models/'+properties.tablename, { recursive: true })
    fs.writeFile(phpfolder+`/Models/${properties.tablename}/${properties.model_prefix+k.name}.php`, mstr, function (err) {
        if (err) {
            return console.log(err);
        }
        // console.log("The file was saved!");
        });
        return 0;
        
    }

});
//// Models creation
//************************************************************************************ */
}; //end function

const seederCreation= function(){


//************************************************************************************ */
//// Seeder file creation
var import_str='';
mFormData.map(k=>{

    if (k.fieldType==='select' || k.fieldType==='radio')          
        import_str += `use App\\Models\\${properties.tablename}\\${properties.model_prefix+k.name};\n`;
});

var bigstr=`<?php

namespace Database\\Seeders;

use Illuminate\\Database\\Console\\Seeds\\WithoutModelEvents;
use Illuminate\\Database\\Seeder;
${import_str}

class ${properties.tablename}TableSeeder extends Seeder
{
    public function run()
    { 
    `;
    

var local_str=mFormData.map(k=>{ //.slice(0,3)
    if (k.fieldType==='select' || k.fieldType==='radio')
    {
        var mstr=`
        /**
        * ${properties.model_prefix+k.name}
        */
        $items = [ \n`;
       k.data.map(d=>{mstr+= `          ['id' => ${d.id}, 'name' => '${d.value}', 'label' => '${d.label}'], \n`}) ;
       mstr+=`          ];
        foreach ($items as $item) {
            \\App\\Models\\${properties.tablename}\\${properties.model_prefix+k.name}::create($item);
        }    
        
    `;
        return mstr;
        
    }
    else{
        return '';
    }
});
// console.log(local_str);
bigstr+=local_str.join(''); //.replace(',','')
bigstr+=`    }
}`;

fs.writeFile(phpfolder+"/"+properties.tablename+"TableSeeder.php", bigstr, function (err) {
    if (err)         return console.log(err);
    // console.log("The file TableSeeder was saved!");
});


//// Seeder file creation
//************************************************************************************ */
}; //end function



const validationCreation= function (){


var valmstr='export default { \n';
// mFormData.map(k=>{
//   if (k.fieldType!=='input' || k.fieldType!=='date')
//     {valmstr+=`register('${k.name}', validation.${k.name});\n`;}
//   // console.log(mstr);
// });

mFormData.map(k=>{
    valmstr+=` ${k.name}: {
    required: {value: true, message: '${capitalize(k.name)} is required'},
  },
  `;
});
valmstr+='};'
fs.writeFile(phpfolder+'/'+properties.tablename+"_validation.tsx", valmstr, function (err) {
    if (err)         return console.log(err);
    // console.log("The validation file was saved!");
});
// console.log(mstr);
};
const printfields=function(){
    var valmstr='export default { \n';
    mFormData.map(k=>{
        if (k.fieldType==='select' || k.fieldType==='radio')
        valmstr+=` ${k.name}:'${k.data[0].value}', \n`
        else valmstr+=` ${k.name}:'', \n`
    //    console.log(k.name);
    });
    valmstr+='};'
    fs.writeFile(phpfolder+'/'+"set_values.tsx", valmstr, function (err) {
        if (err)         return console.log(err);
        // console.log("The validation file was saved!");
    });
    console.log(valmstr);
};

// migFilecreation();
// modelsCreation();
// seederCreation();
// validationCreation();
printfields();


test('renders correctly', () => {
    // console.log(mFormData);
    // console.log(bigstr); .replaceAll(',','')
  const tree = renderer.create(<Simple />).toJSON();        
//   console.log(tree);
  expect(tree).toMatchSnapshot();
});