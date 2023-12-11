import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, View } from 'react-native';

import { Appbar, Button, Text, Dialog, Portal, Provider, TextInput, List, DataTable, FAB, PaperProvider, Paragraph, DefaultTheme } from 'react-native-paper';
import * as SQLite from 'expo-sqlite';
import { useEffect, useRef, useState } from 'react';
import React from 'react';
 
import { Notes } from '@mui/icons-material';
import MyCalendar from './MyCalendar';
import MySupplements from './mySupplements';
import MyBottomFABs from './MyBottomFABs';
import MyAbout from './myAbout';
import MyAddSupplements from './myAddSupplements';
import MyAddCalendar from './myAddCalendar';
import MyDrop from './MyDrop';
import Tutorial from './Tutorial';

import { Dimensions } from 'react-native';
import { GestureResponderEvent } from 'react-native';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const containerWidth = screenWidth * 1.0;
const containerHeight = screenHeight * 0.90;
let lastNoteId: number;
let deleteThis: number;

//ideas application in private mode (waiths confirmation that you have taken your food supplements or medicines)
//we can add a functionarlity, that it searches nearest doctor
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
//import { red } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';


interface Note2 {



}

interface Note {
  id: number;
  title: string;
  information: string;

}

interface DialogiData {
  auki: boolean;
  otsikko: string;
  teksti: string;


}

interface DialogiData2 {
  auki: boolean;
  teksti: string;
}



const db: SQLite.WebSQLDatabase = SQLite.openDatabase("muistiinpanolista.db");




db.transaction(
  (tx: SQLite.SQLTransaction) => {

    //tx.executeSql(`DROP TABLE supplement_name`);
    // tx.executeSql(`DROP TABLE myCalendar`);
   // tx.executeSql(`DROP TABLE myCalendar`);

    tx.executeSql(`
     CREATE TABLE IF NOT EXISTS myCalendar (
      id INTEGER PRIMARY KEY AUTOINCREMENT,  
      supplement_name TEXT,                    
       h_number NUMBER,                       
       d_number NUMBER,                    
       w_number NUMBER,                       
       m_number NUMBER,                       
       y_number NUMBER,                       
        createdAt  DATETIME,                  
        updatedAt  DATETIME,                   
        dose TEXT,                             
        taken TEXT                       
    ) `);



    //tx.executeSql(`DROP TABLE myCalendar`);

    tx.executeSql(`CREATE TABLE IF NOT EXISTS supplement_name (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    SUPPLEMENT_NAME TEXT,
    BRAND NUMBER,
    PURPOSE TEXT,
    DESCRIPTION TEXT,
    DOSE TEXT,
    SIDE_EFFECTS TEXT,
    EFFECT_TERMINATES TEXT,
    createdAt DATETIME,
    updatedAt DATETIME,
    free_additional_information TEXT,
    FOREIGN KEY (supplement_name) REFERENCES myCalendar(supplement_name)
 )`);

    //tx.executeSql(`DROP TABLE supplement_name`);

  },
  (err: SQLite.SQLError) => {
    ///console.log(err)
    // alert("virhe rivi 87");
  }
);
///console.log("kaikki kunnossa2");
let extractedData = {};
let timestamp2 = "";
let note_id2 = 0;


let information2 = "";
let title2 = "";
let imagedata2 = "";
let supplement_name = "";
let brand = "";
let purpose = "";
let description = "";
let dose = "";
let side_effects = "";
let effect_terminates = "";
let createdAt = "";
let updatedAt = "";
let free_additional_information = "";

 let counter = 0; 

const App: React.FC = (): React.ReactElement => {

  const [calendarLineGenerated, setCalendarLineGenerated] = useState(false);

  const generateAndSetLines = () => {
    generateCalendarLine("fake1", 10, 3, 2, 1, 2023, '15gr', 'NOT');
    setCalendarLineGenerated(true);
    counter = counter +1;
  };
  useEffect(() => {
    if (!calendarLineGenerated) {
      generateAndSetLines();
    }
  }, [calendarLineGenerated]);

  const [calendarData, setCalendarData] = useState([]);
  const [pressedStatus, setPressedStatus] = React.useState(1);

  const handleFabPress = (status: React.SetStateAction<number>) => {
    // Handle pressed status in App
   /// console.log(`FAB pressed with status: ${status}`);
    setPressedStatus(status);
  };


  const [myStatus, setMystatus] = useState(1);
  const [myTaken, setMyTaken] = useState(0);



  const [isDialogVisible, setDialogVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [currentNote, setCurrentNote] = useState(0);
  const [myFlag, setmyFlag] = useState(0);


  const generateCalendarLine = (supplement_name: string | number | null, h_number: string | number | null, d_number: string | number | null, w_number: string | number | null, m_number: string | number | null, y_number: string | number | null, dose: string | number | null, taken: string | number | null) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `INSERT INTO myCalendar (supplement_name, h_number, d_number, w_number, m_number, y_number, createdAt, updatedAt, dose, taken) VALUES (?, ?,?,?,?,?,?,?,?,?)`,
          [supplement_name, h_number, d_number, w_number, m_number, y_number, new Date().toISOString(), new Date().toISOString(), dose, taken],
          (_, { rowsAffected, insertId }) => {
            if (rowsAffected > 0) {
             /// console.log(`Row inserted into myCalendar with ID: ${insertId}`);
              alert(`Row inserted into myCalendar with ID: ${insertId}`);
            } else {
              //console.warn('No rows were inserted into myCalendar.');
              alert('No rows were inserted into myCalendar.');
            }
          },
          // (error) => {
          //   console.error('Error executing INSERT statement for myCalendar:', error);
          // }
        );
      },
      (error) => {
      ///  console.error('Error starting SQL transaction', error);
      }
    );
  };


 
  const RenderJsonTable = (data: { [s: string]: unknown; } | ArrayLike<unknown>) => {

 

    if (typeof data === 'object' && 'data' in data) {
      extractedData = (data as { data: { [s: string]: unknown } }).data;
      timestamp2 = (extractedData as { timestamp: string }).timestamp;
      supplement_name = (extractedData as { supplement_name: string }).supplement_name;
      brand = (extractedData as { brand: string }).brand;
      purpose = (extractedData as { purpose: string }).purpose;
      description = (extractedData as { description: string }).description;
      dose = (extractedData as { dose: string }).dose;
      side_effects = (extractedData as { side_effects: string }).side_effects;
      effect_terminates = (extractedData as { effect_terminates: string }).effect_terminates;
      createdAt = (extractedData as { createdAt: string }).createdAt;
      updatedAt = (extractedData as { updatedAt: string }).updatedAt;
      free_additional_information = (extractedData as { free_additional_information: string }).free_additional_information;
      information2 = (extractedData as { information: string }).information;
      title2 = (extractedData as { title: string }).title;
      title2 = (extractedData as { title: string }).title;
      imagedata2 = (extractedData as { imagedata: string }).imagedata;
      note_id2 = (extractedData as { id: number }).id;

    } else {
     /// console.error("Data does not have a 'data' property");
    }


    return (





      <View style={[styles.container, { width: containerWidth }]}>

        <div>My Calendar Component</div>
      </View>




    );
  };

 



 

  const [dialogi, setDialogi] = useState<DialogiData>({ auki: false, otsikko: "", teksti: "" });
 
  const Dialogi2 = () => {
    const [visible, setVisible] = React.useState(false);
    const showDialog2 = () => setVisible(true);
    const hideDialog2 = () => setVisible(false);


    const paluu = () => {

      //alert("paluu");
      hideDialog2();
      setDialogi({ ...dialogi, auki: false, teksti: "", otsikko: "" })
      //kuvaustiedot.tilanne = 2;


    };
    const handleFabPress = (e: GestureResponderEvent) => {
   
      const myNumber: number = currentNote;
      deleteOneOld(currentNote);

    };


    return (


      <PaperProvider>
        <View>


          <FAB
            style={styles.fabLeft}

            label="Haluatko poistaa"
            onPress={showDialog2}
          />

          <FAB
            style={styles.fabRight}

            label="Paluu listaukseen"
            onPress={paluu}
          />
          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog2} style={styles.dialogi2} >
              <Dialog.Title>Poistetaanko?</Dialog.Title>
              <Dialog.Actions>
                <FAB
                  style={styles.vahvistaNappi}

                  label="EI"
                  onPress={hideDialog2}
                />



              </Dialog.Actions>
              <Dialog.Actions>


                <FAB
                  style={styles.vahvistaNappi}

                  label="KYLLÄ"
                  onPress={handleFabPress}
                />


              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>

      </PaperProvider>



    );
  };

 

  const [notes, setNotes] = useState<Note[]>([]);
  const [images, setImages] = useState<Note[]>([]);

  const showDialog2 = () => {
    setVisible(true);
  };

  const hideDialog2 = () => {
    setVisible(false);
  };


  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [input4, setInput4] = useState("");
  const [input5, setInput5] = useState("");
  const [input6, setInput6] = useState("");
  const [input7, setInput7] = useState("");
  const [input8, setInput8] = useState("");
  const [input9, setInput9] = useState("");
  const [input10, setInput10] = useState("");



  const deleteOne = (number: number): void => {
    // alert(292);

    setCurrentNote(number);

    //kuvaustiedot.tilanne = 5;
    setDialogi({ ...dialogi, auki: true })


  }

  const deleteOneOld = (number: number): void => {



 



    db.transaction(
      (tx: SQLite.SQLTransaction) => {
        tx.executeSql(`DELETE FROM supplements WHERE id = ?`, [number],
          (_tx: SQLite.SQLTransaction, rs: SQLite.SQLResultSet) => {
            haeNotes();
          });
      },
      (err: SQLite.SQLError) => console.log(err));

  }

  const tyhjennaMuistiinpanolista = (): void => {



    db.transaction(
      (tx: SQLite.SQLTransaction) => {
        tx.executeSql(`DELETE FROM supplement_name`, [],
          (_tx: SQLite.SQLTransaction, rs: SQLite.SQLResultSet) => {

          });
      },
      (err: SQLite.SQLError) => console.log(err));



  }



  const lisaaMuistiinpano = (): void => {
    //alert(423); //this is okay
    let supplement_name = input1;
    let brand = input2;
    let purpose = input3;
    let description = input4;
    let dose = input5;
    let side_effects = input6;
    let effect_terminates = input7
    let createdAt = new Date().toISOString();
    let upDatedAt = new Date().toISOString();
    let free_additional_information = input8;
 

    let h_number = 20;
    let d_number = 1;
    let _number = 1;
    let w_number = 47;
    let m_number = 11;
    let y_number = 2023;

    let taken = "early in the evening"

    let myString2 = " tx.executeSql(`INSERT INTO supplement_name (SUPPLEMENT_NAME, BRAND, PURPOSE, DESCRIPTION, DOSE, SIDE_EFFECTS, createdAt, upDatedAt, free_additional_information) VALUES (?,?,?,?,?,?,?,?,?)`";

    console.log(myString2);


    db.transaction(
      (tx: SQLite.SQLTransaction) => {

        tx.executeSql(`INSERT INTO supplement_name (SUPPLEMENT_NAME, BRAND, PURPOSE, DESCRIPTION, DOSE, SIDE_EFFECTS, createdAt, upDatedAt, free_additional_information) VALUES (?,?,?,?,?,?,?,?,?)`, [

          supplement_name,
          brand,
          purpose,
          description,
          dose,
          side_effects,
          createdAt,
          upDatedAt,
          free_additional_information,
        ],


          (_tx: SQLite.SQLTransaction, rs: SQLite.SQLResultSet) => {
 
            // alert("fine_fine_fine");
         
          });
      },
      (err: SQLite.SQLError) => console.log(err));


 

    setDialogi({ ...dialogi, auki: false, teksti: "", otsikko: "" })
   /// haeNotes();
  }

 

  const haeNotes = (): void => {


 
    db.transaction(
      (tx: SQLite.SQLTransaction) => {
        tx.executeSql(`SELECT * FROM supplement_name`, [],
          (_tx: SQLite.SQLTransaction, rs: SQLite.SQLResultSet) => {
            setNotes(rs.rows._array);
         

          });
      },
      (err: SQLite.SQLError) => console.log(err));



    db.transaction(
      (tx) => {
        tx.executeSql(
          `SELECT MAX(id) as lastNoteId FROM supplements`,
          [],
          (tx, result) => {
            lastNoteId = result.rows.item(0).lastNoteId;

          }
        );
      },
      (error) => {
        //console.error(error);
      }
    );



  }
 
 
 

  const handleFabPressX = (e: GestureResponderEvent) => {
 
    lisaaMuistiinpano();
    setMystatus(1);

  };

  const handleFabPress2 = (e: GestureResponderEvent) => {

    //alert("Kalenteri");
    //setMystatus(2);
    // setmyFlag(2);

  };



  const handleFabPress3 = (e: GestureResponderEvent) => {

    //alert("Vahvista otettu");
    if (myTaken == 0) {
      setMyTaken(1);

      // alert("TAKEN");

    }
    else {
      setMyTaken(0);
      //alert("NOT TAKEN");
    }

    //UPDATE CALENDARTAKEN STATUS INTO DATABASE



  };

  //display calendar

  //morfthe select elsewhere
  //console.log("do select from calendar here")








  let dose = "21gr";
  //let stops_effecting="20:30";
  let taken = "YES";
  let y_number = 2023;



  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      text: "orange",
    }
  };




  return (



    <View style={styles.container}>
      {/* Case 1: List Supplements */}
      {pressedStatus === 1 && (
        // Put your logic for listing supplements here
        < >

          <View style={styles.container}>

            <MyBottomFABs onFabPress={handleFabPress} />





            <View style={[styles.container, { width: containerWidth }, { height: containerHeight }]}>
              <View style={[styles.card, { width: containerWidth }, { height: containerHeight }]}>


                <MySupplements key="some_unique_value660p" />
              </View>
            </View>
          </View>
        </>

      )}

      {/* Case 2: Display Add Supplement */}
      {pressedStatus === 2 && (
        // Put your logic for listing supplements here
        < >
          <View style={[styles.container, { width: containerWidth }, { height: containerHeight }]}>

            <MyBottomFABs onFabPress={handleFabPress} />




            <View style={[styles.container2, { width: containerWidth }, { height: containerHeight }]}>
              <View style={[styles.card, { width: containerWidth }, { height: containerHeight }]}>
       

                <MyAddSupplements key="some_unique_value2" visible={true} hideDialog={undefined} />
              </View>
            </View>
          </View>
        </>
      )}

      {/* Case 3: add fake line */}
   
        {/*{pressedStatus === 3 && !calendarLineGenerated && (*/}

    {pressedStatus === 3 && !calendarLineGenerated && (
 
        <>

          {generateCalendarLine("fake1", 10, 3, 2, 1, 2023, '15gr', 'NOT') }
       


        

     
 
          <View style={styles.container}>

          <MyBottomFABs onFabPress={handleFabPress} />


            <Text>After pressing generate cal</Text>
            <Text>We generate max. one test line</Text>


            <View style={[styles.container, { width: containerWidth }, { height: containerHeight }]}>
              <View style={[styles.card, { width: containerWidth }, { height: containerHeight }]}>


                <MyCalendar key="some_unique_value660p" />
              </View>
            </View>
          </View>

 
        </>
          


      ) }


      {pressedStatus === 3 && calendarLineGenerated && (
        <>

 
        

     
 
          <View style={styles.container}>

          <MyBottomFABs onFabPress={handleFabPress} />


            <Text>We don´t generate too many lines</Text>
        


            <View style={[styles.container, { width: containerWidth }, { height: containerHeight }]}>
              <View style={[styles.card, { width: containerWidth }, { height: containerHeight }]}>


                <MyCalendar key="some_unique_value660p" />
              </View>
            </View>
          </View>

 
        </>
          


      ) }

      {/* Case 4: Add to Calendar */}
      {pressedStatus === 4 && (
        // Put your logic for listing supplements here
        // Put your logic for listing supplements here
        < >



          <View style={styles.container}>

            <MyBottomFABs onFabPress={handleFabPress} />





            <View style={[styles.container, { width: containerWidth }, { height: containerHeight }]}>
              <View style={[styles.card, { width: containerWidth }, { height: containerHeight }]}>


                <MyCalendar key="some_unique_value660p" />
              </View>
            </View>
          </View>
        </>


      )}

      {pressedStatus === 5 && (
        // Put your logic for listing supplements here
        < >
          <View style={[styles.container, { width: containerWidth }, { height: containerHeight }]}>

            <MyBottomFABs onFabPress={handleFabPress} />




            <View style={[styles.container2, { width: containerWidth }, { height: containerHeight }]}>
              <View style={[styles.card, { width: containerWidth }, { height: containerHeight }]}>
 
                <MyAddCalendar key="some_unique_value2f" visible={true} hideDialog={undefined} />
              </View>
            </View>
          </View>
        </>
      )}


      {pressedStatus === 6 && (


        < >

          <View style={styles.container}>

            <MyBottomFABs onFabPress={handleFabPress} />





            <View style={[styles.container, { width: containerWidth }, { height: containerHeight }]}>
              <View style={[styles.card, { width: containerWidth }, { height: containerHeight }]}>


                <MyAbout key="about" />
              </View>
            </View>
          </View>
        </>

      )}



{pressedStatus === 7 && (


< >

  <View style={styles.container}>

    <MyBottomFABs onFabPress={handleFabPress} />





    <View style={[styles.container, { width: containerWidth }, { height: containerHeight }]}>
      <View style={[styles.card, { width: containerWidth }, { height: containerHeight }]}>


        <MyDrop key="drop" />
      </View>
    </View>
  </View>
</>

)}



{pressedStatus === 8 && (


< >

  <View style={styles.container}>

    <MyBottomFABs onFabPress={handleFabPress} />





    <View style={[styles.container, { width: containerWidth }, { height: containerHeight }]}>
      <View style={[styles.card, { width: containerWidth }, { height: containerHeight }]}>


        <Tutorial key="tutorial" />
      </View>
    </View>
  </View>
</>

)}

      {/* Default: Other Cases */}
      {myStatus !== 1 && myStatus !== 2 && myStatus !== 3 && myStatus !== 4 && myStatus !== 6 && myStatus !== 6 && (
        <View>
         
        </View>
      )}
    </View>


  );
}



const styles = StyleSheet.create({


  submitButton: {
    position: 'absolute',
    alignItems: 'center',
    valignItems: 'bottom',
    justifyContent: 'center',

  },

  container: {
    flex: 1,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    valignItems: 'bottom',
    width: containerWidth,
    height: containerHeight,
    backgroundColor: 'pink', // Adjust as needed
    paddingHorizontal: 16, // Optional: Add horizontal padding
  },

  container2: {
    flex: 1,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    valignItems: 'bottom',
    width: containerWidth,
    height: containerHeight,
    backgroundColor: 'pink', // Adjust as needed
    paddingHorizontal: 16, // Optional: Add horizontal padding
  },


  card: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 420,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  dialogi2: {
    flex: 1,
    top: 100,
    backgroundColor: 'white',
    alignItems: 'center',
    valignItems: 'bottom',
    justifyContent: 'center',
    width: 420,
    height: '80%',


    // height: 0.2 * screenHeight, // Set the height to 80% of the screen height

  },

  dialog: {
    flex: 1,
    top: 100,
    backgroundColor: 'white',
    alignItems: 'center',
    valignItems: 'bottom',
    justifyContent: 'center',
    width: 420,
    height: '80%',

    // height: 0.2 * screenHeight, // Set the height to 80% of the screen height

  },




  nappiSulje: {
    position: 'absolute',
    margin: 20,
    bottom: 0,
    right: 0,
    width: 120
  },


  vahvistaNappi: {
    position: 'absolute',
    margin: 20,
    botton: 20,
    left: 0,
    width: 150,
    height: 15,
  },
  vahvistaNappi2: {
    position: 'absolute',
    margin: 20,
    top: 20,
    right: 0,
    width: 20,
    height: 15,
  },

  vahvistaNappi3: {
    position: 'absolute',
    margin: 20,
    bottom: 10,
    right: 0,
    width: 200,
    height: 45,
  },


  kuva: {
    top: 55,
    width: '20%',
    resizeMode: 'stretch'
  },
  fileName: {
    fontSize: 30,
    marginTop: 10,
  },
  image: {
    width: screenWidth,
    height: 0.6 * screenHeight,
    aspectRatio: 9 / 16,
    resizeMode: 'stretch',
    bottom: 0,
  },


  fabLeftSecond: {
    position: 'absolute',
    margin: 16,
    left: 0,
    width: 200,
    bottom: 55,
  },

  fabLeftRight: {
    position: 'absolute',
    margin: 16,
    right: 0,
    width: 200,
    bottom: 125,
  },



  fabLeftThird: {
    position: 'absolute',
    margin: 16,
    left: 0,
    width: 200,
    bottom: 125,
  },
  fabLeft: {
    position: 'absolute',
    margin: 16,
    left: 0,
    width: 200,
    bottom: 0,
  },
  fabRight: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,

  },


  formText: {
    fontSize: 8,
    fontWeight: 'bold',


  },

  dataCell: {
    fontSize: 8,
    fontWeight: 'bold',


  },

  fabRightSecond: {
    position: 'absolute',
    margin: 16,
    right: 0,
    width: 200,
    bottom: 55,
  },

  fabRightThird: {
    position: 'absolute',
    margin: 16,
    right: 0,
    width: 200,
    bottom: 55,
  },


});
export default App;