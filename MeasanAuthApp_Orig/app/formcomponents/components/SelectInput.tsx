import React, {useState} from 'react';
import {Pressable} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {FieldError} from 'react-hook-form';
import {View, Text, StyleSheet, TextInputProps} from 'react-native';

type ValueOptions = {
  shouldValidate?: boolean;
};

interface Props extends TextInputProps {
  name: string;
  label: string;
  items:any;
  setValue: (name: string, value: string, options?: ValueOptions) => void;
  watch: any;
  valuetokeep:boolean;
  error?: FieldError | undefined;
}

export const SelectInput = ({name, label,items, setValue, watch, valuetokeep,error}: Props) => {
  const value = watch(name);
  const [dropdownvalue, setDropdownvalue] = useState({dropdownValue: items[0].label});
  // React.useEffect(() => {
  //   // setValue(name, items[0].value, {shouldValidate: true});
  //   console.log('select',name,dropdownvalue);
  //   setValue(name, items[0].label, {shouldValidate: true})
   
  // }, []);
  return (
    <View style={styles.container}>
      {label && <Text style={[styles.label]}>{label}</Text>}
      <View
        style={[styles.input, {borderColor: error ? '#fc6d47' : '#c0cbd3'}]}>
       {valuetokeep?<RNPickerSelect
        placeholder={{}}
          style={pickerSelectStyles}
          onValueChange={(v) => setValue(name, v, {shouldValidate: true})}
          items={items} />
          :<RNPickerSelect
            style={pickerSelectStyles}
            onValueChange={(v) => setValue(name, v, {shouldValidate: true})}
            items={items} />
        }
      </View>
      <Text style={styles.textError}>{error && error.message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  input: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 5,
    paddingLeft: 5,
    fontSize: 16,
    height: 40,
    color: '#c0cbd3',
    borderColor: '#c0cbd3',
    justifyContent: 'center',
  },
  label: {
    paddingVertical: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#c0cbd3',
  },
  text: {
    fontSize: 16,
    height: 40,
    paddingTop: 10,
    color: '#c0cbd3',
    paddingLeft: 8,
  },
  textError: {
    color: '#fc6d47',
    fontSize: 14,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    borderStyle: 'solid',
    borderRadius: 5,
    // paddingVertical: 5,
    paddingLeft: 5,
    fontSize: 16,
    height: 40,
    color: '#c0cbd3',
    borderColor: '#c0cbd3',
    justifyContent: 'center',
  },
  inputAndroid: {
    borderStyle: 'solid',
    borderRadius: 5,
    paddingVertical: 5,
    paddingLeft: 5,
    fontSize: 16,
    height: 40,
    color: '#c0cbd3',
    borderColor: '#c0cbd3',
    justifyContent: 'center',
  },
});
