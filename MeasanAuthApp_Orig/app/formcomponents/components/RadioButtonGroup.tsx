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

export const RadioButtonGroup = ({name, label,items, msetValue, watch,valuetokeep, error}: Props) => {
  const value = watch(name);
  const [mvalue, setValue] = useState('');
  const [checked, setChecked] = useState('');
  const selectHandler = (v:string) => {
    // onSelect(value);
    msetValue(name, v, {shouldValidate: true})
    setChecked(v);
    setValue(v);

  };
  // React.useEffect(() => {
  //   selectHandler(items[0].id);
   
  // }, []);
  return (

<View style={styles.container}>
{label && <Text style={[styles.label,{color: error ? '#fc6d47' : '#c0cbd3'}]}>{label} </Text>}
<Text style={styles.textError}>{error && error.message}</Text>
<View style={{ flexDirection: 'row', alignContent: 'center' }}>

{items.map((item:any) =>
               
                <View style={{ flexDirection: 'row', alignSelf: 'center' }} key={item.id}>
                  
                  <RadioButton
                   uncheckedColor='#c0cbd3'
                    value={item.id} 
                    status={checked === item.id  ? 'checked' : 'unchecked'}
                    onPress={() => selectHandler(item.id)}
                  />
                  <Text style={styles.text}>{item.label}</Text>
                  <Text style={styles.text}>   </Text>
                  {/* <View style={{ flex: 1, alignSelf: 'center' }}>
                  <Text style={styles.text}>{item.label}</Text>
                </View> */}
                {/* </View> */}
                </View>)
}
</View>

 {/* <RadioButton.Group  style={{flexDirection: "row", width: "30%" }}
  size={24} onValueChange={(value) =>selectHandler(value) } value={mvalue}>
 <Text style={styles.textError}>{error && error.message}</Text>
   {items.map((item:any) =><RadioButton.Item key={item.id} mode ='android' position='leading' 
   uncheckedColor='#c0cbd3'  label={item.label} value={item.id} labelStyle={styles.text} />)}
</RadioButton.Group> */}
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
    fontSize: 18,

    // height: 20,
    paddingTop: 6,
    color: '#c0cbd3',
    paddingLeft: 8,

    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
    // backgroundColor: "oldlace",
    alignSelf: "flex-start",
    // marginHorizontal: "1%",
    // marginBottom: 6,
    // minWidth: "48%",
    textAlign: "center",
  },
  textError: {
    paddingVertical: 6,
    color: '#fc6d47',
    fontSize: 14,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});


