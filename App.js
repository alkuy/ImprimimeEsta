import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import {  BLEPrinter } from "react-native-thermal-receipt-printer";
import {Picker} from '@react-native-picker/picker';


const pru = [1,2];

export default function App() {
  const [printers, setPrinters] = useState(pru);
  const [currentPrinter, setCurrentPrinter] = useState();

  useEffect(() => {
    BLEPrinter.init().then(()=> {
      BLEPrinter.getDeviceList().then(setPrinters);
    });
  }, []);

  const connectPrinter = (printer) => {
    //connect printer
    BLEPrinter.connectPrinter(printer.inner_mac_address).then(
      setCurrentPrinter,
      error => console.warn(error))
  }

  printTextTest = () => {
    currentPrinter && USBPrinter.printText("<C>sample text</C>\n");
  }

  printBillTest = () => {
    currentPrinter && USBPrinter.printBill("<C>sample bill</C>");
  }

  PreparaPrinter = () => {
    return (
      <View style={styles.pickerStyle}>
        <Picker
            selectedValue={printers}
            style={{ height: 30 }}
            onValueChange={(itemValue) => connectPrinter(itemValue)}
        >
        {printers.map(printer => {
            return (<Picker.Item  label={printer.device_name} value={printer.device_name} key={printer.inner_mac_address}/>) 
        })}
        </Picker>
      </View>
    )
    //printers = printers.map(printer => {return ({device_name: printer.device_name, inner_mac_address: printer.inner_mac_address})})
  }
  
  return (
    <View style={styles.container}>
      <PreparaPrinter/>
      <Text style={styles.text}>Canario imprimime esta: Nacional Segundon!</Text>
      <View style={styles.but}>
        <Button title='Imprime Texto' onPress={printTextTest}/>
      </View>
      <View style={styles.but}>
        <Button style={styles.but} title='Imprime recibo' onPress={printBillTest}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  but: {
    alignItems: 'center',
    marginTop: 20,
  },
  pickerStyle: {
    borderWidth: 1,
    borderColor: '#164869',
    borderRadius: 6,
    marginHorizontal: 2,
    width: '50%',
    height: 50,
    marginBottom: 10,
},
});
