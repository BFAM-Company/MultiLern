import React,{useState} from 'react';
import { StyleSheet, View, Text, Image, Modal, TouchableOpacity} from 'react-native';


interface ToolKitProps{
    returnColor: any
    returnWidth: any
    returnStyle: any
    color:string
    width:number
    style:string
}

function ToolKit({color, width, style, returnColor, returnWidth, returnStyle}: ToolKitProps) {

  const [selectedColor, setSelectedColor] = useState<string>(color)
  const [selectedWidth, setSelectedWidth] = useState<number>(width)
  const [selectedStyle, setSelectedStyle] = useState<string>(style)
  const [isVisibleColor, setIsVisibleColor] = useState<boolean>(false)
  const [isVisibleWidth, setIsVisibleWidth] = useState<boolean>(false)
  const [isVisibleStyle, setIsVisibleStyle] = useState<boolean>(false)
  const [isPenSelected, setIsPenSelected] = useState<boolean>(true)

  return (
      <View style={styles.container}>
        <Modal style={styles.Modal}
            animationType="slide"
            visible={isVisibleColor}
            transparent={true}
            onRequestClose={() => {setIsVisibleColor(false)}}
        >
            <TouchableOpacity 
                style={styles.ModalContainer}
                onPress={() => {setIsVisibleColor(false)}}
                activeOpacity={1}
            >
                <View 
                    style={styles.ColorPaleteModal}
                >
                    <TouchableOpacity
                        style={[{
                            backgroundColor: 'red'
                        },styles.colorPickerButton]}

                        onPress={()=>{
                            setIsVisibleColor(false)
                            setSelectedColor('red')
                            returnColor('red')
                        }}
                    >
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[{
                            backgroundColor: 'green'
                        },styles.colorPickerButton]}

                        onPress={()=>{
                            setIsVisibleColor(false)
                            setSelectedColor('green')
                            returnColor('green')
                        }}
                    >
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[{
                            backgroundColor: 'blue'
                        },styles.colorPickerButton]}

                        onPress={()=>{
                            setIsVisibleColor(false)
                            setSelectedColor('blue')
                            returnColor('blue')
                        }}
                    >
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[{
                            backgroundColor: 'purple'
                        },styles.colorPickerButton]}

                        onPress={()=>{
                            setIsVisibleColor(false)
                            setSelectedColor('purple')
                            returnColor('purple')
                        }}
                    >
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[{
                            backgroundColor: 'orange'
                        },styles.colorPickerButton]}

                        onPress={()=>{
                            setIsVisibleColor(false)
                            setSelectedColor('orange')
                            returnColor('orange')
                        }}
                    >
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[{
                            backgroundColor: 'black'
                        },styles.colorPickerButton]}

                        onPress={()=>{
                            setIsVisibleColor(false)
                            setSelectedColor('black')
                            returnColor('black')
                        }}
                    >
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
        <Modal style={styles.Modal}
            animationType="slide"
            visible={isVisibleWidth}
            transparent={true}
            onRequestClose={() => {setIsVisibleWidth(false)}}
        >
            <TouchableOpacity 
                style={styles.ModalContainerWidth}
                onPress={() => {setIsVisibleWidth(false)}}
                activeOpacity={1}
            >
                <View 
                    style={styles.WidthPickerModal}
                >
                    <TouchableOpacity
                        style={[styles.widthButtons,{
                            backgroundColor:selectedWidth == 1?'rgb(230,230,230)':'#fff'
                        }]}

                        onPress={()=>{
                            setIsVisibleWidth(false)
                            setSelectedWidth(1)
                            returnWidth(1)
                        }}
                    >
                        <Text style={styles.widthText}>1</Text>
                        <View style={{width:60, height:1, backgroundColor:'#000' }}></View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.widthButtons,{
                            backgroundColor:selectedWidth == 2?'rgb(230,230,230)':'#fff'
                        }]}

                        onPress={()=>{
                            setIsVisibleWidth(false)
                            setSelectedWidth(2)
                            returnWidth(2)
                        }}
                    >
                        <Text style={styles.widthText}>2</Text>
                        <View style={{width:60, height:2, backgroundColor:'#000'}}></View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.widthButtons,{
                            backgroundColor:selectedWidth == 3?'rgb(230,230,230)':'#fff'
                        }]}
                        onPress={()=>{
                            setIsVisibleWidth(false)
                            setSelectedWidth(3)
                            returnWidth(3)
                        }}
                    >
                        <Text style={styles.widthText}>3</Text>
                        <View style={{width:60, height:3, backgroundColor:'#000'}}></View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.widthButtons,{
                            backgroundColor:selectedWidth == 4?'rgb(230,230,230)':'#fff'
                        }]}
                        onPress={()=>{
                            setIsVisibleWidth(false)
                            setSelectedWidth(4)
                            returnWidth(4)
                        }}
                    >
                        <Text style={styles.widthText}>4</Text>
                        <View style={{width:60, height:4, backgroundColor:'#000'}}></View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.widthButtons,{
                            backgroundColor:selectedWidth == 5?'rgb(230,230,230)':'#fff'
                        }]}
                        onPress={()=>{
                            setIsVisibleWidth(false)
                            setSelectedWidth(5)
                            returnWidth(5)
                        }}
                    >
                        <Text style={styles.widthText}>5</Text>
                        <View style={{width:60, height:5, backgroundColor:'#000'}}></View>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
        <Modal style={styles.Modal}
            animationType="slide"
            visible={isVisibleStyle}
            transparent={true}
            onRequestClose={() => {setIsVisibleStyle(false)}}
        >
            <TouchableOpacity 
                style={styles.ModalContainerStyle}
                onPress={() => {setIsVisibleStyle(false)}}
                activeOpacity={1}
            >
                <View 
                    style={styles.WidthPickerModal}
                >
                    <TouchableOpacity
                        style={[styles.widthButtons,{
                            backgroundColor:selectedStyle == 'normal'?'rgb(230,230,230)':'#fff'
                        }]}

                        onPress={()=>{
                            setIsVisibleStyle(false)
                            setSelectedStyle('normal')
                            returnStyle('normal')
                        }}
                    >
                        <Text>Normal</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.widthButtons,{
                            backgroundColor:selectedStyle == 'dashed'?'rgb(230,230,230)':'#fff'
                        }]}

                        onPress={()=>{
                            setIsVisibleStyle(false)
                            setSelectedStyle('dashed')
                            returnStyle('dashed')
                        }}
                    >
                        <Text>Dashed</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.widthButtons,{
                            backgroundColor:selectedStyle == 'discrete'?'rgb(230,230,230)':'#fff'
                        }]}

                        onPress={()=>{
                            setIsPenSelected(true)
                            setSelectedStyle('discrete')
                            returnStyle('discrete')
                        }}
                    >
                        <Text>Discrete</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
        <TouchableOpacity
            style={[{
                backgroundColor: selectedColor
            },styles.mainColorPickerButton]}

            onPress={()=>{
                setIsVisibleColor(true)
            }}
        >
        </TouchableOpacity>
        <TouchableOpacity
            style={[{
                backgroundColor: 'lightgray'
            },styles.mainColorPickerButton]}

            onPress={()=>{
                setIsVisibleWidth(true)
            }}
        >
            <View
                style={{
                    borderRadius:100,
                    backgroundColor:'#000',
                    width:selectedWidth*3,
                    height:selectedWidth*3
                }}
            ></View>
        </TouchableOpacity>
        <TouchableOpacity
            style={{
                backgroundColor: 'lightgray',
                width:'auto',
                height:'auto',
                borderRadius:20,
                borderWidth:3,
                borderColor:'lightgray',
                padding:5,
                display:'flex',
                justifyContent:'center',
                alignItems:'center'
            }}

            onPress={()=>{
                setIsVisibleStyle(true)
            }}
        >
            <Text style={{margin:5, fontWeight:'700', fontSize:16, color:'dimgray'}}>{selectedStyle}</Text>
        </TouchableOpacity>

        <TouchableOpacity
            onPress={()=>{setIsPenSelected(!isPenSelected)}}
            activeOpacity={1}
        >
            <Image source={require('./../../../assets/pencil.png')} 
                style={[styles.pencil, {height:isPenSelected?140:120}]}
            />
        </TouchableOpacity>
        <TouchableOpacity
            onPress={()=>{setIsPenSelected(!isPenSelected)}}
            activeOpacity={1}
        >
            <Image source={require('./../../../assets/rubber.png')} 
                style={[styles.rubber, {height:isPenSelected?100:120}]}
            />
        </TouchableOpacity>
        <TouchableOpacity 
            style={styles.textButton}
        >
            <Text style={styles.text}>Aa</Text>
        </TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  container:{
    position:'absolute',
    zIndex:10000000,
    bottom:10,
    left:10,
    right:10,
    width:'auto',
    height:120,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-around',
    borderRadius:20,
    backgroundColor:'rgb(230,230,230)',
    shadowColor: "#000",
        shadowOffset: {
                width: 0,
                height: 0,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,

        elevation: 16,
    overflow:'hidden',
  },
  Modal:{
    width:'100%',
    height:'100%',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
  },
  ModalContainer:{
    width:'100%',
    height:'100%',
    display:'flex',
    justifyContent:'flex-end',
    paddingBottom:150,
    alignItems:'flex-start',
    paddingLeft:10,
  },
  ModalContainerWidth:{
    width:'100%',
    height:'100%',
    display:'flex',
    justifyContent:'flex-end',
    paddingBottom:150,
    alignItems:'flex-start',
    paddingLeft:50,
  },
  ColorPaleteModal:{
    padding:20,
    width:'60%',
    height:'auto',
    borderRadius:20,
    display:'flex',
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'space-around',
    alignItems:'center',
    backgroundColor:'#fff',
    shadowColor: "#000",
        shadowOffset: {
                width: 0,
                height: 0,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,

        elevation: 16,
  },
  colorPickerButton:{
    margin:10,
    width:40,
    height:40,
    borderWidth:3,
    borderRadius:100,
    borderColor:'lightgray'
  },
  mainColorPickerButton:{
    //margin:10,
    width:40,
    height:40,
    borderWidth:4,
    borderRadius:100,
    borderColor:'lightgray',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
  },

  WidthPickerModal:{
    padding:20,
    width:'60%',
    height:'auto',
    borderRadius:20,
    display:'flex',
    flexDirection:'row',
    flexWrap:'wrap',
    justifyContent:'space-around',
    alignItems:'center',
    backgroundColor:'#fff',
    shadowColor: "#000",
        shadowOffset: {
                width: 0,
                height: 0,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,

        elevation: 16,
  },
  widthText:{
    fontWeight:'900',
    fontSize:20,
  },
  widthButtons:{
    width:'90%',
    padding:7,
    borderRadius:10,
    margin:5,
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
  },
  ModalContainerStyle:{
    width:'100%',
    height:'100%',
    display:'flex',
    justifyContent:'flex-end',
    paddingBottom:150,
    alignItems:'flex-start',
    paddingLeft:80,
  },
  pencil:{
    width:30,
    marginBottom:-20
  },
  rubber:{
    width:30,
    marginBottom:-20,
  },
  textButton:{
    width:40,
    height:40,
    backgroundColor:'lightgray',
    borderRadius:100,
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
  },
  text:{
    color:'dimgray',
    fontWeight:'700',
    fontSize:16,
  },
})

export default ToolKit;