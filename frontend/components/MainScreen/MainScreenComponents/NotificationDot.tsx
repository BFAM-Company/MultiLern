import React from 'react';
import { View} from 'react-native';

interface NotificationDotProps {
    dotColor: string;
  }

function NotificationDot({dotColor}: NotificationDotProps) {
  return (
    <View
        style={
            {
                position:'absolute',
                width:10,
                height:10,
                bottom:2,
                right:2,
                borderRadius:100,
                backgroundColor:dotColor
            }
        }
    >
    </View>
  );
}



export default NotificationDot;