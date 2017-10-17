export const INPUT_ATTRIBUTES = {
    DESC_IMAGE: {
      class: 'input-image',
      type: 'file',
      accept: 'image/*',
      src: '../../../assets/default-placeholder.png',
      placeholder: 'Select an image from your device',
      title: 'Click to select an image',
      'prop-name': 'mainImage'
    },
    NAME: {
      class: 'mat-input-element input-name',
      type: 'text',
      placeholder: 'Activity title',
      title: 'Type in the activity title',
      'prop-name': 'activityName'
    },
    ACTIVITY_ID: {
      class: 'mat-input-element input-activity-id',
      type: 'text',
      placeholder: 'Activity id',
      title: 'Type in the activity id',
      'prop-name': 'activityId'
    },
    PROJECT_ID: {
      class: 'mat-input-element input-proj-id',
      type: 'text',
    },
    START_DATE: {
      class: 'mat-input-element input-date'
    },
    DESC: {
      class: 'mat-input-element input-desc',
      type: 'text',
      placeholder: 'Description',
      title: 'Type in a detailed description.'
    },
  };
  export const NUMBERS = {
    8: 'backspace',
    13: 'enter',
    37: 'left-arrow',
    38: 'up-arrow',
    39: 'right-arrow',
    40: 'down-arrow',
    48: '0',
    49: '1',
    50: '2',
    51: '3',
    52: '4',
    53: '5',
    54: '6',
    55: '7',
    56: '8',
    57: '9',
    96: '0',
    97: '1',
    98: '2',
    99: '3',
    100: '4',
    101: '5',
    102: '6',
    103: '7',
    104: '8',
    105: '9'
  };
  export const REGEX_UNITS = {
    LETTERS: /^[a-zA-Z]*$/,
    PROJECT: /^([A-Za-z0-9]{6})+[-]+([A-Za-z0-9]{4})/
  };
