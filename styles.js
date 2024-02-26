import {StyleSheet, Dimensions} from 'react-native'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const screenHeight = Dimensions.get('window').height;
const screenWdidth = Dimensions.get('window').width;

export default StyleSheet.create({

    homeContainer: {
        flex: 1,
        alignItems: 'flex-end',
        flexDirection: 'row',
        backgroundColor: '#15202b',
    },

    container: {
        flex: 1,
        backgroundColor: '#15202b',
        paddingLeft: (screenHeight * 0.025),
        paddingRight: (screenHeight * 0.025),
        paddingTop: (screenHeight * 0.025) ,
        paddingBottom: (screenHeight * 0.025),
    },

    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        width: '45%',
        height: '20%',
        position: 'absolute',
        right: '1%',
    },

    cprSoundButtonContainer: {
        flex: 1,
        justifyContent: 'center',
        width: '45%',
        height: '20%',
        position: 'absolute',
        right: '1%',
        top:'0%',
       
    },

    cprButton: {
        backgroundColor: '#018489',
        height: '7.5%',
        aspectRatio: 1,
        borderRadius: 100,
        borderWidth: 3,
        borderColor: '#15202b',
        position: 'absolute',
        left: '1%',
        top:'1%',
        padding: '15%',
        justifyContent: 'center'
    },

    closestAedButton:{
        backgroundColor: '#018489',
        height: '7.5%',
        aspectRatio: 1,
        borderRadius: 100,
        borderWidth: 3,
        borderColor: '#15202b',
        position: 'absolute',
        left: '1%',
        top:'10%',
        padding: '15%',
        justifyContent: 'center'
    },

    allAvailableSpace: {
        height:'100%',
        width:'100%',
    },

    animatedView: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '100%',
        width: '100%',
        backgroundColor: '#15202b',
        paddingLeft: (screenHeight * 0.0125),
        paddingRight: (screenHeight * 0.0125),
        position:'absolute',
    },

    smallView: {
        paddingBottom: (screenHeight * 0.0125),
        paddingTop: (screenHeight * 0.0125),
        flexDirection: 'column', 
        justifyContent: 'space-between', 
        alignItems: 'flex-end', 
        width:'100%', 
        height:'20%' , 
        
    },

    fullOpenView: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '100%',
        width: '100%',
        position:'absolute',
    },

    directionView: {
        flexDirection:'column',
        height: '30%',
        width: '100%',
        flexWrap: 'wrap',
        opacity: 0,
        paddingBottom: (screenHeight * 0.0125),
        paddingTop: (screenHeight * 0.0125),
    },

    destinationView: {
        justifyContent: 'flex-start',
        height: '100%',
        width: '100%',
        paddingLeft: (screenHeight * 0.0125),
        paddingRight: (screenHeight * 0.0125),
        paddingBottom: (screenHeight * 0.0125),
        paddingTop: (screenHeight * 0.025),
        position:'absolute',
    },
  
    aedSmall: {
        height: '100%',
        aspectRatio: 1,
        borderRadius: 100,
        overflow: 'hidden',
        borderColor: '#FFFFFF',
        borderWidth: 2,
    },

    aedFull: {
        height: '20%',
        aspectRatio: 1,
        borderRadius: 100,
        overflow: 'hidden',
        borderColor: '#FFFFFF',
        borderWidth: 2,
        marginTop: '5%',
        marginBottom: '5%',
    },

    locateButton:{
        alignItems: 'center',
        justifyContent: 'center',
        width: '30%',
        height: '50%',
        backgroundColor: '#018489',
        marginBottom: (screenHeight * 0.025),
        borderRadius: 10,
    },
  
   
    text:{
        textAlign:'left',
        color: '#FFFFFF',
        fontSize: RFValue(14),
    },

    phoneNumberText:{
        textAlign:'center',
        color: '#FFFFFF',
        fontSize: RFValue(18),
        fontWeight: 'bold',
        width: '100%',
        position: 'absolute'
    },

    helpText: {
        textAlign:'left',
        color: '#FFFFFF',
        fontSize: RFValue(14),
        marginBottom: '5%',
    },

    largeTitle: {
        textAlign:'left',
        color: '#FFFFFF',
        fontSize: RFValue(24),
        fontWeight: 'bold',
    },

    title:{
        textAlign:'left',
        color: '#FFFFFF',
        fontSize: RFValue(14),
        fontWeight: 'bold',
    },

    subTitle: {
        textAlign:'left',
        color: '#FFFFFF',
        fontSize: RFValue(14),
        fontWeight: 'bold',
        marginBottom: '2%'
    },
  
    modalImage: {
        margin: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },

    curvedIcon: {
        marginTop:((screenHeight * 0.0125) /2 ) - 2 ,
        backgroundColor: '#FFFFFF',
        width: 50,
        height: 4,
        borderRadius: 100,
        position: 'absolute',
    },

    smallViewContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        width:'100%', 
        height:'100%', 
        backgroundColor: '#192734', 
        padding:'2.5%'
    },

    informationScrollView:{
        flexGrow: 0,
        height: '60%', 
        width: '100%'
    },

    directionTopContainer: {
        flexDirection: 'row', 
        width: '100%', 
        justifyContent: 'space-between',
    },

    directionBottomContainer:{
        flexDirection: 'row', 
        flex:1,
        justifyContent: 'space-between', 
    },

    textContainer:{
        minHeight: 25, 
        flexDirection: 'column',
        backgroundColor: '#192734',
        marginBottom: 3,
        paddingHorizontal: '2%', 
        paddingVertical: '1%', 
        flex:1
    },

    destinationImageContainer:{
        height:'100%', 
        flexDirection: 'column',
        backgroundColor: '#192734',
        marginBottom: 3,
        paddingLeft: (screenHeight * 0.03),
        paddingRight: (screenHeight * 0.03),
        paddingTop: (screenHeight * 0.03) ,
        paddingBottom: (screenHeight * 0.03),
    },

    textContainerCentered:{
        minHeight: 25, 
        flexDirection: 'column',
        backgroundColor: '#192734',
        marginBottom: 3,
        paddingHorizontal: '2%', 
        paddingVertical: '1%', 
        flex:1,
        alignItems: 'center',
    },

    emergencyScreenButtonContainer: {
        minHeight: 25, 
        flexDirection: 'column',
        backgroundColor: '#192734',
        marginBottom: 3,
        paddingHorizontal: '2%', 
        paddingVertical: '1%', 
        flex: 1, 
        alignItems: 'center',
        paddingHorizontal: '5%',
        paddingVertical: '5%'
    },

    imageContainer: {
        flex:1, 
        backgroundColor: '#192734', 
        paddingHorizontal: '2%', 
        paddingVertical: '1%', 
        alignItems: 'center', 
        justifyContent: 'center'
    },

    locateButtonContainer: {
        width: '100%', 
        height: '16%', 
        flexDirection: 'column', 
        backgroundColor: '#15202b', 
        paddingTop: '2%',
        justifyContent: 'flex-start', 
        alignItems: 'center', 
        position: 'absolute',
    },

    defaultImageStyle: {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
    },

    switchContainer: {
        width: '100%',
        height: '5%',
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: '5%',
    },

    switch: {
        width: '45%',
        height: '100%', 
        justifyContent: 'center',
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderColor:'#018489', 
    },

    leftSwitch: {
        borderLeftWidth: 2,
    },

    rightSwitch: {
        borderRightWidth: 2,
    },

    textButton: {
        textAlign:'center', 
        color: 'white',
        fontSize: RFValue(14),
    },

    switchEnabled: {
        backgroundColor: '#018489',
    },

    paragraph: {
        marginVertical: '5%', 
        width: '100%', 
        textAlign: 'center'
    },

    bulletPointContainer: {
        flex: 1,
        alignItems: 'flex-start', 
        flexDirection: 'row', 
        marginBottom: '2%',
        padding: '2%',
    },

    phoneButton: {
        height: screenHeight/12 , 
        width: '100%', 
        backgroundColor: '#018489', 
        borderRadius: 10, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'flex-start',
        
    },

    subContainer: {
        minHeight: 25,
        backgroundColor: '#192734',
        marginBottom: 3,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    splitContainer: {
        flex:1,  
        flexDirection: 'row', 
        position:'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        zIndex: 1,
    },

    allInfoContainer: {
        flex:1, 
        marginRight: 3, 
        justifyContent:'space-evenly'
    },

    informationAndImageSubContainer : {
        justifyContent:'space-between', 
        flexDirection: 'row'
    },

    informationContainer: {
        flex:1, 
        flexDirection: 'row',
        paddingLeft: 5,  
        paddingRight: 10, 
    },

    cprImage: {
        height: screenHeight/10, 
        width: '100%'
    },

    slitInContainer: {
        flex:1, 
        flexDirection: 'row',  
        position:'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0,
    },

    halfContainer: {
        flex:1, 
        backgroundColor: '#192734',
    },

    cprText: {
        textAlign:'left', 
        color: 'white',
        fontSize: RFValue(12),
    },

    largeImage: {
        width:'33%', 
        height: '100%'
    },

    imageModal: {
        margin: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },

    headerInfoContainer: {
        flexDirection: 'column',
        marginBottom: '3%',
    },

    imageTextContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        width:'100%',
        height: screenHeight/7,
        backgroundColor: '#192734',
        marginBottom: '2%',
        padding:'2.5%'
    },

    listAEDText: {
        flex: 1,
        textAlign:'right',
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: RFValue(20),
    },

    imageInsideInfo: {
        flex: 1,
        justifyContent: 'center',
        flexDirection:'row',
        flexWrap: 'wrap',
        marginBottom: '5%',
    },

    imageBorder: {
        width: '30%',
        height: screenHeight/5,
        padding: '2%',
        backgroundColor: '#1f3141',
        margin: '1%',
        justifyContent: 'center',
    },

    destinationImageBorder: {
        height:'100%',
        width: '100%',
        padding: '2%',
        backgroundColor: '#1f3141',
        margin: '1%',
        justifyContent: 'center',
    }


});