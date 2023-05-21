import {useCallback, useState} from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {Button, Modal, Portal, Text, TextInput} from 'react-native-paper';
import {TimePickerModal, DatePickerModal} from 'react-native-paper-dates';
import PlacePickerDialog from '../molecules/PlacePickerDialog';
import PickEventIconDialog from '../molecules/PickEventIconDialog';
import {BACKEND_EVENT_API_URL} from '../../features/events/api/constants';

type createEventDialogProps = {
  visible: boolean;
  toggle: () => void;
};

type Time = {
  hours: number;
  minutes: number;
};

export type Coordinates = {
  longitude: number;
  latitude: number;
};

export default ({visible, toggle}: createEventDialogProps) => {
  const [datePickerVisible, setDatePickererVisible] = useState(false);
  const [timePickerVisible, setTimePickerVisible] = useState(false);
  const [placePickerVisible, setPlacePickerVisible] = useState(false);
  const [iconPickerVisible, setIconPickerVisible] = useState(false);
  const [coordinates, setCoordinates] = useState<Coordinates | undefined>();
  const [iconFilename, setIconFilename] = useState<string | undefined>();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState<Time | undefined>();

  const togglePlacePicker = useCallback(() => {
    setPlacePickerVisible(!placePickerVisible);
  }, [placePickerVisible]);

  const toggleDatePicker = useCallback(() => {
    setDatePickererVisible(!datePickerVisible);
  }, [datePickerVisible]);

  const toggleTimePicker = useCallback(() => {
    setTimePickerVisible(!timePickerVisible);
  }, [timePickerVisible]);

  const toggleIconPicker = useCallback(() => {
    setIconPickerVisible(!iconPickerVisible);
  }, [iconPickerVisible]);

  const pickPlace = useCallback(
    (coordinates: Coordinates) => {
      //console.log('AAAAAAAAAAAAAAAAAA');
      setCoordinates(coordinates);
      //togglePlacePicker();
    },
    [setCoordinates, togglePlacePicker],
  );

  const pickTime = useCallback(
    ({hours, minutes}: Time) => {
      //console.log(hours, minutes);
      const tmp = date ? date : new Date();
      tmp.setHours(hours);
      tmp.setMinutes(minutes);
      setDate(tmp);
      toggleTimePicker();
      //console.log(date);
    },
    [setTime, setDate, toggleTimePicker],
  );

  const pickDate = useCallback(
    (params: any) => {
      const tmp = params.date;
      tmp.setHours(date?.getHours() || 0);
      tmp.setMinutes(date?.getMinutes() || 0);
      setDate(tmp);
      toggleDatePicker();
    },
    [setDate, toggleDatePicker],
  );

  const dateFormatter = new Intl.DateTimeFormat(undefined, {
    //TODO: useMemo????
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const timeFormatter = new Intl.DateTimeFormat(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  return (
    <Modal
      visible={visible}
      onDismiss={toggle}
      contentContainerStyle={{backgroundColor: 'white', padding: 20}}>
      <View style={{paddingBottom: 20}}>
        <TextInput
          label="Title"
          multiline={false}
          numberOfLines={2}
          style={{marginBottom: 20, borderRadius: 5}}
        />
        <TextInput
          label="Description"
          multiline={true}
          numberOfLines={5}
          style={{marginBottom: 20, borderRadius: 5}}
        />
        <View style={{flexDirection: 'row', paddingBottom: 10}}>
          <Button mode="contained" onPress={toggleTimePicker}>
            {date?.getHours() ? timeFormatter.format(date) : 'Time'}
          </Button>
        </View>
        <View style={{flexDirection: 'row', paddingBottom: 10}}>
          <Button mode="contained" onPress={toggleDatePicker}>
            {date?.getDay() ? dateFormatter.format(date) : 'Date'}
          </Button>
        </View>
        <View style={{flexDirection: 'row', paddingBottom: 10}}>
          <Button mode="contained" onPress={togglePlacePicker}>
            {coordinates
              ? coordinates.latitude + ', ' + coordinates.longitude
              : 'Place'}
          </Button>
        </View>
        <View style={{flexDirection: 'row', paddingBottom: 10}}>
          {iconFilename ? (
            <TouchableOpacity onPress={toggleIconPicker}>
              <Image
                source={{
                  uri: BACKEND_EVENT_API_URL + 'event/icons/' + iconFilename,
                }}
                style={{width: 50, height: 50}}
              />
            </TouchableOpacity>
          ) : (
            <Button mode="contained" onPress={toggleIconPicker}>
              Icon
            </Button>
          )}
        </View>
      </View>

      <TimePickerModal
        locale="pl"
        visible={timePickerVisible}
        onDismiss={toggleTimePicker}
        onConfirm={pickTime}
        use24HourClock={true}
      />
      <DatePickerModal
        locale="pl"
        mode="single"
        visible={datePickerVisible}
        date={date}
        onDismiss={toggleDatePicker}
        onConfirm={pickDate}
      />
      <PlacePickerDialog
        visible={placePickerVisible}
        toggle={togglePlacePicker}
        setTargetCoordinates={pickPlace}
      />
      <PickEventIconDialog
        visible={iconPickerVisible}
        toggle={toggleIconPicker}
        setTargetIconFilename={setIconFilename}
      />
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Button mode="contained" onPress={toggle}>
          Cancel
        </Button>
        <Button mode="contained" onPress={toggle}>
          Create
        </Button>
      </View>
    </Modal>
  );
};
