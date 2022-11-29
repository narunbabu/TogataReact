import * as React from 'react';
import {View, StyleSheet, Button, Alert, StatusBar,TextInputProps} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {useForm} from 'react-hook-form';
import { useState } from "react";
import {Input, Form, DatePickerInput, SelectInput, RadioButtonL,RadioButtonGroup} from './components';
// import RadioButtonL from './components/RadioButton';
// import validation from './house_validation';
// import mFormData from '../scenes/home/House/house_form';
import Hero from './Hero';

type ButtonProps = {
  mFormData : any;
  validation: any;
  onSubmitData: (params: any) => any;
};
type FormData = {
  // wardno: string; 
};

export default ({mFormData, validation, onSubmitData,Extracomp,navigation}: ButtonProps) => {
  // export default () => {
  const {handleSubmit, register, setValue, errors, watch} = useForm<FormData>();
  const [option, setOption] = useState(null);
  const valuetokeep=false;
  const onSubmit = (data: FormData) => {
    onSubmitData(data);
    // Alert.alert('data', JSON.stringify(data));
  };
  
  React.useEffect(() => {

    mFormData.map(k=>{
  
      if (k.fieldType!=='input')
        register(k.name, validation[k.name]);
    });
  }, [register]);

  return (
    <>
      <StatusBar barStyle="light-content" />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        style={{backgroundColor: '#181e34'}}>
        <Hero />
        <View style={styles.formContainer}>

        { mFormData.map((element)=> 
            {         
              if (element.fieldType==='input' && element.name==='password') return (
                <Form {...{register, setValue, validation, errors} } key={element.name} >
                 
              <Input  name={element.name } label={element.label } valuetokeep={valuetokeep} secureTextEntry={true}/>
              </Form>
              )
              else if(element.fieldType==='input')return (
                <Form {...{register, setValue, validation, errors} } key={element.name} >
                 
              <Input  name={element.name } label={element.label } valuetokeep={valuetokeep} />
              </Form>

              );
              if (element.fieldType==='select')  return (<SelectInput 
                                                          key={element.name}
                                                          label={element.label }
                                                          name={element.name }
                                                          watch={watch}
                                                          items={element.data}
                                                          setValue={setValue}
                                                          valuetokeep={valuetokeep}
                                                          error={errors[element.name ]}
                                                          />);
              if (element.fieldType==='date')  return (<DatePickerInput
                                                        key={element.name}
                                                        name={element.name}
                                                        label={element.label}
                                                        watch={watch}
                                                        setValue={setValue}
                                                        valuetokeep={valuetokeep}
                                                        error={errors[element.name]}
                                                      />);
              if (element.fieldType==='radio')  return (<RadioButtonGroup
                                                         key={element.name}
                                                        label={element.label}
                                                        name={element.name}
                                                        watch={watch}
                                                        items={element.data}
                                                        msetValue={setValue}
                                                        valuetokeep={valuetokeep}
                                                        error={errors[element.name]}
                                                      />);                                       
            })
          }   
          <Button title="Submit" onPress={handleSubmit(onSubmit)} />
          <Extracomp navigation={navigation}/>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    justifyContent: 'center',
    backgroundColor: '#181e34',
    paddingHorizontal: 8,
    marginBottom: 24,
  },
  formContainer: {
    padding: 8,
    flex: 1,
  },
  button: {
    backgroundColor: 'red',
  },
});
