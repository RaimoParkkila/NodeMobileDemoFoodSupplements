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
    (0, react_1.useEffect)(() => {
        const fetchSupplementData = () => {
            db.transaction((tx) => {
                tx.executeSql('SELECT * FROM supplement_name', [], (_, { rows }) => {
                    const data = rows._array;
                    setSupplementsData(data);
                });
            }, (error) => {
                console.error('Error starting SQL transaction', error);
            });
        };
        fetchSupplementData();
    }, []); // Empty dependency array to run the effect once on mount
    const handleCardClick2 = (itemId) => {
        db.transaction((tx) => {
            tx.executeSql('DELETE FROM SUPPLEMENT_NAME WHERE id = ?', [itemId], (_, { rowsAffected }) => {
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
    const renderItem = ({ item }) => (<react_native_paper_1.Card key={item.id} style={{ margin: 10, top: 20, backgroundColor: 'pink' }}>
      <react_native_paper_1.Card.Content>
      <react_native_paper_1.Title>Supplement Name: {item.SUPPLEMENT_NAME}</react_native_paper_1.Title>
      <react_native_paper_1.Paragraph>Id: {item.id}</react_native_paper_1.Paragraph>
          <react_native_paper_1.Paragraph>Brand: {item.BRAND}</react_native_paper_1.Paragraph>

          <react_native_paper_1.Paragraph>Purpose: {item.PURPOSE}</react_native_paper_1.Paragraph>
          <react_native_paper_1.Paragraph>Description: {item.DESCRIPTION}</react_native_paper_1.Paragraph>
          <react_native_paper_1.Paragraph>Dose: {item.DOSE}</react_native_paper_1.Paragraph>
          <react_native_paper_1.Paragraph>Side effects: {item.TEXT}</react_native_paper_1.Paragraph>
          <react_native_paper_1.Paragraph>Effect terminates: {item.EFFECT_TERMINATES}</react_native_paper_1.Paragraph>
       
          <react_native_paper_1.Paragraph>createdAt: {item.createdAt}</react_native_paper_1.Paragraph>
          <react_native_paper_1.Paragraph>updatedAt: {item.updatedAt}</react_native_paper_1.Paragraph>
          <react_native_paper_1.Paragraph> free_additional_information: {item.free_additional_information}</react_native_paper_1.Paragraph>
        <react_native_1.TouchableOpacity onPress={() => handleCardClick2(item.id)}>
          <react_native_paper_1.Title>Delete this</react_native_paper_1.Title>
        </react_native_1.TouchableOpacity>
        {/* Add more fields as needed */}
      </react_native_paper_1.Card.Content>
    </react_native_paper_1.Card>);
    return (<react_native_1.View>
      <react_native_1.FlatList data={supplementsData} keyExtractor={(item) => item.id.toString()} renderItem={renderItem}/>
    </react_native_1.View>);
};
exports.default = MySupplements;
