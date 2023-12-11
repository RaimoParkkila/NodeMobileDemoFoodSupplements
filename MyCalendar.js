"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const SQLite = __importStar(require("expo-sqlite"));
const react_native_paper_1 = require("react-native-paper");
const MySupplements = (props) => {
    const db = SQLite.openDatabase('muistiinpanolista.db');
    const [supplementsData, setSupplementsData] = (0, react_1.useState)([]);
    const daysOfWeek = {
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wednesday',
        4: 'Thursday',
        5: 'Friday',
        6: 'Saturday',
        7: 'Sunday'
    };
    const monthNames = {
        1: { en: 'January', es: 'Enero' },
        2: { en: 'February', es: 'Febrero' },
        3: { en: 'March', es: 'Marzo' },
        4: { en: 'April', es: 'Abril' },
        5: { en: 'May', es: 'Mayo' },
        6: { en: 'June', es: 'Junio' },
        7: { en: 'July', es: 'Julio' },
        8: { en: 'August', es: 'Agosto' },
        9: { en: 'September', es: 'Septiembre' },
        10: { en: 'October', es: 'Octubre' },
        11: { en: 'November', es: 'Noviembre' },
        12: { en: 'December', es: 'Diciembre' },
    };
    (0, react_1.useEffect)(() => {
        const fetchSupplementData = () => {
            db.transaction((tx) => {
                tx.executeSql('SELECT * FROM myCalendar', [], (_, { rows }) => {
                    const data = rows._array;
                    setSupplementsData(data);
                });
            }, (error) => {
                console.error('Error starting SQL transaction', error);
            });
        };
        fetchSupplementData();
    }, []); // Empty dependency array to run the effect once on mount
    const handleCardClick = (itemId) => {
        db.transaction((tx) => {
            tx.executeSql('UPDATE myCalendar SET taken = ? WHERE id = ?', ['YES', itemId], (_, { rowsAffected }) => {
                if (rowsAffected > 0) {
                    alert('Taken updated successfully');
                    // Fetch data from the database after the update
                    tx.executeSql('SELECT * FROM myCalendar', [], (_, { rows }) => {
                        const data = rows._array;
                        // Update state to trigger a re-render
                        setSupplementsData(data);
                    });
                }
                else {
                    alert('Failed to update taken');
                }
            });
        }, (error) => {
            console.error('Error starting SQL transaction', error);
        });
    };
    const handleCardClick2 = (itemId) => {
        db.transaction((tx) => {
            tx.executeSql('DELETE FROM MYCALENDAR WHERE id = ?', [itemId], (_, { rowsAffected }) => {
                if (rowsAffected > 0) {
                    //alert('Deleted successfully');
                    // Update state to trigger re-render
                    setSupplementsData((prevData) => prevData.filter((item) => item.id !== itemId));
                }
                else {
                    // alert('Failed to delete from supplements');
                }
            });
        }, (error) => {
            console.error('Error starting SQL transaction', error);
        });
    };
    const renderItem = ({ item }) => {
        var _a;
        const dayLabel = item.d_number === 1 ? 'Monday' : daysOfWeek[item.d_number];
        const monthLabel = ((_a = monthNames[item.m_number]) === null || _a === void 0 ? void 0 : _a.en) || "Unknown Month";
        return (<react_native_paper_1.Card key={item.id} style={{ margin: 10, top: 20, backgroundColor: 'pink' }}>
        <react_native_paper_1.Card.Content>
          <react_native_paper_1.Paragraph>SupplementName: {item.supplement_name}</react_native_paper_1.Paragraph>
          <react_native_paper_1.Paragraph>Hour: {item.h_number}</react_native_paper_1.Paragraph>
          <react_native_paper_1.Paragraph>Id: {item.id}</react_native_paper_1.Paragraph>
          <react_native_paper_1.Paragraph>Day: {dayLabel}</react_native_paper_1.Paragraph>
          <react_native_paper_1.Paragraph>W_number {item.w_number}</react_native_paper_1.Paragraph>
          <react_native_paper_1.Paragraph>Month: {monthLabel}</react_native_paper_1.Paragraph>
          <react_native_paper_1.Paragraph>Year: {item.createdAt}</react_native_paper_1.Paragraph>
          <react_native_paper_1.Paragraph>CreatedAt: {item.createdAt}</react_native_paper_1.Paragraph>
          <react_native_paper_1.Paragraph>UpdatedAt: {item.updatedAt}</react_native_paper_1.Paragraph>
          <react_native_paper_1.Paragraph>Dose: {item.dose}</react_native_paper_1.Paragraph>
          <react_native_paper_1.Paragraph>Taken: {item.taken}</react_native_paper_1.Paragraph>
          <react_native_1.TouchableOpacity onPress={() => handleCardClick(item.id)}>
            <react_native_paper_1.Title>Update Taken</react_native_paper_1.Title>
          </react_native_1.TouchableOpacity>
  
          <react_native_1.TouchableOpacity onPress={() => handleCardClick2(item.id)}>
            <react_native_paper_1.Title>Delete this</react_native_paper_1.Title>
          </react_native_1.TouchableOpacity>
        </react_native_paper_1.Card.Content>
      </react_native_paper_1.Card>);
    };
    return (<react_native_1.View>
      <react_native_1.FlatList data={supplementsData} keyExtractor={(item) => item.id.toString()} renderItem={renderItem}/>
    </react_native_1.View>);
};
exports.default = MySupplements;
