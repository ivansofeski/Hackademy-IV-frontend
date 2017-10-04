export const INPUT_ATTRIBUTES = {
  DESC_IMAGE: {
    class: 'input-image',
    type: 'file',
    accept: 'image/*',
    placeholder: 'Select an image from your device',
    title: 'Click to select an image'
  },
  NAME: {
    class: 'mat-input-element input-name',
    type: 'text',
    placeholder: 'Project title',
    title: 'Type in the project title'
  },
  ORG_NAME: {
    class: 'mat-input-element input-org-name',
    type: 'text',
    placeholder: 'Organization name',
    title: 'Type in the corresponding organization name'
  },
  GOAL: {
    class: 'mat-input-element input-goal',
    type: 'text',
    placeholder: 'Goal amount',
    title: 'Type in the desire goal amount. Accepts: Numbers only!'
  },
  ADDRESS: {
    class: 'mat-input-element input-address',
    type: 'text',
    'max-length': '200',
    placeholder: 'Street address',
    title: 'Type in the project location street address.'
  },
  SHORT_DESC: {
    class: 'mat-input-element input-short-desc',
    type: 'text',
    'max-length': '50',
    placeholder: 'Short description',
    title: 'Type in a brief description regarding the project.'
  },
  DESC: {
    class: 'mat-input-element input-desc',
    type: 'text',
    placeholder: 'Detailed description',
    title: 'Type in a detailed description.'
  }
};

export const NUMBERS = {
  8: 'backspace',
  13: 'enter',
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
