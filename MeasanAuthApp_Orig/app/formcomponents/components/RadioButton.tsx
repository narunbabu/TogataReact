import React, {useState} from 'react';
import {Pressable} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {FieldError} from 'react-hook-form';
import {View, Text, StyleSheet, TextInputProps} from 'react-native';
import { RadioButton } from 'react-native-paper';

type ValueOptions = {
  shouldValidate?: boolean;
};

interface Props extends TextInputProps {
  name: string;
  label: string;
  items:any;
  msetValue: (name: string, value: string, options?: ValueOptions) => void;
  watch: any;
  valuetokeep:boolean;
  error?: FieldError | undefined;
}

export const RadioButtonL = ({name, label,items, msetValue, watch, valuetokeep, error}: Props) => {
  const value = watch(name);
  const [mvalue, setValue] = useState(valuetokeep?'':'');
  const selectHandler = (v:string) => {
    // onSelect(value);
    msetValue(name, v, {shouldValidate: true})

    setValue(v);

  };
  return (

<View style={styles.container}>
{label && <Text style={[styles.label,{color: error ? '#fc6d47' : '#c0cbd3'}]}>{label} </Text>}

 <RadioButton.Group  style={{flexDirection: "row", width: "30%" }}
  size={24} onValueChange={(value) =>selectHandler(value) } value={mvalue}>
 <Text style={styles.textError}>{error && error.message}</Text>
   {items.map((item:any) =><RadioButton.Item key={item.id} mode ='android' position='leading' 
   uncheckedColor='#c0cbd3'  label={item.label} value={item.id} labelStyle={styles.text} />)}
</RadioButton.Group>
</View> 
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 1,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  label: {
    paddingVertical: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#c0cbd3',
  },
  text: {
    fontSize: 14,

    // height: 20,
    // paddingTop: 2,
    color: '#c0cbd3',
    // paddingLeft: 8,

    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    // backgroundColor: "oldlace",
    alignSelf: "flex-start",
    marginHorizontal: "1%",
    marginBottom: 6,
    minWidth: "48%",
    textAlign: "center",
  },
  textError: {
    color: '#fc6d47',
    fontSize: 14,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});


