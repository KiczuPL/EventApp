import {useEffect, useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {Modal, Portal} from 'react-native-paper';
import {BACKEND_EVENT_API_URL} from '../../features/events/api/constants';

type Props = {
  visible: boolean;
  toggle: () => void;
  setTargetIconFilename: (iconFilename: string) => void;
};

export default ({visible, toggle, setTargetIconFilename}: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [iconFilenames, setIconFilenames] = useState<string[]>();
  useEffect(() => {
    if (isLoading) {
      fetch(BACKEND_EVENT_API_URL + 'event/icons')
        .then(response => response.json())
        .then(responseJson => {
          setIconFilenames(responseJson);
        });
    }
  }, [isLoading]);

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={toggle}
        contentContainerStyle={{backgroundColor: 'white', padding: 20}}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}>
          {iconFilenames?.map(iconFilename => (
            <TouchableOpacity
              onPress={() => {
                console.log('click');

                toggle();
                setTargetIconFilename(iconFilename);
              }}>
              <Image
                source={{
                  uri: BACKEND_EVENT_API_URL + 'event/icons/' + iconFilename,
                }}
                style={{width: 50, height: 50}}
              />
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </Portal>
  );
};
